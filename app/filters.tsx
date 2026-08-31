"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "";

  function changeStatus(value: string) {
    if (value) {
      router.push(`/?status=${value}`);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2 className="section-title">
          Filters
        </h2>

        <p className="section-description">
          Filter test runs by status
        </p>
      </div>

      <div
        style={{
          padding: "20px 24px",
        }}
      >
        <label className="stat-label">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            changeStatus(e.target.value)
          }
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
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
    </div>
  );
}