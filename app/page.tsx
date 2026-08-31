// app/page.tsx

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Filters from "./filters";

const COMMITS_PER_PAGE = 10;

function formatRunDate(value: Date | string | null | undefined) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    developer?: string;
    testCase?: string;
    from?: string;
    to?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const status = params.status || "";
  const developer = params.developer || "";
  const testCase = params.testCase || "";
  const from = params.from || "";
  const to = params.to || "";

  const requestedPage = Number(params.page || "1");

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const where: {
    status?: string;
    developer?: string;
    startedAt?: {
      gte?: Date;
      lt?: Date;
    };
  } = {};

  if (status === "PASSED" || status === "FAILED") {
    where.status = status;
  }

  if (developer) {
    where.developer = developer;
  }

  if (from) {
    const fromDate = new Date(`${from}T00:00:00.000Z`);

    if (!Number.isNaN(fromDate.getTime())) {
      where.startedAt = {
        ...where.startedAt,
        gte: fromDate,
      };
    }
  }

  if (to) {
    const toDate = new Date(`${to}T00:00:00.000Z`);
    toDate.setUTCDate(toDate.getUTCDate() + 1);

    if (!Number.isNaN(toDate.getTime())) {
      where.startedAt = {
        ...where.startedAt,
        lt: toDate,
      };
    }
  }

  const testRuns = await prisma.testRun.findMany({
    where,
    include: {
      testResults: true,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  const allRuns = await prisma.testRun.findMany({
    include: {
      testResults: true,
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  const developerOptions = [
    ...new Set(
      allRuns
        .map((run) => run.developer)
        .filter(Boolean)
    ),
  ].sort();

  const testCaseOptions = [
    ...new Set(
      allRuns
        .flatMap((run) =>
          run.testResults.map((test) => test.testName)
        )
        .filter(Boolean)
    ),
  ].sort();

  const branchOptions = [
    ...new Set(
      allRuns.map((run) => run.branch || "main")
    ),
  ].sort();

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalCommits = testRuns.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalCommits / COMMITS_PER_PAGE)
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safePage - 1) * COMMITS_PER_PAGE;

  const paginatedRuns = testRuns.slice(
    startIndex,
    startIndex + COMMITS_PER_PAGE
  );

  // ============================================================
  // OVERALL STATISTICS
  // ============================================================

  const totalRuns = testRuns.length;

  const passedRuns = testRuns.filter(
    (run) => run.status === "PASSED"
  ).length;

  const failedRuns = testRuns.filter(
    (run) => run.status === "FAILED"
  ).length;

  const totalTests = testRuns.reduce(
    (total, run) =>
      total + run.testResults.length,
    0
  );

  const failedTests = testRuns.reduce(
    (total, run) =>
      total +
      run.testResults.filter(
        (test) =>
          test.status === "failed" ||
          test.status === "timedOut" ||
          test.status === "interrupted"
      ).length,
    0
  );

  const passedTests = testRuns.reduce(
    (total, run) =>
      total +
      run.testResults.filter(
        (test) => test.status === "passed"
      ).length,
    0
  );

  const passRate =
    totalTests === 0
      ? 0
      : Math.round(
          (passedTests / totalTests) * 100
        );

  // ============================================================
  // DEVELOPER STATISTICS
  // ============================================================

  const developerStats = Object.values(
    testRuns.reduce(
      (acc, run) => {
        const name =
          run.developer || "Unknown";

        if (!acc[name]) {
          acc[name] = {
            developer: name,
            failedRuns: 0,
            failedTests: 0,
          };
        }

        if (run.status === "FAILED") {
          acc[name].failedRuns++;
        }

        acc[name].failedTests +=
          run.testResults.filter(
            (test) =>
              test.status === "failed" ||
              test.status === "timedOut" ||
              test.status === "interrupted"
          ).length;

        return acc;
      },
      {} as Record<
        string,
        {
          developer: string;
          failedRuns: number;
          failedTests: number;
        }
      >
    )
  );

  // ============================================================
  // SELECTED TEST CASE STATISTICS
  // ============================================================

  const selectedTestResults = testCase
    ? testRuns.flatMap((run) =>
        run.testResults
          .filter(
            (test) =>
              test.testName === testCase
          )
          .map((test) => ({
            ...test,
            runDate: run.startedAt,
          }))
      )
    : [];

  const selectedTestTotal =
    selectedTestResults.length;

  const selectedTestPassed =
    selectedTestResults.filter(
      (test) => test.status === "passed"
    ).length;

  const selectedTestFailed =
    selectedTestResults.filter(
      (test) =>
        test.status === "failed" ||
        test.status === "timedOut" ||
        test.status === "interrupted"
    ).length;

  const selectedFailureRate =
    selectedTestTotal === 0
      ? 0
      : Math.round(
          (selectedTestFailed /
            selectedTestTotal) *
            100
        );

  // ============================================================
  // DAILY FAILURE RATIO
  // ============================================================

  const dailyStats = Object.values(
    selectedTestResults.reduce(
      (acc, result) => {
        const date = result.runDate
          .toISOString()
          .slice(0, 10);

        if (!acc[date]) {
          acc[date] = {
            date,
            total: 0,
            failed: 0,
          };
        }

        acc[date].total++;

        if (
          result.status === "failed" ||
          result.status === "timedOut" ||
          result.status === "interrupted"
        ) {
          acc[date].failed++;
        }

        return acc;
      },
      {} as Record<
        string,
        {
          date: string;
          total: number;
          failed: number;
        }
      >
    )
  ).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const averageFailureRate =
    dailyStats.length === 0
      ? 0
      : Math.round(
          dailyStats.reduce(
            (sum, day) =>
              sum +
              (day.total === 0
                ? 0
                : (day.failed /
                    day.total) *
                  100),
            0
          ) / dailyStats.length
        );

  const latestRun = testRuns[0];

  function createPageUrl(page: number) {
    const query = new URLSearchParams();

    if (status) query.set("status", status);
    if (developer) query.set("developer", developer);
    if (testCase) query.set("testCase", testCase);
    if (from) query.set("from", from);
    if (to) query.set("to", to);

    if (page > 1) {
      query.set("page", String(page));
    }

    const queryString = query.toString();

    return queryString
      ? `/?${queryString}`
      : "/";
  }

  return (
    <main className="dashboard">
      <div className="dashboard-container">

        {/* HEADER */}

        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Playwright QA Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Monitor test health, commits and developers
            </p>
          </div>

          {latestRun && (
            <span
              className={`status-badge ${
                latestRun.status === "PASSED"
                  ? "status-passed"
                  : "status-failed"
              }`}
            >
              {latestRun.status === "PASSED"
                ? "● HEALTHY"
                : "● FAILING"}
            </span>
          )}
        </header>

        {/* STAT CARDS */}

        <div className="stats-grid">

          <div className="stat-card stat-blue">
            <div className="stat-label">
              Total Commits
            </div>

            <div className="stat-value">
              {totalRuns}
            </div>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-label">
              Passed Commits
            </div>

            <div className="stat-value">
              {passedRuns}
            </div>
          </div>

          <div className="stat-card stat-red">
            <div className="stat-label">
              Failed Commits
            </div>

            <div className="stat-value">
              {failedRuns}
            </div>
          </div>

          <div className="stat-card stat-yellow">
            <div className="stat-label">
              Pass Rate
            </div>

            <div className="stat-value">
              {passRate}%
            </div>
          </div>

        </div>

        {/* FILTERS */}

        <Filters
          developers={developerOptions}
          testCases={testCaseOptions}
          branches={branchOptions}
        />

        {/* TEST CASE ANALYTICS */}

        {testCase && (
          <div className="dashboard-section">

            <div className="section-header">
              <h2 className="section-title">
                Test Case Analytics
              </h2>

              <p className="section-description">
                Failure analysis for{" "}
                <strong>{testCase}</strong>
              </p>
            </div>

            <div className="stats-grid">

              <div className="stat-card stat-blue">
                <div className="stat-label">
                  Total Executions
                </div>

                <div className="stat-value">
                  {selectedTestTotal}
                </div>
              </div>

              <div className="stat-card stat-green">
                <div className="stat-label">
                  Passed
                </div>

                <div className="stat-value">
                  {selectedTestPassed}
                </div>
              </div>

              <div className="stat-card stat-red">
                <div className="stat-label">
                  Failed
                </div>

                <div className="stat-value">
                  {selectedTestFailed}
                </div>
              </div>

              <div className="stat-card stat-yellow">
                <div className="stat-label">
                  Failure Rate
                </div>

                <div className="stat-value">
                  {selectedFailureRate}%
                </div>
              </div>

            </div>

            <div
              style={{
                padding: "24px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <div className="stat-label">
                Average Daily Failure Rate
              </div>

              <strong
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontSize: "30px",
                  color: "#dc2626",
                }}
              >
                {averageFailureRate}%
              </strong>

              <p
                style={{
                  marginTop: "6px",
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                Average failure percentage across
                the selected dates.
              </p>
            </div>

            {/* DAILY BREAKDOWN */}

            {dailyStats.length > 0 && (
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    padding: "18px 24px",
                    fontWeight: 700,
                  }}
                >
                  Daily Failure Breakdown
                </div>

                {dailyStats.map((day) => {
                  const rate =
                    day.total === 0
                      ? 0
                      : Math.round(
                          (day.failed /
                            day.total) *
                            100
                        );

                  return (
                    <div
                      key={day.date}
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "1fr 1fr 1fr 1fr",
                        gap: "20px",
                        padding:
                          "15px 24px",
                        borderTop:
                          "1px solid #f1f5f9",
                        fontSize: "13px",
                      }}
                    >
                      <strong>
                        {day.date}
                      </strong>

                      <span>
                        Executions:{" "}
                        {day.total}
                      </span>

                      <span>
                        Failed:{" "}
                        {day.failed}
                      </span>

                      <span
                        style={{
                          color:
                            rate > 0
                              ? "#dc2626"
                              : "#16a34a",
                          fontWeight: 600,
                        }}
                      >
                        Failure Rate:{" "}
                        {rate}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TEST OVERVIEW */}

        <div className="dashboard-section">

          <div className="section-header">
            <h2 className="section-title">
              Test Overview
            </h2>

            <p className="section-description">
              Playwright test execution statistics
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "1px",
              background: "#e5e7eb",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "22px",
              }}
            >
              <div className="stat-label">
                Total Tests
              </div>

              <strong
                style={{
                  fontSize: "26px",
                  color: "#2563eb",
                }}
              >
                {totalTests}
              </strong>
            </div>

            <div
              style={{
                background: "white",
                padding: "22px",
              }}
            >
              <div className="stat-label">
                Passed Tests
              </div>

              <strong
                style={{
                  fontSize: "26px",
                  color: "#16a34a",
                }}
              >
                {passedTests}
              </strong>
            </div>

            <div
              style={{
                background: "white",
                padding: "22px",
              }}
            >
              <div className="stat-label">
                Failed Tests
              </div>

              <strong
                style={{
                  fontSize: "26px",
                  color: "#dc2626",
                }}
              >
                {failedTests}
              </strong>
            </div>
          </div>
        </div>

        {/* WHO IS BREAKING */}

        <div className="dashboard-section">

          <div className="section-header">
            <h2 className="section-title">
              Who Is Breaking?
            </h2>

            <p className="section-description">
              Developers associated with failed commits
            </p>
          </div>

          {developerStats.length === 0 ? (
            <div className="empty-state">
              No developer failures 🎉
            </div>
          ) : (
            developerStats.map((item) => (
              <div
                className="developer-row"
                key={item.developer}
              >
                <div className="developer-name">
                  {item.developer}
                </div>

                <div>
                  Failed Commits:{" "}
                  <span className="failed-number">
                    {item.failedRuns}
                  </span>
                </div>

                <div>
                  Failed Tests:{" "}
                  <span className="failed-number">
                    {item.failedTests}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* COMMITS */}

        <div className="dashboard-section">

          <div className="section-header">
            <h2 className="section-title">
              Commits
            </h2>

            <p className="section-description">
              Latest Playwright results by commit
            </p>
          </div>

          {paginatedRuns.length === 0 ? (
            <div className="empty-state">
              No commits available.
            </div>
          ) : (
            paginatedRuns.map((run) => {

              const runFailedTests =
                run.testResults.filter(
                  (test) =>
                    test.status === "failed" ||
                    test.status === "timedOut" ||
                    test.status === "interrupted"
                ).length;

              const runPassedTests =
                run.testResults.filter(
                  (test) =>
                    test.status === "passed"
                ).length;

              return (
                <Link
                  key={run.id}
                  href={`/runs/${run.id}`}
                  className="run-card-link"
                  style={{
                    display: "block",
                    padding: "22px 24px",
                    borderBottom:
                      "1px solid #f1f5f9",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div className="recent-run-card">

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#111827",
                            marginBottom: "6px",
                            fontFamily:
                              "monospace",
                          }}
                        >
                          {run.commitSha
                            ? run.commitSha.substring(
                                0,
                                10
                              )
                            : "Unknown commit"}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                          }}
                        >
                          {run.repository}
                        </div>
                      </div>

                      <span
                        className={`status-badge ${
                          run.status === "PASSED"
                            ? "status-passed"
                            : "status-failed"
                        }`}
                      >
                        {run.status === "PASSED"
                          ? "PASSED"
                          : "FAILED"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        marginTop: "18px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      <span>
                        👤 {run.developer}
                      </span>

                      <span>
                        🌿 {run.branch || "main"}
                      </span>

                      <span>
                        📌 {run.event || "unknown"}
                      </span>

                      <span>
                        🧪 {run.testResults.length} tests
                      </span>

                      <span
                        style={{
                          color: "#16a34a",
                          fontWeight: 600,
                        }}
                      >
                        ✓ {runPassedTests} passed
                      </span>

                      <span
                        style={{
                          color: "#dc2626",
                          fontWeight: 600,
                        }}
                      >
                        ✕ {runFailedTests} failed
                      </span>

                      <span>
                        🕒 {formatRunDate(run.startedAt)}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "14px",
                        padding: "10px 12px",
                        background: "#f8fafc",
                        borderRadius: "8px",
                        fontSize: "12px",
                        color: "#475569",
                        fontFamily: "monospace",
                        wordBreak: "break-all",
                      }}
                    >
                      Commit:{" "}
                      {run.commitSha ||
                        "Not available"}
                    </div>

                  </div>
                </Link>
              );
            })
          )}

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                padding: "24px",
                borderTop:
                  "1px solid #e5e7eb",
              }}
            >
              {safePage > 1 ? (
                <Link
                  href={createPageUrl(
                    safePage - 1
                  )}
                  style={{
                    padding: "9px 14px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "7px",
                    textDecoration: "none",
                    color: "#374151",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  ← Previous
                </Link>
              ) : (
                <span
                  style={{
                    padding: "9px 14px",
                    border:
                      "1px solid #e5e7eb",
                    borderRadius: "7px",
                    color: "#cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  ← Previous
                </span>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "6px",
                }}
              >
                {Array.from(
                  { length: totalPages },
                  (_, index) =>
                    index + 1
                )
                  .filter((page) => {
                    if (totalPages <= 7) {
                      return true;
                    }

                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(
                        page - safePage
                      ) <= 1
                    );
                  })
                  .map((page, index, pages) => {
                    const previousPage =
                      pages[index - 1];

                    const needsDots =
                      previousPage &&
                      page - previousPage > 1;

                    return (
                      <span
                        key={page}
                        style={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        {needsDots && (
                          <span
                            style={{
                              padding:
                                "9px 8px",
                              color:
                                "#64748b",
                            }}
                          >
                            ...
                          </span>
                        )}

                        <Link
                          href={createPageUrl(page)}
                          style={{
                            minWidth: "38px",
                            textAlign: "center",
                            padding: "9px 10px",
                            border:
                              "1px solid #d1d5db",
                            borderRadius: "7px",
                            textDecoration: "none",
                            background:
                              page === safePage
                                ? "#2563eb"
                                : "white",
                            color:
                              page === safePage
                                ? "white"
                                : "#374151",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          {page}
                        </Link>
                      </span>
                    );
                  })}
              </div>

              {safePage < totalPages ? (
                <Link
                  href={createPageUrl(
                    safePage + 1
                  )}
                  style={{
                    padding: "9px 14px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "7px",
                    textDecoration: "none",
                    color: "#374151",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Next →
                </Link>
              ) : (
                <span
                  style={{
                    padding: "9px 14px",
                    border:
                      "1px solid #e5e7eb",
                    borderRadius: "7px",
                    color: "#cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  Next →
                </span>
              )}
            </div>
          )}

          <div
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Showing{" "}
            {totalCommits === 0
              ? 0
              : startIndex + 1}{" "}
            –{" "}
            {Math.min(
              startIndex + COMMITS_PER_PAGE,
              totalCommits
            )}{" "}
            of {totalCommits} commits
          </div>
        </div>

        {/* LATEST COMMIT */}

        {latestRun && (
          <div
            className="dashboard-section"
            style={{
              marginBottom: "0",
            }}
          >
            <div className="section-header">
              <h2 className="section-title">
                Latest Commit
              </h2>

              <p className="section-description">
                Most recent Playwright execution
              </p>
            </div>

            <div
              style={{
                padding: "24px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, 1fr)",
                gap: "18px",
              }}
            >
              <div>
                <div className="stat-label">
                  Status
                </div>

                <strong>
                  {latestRun.status}
                </strong>
              </div>

              <div>
                <div className="stat-label">
                  Developer
                </div>

                <strong>
                  {latestRun.developer}
                </strong>
              </div>

              <div>
                <div className="stat-label">
                  Branch
                </div>

                <strong>
                  {latestRun.branch || "main"}
                </strong>
              </div>

              <div>
                <div className="stat-label">
                  Event
                </div>

                <strong>
                  {latestRun.event || "unknown"}
                </strong>
              </div>

              <div>
                <div className="stat-label">
                  Run Date
                </div>

                <strong>
                  {formatRunDate(
                    latestRun.startedAt
                  )}
                </strong>
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                }}
              >
                <div className="stat-label">
                  Commit
                </div>

                <code
                  style={{
                    background: "#f1f5f9",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    display: "inline-block",
                    fontSize: "12px",
                    wordBreak: "break-all",
                  }}
                >
                  {latestRun.commitSha ||
                    "Not available"}
                </code>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}