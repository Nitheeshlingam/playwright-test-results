// app/filters.tsx

"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

type FiltersProps = {
  developers: string[];
  testCases: string[];
  branches: string[];
};

export default function Filters({
  developers,
  testCases,
  branches,
}: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status =
    searchParams.get("status") || "";

  const developer =
    searchParams.get("developer") || "";

  const testCase =
    searchParams.get("testCase") || "";

  const from =
    searchParams.get("from") || "";

  const to =
    searchParams.get("to") || "";

  const branch =
    searchParams.get("branch") || "";

  function updateFilter(
    key: string,
    value: string
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    const query = params.toString();

    router.push(
      query ? `/?${query}` : "/"
    );
  }

  function clearFilters() {
    router.push("/");
  }

  return (
    <div className="dashboard-section">

      <div className="section-header">
        <h2 className="section-title">
          Filters
        </h2>

        <p className="section-description">
          Filter commits by date, test case,
          developer, status or branch
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          padding: "20px 24px",
        }}
      >

        {/* STATUS */}

        <div>
          <label className="stat-label">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              updateFilter(
                "status",
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "10px 12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              marginTop: "6px",
              background: "white",
            }}
          >
            <option value="">
              All statuses
            </option>

            <option value="PASSED">
              Passed
            </option>

            <option value="FAILED">
              Failed
            </option>
          </select>
        </div>

        {/* DEVELOPER */}

        <div>
          <label className="stat-label">
            Developer
          </label>

          <select
            value={developer}
            onChange={(e) =>
              updateFilter(
                "developer",
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "10px 12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              marginTop: "6px",
              background: "white",
            }}
          >
            <option value="">
              All developers
            </option>

            {developers.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* TEST CASE */}

        <div>
          <label className="stat-label">
            Test Case
          </label>

          <select
            value={testCase}
            onChange={(e) =>
              updateFilter(
                "testCase",
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "10px 12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              marginTop: "6px",
              background: "white",
            }}
          >
            <option value="">
              All test cases
            </option>

            {testCases.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* BRANCH */}

        <div>
          <label className="stat-label">
            Branch
          </label>

          <select
            value={branch}
            onChange={(e) =>
              updateFilter(
                "branch",
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "10px 12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              marginTop: "6px",
              background: "white",
            }}
          >
            <option value="">
              All branches
            </option>

            {branches.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* FROM DATE */}

        <div>
          <label className="stat-label">
            From Date
          </label>

          <input
            type="date"
            value={from}
            onChange={(e) =>
              updateFilter(
                "from",
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "10px 12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              marginTop: "6px",
              background: "white",
            }}
          />
        </div>

        {/* TO DATE */}

        <div>
          <label className="stat-label">
            To Date
          </label>

          <input
            type="date"
            value={to}
            onChange={(e) =>
              updateFilter(
                "to",
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "10px 12px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              marginTop: "6px",
              background: "white",
            }}
          />
        </div>

      </div>

      {/* CLEAR */}

      {(status ||
        developer ||
        testCase ||
        branch ||
        from ||
        to) && (
        <div
          style={{
            padding:
              "0 24px 20px",
          }}
        >
          <button
            type="button"
            onClick={clearFilters}
            style={{
              padding: "9px 16px",
              border:
                "1px solid #d1d5db",
              borderRadius: "7px",
              background: "white",
              cursor: "pointer",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}