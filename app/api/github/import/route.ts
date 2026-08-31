import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import AdmZip from "adm-zip";

export async function POST(request: Request) {
  try {
    // =====================================================
    // 1. READ REQUEST
    // =====================================================

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

    // =====================================================
    // 2. GITHUB ENVIRONMENT VARIABLES
    // =====================================================

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

    // =====================================================
    // 3. GITHUB HEADERS
    // =====================================================

    const githubHeaders = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // =====================================================
    // 4. FETCH GITHUB WORKFLOW RUN
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
    // 5. INITIAL STATUS
    //
    // IMPORTANT:
    // There is NO RUNNING status anymore.
    //
    // We use the GitHub conclusion as the initial value.
    // Playwright results will determine the final value
    // later.
    // =====================================================

    let status: "PASSED" | "FAILED";

    if (githubRun.conclusion === "success") {
      status = "PASSED";
    } else {
      status = "FAILED";
    }

    // =====================================================
    // 6. CREATE / UPDATE TEST RUN
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

    branch:
      githubRun.head_branch || null,

    status,

    event:
      githubRun.event || null,

    repository:
      githubRun.repository?.full_name ||
      `${owner}/${repo}`,

    // Actual GitHub workflow execution time
    startedAt: githubRun.run_started_at
      ? new Date(githubRun.run_started_at)
      : githubRun.created_at
      ? new Date(githubRun.created_at)
      : new Date(),
  },

  create: {
    githubRunId: String(githubRun.id),

    commitSha: githubRun.head_sha,

    developer:
      githubRun.actor?.login ||
      githubRun.triggering_actor?.login ||
      "Unknown",

    branch:
      githubRun.head_branch || null,

    status,

    event:
      githubRun.event || null,

    repository:
      githubRun.repository?.full_name ||
      `${owner}/${repo}`,

    // Actual GitHub workflow execution time
    startedAt: githubRun.run_started_at
      ? new Date(githubRun.run_started_at)
      : githubRun.created_at
      ? new Date(githubRun.created_at)
      : new Date(),
  },
});

    // =====================================================
    // 7. FETCH GITHUB ARTIFACTS
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
    // 8. FIND PLAYWRIGHT RESULTS ARTIFACT
    // =====================================================

    const artifact = artifactsData.artifacts?.find(
      (item: any) =>
        item.name === "playwright-results" &&
        item.expired === false
    );

    // =====================================================
    // 9. IF PLAYWRIGHT ARTIFACT DOES NOT EXIST
    //
    // Use GitHub workflow conclusion.
    // =====================================================

    if (!artifact) {
      await prisma.testRun.update({
        where: {
          id: testRun.id,
        },

        data: {
          status,
        },
      });

      return NextResponse.json({
        success: true,

        message:
          "GitHub run imported, but playwright-results artifact was not found.",

        testRun: {
          ...testRun,
          status,
        },

        githubRun: {
          id: githubRun.id,
          name: githubRun.name,
          status: githubRun.status,
          conclusion: githubRun.conclusion,
          branch: githubRun.head_branch,
          commitSha: githubRun.head_sha,
        },

        artifacts: artifactsData.artifacts || [],
      });
    }

    // =====================================================
    // 10. DOWNLOAD PLAYWRIGHT ARTIFACT ZIP
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

    // =====================================================
    // 11. CONVERT ZIP TO BUFFER
    // =====================================================

    const artifactBuffer = Buffer.from(
      await artifactResponse.arrayBuffer()
    );

    // =====================================================
    // 12. READ results.json FROM ZIP
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

    // =====================================================
    // 13. PARSE PLAYWRIGHT JSON
    // =====================================================

    const resultsJson = resultsEntry
      .getData()
      .toString("utf8");

    const playwrightReport = JSON.parse(resultsJson);

    // =====================================================
    // 14. TEST RESULT TYPE
    // =====================================================

    const testResults: {
      testName: string;
      fileName: string | null;
      status: string;
      durationMs: number;
      error: string | null;
    }[] = [];

    // =====================================================
    // 15. COLLECT PLAYWRIGHT TESTS
    // =====================================================

    function collectTests(
      suites: any[],
      results: typeof testResults = []
    ) {
      for (const suite of suites || []) {
        const fileName = suite.file || null;

        // -------------------------------------------------
        // Playwright specs
        // -------------------------------------------------

        for (const spec of suite.specs || []) {
          for (const test of spec.tests || []) {
            for (const result of test.results || []) {
              results.push({
                testName:
                  spec.title ||
                  test.title ||
                  "Unknown test",

                fileName,

                status:
                  result.status || "unknown",

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

        // -------------------------------------------------
        // Nested suites
        // -------------------------------------------------

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
    // 16. DETERMINE FINAL STATUS FROM PLAYWRIGHT RESULTS
    //
    // ONLY TWO POSSIBLE VALUES:
    //
    // PASSED
    // FAILED
    // =====================================================

    const hasFailedTests = testResults.some(
      (test) =>
        test.status === "failed" ||
        test.status === "timedOut" ||
        test.status === "interrupted"
    );

    if (hasFailedTests) {
      status = "FAILED";
    } else {
      status = "PASSED";
    }

    // =====================================================
    // 17. REMOVE OLD TEST RESULTS
    // =====================================================

    await prisma.testResult.deleteMany({
      where: {
        testRunId: testRun.id,
      },
    });

    // =====================================================
    // 18. INSERT NEW TEST RESULTS
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
    // 19. SAVE FINAL STATUS TO DATABASE
    //
    // THIS IS THE IMPORTANT PART.
    //
    // The first upsert may have stored FAILED/PASSED
    // based on GitHub.
    //
    // Now we overwrite it with the actual Playwright
    // result.
    // =====================================================

    const updatedTestRun =
      await prisma.testRun.update({
        where: {
          id: testRun.id,
        },

        data: {
          status,
        },

        include: {
          testResults: true,
        },
      });

    // =====================================================
    // 20. RETURN RESULT
    // =====================================================

    return NextResponse.json({
      success: true,

      message:
        "GitHub workflow and Playwright results imported successfully.",

      testRun: updatedTestRun,

      githubRun: {
        id: githubRun.id,

        name: githubRun.name,

        status: githubRun.status,

        conclusion:
          githubRun.conclusion,

        branch:
          githubRun.head_branch,

        commitSha:
          githubRun.head_sha,
      },

      artifact: {
        id: artifact.id,

        name: artifact.name,
      },

      finalStatus: status,

      testResultsImported:
        testResults.length,
    });
  } catch (error) {
    // =====================================================
    // ERROR HANDLING
    // =====================================================

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