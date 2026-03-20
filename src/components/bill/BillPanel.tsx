"use client";

import { billData, SECTIONS, F, FM } from "@/lib/data/billData";
import { SC1_TARIFF } from "@/lib/data/tariff-sc1";
import { useBillStore } from "@/stores/billStore";
import UsageChart from "./UsageChart";

interface BillPanelProps {
  activeSection: string | null;
  setActiveSection: (key: string | null) => void;
}

function LineItem({ label, amount }: { label: string; amount: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "3px 0",
        fontSize: 12.5,
        fontFamily: FM,
      }}
    >
      <span style={{ color: "#374151" }}>{label}</span>
      <span
        style={{
          color: "#111827",
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        ${amount.toFixed(2)}
      </span>
    </div>
  );
}

function TotalLine({ label, amount }: { label: string; amount: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0 2px",
        borderTop: "2px solid #111827",
        marginTop: 4,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: FM,
      }}
    >
      <span>{label}</span>
      <span>${amount.toFixed(2)}</span>
    </div>
  );
}

export default function BillPanel({
  activeSection,
  setActiveSection,
}: BillPanelProps) {
  const { result } = useBillStore();
  const isReal = result !== null;

  // ─── Display values ──────────────────────────────────────────
  const kWh = isReal ? result.input.kwhUsage : billData.kwh;
  const totalAmount = isReal ? result.input.totalAmount : billData.total;
  const period = isReal
    ? `${result.input.billingPeriodStart} — ${result.input.billingPeriodEnd}`
    : billData.period;
  const days = isReal
    ? Math.round(
        (new Date(result.input.billingPeriodEnd).getTime() -
          new Date(result.input.billingPeriodStart).getTime()) /
          86400000
      )
    : billData.days;
  const avgDaily = (kWh / (days || 30)).toFixed(1);

  // Due date: billing end + 26 days
  const dueDate = isReal
    ? (() => {
        const d = new Date(result.input.billingPeriodEnd);
        d.setDate(d.getDate() + 26);
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      })()
    : "Apr 2, 2026";

  // ─── Tariff line-item computation ────────────────────────────
  let supplyLines: { label: string; amount: number }[] = [];
  let deliveryLines: { label: string; amount: number }[] = [];
  let supplyTotal = 0;
  let deliveryTotal = 0;
  let supplyRateBadge = "12.61¢/kWh";

  if (isReal) {
    const r = SC1_TARIFF.rates;
    const t = SC1_TARIFF;

    // Raw amounts in cents (theoretical from tariff rates)
    const rawEnergy  = Math.round(kWh * r.energySupply);   // 8.51¢/kWh
    const rawCap     = Math.round(kWh * r.capacity);        // 2.98¢/kWh
    const rawTrans   = Math.round(kWh * r.transmission);    // 1.12¢/kWh
    const rawBasic   = t.basicServiceCharge;                 // 1658¢ flat
    const rawDistrib = Math.round(kWh * r.distribution);    // 9.87¢/kWh
    const rawSBC     = Math.round(kWh * r.systemBenefitsCharge); // 0.56¢/kWh
    const rawRTC     = Math.round(kWh * r.transitionalCharge);   // 0.44¢/kWh
    const rawNYC     = Math.round(kWh * r.nycSurcharge);         // 0.62¢/kWh

    const rawSupplySub   = rawEnergy + rawCap + rawTrans;
    const rawDeliverySub = rawBasic + rawDistrib + rawSBC + rawRTC + rawNYC;
    const rawTax         = Math.round((rawSupplySub + rawDeliverySub) * t.taxRate);
    // Split tax proportionally
    const rawSupplyTax   = Math.round(rawTax * rawSupplySub / (rawSupplySub + rawDeliverySub));
    const rawDeliveryTax = rawTax - rawSupplyTax;
    const rawTotal       = rawSupplySub + rawDeliverySub + rawTax;

    // Scale to match the user's actual entered total
    const userCents = Math.round(totalAmount * 100);
    const factor    = rawTotal > 0 ? userCents / rawTotal : 1;
    const sc        = (c: number) => Math.round(c * factor) / 100;

    const energy   = sc(rawEnergy);
    const cap      = sc(rawCap);
    const trans    = sc(rawTrans);
    const sTax     = sc(rawSupplyTax);
    const basic    = sc(rawBasic);
    const distrib  = sc(rawDistrib);
    const sbc      = sc(rawSBC);
    const rtc      = sc(rawRTC);
    const nyc      = sc(rawNYC);
    const dTax     = sc(rawDeliveryTax);

    const rawSupplySum   = energy + cap + trans + sTax;
    const rawDeliverySum = basic + distrib + sbc + rtc + nyc + dTax;

    // Absorb any rounding difference (at most ±$0.02) into delivery tax
    const remainder = Math.round((totalAmount - rawSupplySum - rawDeliverySum) * 100) / 100;
    const dTaxAdj   = Math.round((dTax + remainder) * 100) / 100;

    supplyTotal   = Math.round(rawSupplySum * 100) / 100;
    deliveryTotal = Math.round((rawDeliverySum + remainder) * 100) / 100;

    supplyRateBadge = kWh > 0
      ? `${(supplyTotal / kWh * 100).toFixed(2)}¢/kWh`
      : "—";

    supplyLines = [
      { label: `Energy supply  ·  ${kWh} kWh × 8.51¢`, amount: energy },
      { label: `Capacity charge  ·  ${kWh} kWh × 2.98¢`, amount: cap },
      { label: `Transmission  ·  ${kWh} kWh × 1.12¢`, amount: trans },
      { label: `Taxes & surcharges (8.875%)`, amount: sTax },
    ];

    deliveryLines = [
      { label: `Basic Service Charge (flat monthly)`, amount: basic },
      { label: `Distribution  ·  ${kWh} kWh × 9.87¢`, amount: distrib },
      { label: `System Benefits Charge  ·  0.56¢/kWh`, amount: sbc },
      { label: `Transitional Charge  ·  0.44¢/kWh`, amount: rtc },
      { label: `NYC Surcharge  ·  0.62¢/kWh`, amount: nyc },
      { label: `Taxes (8.875%)`, amount: dTaxAdj },
    ];
  } else {
    supplyLines = [
      { label: billData.supply.market.label, amount: billData.supply.market.amount },
      { label: billData.supply.mfc.label, amount: billData.supply.mfc.amount },
      { label: billData.supply.grt.label, amount: billData.supply.grt.amount },
      { label: billData.supply.sales.label, amount: billData.supply.sales.amount },
    ];
    deliveryLines = [
      { label: billData.delivery.basic.label, amount: billData.delivery.basic.amount },
      { label: billData.delivery.delivery.label, amount: billData.delivery.delivery.amount },
      { label: billData.delivery.sbc.label, amount: billData.delivery.sbc.amount },
      { label: billData.delivery.grt.label, amount: billData.delivery.grt.amount },
      { label: billData.delivery.sales.label, amount: billData.delivery.sales.amount },
    ];
    supplyTotal   = billData.supply.total;
    deliveryTotal = billData.delivery.total;
  }

  // ─── Style helpers ───────────────────────────────────────────
  const sStyle = (key: string) => ({
    cursor: "pointer" as const,
    padding: "12px 16px",
    margin: "0 -16px",
    borderRadius: 4,
    borderLeft:
      activeSection === key
        ? `4px solid ${SECTIONS[key].color}`
        : "4px solid transparent",
    background:
      activeSection === key
        ? key === "supply"
          ? "#FFF7ED08"
          : key === "delivery"
            ? "#EFF6FF08"
            : "#F0FDFA08"
        : "transparent",
    transition: "all 0.15s ease",
  });

  const hotspot = (key: string, num: number) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setActiveSection(activeSection === key ? null : key);
      }}
      style={{
        width: 26,
        height: 26,
        borderRadius: 99,
        background: activeSection === key ? SECTIONS[key].color : "#0D9488",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        flexShrink: 0,
        fontFamily: F,
        boxShadow:
          activeSection === key
            ? `0 0 0 4px ${SECTIONS[key].color}33`
            : "0 0 0 3px #0D948833",
        transition: "all 0.2s ease",
      }}
    >
      {num}
    </div>
  );

  return (
    <div
      style={{
        flex: "0 0 520px",
        background: "#fff",
        borderRadius: 16,
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0D9488",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            fontFamily: F,
            letterSpacing: "-0.02em",
          }}
        >
          con<span style={{ fontWeight: 400 }}>Edison</span>
        </div>
        <div style={{ color: "#D1FAE5", fontSize: 11, fontFamily: F }}>
          RESIDENTIAL · SC1
        </div>
      </div>

      <div
        style={{
          padding: "20px 20px 24px",
          overflowY: "auto",
          flex: 1,
        }}
      >
        {/* Section 1: Summary */}
        <div
          style={sStyle("summary")}
          onClick={() =>
            setActiveSection(activeSection === "summary" ? null : "summary")
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 12,
            }}
          >
            {hotspot("summary", 1)}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#6B7280",
                  fontFamily: F,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                Your bill breakdown
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: F }}>
                Billing period: {period} ({days} days)
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginBottom: 2,
                }}
              >
                Previous balance
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  fontFamily: FM,
                }}
              >
                $0.00
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginTop: 8,
                  marginBottom: 2,
                }}
              >
                New charges
              </div>
              <div style={{ fontSize: 11, color: "#6B7280", fontFamily: F }}>
                Electricity — {days} days
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  fontFamily: FM,
                }}
              >
                ${totalAmount.toFixed(2)}
              </div>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginBottom: 2,
                }}
              >
                Total amount due
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#111827",
                  fontFamily: F,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                ${totalAmount.toFixed(2)}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#9CA3AF",
                  fontFamily: F,
                  marginTop: 6,
                }}
              >
                Due by {dueDate}
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#F9FAFB",
              borderRadius: 10,
              padding: "10px 10px 6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#6B7280",
                  fontFamily: F,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Avg daily electric usage
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#0D9488",
                  fontFamily: F,
                }}
              >
                {avgDaily}{" "}
                <span style={{ fontSize: 10, fontWeight: 500 }}>kWh</span>
              </span>
            </div>
            <UsageChart />
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 10,
              fontSize: 10,
              color: "#9CA3AF",
              fontFamily: FM,
            }}
          >
            <span>Service Class: SC1 Residential</span>
            <span>Usage: {kWh} kWh</span>
            <span>{days} days</span>
          </div>
        </div>

        <div
          style={{ height: 1, background: "#E5E7EB", margin: "16px 0" }}
        />

        {/* Section 2: Supply */}
        <div
          style={sStyle("supply")}
          onClick={() =>
            setActiveSection(activeSection === "supply" ? null : "supply")
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {hotspot("supply", 2)}
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: F,
                }}
              >
                Your Supply Charges
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: FM,
                }}
              >
                ${supplyTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {supplyLines.map((line, i) => (
            <LineItem key={i} label={line.label} amount={line.amount} />
          ))}

          <TotalLine
            label="Total electricity supply charges"
            amount={supplyTotal}
          />

          <div
            style={{
              background: "#FFF7ED",
              borderRadius: 6,
              padding: "8px 10px",
              marginTop: 10,
              fontSize: 10.5,
              color: "#92400E",
              fontFamily: F,
              lineHeight: 1.5,
              borderLeft: "3px solid #F97316",
            }}
          >
            Your supply cost: <strong>{supplyRateBadge}</strong>. Rates from
            NY PSC SC1 tariff (effective Jan 22, 2026).
          </div>
        </div>

        <div
          style={{ height: 1, background: "#E5E7EB", margin: "16px 0" }}
        />

        {/* Section 3: Delivery */}
        <div
          style={sStyle("delivery")}
          onClick={() =>
            setActiveSection(
              activeSection === "delivery" ? null : "delivery"
            )
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {hotspot("delivery", 3)}
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: F,
                }}
              >
                Your Delivery Charges
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: FM,
                }}
              >
                ${deliveryTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {deliveryLines.map((line, i) => (
            <LineItem key={i} label={line.label} amount={line.amount} />
          ))}

          <TotalLine
            label="Total electricity delivery charges"
            amount={deliveryTotal}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0 0",
              marginTop: 4,
              fontSize: 16,
              fontWeight: 800,
              fontFamily: F,
            }}
          >
            <span>Your electricity total</span>
            <span style={{ fontFamily: FM }}>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
