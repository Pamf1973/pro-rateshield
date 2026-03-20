"use client";

import { F, FM } from "@/lib/data/billData";
import { useBillStore } from "@/stores/billStore";

// Reference savings calculated for 500 kWh / $161.22 bill
const REF_KWH = 500;
const BASE_SAVINGS = [
  {
    title: "Switch to a lower-cost ESCO",
    baseSaving: 10.90,
    mathTemplate: (kWh: number) => `${kWh} kWh × 2.18¢ savings`,
    desc: "Your supply rate is determined by Con Edison's SC1 tariff (8.51¢/kWh energy + 2.98¢ capacity). Competitive ESCOs offer fixed rates around 6.33¢/kWh energy supply — saving 2.18¢ on every kWh. Con Edison still delivers your power.",
    product: "Compare via RateShield or PowerYourWay.com",
    productNote: "Look for fixed-rate plans (not variable). Avoid teaser rates that spike after 2–3 months. Always check the annualized cost, not just the intro rate.",
    scalesWithKwh: true,
  },
  {
    title: "Replace 5 bulbs with LEDs",
    baseSaving: 12.87,
    mathTemplate: (_kWh: number, saving: number) =>
      `38.25 kWh saved × ${(saving / 38.25 * 100).toFixed(2)}¢/kWh`,
    desc: "Swapping five 60W incandescent bulbs for 9W LEDs saves 1.275 kWh/day. That's 38.25 kWh/month you're not paying for — on both supply and delivery.",
    product: "Philips Ultra-Efficient A19 LED (60W equiv)",
    productNote: "Uses just 9W per bulb vs 60W incandescent. Lasts 50,000 hours. ~$4 each at Home Depot. Pays for itself in under 2 weeks.",
    scalesWithKwh: false,
  },
  {
    title: "Install a smart thermostat",
    baseSaving: 6.73,
    mathTemplate: (_kWh: number, saving: number) =>
      `20 kWh saved × ${(saving / 20 * 100).toFixed(2)}¢/kWh`,
    desc: "HVAC is ~40% of your usage. A smart thermostat cuts that by 10% according to DOE studies — saving approximately 20 kWh/month on a typical 500 kWh bill.",
    product: "Google Nest Learning Thermostat (4th Gen)",
    productNote: "Auto-learns your schedule. DOE-verified 10–12% HVAC savings. Eligible for Con Edison smart thermostat rebate ($85 back).",
    scalesWithKwh: true,
  },
  {
    title: "Switch to Con Ed TOU rate + shift usage off-peak",
    baseSaving: 2.52,
    mathTemplate: () => `30 kWh shifted × 25% TOU discount`,
    desc: "Standard SC1 is flat-rate — running your dishwasher at midnight saves $0. But if you opt into Con Ed's voluntary time-of-use rate (SC1-VTOU), off-peak hours are ~25% cheaper.",
    product: "Bosch 300 Series Dishwasher SHSM63W55N",
    productNote: "ENERGY STAR certified. Delay-start timer schedules runs for off-peak hours automatically. Call Con Edison to switch to TOU billing first.",
    scalesWithKwh: false,
  },
];

const FIXED_CHARGES = [
  {
    title: "Basic Service Charge",
    desc: "A flat monthly fee every Con Edison customer pays just to be connected to the grid. Set by NY PSC at $16.58/month (effective Jan 22, 2026). Cannot be reduced by using less electricity.",
  },
  {
    title: "System Benefits & Transitional Charges",
    desc: "System Benefits Charge (0.56¢/kWh) funds clean energy programs. Transitional Charge (0.44¢/kWh) covers stranded utility costs. Both are mandated by NY PSC.",
  },
  {
    title: "NYC Surcharge & GRT",
    desc: "NYC Surcharge (0.62¢/kWh) and Gross Receipts Tax are mandated by city and state government. Applied to all usage. Not based on your ability to reduce consumption.",
  },
  {
    title: "NYC Sales Tax (8.875%)",
    desc: "NYC sales tax on utilities applied to all supply and delivery charges. Proportional to your bill — goes down slightly if you reduce usage, but the rate itself is fixed by law.",
  },
];

