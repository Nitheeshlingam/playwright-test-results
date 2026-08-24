import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Filters from "./filters";

const COMMITS_PER_PAGE = 10;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const status = params.status;
  const requestedPage = Number(params.page || "1");

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  // ============================================================
  // FETCH ALL TEST RUNS
  // ============================================================

  const testRuns = await prisma.testRun.findMany({
    where: status
      ? {
          status,
        }
      : undefined,

    include: {
      testResults: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

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
        const developer =
          run.developer || "Unknown";

        if (!acc[developer]) {
          acc[developer] = {
            developer,
            failedRuns: 0,
            failedTests: 0,
          };
        }

        if (run.status === "FAILED") {
          acc[developer].failedRuns++;
        }

        acc[developer].failedTests +=
          run.testResults.filter(
            (test) =>
              test.status === "failed" ||
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
  // LATEST COMMIT
  // ============================================================

  const latestRun = testRuns[0];

  // ============================================================
  // FORMAT FINISHED TIME SAFELY
  // ============================================================

  function formatFinishedTime(
    value: Date | string | null | undefined
  ) {
    if (!value) {
      return "Not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  return (
    <main className="dashboard">
      <div className="dashboard-container">

        {/* =====================================================
            HEADER
        ====================================================== */}

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
            <div>
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
            </div>
          )}
        </header>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

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

        {/* =====================================================
            FILTER COMPONENT
        ====================================================== */}

        <Filters />

        {/* =====================================================
            FILTERS
        ====================================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2 className="section-title">
              Filters
            </h2>

            <p className="section-description">
              Filter commits by status, developer or branch
            </p>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "16px",
              padding: "20px 24px",
            }}
          >

            {/* STATUS */}

            <div>
              <label className="stat-label">
                Status
              </label>

              <div
                style={{
                  marginTop: "6px",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: "#f9fafb",
                }}
              >
                {status || "All statuses"}
              </div>
            </div>

            {/* DEVELOPER */}

            <div>
              <label className="stat-label">
                Developers
              </label>

              <div
                style={{
                  marginTop: "6px",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: "#f9fafb",
                }}
              >
                {developerStats.length} developers
              </div>
            </div>

            {/* BRANCH */}

            <div>
              <label className="stat-label">
                Branches
              </label>

              <div
                style={{
                  marginTop: "6px",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: "#f9fafb",
                }}
              >
                {
                  new Set(
                    testRuns.map(
                      (run) =>
                        run.branch || "main"
                    )
                  ).size
                }{" "}
                branches
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================
            TEST OVERVIEW
        ====================================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2 className="section-title">
              Test Overview
            </h2>

            <p className="section-description">
              Overall Playwright test execution statistics
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

        {/* =====================================================
            WHO IS BREAKING
        ====================================================== */}

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

            developerStats.map(
              (developer) => (

                <div
                  className="developer-row"
                  key={developer.developer}
                >

                  <div className="developer-name">
                    {developer.developer}
                  </div>

                  <div>
                    Failed Commits:{" "}
                    <span className="failed-number">
                      {developer.failedRuns}
                    </span>
                  </div>

                  <div>
                    Failed Tests:{" "}
                    <span className="failed-number">
                      {developer.failedTests}
                    </span>
                  </div>

                </div>
              )
            )
          )}

        </div>

        {/* =====================================================
            COMMITS
        ====================================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2 className="section-title">
              Commits
            </h2>

            <p className="section-description">
              Latest Playwright test results by commit
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

                    {/* COMMIT HEADER */}

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

                    {/* COMMIT DETAILS */}

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
                        🌿{" "}
                        {run.branch || "main"}
                      </span>

                      <span>
                        📌{" "}
                        {run.event || "unknown"}
                      </span>

                      <span>
                        🧪{" "}
                        {run.testResults.length} tests
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

                    </div>

                    {/* FINISHED TIME */}

                    <div
                      style={{
                        marginTop: "14px",
                        fontSize: "13px",
                        color: "#475569",
                      }}
                    >
                      🕒 Finished:{" "}
                      <strong>
                        {formatFinishedTime(
                          run.finishedTime
                        )}
                      </strong>
                    </div>

                    {/* FULL COMMIT SHA */}

                    <div
                      style={{
                        marginTop: "14px",
                        padding: "10px 12px",
                        background: "#f8fafc",
                        borderRadius: "8px",
                        fontSize: "12px",
                        color: "#475569",
                        fontFamily:
                          "monospace",
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

          {/* ===================================================
              PAGINATION
          ==================================================== */}

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

              {/* PREVIOUS */}

              {safePage > 1 ? (

                <Link
                  href={`/?page=${
                    safePage - 1
                  }${
                    status
                      ? `&status=${encodeURIComponent(
                          status
                        )}`
                      : ""
                  }`}
                  style={{
                    padding: "9px 14px",
                    border: "1px solid #d1d5db",
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
                    border: "1px solid #e5e7eb",
                    borderRadius: "7px",
                    color: "#cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  ← Previous
                </span>
              )}

              {/* PAGE NUMBERS */}

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

                    if (
                      totalPages <= 7
                    ) {
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
                      page -
                        previousPage >
                        1;

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
                          href={`/?page=${page}${
                            status
                              ? `&status=${encodeURIComponent(
                                  status
                                )}`
                              : ""
                          }`}
                          style={{
                            minWidth: "38px",
                            textAlign:
                              "center",
                            padding:
                              "9px 10px",
                            border:
                              "1px solid #d1d5db",
                            borderRadius:
                              "7px",
                            textDecoration:
                              "none",
                            background:
                              page ===
                              safePage
                                ? "#2563eb"
                                : "white",
                            color:
                              page ===
                              safePage
                                ? "white"
                                : "#374151",
                            fontSize:
                              "13px",
                            fontWeight: 600,
                          }}
                        >
                          {page}
                        </Link>

                      </span>
                    );
                  })}

              </div>

              {/* NEXT */}

              {safePage < totalPages ? (

                <Link
                  href={`/?page=${
                    safePage + 1
                  }${
                    status
                      ? `&status=${encodeURIComponent(
                          status
                        )}`
                      : ""
                  }`}
                  style={{
                    padding: "9px 14px",
                    border: "1px solid #d1d5db",
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
                    border: "1px solid #e5e7eb",
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

          {/* PAGINATION INFO */}

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
              startIndex +
                COMMITS_PER_PAGE,
              totalCommits
            )}{" "}
            of {totalCommits} commits
          </div>

        </div>

        {/* =====================================================
            LATEST COMMIT
        ====================================================== */}

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
                  {latestRun.branch ||
                    "main"}
                </strong>
              </div>

              <div>
                <div className="stat-label">
                  Event
                </div>

                <strong>
                  {latestRun.event ||
                    "unknown"}
                </strong>
              </div>

              <div>
                <div className="stat-label">
                  Finished
                </div>

                <strong>
                  {formatFinishedTime(
                    latestRun.finishedTime
                  )}
                </strong>
              </div>

              <div
                style={{
                  gridColumn:
                    "1 / -1",
                }}
              >

                <div className="stat-label">
                  Commit
                </div>

                <code
                  style={{
                    background:
                      "#f1f5f9",
                    padding:
                      "8px 10px",
                    borderRadius:
                      "6px",
                    display:
                      "inline-block",
                    fontSize: "12px",
                    wordBreak:
                      "break-all",
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