import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import AdmZip from "adm-zip";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const runId = body.runId;

    if (!runId) {
      return NextResponse.json(
        {
          error: "runId is required",
        },
        { status: 400 }
      );
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json(
        {
          error: "GitHub environment variables are not configured",
        },
        { status: 500 }
      );
    }

    const githubHeaders = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // =====================================================
    // 1. FETCH GITHUB WORKFLOW RUN
    // =====================================================

    const githubResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
      {
        headers: githubHeaders,
        cache: "no-store",
      }
    );

    const githubRun = await githubResponse.json();

    if (!githubResponse.ok) {
      return NextResponse.json(
        {
          error: "Could not fetch GitHub workflow run",
          details: githubRun,
        },
        {
          status: githubResponse.status,
        }
      );
    }

    // =====================================================
    // 2. CONVERT GITHUB STATUS
    // =====================================================

    let status = "RUNNING";

    if (githubRun.conclusion === "success") {
      status = "PASSED";
    }

    if (
      githubRun.conclusion === "failure" ||
      githubRun.conclusion === "cancelled" ||
      githubRun.conclusion === "timed_out"
    ) {
      status = "FAILED";
    }

    // =====================================================
    // 3. CREATE / UPDATE TEST RUN
    // =====================================================

    const testRun = await prisma.testRun.upsert({
      where: {
        githubRunId: String(githubRun.id),
      },

      update: {
        commitSha: githubRun.head_sha,

        developer:
          githubRun.actor?.login ||
          githubRun.triggering_actor?.login ||
          "Unknown",

        branch: githubRun.head_branch || null,

        status,

        event: githubRun.event || null,

        repository:
          githubRun.repository?.full_name ||
          `${owner}/${repo}`,
      },

      create: {
        githubRunId: String(githubRun.id),

        commitSha: githubRun.head_sha,

        developer:
          githubRun.actor?.login ||
          githubRun.triggering_actor?.login ||
          "Unknown",

        branch: githubRun.head_branch || null,

        status,

        event: githubRun.event || null,

        repository:
          githubRun.repository?.full_name ||
          `${owner}/${repo}`,
      },
    });

    // =====================================================
    // 4. FETCH GITHUB ARTIFACTS
    // =====================================================

    const artifactsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
      {
        headers: githubHeaders,
        cache: "no-store",
      }
    );

    const artifactsData = await artifactsResponse.json();

    if (!artifactsResponse.ok) {
      return NextResponse.json(
        {
          error: "Could not fetch GitHub artifacts",
          details: artifactsData,
        },
        {
          status: artifactsResponse.status,
        }
      );
    }

    // =====================================================
    // 5. FIND PLAYWRIGHT RESULTS ARTIFACT
    // =====================================================

    const artifact = artifactsData.artifacts?.find(
      (item: any) =>
        item.name === "playwright-results" &&
        item.expired === false
    );

    if (!artifact) {
      return NextResponse.json({
        success: true,
        message:
          "GitHub run imported, but playwright-results artifact was not found.",
        testRun,
        githubRun,
        artifacts: artifactsData.artifacts || [],
      });
    }

    // =====================================================
    // 6. DOWNLOAD ARTIFACT ZIP
    // =====================================================

    const artifactResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/artifacts/${artifact.id}/zip`,
      {
        headers: githubHeaders,
        cache: "no-store",
      }
    );

    if (!artifactResponse.ok) {
      const errorText = await artifactResponse.text();

      return NextResponse.json(
        {
          error: "Could not download Playwright artifact",
          details: errorText,
        },
        {
          status: artifactResponse.status,
        }
      );
    }

    const artifactBuffer = Buffer.from(
      await artifactResponse.arrayBuffer()
    );

    // =====================================================
    // 7. READ results.json FROM ZIP
    // =====================================================

    const zip = new AdmZip(artifactBuffer);

    const resultsEntry = zip
      .getEntries()
      .find((entry) =>
        entry.entryName.endsWith("results.json")
      );

    if (!resultsEntry) {
      return NextResponse.json(
        {
          error:
            "playwright-results artifact does not contain results.json",
        },
        { status: 500 }
      );
    }

    const resultsJson = resultsEntry
      .getData()
      .toString("utf8");

    const playwrightReport = JSON.parse(resultsJson);

    // =====================================================
    // 8. CONVERT PLAYWRIGHT RESULTS
    // =====================================================

    const testResults: {
      testName: string;
      fileName: string | null;
      status: string;
      durationMs: number;
      error: string | null;
    }[] = [];

    function collectTests(
      suites: any[],
      results: typeof testResults = []
    ) {
      for (const suite of suites || []) {
        const fileName = suite.file || null;

        // Playwright specs
        for (const spec of suite.specs || []) {
          for (const test of spec.tests || []) {
            for (const result of test.results || []) {
              results.push({
                testName:
                  spec.title ||
                  test.title ||
                  "Unknown test",

                fileName,

                status: result.status || "unknown",

                durationMs:
                  result.duration || 0,

                error:
                  result.error?.message ||
                  result.errors?.[0]?.message ||
                  null,
              });
            }
          }
        }

        // Nested suites
        collectTests(
          suite.suites,
          results
        );
      }

      return results;
    }

    collectTests(
      playwrightReport.suites,
      testResults
    );

    // =====================================================
    // 9. REMOVE OLD TEST RESULTS
    // =====================================================

    await prisma.testResult.deleteMany({
      where: {
        testRunId: testRun.id,
      },
    });

    // =====================================================
    // 10. INSERT TEST RESULTS
    // =====================================================

    if (testResults.length > 0) {
      await prisma.testResult.createMany({
        data: testResults.map((test) => ({
          testRunId: testRun.id,

          testName: test.testName,

          fileName: test.fileName,

          status: test.status,

          durationMs: test.durationMs,

          error: test.error,
        })),
      });
    }

    // =====================================================
    // 11. RETURN RESULT
    // =====================================================

    return NextResponse.json({
      success: true,

      message:
        "GitHub workflow and Playwright results imported successfully.",

      testRun,

      githubRun: {
        id: githubRun.id,
        name: githubRun.name,
        status: githubRun.status,
        conclusion: githubRun.conclusion,
        branch: githubRun.head_branch,
        commitSha: githubRun.head_sha,
      },

      artifact: {
        id: artifact.id,
        name: artifact.name,
      },

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