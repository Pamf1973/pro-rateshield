"use client";

import { F } from "@/lib/data/billData";

interface SidebarProps {
  activePage?: string;
  currentView?: string;
  setCurrentView?: (v: string) => void;
}

export default function Sidebar({
  activePage = "bill",
  currentView,
  setCurrentView,
}: SidebarProps) {
  const dashboardItems = [
    { icon: "📄", label: "My Bill", key: "bill" },
    { icon: "📋", label: "Action Plan", key: "actionplan" },
    { icon: "⚖️", label: "Compare Suppliers", key: "compare" },
  ];

  const pageItems = [
    { icon: "📄", label: "My Bill", href: "/bill/enter", key: "bill" },
    { icon: "📊", label: "My Usage", href: "/history", key: "history" },
    { icon: "🏛️", label: "Legislation", href: "/legislation", key: "legislation" },
    { icon: "❤️", label: "Assistance", href: "/assistance", key: "assistance" },
  ];

  const navStyle = (active: boolean) => ({
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer" as const,
    fontSize: 13,
    fontFamily: F,
    fontWeight: active ? (600 as const) : (400 as const),
    color: active ? "#5EEAD4" : "#94A3B8",
    background: active ? "rgba(94,234,212,0.08)" : "transparent",
    borderLeft: active ? "3px solid #0D9488" : "3px solid transparent",
    transition: "all 0.15s ease",
    marginBottom: 2,
    textDecoration: "none" as const,
  });

  const isDashboard = !!setCurrentView;

  return (
    <div
      style={{
        width: 200,
        background: "#0F172A",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px",
        flexShrink: 0,
        borderRadius: "16px 0 0 16px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "0 14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 16,
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
          Rate<span style={{ color: "#5EEAD4" }}>Shield</span>
        </div>
        <div style={{ fontSize: 10, color: "#64748B", fontFamily: F, marginTop: 2 }}>
          NYC Energy Transparency
        </div>
      </div>

      {/* Nav Items */}
      {isDashboard
        ? dashboardItems.map((it) => (
            <div
              key={it.key}
              style={navStyle(currentView === it.key)}
              onClick={() => setCurrentView!(it.key)}
            >
              <span style={{ fontSize: 15 }}>{it.icon}</span>
              <span>{it.label}</span>
            </div>
          ))
        : pageItems.map((it) => (
            <a key={it.key} href={it.href} style={navStyle(activePage === it.key)}>
              <span style={{ fontSize: 15 }}>{it.icon}</span>
              <span>{it.label}</span>
            </a>
          ))}

      <div style={{ flex: 1 }} />

      {/* Bottom */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 12,
          marginTop: 12,
        }}
      >
        <a href="#" style={navStyle(false)}>
          <span style={{ fontSize: 15 }}>⚙️</span>
          <span>Settings</span>
        </a>
      </div>

      {/* User */}
      <div
        style={{
          padding: "12px 14px 4px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 99,
              background: "#1E293B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#5EEAD4",
              fontFamily: F,
            }}
          >
            MR
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#E2E8F0", fontFamily: F }}>
              M. Roman
            </div>
            <div style={{ fontSize: 10, color: "#64748B", fontFamily: F }}>
              SC1 Residential
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
