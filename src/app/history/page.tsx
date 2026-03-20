import PageShell from "@/components/layout/PageShell";
import TrendChart from "@/components/bill/TrendChart";
import { createClient } from "@/lib/supabase/server";
import { F, FM } from "@/lib/data/billData";
import Link from "next/link";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: bills } = await supabase
    .from("bills")
    .select("id, total_amount, kwh_usage, billing_period_start, billing_period_end, service_class, created_at")
    .is("user_id", null)
    .order("billing_period_end", { ascending: true })
    .limit(12);

  const records = bills ?? [];

  return (
    <PageShell>
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 32px", fontFamily: F }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#0F172A",
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Bill History
        </h1>
        <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 32, lineHeight: 1.6 }}>
          Your cost trend over time. See how your charges have changed month to month.
        </p>

        <TrendChart bills={records} />

        {records.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                fontFamily: FM,
                marginBottom: 12,
              }}
            >
              All Bills
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[...records].reverse().map((b) => (
                <div
                  key={b.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#fff",
                    borderRadius: 10,
                    border: "1px solid #E5E7EB",
                    fontSize: 13,
                    fontFamily: F,
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, color: "#111827" }}>
                      {b.billing_period_start} — {b.billing_period_end}
                    </span>
                    <span style={{ color: "#9CA3AF", marginLeft: 12 }}>
                      {b.kwh_usage} kWh · {b.service_class}
                    </span>
                  </div>
                  <span
                    style={{ fontWeight: 700, color: "#0D9488", fontFamily: FM, fontSize: 15 }}
                  >
                    ${(b.total_amount / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {records.length === 0 && (
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link
              href="/bill/enter"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "#0D9488",
                color: "#fff",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                fontFamily: F,
                textDecoration: "none",
              }}
            >
              Decode Your First Bill →
            </Link>
          </div>
        )}
      </main>
    </PageShell>
  );
}
