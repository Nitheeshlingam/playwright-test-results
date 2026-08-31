import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import AdmZip from "adm-zip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GITHUB_API_VERSION = "2022-11-28";

const ARTIFACT_RETRY_COUNT = 15;
const ARTIFACT_RETRY_DELAY_MS = 2000;
const ARTIFACT_PAGE_SIZE = 100;

// Keep extremely large error messages from unnecessarily filling the DB.
// The database column is Text, so this is mainly a safety limit.
const MAX_ERROR_LENGTH = 20000;

type GitHubArtifact = {
  id: number;
  name: string;
  expired?: boolean;
  size_in_bytes?: number;
  created_at?: string;
  updated_at?: string;
};

type PlaywrightTestResult = {
  testName: string;
  fileName: string | null;
  status: string;
  durationMs: number;
  error: string | null;
};

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !value) {
    return false;
  }

  return !Number.isNaN(new Date(value).getTime());
}

function safeError(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  let message = "";

  if (typeof value === "string") {
    message = value;
  } else if (
    typeof value === "object" &&
    value !== null &&
    "message" in value
  ) {
    message = String(
      (value as { message?: unknown }).message ?? ""
    );
  } else {
    try {
      message = JSON.stringify(value);
    } catch {
      message = String(value);
    }
  }

  if (!message) {
    return null;
  }

  return message.length > MAX_ERROR_LENGTH
    ? `${message.substring(0, MAX_ERROR_LENGTH)}\n...[truncated]`
    : message;
}

/**
 * Fetch all artifacts belonging to the GitHub workflow run.
 */
async function fetchAllArtifacts(
  owner: string,
  repo: string,
  runId: string,
  token: string
): Promise<GitHubArtifact[]> {
  const artifacts: GitHubArtifact[] = [];

  for (let page = 1; page <= 10; page++) {
    const url =
      `https://api.github.com/repos/${owner}/${repo}` +
      `/actions/runs/${runId}/artifacts` +
      `?per_page=${ARTIFACT_PAGE_SIZE}&page=${page}`;

    const response = await fetch(url, {
      headers: githubHeaders(token),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `GitHub artifacts request failed (${response.status}): ${JSON.stringify(
          data
        )}`
      );
    }

    const pageArtifacts = Array.isArray(data.artifacts)
      ? (data.artifacts as GitHubArtifact[])
      : [];

    artifacts.push(...pageArtifacts);

    if (pageArtifacts.length < ARTIFACT_PAGE_SIZE) {
      break;
    }
  }

  return artifacts;
}

/**
 * Give Playwright-related artifacts higher priority.
 */
function artifactScore(artifact: GitHubArtifact) {
  const name = artifact.name.toLowerCase();

  if (name === "playwright-results") return 1000;
  if (name === "playwright-test-results") return 950;
  if (name === "playwright-results-json") return 900;
  if (name === "test-results") return 850;

  if (
    name.includes("playwright") &&
    name.includes("result")
  ) {
    return 800;
  }

  if (
    name.includes("test") &&
    name.includes("result")
  ) {
    return 700;
  }

  if (
    name.includes("playwright") &&
    name.includes("report")
  ) {
    return 650;
  }

  if (name.includes("report")) return 500;
  if (name.includes("result")) return 400;

  return 0;
}

function getArtifactCandidates(
  artifacts: GitHubArtifact[]
) {
  return artifacts
    .filter((artifact) => artifact.expired !== true)
    .sort(
      (a, b) =>
        artifactScore(b) - artifactScore(a)
    );
}

/**
 * Detect Playwright JSON report.
 */
function isPlaywrightReport(value: any): boolean {
  return Boolean(
    value &&
      typeof value === "object" &&
      Array.isArray(value.suites)
  );
}

/**
 * Recursively search an arbitrary JSON object for
 * a Playwright report.
 */
