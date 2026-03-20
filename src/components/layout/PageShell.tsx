import { F } from "@/lib/data/billData";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        style={{
          borderBottom: "1px solid #E5E7EB",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: F,
        }}
      >
        <a
          href="/"
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#0F172A",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Rate<span style={{ color: "#0D9488" }}>Shield</span>
        </a>
        <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#6B7280" }}>
          <a href="/bill/enter" style={{ textDecoration: "none", color: "inherit" }}>
            Decode Bill
          </a>
          <a href="/history" style={{ textDecoration: "none", color: "inherit" }}>
            History
          </a>
          <a href="/legislation" style={{ textDecoration: "none", color: "inherit" }}>
            Legislation
          </a>
          <a href="/assistance" style={{ textDecoration: "none", color: "inherit" }}>
            Assistance
          </a>
        </div>
      </nav>

      <div style={{ flex: 1 }}>{children}</div>

      <footer
        style={{
          borderTop: "1px solid #E5E7EB",
          padding: "16px 32px",
          textAlign: "center",
          fontSize: 13,
          color: "#9CA3AF",
          fontFamily: F,
        }}
      >
        RateShield · NYC Energy Cost Transparency · All data from public sources
        (NYISO, NY PSC)
      </footer>
    </>
  );
}
