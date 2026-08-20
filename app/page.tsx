import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Filters from "./filters";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const status = params.status;

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



  // -----------------------------
  // Overall statistics
  // -----------------------------

  const totalRuns = testRuns.length;

  const passedRuns = testRuns.filter(
    (run) => run.status === "PASSED"
  ).length;

  const failedRuns = testRuns.filter(
    (run) => run.status === "FAILED"
  ).length;

  const totalTests = testRuns.reduce(
    (total, run) => total + run.testResults.length,
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
      : Math.round((passedTests / totalTests) * 100);

  // -----------------------------
  // Developer failure statistics
  // -----------------------------

  const developerStats = Object.values(
    testRuns.reduce(
      (acc, run) => {
        const developer = run.developer || "Unknown";

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

        acc[developer].failedTests += run.testResults.filter(
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

  // -----------------------------
  // Failure reason statistics
  // -----------------------------

  const failureReasons = Object.values(
    testRuns
      .flatMap((run) => run.testResults)
      .filter(
        (test) =>
          test.status === "failed" ||
          test.status === "interrupted"
      )
      .reduce(
        (acc, test) => {
          const reason =
            test.error?.trim() || "Unknown failure";

          if (!acc[reason]) {
            acc[reason] = {
              reason,
              count: 0,
            };
          }

          acc[reason].count++;

          return acc;
        },
        {} as Record<
          string,
          {
            reason: string;
            count: number;
          }
        >
      )
  );

  // -----------------------------
  // Latest commit
  // -----------------------------

  const latestRun = testRuns[0];

  return (
    <main className="dashboard">
      <div className="dashboard-container">

        {/* =====================================
            HEADER
        ====================================== */}

        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Playwright QA Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Monitor test health, failures and developers
            </p>
          </div>

          {latestRun && (
            <div>
              <span
                className={`status-badge ${latestRun.status === "PASSED"
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

        {/* =====================================
            STAT CARDS
        ====================================== */}

        <div className="stats-grid">

          {/* Total Runs */}

          <div className="stat-card stat-blue">
            <div className="stat-label">
              Total Runs
            </div>

            <div className="stat-value">
              {totalRuns}
            </div>
          </div>

          {/* Passed Runs */}

          <div className="stat-card stat-green">
            <div className="stat-label">
              Passed Runs
            </div>

            <div className="stat-value">
              {passedRuns}
            </div>
          </div>

          {/* Failed Runs */}

          <div className="stat-card stat-red">
            <div className="stat-label">
              Failed Runs
            </div>

            <div className="stat-value">
              {failedRuns}
            </div>
          </div>

          {/* Pass Rate */}

          <div className="stat-card stat-yellow">
            <div className="stat-label">
              Pass Rate
            </div>

            <div className="stat-value">
              {passRate}%
            </div>
          </div>

        </div>

        {/* =====================================
            STAT CARDS
        ====================================== */}

        <div className="stats-grid">
          {/* Total Runs */}
          {/* Passed Runs */}
          {/* Failed Runs */}
          {/* Pass Rate */}
        </div>

        <Filters />


        {/* =====================================
            FILTERS
        ====================================== */}

        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Filters</h2>

            <p className="section-description">
              Filter test runs by status, developer or branch
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              padding: "20px 24px",
            }}
          >
            <div>
              <label className="stat-label">Status</label>

              <select
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  marginTop: "6px",
                }}
              >
                <option value="">All statuses</option>
                <option value="PASSED">Passed</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>

            <div>
              <label className="stat-label">Developer</label>

              <select
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  marginTop: "6px",
                }}
              >
                <option value="">All developers</option>

                {developerStats.map((developer) => (
                  <option
                    key={developer.developer}
                    value={developer.developer}
                  >
                    {developer.developer}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="stat-label">Branch</label>

              <select
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  marginTop: "6px",
                }}
              >
                <option value="">All branches</option>

                {[
                  ...new Set(
                    testRuns.map(
                      (run) => run.branch || "main"
                    )
                  ),
                ].map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>


        {/* =====================================
            TEST SUMMARY
        ====================================== */}

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

        {/* =====================================
            WHO IS BREAKING?
        ====================================== */}

        <div className="dashboard-section">

          <div className="section-header">
            <h2 className="section-title">
              Who Is Breaking?
            </h2>

            <p className="section-description">
              Developers associated with failed test runs
            </p>
          </div>

          {developerStats.length === 0 ? (

            <div className="empty-state">
              No developer failures 🎉
            </div>

          ) : (

            developerStats.map((developer) => (

              <div
                className="developer-row"
                key={developer.developer}
              >

                <div className="developer-name">
                  {developer.developer}
                </div>

                <div>
                  Failed Runs:{" "}
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

            ))

          )}

        </div>

        {/* =====================================
            WHY ARE TESTS BREAKING?
        ====================================== */}

        <div className="dashboard-section">

          <div className="section-header">
            <h2 className="section-title">
              Why Are Tests Breaking?
            </h2>

            <p className="section-description">
              Most common reasons for test failures
            </p>
          </div>

          {failureReasons.length === 0 ? (

            <div className="empty-state">
              No failures 🎉
            </div>

          ) : (

            failureReasons
              .sort((a, b) => b.count - a.count)
              .map((failure) => (

                <div
                  className="failure-row"
                  key={failure.reason}
                >

                  <div className="failure-reason">
                    {failure.reason}
                  </div>

                  <div className="failure-count">
                    {failure.count}
                  </div>

                </div>

              ))

          )}

        </div>

        {/* =====================================
            RECENT TEST RUNS
        ====================================== */}

        <div className="dashboard-section">

          <div className="section-header">
            <h2 className="section-title">
              Recent Test Runs
            </h2>

            <p className="section-description">
              Latest Playwright executions
            </p>
          </div>

          {testRuns.length === 0 ? (

            <div className="empty-state">
              No test runs available.
            </div>

          ) : (

            testRuns.map((run) => {

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
                    borderBottom: "1px solid #f1f5f9",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div className="recent-run-card">

                    {/* Run header */}

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
                          }}
                        >
                          {run.githubRunId}
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
                        className={`status-badge ${run.status === "PASSED"
                          ? "status-passed"
                          : "status-failed"
                          }`}
                      >
                        {run.status}
                      </span>

                    </div>

                    {/* Run details */}

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

                    </div>

                    {/* Commit */}

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
                      }}
                    >
                      Commit:{" "}
                      {run.commitSha}
                    </div>

                  </div>
                </Link>
              );
            })

          )}

        </div>

        {/* =====================================
            LATEST RUN INFORMATION
        ====================================== */}

        {
          latestRun && (

            <div
              className="dashboard-section"
              style={{
                marginBottom: "0",
              }}
            >

              <div className="section-header">

                <h2 className="section-title">
                  Latest Run
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
                    Run ID
                  </div>

                  <strong>
                    {latestRun.githubRunId}
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
                    }}
                  >
                    {latestRun.commitSha}
                  </code>
                </div>

              </div>

            </div>

          )
        }

      </div>
    </main>
  );
}