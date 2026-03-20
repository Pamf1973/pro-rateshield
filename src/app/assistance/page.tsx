import PageShell from "@/components/layout/PageShell";
import { F } from "@/lib/data/billData";

const programs = [
  { icon: "🔥", name: "LIHEAP", desc: "Federal heating assistance — up to $350/year for qualifying households", eligibility: "Income below 60% state median", link: "#" },
  { icon: "💡", name: "Con Edison EnergyShare", desc: "One-time bill credit for customers behind on payments", eligibility: "Con Edison customers with past-due balance", link: "#" },
  { icon: "📋", name: "Deferred Payment Agreement", desc: "Spread overdue balance across 10+ months with no shutoff", eligibility: "Any Con Edison customer with balance due", link: "#" },
  { icon: "🛡️", name: "Disconnection Protection", desc: "Medical emergency and cold weather protections prevent shutoffs", eligibility: "Medical certification or Nov 1 – Apr 15 period", link: "#" },
];

export default function AssistancePage() {
  return (
    <PageShell>
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 32px", fontFamily: F }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Assistance Programs
        </h1>
        <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 32, lineHeight: 1.6 }}>
          Help paying your Con Edison bill. You may qualify for one or more of these programs.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {programs.map((prog) => (
            <div
              key={prog.name}
              style={{
                background: "#fff", borderRadius: 14, padding: "20px 24px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                display: "flex", gap: 16, alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{prog.icon}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                  {prog.name}
                </h3>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 8 }}>
                  {prog.desc}
                </p>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>
                  <strong>Eligibility:</strong> {prog.eligibility}
                </div>
                <a
                  href={prog.link}
                  style={{
                    display: "inline-block", fontSize: 13, fontWeight: 600,
                    color: "#0D9488", padding: "6px 14px", borderRadius: 8,
                    border: "1px solid #0D9488", transition: "all 0.15s ease",
                  }}
                >
                  Apply Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