function findReportObject(
  value: any,
  seen = new Set<any>()
): any | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (seen.has(value)) {
    return null;
  }

  seen.add(value);

  if (isPlaywrightReport(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findReportObject(item, seen);

      if (found) {
        return found;
      }
    }

    return null;
  }

  for (const child of Object.values(value)) {
    const found = findReportObject(child, seen);

    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * Find Playwright JSON report inside an artifact ZIP.
 */
function findPlaywrightReport(buffer: Buffer) {
  const zip = new AdmZip(buffer);

  const entries = zip
    .getEntries()
    .filter((entry) => !entry.isDirectory);

  const preferredFiles = [
    "results.json",
    "test-results.json",
    "playwright-results.json",
    "report.json",
  ];

  const jsonEntries = entries.filter((entry) =>
    entry.entryName
      .toLowerCase()
      .endsWith(".json")
  );

  jsonEntries.sort((a, b) => {
    const aBase =
      a.entryName
        .split("/")
        .pop()
        ?.toLowerCase() || "";

    const bBase =
      b.entryName
        .split("/")
        .pop()
        ?.toLowerCase() || "";

    const aIndex =
      preferredFiles.indexOf(aBase);

    const bIndex =
      preferredFiles.indexOf(bBase);

    const aRank =
      aIndex === -1
        ? preferredFiles.length
        : aIndex;

    const bRank =
      bIndex === -1
        ? preferredFiles.length
        : bIndex;

    return aRank - bRank;
  });

  for (const entry of jsonEntries) {
    try {
      const text =
        entry.getData().toString("utf8");

      const parsed = JSON.parse(text);

      const report =
        findReportObject(parsed);

      if (report) {
        return {
          report,
          entryName: entry.entryName,
        };
      }
    } catch {
      // Ignore unrelated JSON files.
    }
  }

  return null;
}

/**
 * Download a GitHub artifact and locate the Playwright report.
 */
async function downloadReport(
  owner: string,
  repo: string,
  artifact: GitHubArtifact,
  token: string
) {
  const url =
    `https://api.github.com/repos/${owner}/${repo}` +
    `/actions/artifacts/${artifact.id}/zip`;

  const response = await fetch(url, {
    headers: githubHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(
      `Could not download artifact ${artifact.name} ` +
        `(${artifact.id}): ${text}`
    );
  }

  const buffer = Buffer.from(
    await response.arrayBuffer()
  );

  return findPlaywrightReport(buffer);
}

/**
 * Extract every executed Playwright test.
 */
function collectTests(
  suites: any[],
  output: PlaywrightTestResult[] = [],
  inheritedFileName: string | null = null
) {
  for (const suite of Array.isArray(suites)
    ? suites
    : []) {
    const fileName =
      suite.file ||
      inheritedFileName ||
      null;

    for (const spec of Array.isArray(
      suite.specs
    )
      ? suite.specs
      : []) {
      for (const test of Array.isArray(
        spec.tests
      )
        ? spec.tests
        : []) {
        const results = Array.isArray(
          test.results
        )
          ? test.results
          : [];

        for (const result of results) {
          output.push({
            testName:
              spec.title ||
              test.title ||
              "Unknown test",

            fileName,

            status:
              result.status ||
              "unknown",

            durationMs:
              typeof result.duration ===
              "number"
                ? result.duration
                : 0,

            error: safeError(
              result.error?.message ||
                result.errors?.[0]?.message ||
                null
            ),
          });
        }
      }
    }

    collectTests(
      suite.suites,
      output,
      fileName
    );
  }

  return output;
}

/**
 * Calculate dashboard status from actual Playwright results.
 */
function calculateFinalStatus(
  testResults: PlaywrightTestResult[]
): "PASSED" | "FAILED" {
  const hasFailedTest =
    testResults.some(
      (test) =>
        test.status === "failed" ||
        test.status === "timedOut" ||
        test.status === "interrupted"
    );

  return hasFailedTest
    ? "FAILED"
    : "PASSED";
}

/**
 * POST /api/github/import
 */
export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const runId = String(
      body?.runId || ""
    ).trim();

    if (!runId) {
      return NextResponse.json(
        {
          success: false,
          error: "runId is required",
        },
        { status: 400 }
      );
    }

    const token =
      process.env.GITHUB_TOKEN;

    const owner =
      process.env.GITHUB_OWNER;

    const repo =
      process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GitHub environment variables are not configured",
        },
        { status: 500 }
      );
    }

    const headers =
      githubHeaders(token);

    /**
     * Fetch GitHub workflow run.
     */
    const githubUrl =
      `https://api.github.com/repos/${owner}/${repo}` +
      `/actions/runs/${runId}`;

    const githubResponse =
      await fetch(githubUrl, {
        headers,
        cache: "no-store",
      });

    const githubRun =
      await githubResponse.json();

    if (!githubResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Could not fetch GitHub workflow run",
          details: githubRun,
        },
        {
          status:
            githubResponse.status,
        }
      );
    }

    const workflowStatus =
      githubRun.status;

    const workflowConclusion =
      githubRun.conclusion;

    /**
     * Preserve the actual GitHub start time.
     */
    const startedAt =
      isValidDate(
        githubRun.run_started_at
      )
        ? new Date(
            githubRun.run_started_at
          )
        : isValidDate(
              githubRun.created_at
            )
          ? new Date(
              githubRun.created_at
            )
          : new Date();

    /**
     * Never convert in_progress into FAILED.
     */
    let initialStatus:
      | "PASSED"
      | "FAILED";

    if (
      workflowConclusion ===
        "failure" ||
      workflowConclusion ===
        "cancelled" ||
      workflowConclusion ===
        "timed_out"
    ) {
      initialStatus = "FAILED";
    } else {
      initialStatus = "PASSED";
    }

    /**
     * Create or update the TestRun.
     *
     * One GitHub run = one TestRun.
     *
     * This is important for:
     *
     * Push 1 -> TestRun 1
     * Push 2 -> TestRun 2
     * Push 3 -> TestRun 3
     *
     * Therefore the dashboard can calculate
     * test-case failure rate across pushes.
     */
    const testRun =
      await prisma.testRun.upsert({
        where: {
          githubRunId:
            String(githubRun.id),
        },

        update: {
          commitSha:
            githubRun.head_sha || "",

          developer:
            githubRun.actor?.login ||
            githubRun.triggering_actor?.login ||
            "Unknown",

          branch:
            githubRun.head_branch ||
            null,

          status:
            initialStatus,

          event:
            githubRun.event ||
            null,

          repository:
            githubRun.repository?.full_name ||
            `${owner}/${repo}`,

          startedAt,
        },

        create: {
          githubRunId:
            String(githubRun.id),

          commitSha:
            githubRun.head_sha || "",

          developer:
            githubRun.actor?.login ||
            githubRun.triggering_actor?.login ||
            "Unknown",

          branch:
            githubRun.head_branch ||
            null,

          status:
            initialStatus,

          event:
            githubRun.event ||
            null,

          repository:
            githubRun.repository?.full_name ||
            `${owner}/${repo}`,

          startedAt,
        },
      });

    /**
     * Find Playwright artifact.
     */
    let artifacts: GitHubArtifact[] =
      [];

    let selectedArtifact:
      | GitHubArtifact
      | null = null;

    let report: any | null = null;

    let reportEntryName:
      | string
      | null = null;

    /**
     * GitHub sometimes needs time to publish
     * the artifact after the workflow finishes.
     */
    for (
      let attempt = 1;
      attempt <= ARTIFACT_RETRY_COUNT;
      attempt++
    ) {
      try {
        artifacts =
          await fetchAllArtifacts(
            owner,
            repo,
            runId,
            token
          );

        const candidates =
          getArtifactCandidates(
            artifacts
          );

        console.log(
          `GitHub artifact attempt ${attempt}/${ARTIFACT_RETRY_COUNT}`
        );

        console.log(
          "Available artifacts:",
          candidates.map(
            (artifact) =>
              `${artifact.id}:${artifact.name}`
          )
        );

        for (
          const candidate of candidates
        ) {
          try {
            const parsed =
              await downloadReport(
                owner,
                repo,
                candidate,
                token
              );

            if (parsed) {
              selectedArtifact =
                candidate;

              report =
                parsed.report;

              reportEntryName =
                parsed.entryName;

              break;
            }
          } catch (error) {
            console.error(
              `Could not inspect artifact ${candidate.id} (${candidate.name})`,
              error
            );
          }
        }

        if (
          selectedArtifact &&
          report
        ) {
          break;
        }
      } catch (error) {
        console.error(
          "Artifact fetch failed:",
          error
        );
      }

      if (
        attempt <
        ARTIFACT_RETRY_COUNT
      ) {
        await sleep(
          ARTIFACT_RETRY_DELAY_MS
        );
      }
    }

    /**
     * No Playwright report found.
     */
    if (
      !selectedArtifact ||
      !report
    ) {
      return NextResponse.json({
        success: true,

        testResultsImported: 0,

        message:
          workflowStatus === "completed"
            ? "GitHub workflow is completed, but no Playwright JSON artifact could be found."
            : "GitHub workflow has not finished or the Playwright artifact is not available yet.",

        runId,

        testRunId:
          testRun.id,

        githubRun: {
          id:
            githubRun.id,

          name:
            githubRun.name,

          status:
            githubRun.status,

          conclusion:
            githubRun.conclusion,

          branch:
            githubRun.head_branch,

          commitSha:
            githubRun.head_sha,

          event:
            githubRun.event,
        },

        availableArtifacts:
          artifacts.map(
            (artifact) => ({
              id:
                artifact.id,

              name:
                artifact.name,

              expired:
                artifact.expired,

              size:
                artifact.size_in_bytes,
            })
          ),
      });
    }

    /**
     * Extract Playwright test results.
     */
    const testResults =
      collectTests(
        report.suites
      );

    if (
      testResults.length === 0
    ) {
      return NextResponse.json({
        success: true,

        testResultsImported: 0,

        message:
          "Playwright JSON report was found, but it contains no executed test results.",

        runId,

        testRunId:
          testRun.id,

        artifact: {
          id:
            selectedArtifact.id,

          name:
            selectedArtifact.name,

          reportEntryName,
        },

        reportKeys:
          Object.keys(report),

        reportStats:
          report.stats || null,
      });
    }

    /**
     * Calculate final status from Playwright,
     * not temporary GitHub workflow state.
     */
    const finalStatus =
      calculateFinalStatus(
        testResults
      );

    /**
     * Save test results.
     */
    const updatedTestRun =
      await prisma.$transaction(
        async (tx) => {
          /**
           * Re-importing the same GitHub run should
           * replace its previous results.
           *
           * It does NOT delete results belonging
           * to other pushes/runs.
           */
          await tx.testResult.deleteMany({
            where: {
              testRunId:
                testRun.id,
            },
          });

          /**
           * Insert every Playwright test result.
           */
          await tx.testResult.createMany({
            data: testResults.map(
              (test) => ({
                testRunId:
                  testRun.id,

                testName:
                  test.testName,

                fileName:
                  test.fileName,

                status:
                  test.status,

                durationMs:
                  test.durationMs,

                error:
                  safeError(
                    test.error
                  ),
              })
            ),
          });

          /**
           * Update TestRun with the actual
           * Playwright result.
           */
          return tx.testRun.update({
            where: {
              id:
                testRun.id,
            },

            data: {
              status:
                finalStatus,
            },

            include: {
              testResults:
                true,
            },
          });
        }
      );

    /**
     * Successful response.
     */
    return NextResponse.json({
      success: true,

      message:
        "GitHub workflow and Playwright test results imported successfully.",

      testRun:
        updatedTestRun,

      githubRun: {
        id:
          githubRun.id,

        name:
          githubRun.name,

        status:
          githubRun.status,

        conclusion:
          githubRun.conclusion,

        branch:
          githubRun.head_branch,

        commitSha:
          githubRun.head_sha,

        event:
          githubRun.event,

        runStartedAt:
          githubRun.run_started_at,

        updatedAt:
          githubRun.updated_at,
      },

      artifact: {
        id:
          selectedArtifact.id,

        name:
          selectedArtifact.name,

        reportEntryName,
      },

      finalStatus,

      testResultsImported:
        testResults.length,
    });
  } catch (error) {
    console.error(
      "GitHub import error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Could not import GitHub workflow run",

        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}