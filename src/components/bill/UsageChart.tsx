"use client";

import { usageHistory, F } from "@/lib/data/billData";

export default function UsageChart() {
  const max = 28;
  const h = 100;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: h }}>
        {usageHistory.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 26,
                height: `${(d.kwh / max) * h}px`,
                background:
                  i === usageHistory.length - 1 ? "#0D9488" : "#5EEAD4",
                borderRadius: "3px 3px 0 0",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
        {usageHistory.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 8.5,
              color: "#9CA3AF",
              fontFamily: F,
            }}
          >
            {d.month}
          </div>
        ))}
      </div>
    </div>
  );
}
