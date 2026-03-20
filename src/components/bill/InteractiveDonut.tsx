"use client";

import { categories, F, FM } from "@/lib/data/billData";

interface InteractiveDonutProps {
  activeCat: string | null;
  setActiveCat: (key: string | null) => void;
  totalAmount?: number;
}

export default function InteractiveDonut({
  activeCat,
  setActiveCat,
  totalAmount,
}: InteractiveDonutProps) {
  const billDataTotal = categories.reduce((s, c) => s + c.amount, 0);
  const total = totalAmount ?? billDataTotal;
  // Scale factor to convert billData amounts to real bill amounts
  const scale = billDataTotal > 0 ? total / billDataTotal : 1;
  const size = 220;
  const outer = 90;
  const inner = 52;
  const cx = size / 2;
  const cy = size / 2;

  let cumAngle = -90;
  const segments = categories.map((c) => {
    const angle = (c.amount / billDataTotal) * 360;
    const start = cumAngle;
    cumAngle += angle;
    return { ...c, startAngle: start, endAngle: cumAngle, angle };
  });

  const arc = (startDeg: number, endDeg: number, r: number) => {
    const s = (startDeg * Math.PI) / 180;
    const e = (endDeg * Math.PI) / 180;
    return {
      x1: cx + r * Math.cos(s),
      y1: cy + r * Math.sin(s),
      x2: cx + r * Math.cos(e),
      y2: cy + r * Math.sin(e),
    };
  };

  const activeData = activeCat
    ? categories.find((c) => c.key === activeCat)
    : null;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => {
            const isActive = activeCat === seg.key;
            const isInactive = activeCat && !isActive;
            const oR = isActive ? outer + 6 : outer;
            const iR = isActive ? inner - 2 : inner;
            const o = arc(seg.startAngle, seg.endAngle, oR);
            const iA = arc(seg.startAngle, seg.endAngle, iR);
            const large = seg.angle > 180 ? 1 : 0;
            const d = `M ${o.x1} ${o.y1} A ${oR} ${oR} 0 ${large} 1 ${o.x2} ${o.y2} L ${iA.x2} ${iA.y2} A ${iR} ${iR} 0 ${large} 0 ${iA.x1} ${iA.y1} Z`;
            return (
              <path
                key={i}
                d={d}
                fill={seg.color}
                opacity={isInactive ? 0.3 : 1}
                stroke="#fff"
                strokeWidth="3"
                style={{ cursor: "pointer", transition: "all 0.25s ease" }}
                onClick={() => setActiveCat(isActive ? null : seg.key)}
              />
            );
          })}
        </svg>
        {/* Center content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {activeData ? (
            <>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: activeData.color,
                  marginBottom: 4,
                }}
              />
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#111827",
                  fontFamily: FM,
                  letterSpacing: "-0.02em",
                }}
              >
                ${(activeData.amount * scale).toFixed(2)}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#6B7280",
                  fontFamily: F,
                  marginTop: 1,
                }}
              >
                {activeData.label}
              </div>
              <div style={{ fontSize: 9, color: "#9CA3AF", fontFamily: F }}>
                {activeData.pct}% of bill
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#111827",
                  fontFamily: FM,
                  letterSpacing: "-0.03em",
                }}
              >
                ${total.toFixed(0)}
              </div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: F }}>
                total bill
              </div>
            </>
          )}
        </div>
      </div>

      {/* Segment labels */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "4px 14px",
          marginTop: 14,
        }}
      >
        {categories.map((c) => {
          const isActive = activeCat === c.key;
          const isInactive = activeCat && !isActive;
          return (
            <div
              key={c.key}
              onClick={() => setActiveCat(isActive ? null : c.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
                opacity: isInactive ? 0.35 : 1,
                transition: "all 0.2s ease",
                padding: "3px 8px",
                borderRadius: 6,
                background: isActive ? `${c.color}12` : "transparent",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: c.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#374151",
                  fontFamily: F,
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
