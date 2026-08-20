import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
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

    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // -------------------------------------------------
    // Get recent workflow runs
    // -------------------------------------------------

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=20`,
      {
        headers,
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Could not fetch GitHub workflow runs",
          details: data,
        },
        { status: response.status }
      );
    }

    // -------------------------------------------------
    // Only keep the Playwright workflow
    // -------------------------------------------------

    const playwrightRuns = (data.workflow_runs || []).filter(
      (run: any) =>
        run.name === "Playwright Authentication and Profile Tests"
    );

    // -------------------------------------------------
    // Import each Playwright run
    // -------------------------------------------------

    const importedRuns = [];

    for (const run of playwrightRuns) {
      try {
        const importResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/github/import`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              runId: run.id,
            }),
          }
        );

        const result = await importResponse.json();

        importedRuns.push({
          runId: run.id,
          success: importResponse.ok,
          result,
        });
      } catch (error) {
        importedRuns.push({
          runId: run.id,
          success: false,
          error:
            error instanceof Error
              ? error.message
              : String(error),
        });
      }
    }

    return NextResponse.json({
      success: true,
      workflow:
        "Playwright Authentication and Profile Tests",
      totalRunsFound: playwrightRuns.length,
      importedRuns,
    });
  } catch (error) {
    console.error("GitHub sync error:", error);

    return NextResponse.json(
      {
        error: "GitHub synchronization failed",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}