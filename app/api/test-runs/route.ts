// app/api/test-runs/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.githubRunId) {
      return NextResponse.json(
        {
          error: "githubRunId is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!Array.isArray(body.testResults)) {
      return NextResponse.json(
        {
          error:
            "testResults must be an array",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedStatus =
      body.status === "PASSED"
        ? "PASSED"
        : "FAILED";

    const startedAt = body.startedAt
      ? new Date(body.startedAt)
      : new Date();

    const safeStartedAt =
      Number.isNaN(startedAt.getTime())
        ? new Date()
        : startedAt;

    const testRun =
      await prisma.testRun.upsert({
        where: {
          githubRunId: String(
            body.githubRunId
          ),
        },

        update: {
          commitSha:
            body.commitSha || "",

          developer:
            body.developer ||
            "Unknown",

          branch:
            body.branch || null,

          status:
            normalizedStatus,

          event:
            body.event || null,

          repository:
            body.repository || "",

          startedAt:
            safeStartedAt,

          testResults: {
            deleteMany: {},

            create:
              body.testResults.map(
                (test: any) => ({
                  testName:
                    test.testName ||
                    "Unknown test",

                  fileName:
                    test.fileName ||
                    null,

                  status:
                    test.status ||
                    "unknown",

                  durationMs:
                    test.durationMs ||
                    0,

                  error:
                    test.error ||
                    null,

                  screenshot:
                    test.screenshot ||
                    null,

                  video:
                    test.video ||
                    null,

                  trace:
                    test.trace ||
                    null,
                })
              ),
          },
        },

        create: {
          githubRunId: String(
            body.githubRunId
          ),

          commitSha:
            body.commitSha || "",

          developer:
            body.developer ||
            "Unknown",

          branch:
            body.branch || null,

          status:
            normalizedStatus,

          event:
            body.event || null,

          repository:
            body.repository || "",

          startedAt:
            safeStartedAt,

          testResults: {
            create:
              body.testResults.map(
                (test: any) => ({
                  testName:
                    test.testName ||
                    "Unknown test",

                  fileName:
                    test.fileName ||
                    null,

                  status:
                    test.status ||
                    "unknown",

                  durationMs:
                    test.durationMs ||
                    0,

                  error:
                    test.error ||
                    null,

                  screenshot:
                    test.screenshot ||
                    null,

                  video:
                    test.video ||
                    null,

                  trace:
                    test.trace ||
                    null,
                })
              ),
          },
        },

        include: {
          testResults: true,
        },
      });

    return NextResponse.json(
      testRun,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "CREATE TEST RUN ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Could not create test run",

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