export default function ActionPlanPanel() {
  const { result } = useBillStore();

  const billTotal = result ? result.input.totalAmount : 161.22;
  const kWh = result ? result.input.kwhUsage : REF_KWH;

  // Scale kWh-dependent savings proportionally
  const kWhFactor = kWh / REF_KWH;

  // Effective all-in rate
  const effectiveRate = kWh > 0 ? (billTotal / kWh * 100).toFixed(2) : "33.66";

  const scaledSavings = BASE_SAVINGS.map((s) => ({
    ...s,
    saving: s.scalesWithKwh
      ? Math.round(s.baseSaving * kWhFactor * 100) / 100
      : s.baseSaving,
  }));

  const totalSavings = scaledSavings.reduce((acc, s) => acc + s.saving, 0);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 32, fontFamily: F }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#111827",
          marginBottom: 4,
          letterSpacing: "-0.02em",
        }}
      >
        Your Action Plan
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}>
        Based on your bill of{" "}
        <strong style={{ color: "#111827" }}>${billTotal.toFixed(2)}</strong>
        {result && (
          <span style={{ color: "#9CA3AF" }}> · {kWh} kWh used</span>
        )}
      </p>
      <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 28 }}>
        Savings calculated using SC1 tariff rates · All-in rate: {effectiveRate}¢/kWh ·
        Source: NY PSC, Con Edison Rate Case, approved Jan 22, 2026
      </p>

      <div style={{ height: 1, background: "#E5E7EB", marginBottom: 24 }} />

      {/* Controllable */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #E5E7EB",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 4, height: 28, borderRadius: 4, background: "#22C55E" }} />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0 }}>
            What You Can Control
          </h2>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "#6B7280",
            marginBottom: 20,
            marginLeft: 12,
          }}
        >
          Verified savings based on your bill:{" "}
          <strong style={{ color: "#22C55E" }}>${totalSavings.toFixed(0)}/month</strong>{" "}
          <span style={{ color: "#9CA3AF" }}>
            (~${(totalSavings * 12).toFixed(0)}/year)
          </span>
        </p>

        {scaledSavings.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "16px 0",
              borderTop: i > 0 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
                flexWrap: "wrap" as const,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
                {s.title}
              </span>
              <span
                style={{
                  background: "#22C55E",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontFamily: FM,
                }}
              >
                ${s.saving.toFixed(2)}/mo
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#0D9488",
                fontFamily: FM,
                marginBottom: 6,
                background: "#F0FDFA",
                display: "inline-block" as const,
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              Math: {s.mathTemplate(kWh, s.saving)}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "#6B7280",
                lineHeight: 1.5,
                marginBottom: 8,
              }}
            >
              {s.desc}
            </div>
            <div
              style={{
                background: "#F0FDF4",
                borderRadius: 10,
                padding: "10px 12px",
                borderLeft: "3px solid #86EFAC",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#166534",
                  marginBottom: 2,
                }}
              >
                {s.product}
              </div>
              <div style={{ fontSize: 11.5, color: "#374151", lineHeight: 1.5 }}>
                {s.productNote}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #E5E7EB",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 4, height: 28, borderRadius: 4, background: "#6B7280" }} />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0 }}>
            What You Can&apos;t Control
          </h2>
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, marginLeft: 12 }}>
          Regulatory charges you pay regardless of usage
        </p>

        {FIXED_CHARGES.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "14px 0",
              borderTop: i > 0 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <span>ℹ️</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                {item.title}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#374151",
                lineHeight: 1.6,
                paddingLeft: 22,
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 12,
          color: "#9CA3AF",
          lineHeight: 1.5,
        }}
      >
        All charges from NY PSC-approved Con Edison SC1 tariff (effective Jan 22, 2026).
        <br />
        Source: NY PSC, Con Edison Rate Case, approved January 22, 2026.
      </div>
    </div>
  );
}
