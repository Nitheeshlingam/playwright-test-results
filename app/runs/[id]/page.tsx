import Link from "next/link";
import { prisma } from "@/lib/prisma";

function getTestId(name: string) {
  if (name.trim().toLowerCase() === "authenticate") return "authenticate";
  const match = name.trim().match(/^([A-Za-z0-9-]+)/);
  return match ? match[1] : name.trim();
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CommitDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const runId = Number(id);

  if (Number.isNaN(runId)) {
    return (
      <main className="dashboard">
        <div className="dashboard-container">

          <div className="dashboard-section">

            <h1 className="section-title">
              Invalid Commit ID
            </h1>

            <Link href="/">
              ← Back to Dashboard
            </Link>

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
              Commit Not Found
            </h1>

            <p className="section-description">
              The requested commit does not exist.
            </p>

            <Link href="/">
              ← Back to Dashboard
            </Link>

          </div>

        </div>
      </main>
    );
  }

  // =====================================================
  // TEST STATISTICS
  // =====================================================

  const passed = run.testResults.filter(
    (test) => test.status === "passed"
  ).length;

  const failed = run.testResults.filter(
    (test) =>
      test.status === "failed" ||
      test.status === "interrupted"
  ).length;

  const skipped = run.testResults.filter(
    (test) => test.status === "skipped"
  ).length;

  // =====================================================
  // HISTORICAL TEST FAILURE RATES
  // =====================================================

  const runTestIds = Array.from(new Set(run.testResults.map(t => getTestId(t.testName))));
  
  const historicalResults = await prisma.testResult.findMany({
    where: {
      OR: runTestIds.map(id => 
        id === "authenticate" 
          ? { testName: id } 
          : { testName: { startsWith: id } }
      )
    },
    select: {
      testName: true,
      status: true,
    }
  });

  const historicalStats = new Map<string, { total: number; failed: number }>();
  
  for (const tr of historicalResults) {
    const id = getTestId(tr.testName);
    if (!historicalStats.has(id)) {
      historicalStats.set(id, { total: 0, failed: 0 });
    }
    const stat = historicalStats.get(id)!;
    stat.total++;
    if (tr.status === "failed" || tr.status === "interrupted") {
      stat.failed++;
    }
  }

  return (
    <main className="dashboard">
      <div className="dashboard-container">

        {/* =====================================================
            HEADER
        ====================================================== */}

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
              Commit Details
            </h1>

            <p className="dashboard-subtitle">
              {run.commitSha}
            </p>

          </div>

          <span
            className={`status-badge ${
              run.status === "PASSED"
                ? "status-passed"
                : run.status === "FAILED"
                ? "status-failed"
                : ""
            }`}
          >
            {run.status === "PASSED"
              ? "● PASSED"
              : run.status === "FAILED"
              ? "● FAILED"
              : "● RUNNING"}
          </span>

        </header>

        {/* =====================================================
            COMMIT INFORMATION
        ====================================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2 className="section-title">
              Commit Information
            </h2>

            <p className="section-description">
              Details about this Playwright commit
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

            {/* Commit */}

            <div>
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
                  fontFamily: "monospace",
                }}
              >
                {run.commitSha}
              </code>
            </div>

            {/* Developer */}

            <div>
              <div className="stat-label">
                Developer
              </div>

              <strong>
                {run.developer}
              </strong>
            </div>

            {/* Branch */}

            <div>
              <div className="stat-label">
                Branch
              </div>

              <strong>
                {run.branch || "main"}
              </strong>
            </div>

            {/* Event */}

            <div>
              <div className="stat-label">
                Event
              </div>

              <strong>
                {run.event || "unknown"}
              </strong>
            </div>

            {/* Repository */}

            <div>
              <div className="stat-label">
                Repository
              </div>

              <strong>
                {run.repository}
              </strong>
            </div>

            {/* PR */}

            <div>
              <div className="stat-label">
                PR Number
              </div>

              <strong>
                {run.prNumber ?? "—"}
              </strong>
            </div>

            {/* GitHub Run ID */}

            <div>
              <div className="stat-label">
                GitHub Run ID
              </div>

              <strong>
                {run.githubRunId}
              </strong>
            </div>

          </div>

        </div>

        {/* =====================================================
            TEST STATISTICS
        ====================================================== */}

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

        {/* =====================================================
            TEST RESULTS
        ====================================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2 className="section-title">
              Test Results
            </h2>

            <p className="section-description">
              Playwright tests for this commit
            </p>

          </div>

          {run.testResults.length === 0 ? (

            <div className="empty-state">
              No test results found.
            </div>

          ) : (

            run.testResults.map((test) => {

              const isPassed =
                test.status === "passed";

              const isFailed =
                test.status === "failed" ||
                test.status === "interrupted";

              const isSkipped =
                test.status === "skipped";

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
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >

                    {/* Test information */}

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

                    {/* Test status */}

                    <span
                      className={`status-badge ${
                        isPassed
                          ? "status-passed"
                          : isFailed
                          ? "status-failed"
                          : isSkipped
                          ? "status-skipped"
                          : ""
                      }`}
                    >
                      {isPassed
                        ? "PASSED"
                        : isFailed
                        ? "FAILED"
                        : isSkipped
                        ? "SKIPPED"
                        : test.status.toUpperCase()}
                    </span>

                  </div>

                  {/* Duration */}

                  <div
                    style={{
                      marginTop: "14px",
                      fontSize: "13px",
                      color: "#64748b",
                    }}
                  >
                    Duration:{" "}
                    {test.durationMs ?? 0} ms
                  </div>

                </div>
              );

            })

          )}

        </div>

        {/* =====================================================
            TEST FAILURE PERCENTAGES
        ====================================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2 className="section-title">
              Test Case Failure Rates
            </h2>

            <p className="section-description">
              Historical failure percentage for each test case
            </p>

          </div>

          {runTestIds.length === 0 ? (
            
            <div className="empty-state">
              No test cases found.
            </div>

          ) : (

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "16px",
                padding: "20px 24px",
              }}
            >
              {runTestIds.map(id => {
                const stats = historicalStats.get(id) || { total: 0, failed: 0 };
                const percent = stats.total === 0 ? 0 : Math.round((stats.failed / stats.total) * 100);
                
                return (
                  <div key={id} style={{
                    padding: "16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    background: "#f9fafb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ fontWeight: 600, color: "#1f2937", wordBreak: "break-all", paddingRight: "10px" }}>
                      {id}
                    </div>
                    <div style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: percent > 50 ? "#dc2626" : percent > 0 ? "#d97706" : "#16a34a"
                    }}>
                      {percent}%
                    </div>
                  </div>
                )
              })}
            </div>

          )}

        </div>

      </div>
    </main>
  );
}