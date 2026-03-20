"use client";

import { F, FM } from "@/lib/data/billData";

const escoList = [
  {
    name: "Constellation Energy",
    phone: "1-855-465-1244",
    website: "constellation.com",
    type: "Fixed & Variable",
    green: true,
    note: "Nation's largest clean energy producer. Fixed-rate plans 12–36 months.",
  },
  {
    name: "Clearview Energy",
    phone: "1-888-257-8439",
    website: "clearviewenergy.com",
    type: "Fixed & Variable",
    green: true,
    note: "Competitive fixed rates. Supports sustainability through Shaw Institute.",
  },
  {
    name: "Verde Energy USA",
    phone: "1-800-388-3862",
    website: "verdeenergy.com",
    type: "Fixed & Variable",
    green: true,
    note: "100% renewable plans available. No cancellation fees on month-to-month.",
  },
  {
    name: "Public Power",
    phone: "1-888-354-4415",
    website: "publicpowercompany.com",
    type: "Fixed",
    green: false,
    note: "Simple fixed-rate plans. No hidden fees. Budget-friendly.",
  },
  {
    name: "Direct Energy",
    phone: "1-866-348-4194",
    website: "directenergy.com",
    type: "Fixed & Variable",
    green: true,
    note: "4M+ customers nationwide. Free usage tools and rewards program.",
  },
  {
    name: "David Energy",
    phone: "914-909-3940",
    website: "davidenergy.com",
    type: "Variable",
    green: true,
    note: "AI-powered load management. Smart-grid optimized pricing.",
  },
  {
    name: "Zone One Energy",
    phone: "347-620-7283",
    website: "zone1energy.com",
    type: "Fixed",
    green: false,
    note: "NYC-based ESCO. Focused on Con Edison residential territory.",
  },
];

export default function CompareView() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 32, fontFamily: F }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#111827",
          marginBottom: 4,
          letterSpacing: "-0.02em",
        }}
      >
        Compare Energy Suppliers
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}>
        Your current Con Edison supply rate:{" "}
        <strong style={{ color: "#F97316", fontFamily: FM }}>12.68¢/kWh</strong>
      </p>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 28, lineHeight: 1.6 }}>
        These ESCOs are licensed by the NY Public Service Commission to serve Con
        Edison customers. Switching only changes your supply charge — Con Edison still
        delivers your power.
      </p>

      <div
        style={{
          background: "#F0FDFA",
          borderRadius: 12,
          padding: 14,
          border: "1px solid #CCFBF1",
          marginBottom: 24,
          fontSize: 12,
          color: "#115E59",
          lineHeight: 1.6,
        }}
      >
        ⚠️ <strong>Before you switch:</strong> Always compare the total annualized
        cost, not just the intro rate. Ask for full contract terms in writing.
      </div>

      {escoList.map((e, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "18px 20px",
            marginBottom: 10,
            border: "1px solid #E5E7EB",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 6,
                }}
              >
                {e.name}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "#6B7280",
                    padding: "2px 8px",
                    background: "#F3F4F6",
                    borderRadius: 4,
                    fontFamily: FM,
                  }}
                >
                  {e.type}
                </span>
                {e.green && (
                  <span
                    style={{
                      fontSize: 11,
                      color: "#065F46",
                      padding: "2px 8px",
                      background: "#ECFDF5",
                      borderRadius: 4,
                    }}
                  >
                    🌿 Green
                  </span>
                )}
              </div>
            </div>
            <a
              href={`https://${e.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                color: "#3B82F6",
                fontWeight: 600,
                textDecoration: "none",
                padding: "6px 12px",
                border: "1px solid #3B82F6",
                borderRadius: 8,
                whiteSpace: "nowrap" as const,
              }}
            >
              Visit Site ↗
            </a>
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "#374151",
              lineHeight: 1.6,
              marginBottom: 10,
            }}
          >
            {e.note}
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#6B7280" }}>
            <span>📞 {e.phone}</span>
            <span>🌐 {e.website}</span>
          </div>
        </div>
      ))}

      <div
        style={{
          background: "#F9FAFB",
          borderRadius: 12,
          padding: 16,
          marginTop: 16,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>
          Full ESCO directory at <strong>dps.ny.gov</strong> · Compare rates at{" "}
          <strong>chooseenergy.com</strong>
        </div>
      </div>
    </div>
  );
}
