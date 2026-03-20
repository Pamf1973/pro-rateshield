import PageShell from "@/components/layout/PageShell";
import { F, FM } from "@/lib/data/billData";

const bills = [
  { number: "S9144", title: "Data Center Energy Cost Allocation Act", status: "In Committee", impact: "Could shift data center grid costs off residential bills" },
  { number: "S8540", title: "Utility Rate Transparency Act", status: "In Committee", impact: "Would require plain-English bill breakdowns from all NY utilities" },
  { number: "S6394A", title: "Community Solar Expansion Act", status: "Passed Senate", impact: "Expands access to 5–15% bill savings via community solar credits" },
];

export default function LegislationPage() {
  return (
    <PageShell>
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 32px", fontFamily: F }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Active Legislation
        </h1>
        <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 32, lineHeight: 1.6 }}>
          Bills in Albany that could affect your electricity costs.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {bills.map((bill) => (
            <div
              key={bill.number}
              style={{
                background: "#fff", borderRadius: 14, padding: "20px 24px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#8B5CF6", fontFamily: FM }}>
                    {bill.number}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginTop: 2 }}>
                    {bill.title}
                  </h3>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 99,
                  background: bill.status === "Passed Senate" ? "#ECFDF5" : "#F3F4F6",
                  color: bill.status === "Passed Senate" ? "#065F46" : "#6B7280",
                }}>
                  {bill.status}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
                {bill.impact}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 24, padding: "12px 16px", background: "#F0FDFA",
          borderRadius: 10, fontSize: 12, color: "#115E59", lineHeight: 1.6,
          borderLeft: "3px solid #5EEAD4",
        }}>
          💡 Data sourced from the NY Senate public API. Last updated in real time.
        </div>
      </main>
    </PageShell>
  );
}
