import Link from "next/link";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RunDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const runId = Number(id);

  if (Number.isNaN(runId)) {
    return (
      <main className="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-section">
            <h1 className="section-title">Invalid Run ID</h1>
            <Link href="/">← Back to Dashboard</Link>
          </div>
        </div>
      </main>
    );
  }

  const run = await prisma.testRun.findUnique({
    where: {
      id: runId,
    },
    include: {
      testResults: true,
    },
  });

  if (!run) {
    return (
      <main className="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-section">
            <h1 className="section-title">
              Test Run Not Found
            </h1>

            <p className="section-description">
              The requested test run does not exist.
            </p>

            <Link href="/">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const passed = run.testResults.filter(
    (test) => test.status === "passed"
  ).length;

  const failed = run.testResults.filter(
    (test) =>
      test.status === "failed" ||
      test.status === "interrupted"
  ).length;

  const skipped = run.testResults.filter(
    (test) =>
      test.status === "skipped"
  ).length;

  return (
    <main className="dashboard">
      <div className="dashboard-container">

        {/* Header */}

        <header className="dashboard-header">
          <div>
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginBottom: "12px",
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              ← Back to Dashboard
            </Link>

            <h1 className="dashboard-title">
              Test Run Details
            </h1>

            <p className="dashboard-subtitle">
              {run.githubRunId}
            </p>
          </div>

          <span
            className={`status-badge ${
              run.status === "PASSED"
                ? "status-passed"
                : "status-failed"
            }`}
          >
            {run.status === "PASSED"
              ? "● PASSED"
              : "● FAILED"}
          </span>
        </header>

        {/* Run Information */}

        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              Run Information
            </h2>

            <p className="section-description">
              Details about this Playwright execution
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              padding: "24px",
            }}
          >
            <div>
              <div className="stat-label">
                Run ID
              </div>
              <strong>{run.githubRunId}</strong>
            </div>

            <div>
              <div className="stat-label">
                Developer
              </div>
              <strong>{run.developer}</strong>
            </div>

            <div>
              <div className="stat-label">
                Branch
              </div>
              <strong>
                {run.branch || "main"}
              </strong>
            </div>

            <div>
              <div className="stat-label">
                Event
              </div>
              <strong>
                {run.event || "unknown"}
              </strong>
            </div>

            <div>
              <div className="stat-label">
                Repository
              </div>
              <strong>{run.repository}</strong>
            </div>

            <div>
              <div className="stat-label">
                PR Number
              </div>
              <strong>
                {run.prNumber ?? "—"}
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
                  display: "inline-block",
                  marginTop: "5px",
                  padding: "8px 12px",
                  background: "#f1f5f9",
                  borderRadius: "7px",
                  fontSize: "12px",
                }}
              >
                {run.commitSha}
              </code>
            </div>
          </div>
        </div>

        {/* Test Statistics */}

        <div className="stats-grid">

          <div className="stat-card stat-blue">
            <div className="stat-label">
              Total Tests
            </div>

            <div className="stat-value">
              {run.testResults.length}
            </div>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-label">
              Passed
            </div>

            <div className="stat-value">
              {passed}
            </div>
          </div>

          <div className="stat-card stat-red">
            <div className="stat-label">
              Failed
            </div>

            <div className="stat-value">
              {failed}
            </div>
          </div>

          <div className="stat-card stat-yellow">
            <div className="stat-label">
              Skipped
            </div>

            <div className="stat-value">
              {skipped}
            </div>
          </div>

        </div>

        {/* Test Results */}

        <div className="dashboard-section">

          <div className="section-header">
            <h2 className="section-title">
              Test Results
            </h2>

            <p className="section-description">
              Individual Playwright test results
            </p>
          </div>

          {run.testResults.length === 0 ? (
            <div className="empty-state">
              No test results found.
            </div>
          ) : (
            run.testResults.map((test) => {

              const isFailed =
                test.status === "failed" ||
                test.status === "interrupted";

              return (
                <div
                  key={test.id}
                  style={{
                    padding: "20px 24px",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#111827",
                          marginBottom: "6px",
                        }}
                      >
                        {test.testName}
                      </div>

                      {test.fileName && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            fontFamily:
                              "monospace",
                          }}
                        >
                          {test.fileName}
                        </div>
                      )}
                    </div>

                    <span
                      className={`status-badge ${
                        test.status === "passed"
                          ? "status-passed"
                          : isFailed
                          ? "status-failed"
                          : ""
                      }`}
                    >
                      {test.status.toUpperCase()}
                    </span>

                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "14px",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    <span>
                      Duration:{" "}
                      {test.durationMs ?? 0} ms
                    </span>
                  </div>

                  {isFailed && test.error && (
                    <div
                      style={{
                        marginTop: "15px",
                        padding: "14px",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                        color: "#991b1b",
                        fontSize: "13px",
                        whiteSpace: "pre-wrap",
                        fontFamily:
                          "monospace",
                      }}
                    >
                      {test.error}
                    </div>
                  )}

                </div>
              );
            })
          )}

        </div>

      </div>
    </main>
  );
}