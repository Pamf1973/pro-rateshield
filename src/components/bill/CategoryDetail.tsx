"use client";

import { CostCategory, F, FM } from "@/lib/data/billData";

interface CategoryDetailProps {
  cat: CostCategory;
  setCurrentView?: (v: string) => void;
}

export default function CategoryDetail({ cat, setCurrentView }: CategoryDetailProps) {
  const yoyColor =
    cat.yoyDir === "up" ? "#DC2626" : cat.yoyDir === "mod" ? "#EA580C" : "#6B7280";
  const yoyBg =
    cat.yoyDir === "up" ? "#FEF2F2" : cat.yoyDir === "mod" ? "#FFF7ED" : "#F3F4F6";

  return (
    <div
      style={{
        borderLeft: `4px solid ${cat.color}`,
        padding: "16px 18px",
        marginBottom: 16,
        animation: "fadeSlideUp 0.3s ease",
      }}
    >
      <style>{`@keyframes fadeSlideUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: "#111827", fontFamily: F }}>
          {cat.label}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#111827", fontFamily: FM }}>
            ${cat.amount.toFixed(2)}
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: F }}>{cat.pct}%</div>
        </div>
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#374151",
          fontFamily: F,
          lineHeight: 1.7,
          marginBottom: 12,
        }}
      >
        {cat.driver}
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: yoyBg,
          padding: "4px 10px",
          borderRadius: 99,
          fontSize: 11,
          fontWeight: 600,
          color: yoyColor,
          fontFamily: FM,
          marginBottom: 6,
        }}
      >
        {cat.yoyDir === "flat" ? "→" : "↑"} {cat.yoy}
      </div>

      <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: F, marginTop: 4 }}>
        Source: {cat.source}
      </div>

      {cat.tip && (
        <div
          style={{
            background: "#F0FDFA",
            borderRadius: 10,
            padding: "10px 14px",
            marginTop: 12,
            fontSize: 12,
            color: "#115E59",
            fontFamily: F,
            lineHeight: 1.6,
            borderLeft: "3px solid #5EEAD4",
          }}
        >
          💡 {cat.tip}
        </div>
      )}

      {/* CTA: supply categories → Compare Suppliers, delivery → Legislation */}
      {cat.controllable ? (
        <div
          style={{
            background: "linear-gradient(135deg, #0D9488, #0F766E)",
            borderRadius: 14,
            padding: 20,
            marginTop: 14,
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: F, marginBottom: 6 }}>
            Your Next Move
          </div>
          <div
            style={{
              fontSize: 13,
              fontFamily: F,
              lineHeight: 1.6,
              opacity: 0.9,
              marginBottom: 14,
            }}
          >
            Your current rate is <strong>12.68¢/kWh</strong>. Some ESCOs offer fixed
            rates below this, but watch out for teaser rates that spike after a
            promotional period.
          </div>
          <div
            onClick={() => setCurrentView?.("compare")}
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#0D9488",
              padding: "10px 20px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: F,
              cursor: "pointer",
            }}
          >
            Compare Suppliers →
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "#FFFBEB",
            borderRadius: 14,
            padding: 20,
            marginTop: 14,
            border: "1px solid #FDE68A",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#92400E",
              fontFamily: F,
              marginBottom: 6,
            }}
          >
            What&apos;s Being Done
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#78350F",
              fontFamily: F,
              lineHeight: 1.6,
              marginBottom: 14,
            }}
          >
            Three bills in the NY Senate:{" "}
            <strong>S9144</strong> (moratorium), <strong>S8540</strong> (separate rate
            class), <strong>S6394A</strong> (surcharge credited to low-income). Gov.
            Hochul directed the PSC to review cost allocation.
          </div>
          <a
            href="/legislation"
            style={{
              display: "inline-block",
              background: "#92400E",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: F,
              textDecoration: "none",
            }}
          >
            View Legislation →
          </a>
        </div>
      )}
    </div>
  );
}
