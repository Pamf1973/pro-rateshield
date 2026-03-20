// ── Font constants ──
export const F = "'DM Sans', sans-serif";
export const FM = "'DM Mono', monospace";

// ── Bill sections ──
export const SECTIONS: Record<string, { label: string; color: string }> = {
  summary: { label: "Bill Summary", color: "#0D9488" },
  supply: { label: "Supply Charges", color: "#F97316" },
  delivery: { label: "Delivery Charges", color: "#3B82F6" },
};

// ── Mock bill data (will be replaced by Supabase queries) ──
export const billData = {
  total: 161.22,
  period: "Feb 3, 2026 — Mar 5, 2026",
  days: 30,
  kwh: 500,
  meterNew: 18533,
  meterPrior: 18033,
  supply: {
    market: { label: "Supply 500.00 kWh @11.649¢/kWh", amount: 58.25 },
    mfc: { label: "Merchant Function Charge", amount: 0.98 },
    grt: { label: "GRT & other tax surcharges", amount: 1.42 },
    sales: { label: "Sales tax @4.5%", amount: 2.73 },
    total: 63.38,
  },
  delivery: {
    basic: { label: "Basic service charge", amount: 20.91 },
    delivery: { label: "Delivery 500.00 kWh @17.917¢/kWh", amount: 89.59 },
    sbc: { label: "System Benefit Charge @0.678¢/kWh", amount: 3.39 },
    grt: { label: "GRT & other tax surcharges", amount: 6.48 },
    sales: { label: "Sales tax @4.5%", amount: 5.43 },
    total: 125.8,
  },
};

// ── Cost categories for donut chart ──
export interface CostCategory {
  key: string;
  label: string;
  amount: number;
  pct: number;
  color: string;
  controllable: boolean;
  yoy: string;
  yoyDir: "up" | "mod" | "flat";
  driver: string;
  source: string;
  tip: string | null;
}

export const categories: CostCategory[] = [
  {
    key: "wholesale",
    label: "Wholesale Electricity",
    amount: 45.32,
    pct: 28,
    color: "#F97316",
    controllable: true,
    yoy: "+$12.40 (+38%)",
    yoyDir: "up",
    driver:
      "Natural gas prices nearly doubled in 2025, pushing NYC wholesale power costs up 78%. Gas plants set the price for the entire market.",
    source: "NYISO Zone J Day-Ahead Market",
    tip: "You can shop for a different energy supplier (ESCO) to potentially lower this charge.",
  },
  {
    key: "capacity",
    label: "Capacity Charges",
    amount: 18.75,
    pct: 12,
    color: "#8B5CF6",
    controllable: true,
    yoy: "+$8.20 (+78%)",
    yoyDir: "up",
    driver:
      "Data center demand has exploded, driving capacity auction prices up nearly 10× since 2024. Every customer shares this cost.",
    source: "NYISO ICAP Auction, Zone J",
    tip: "Reducing usage during summer peak hours (2–6 PM) lowers your contribution to peak demand.",
  },
  {
    key: "gridDelivery",
    label: "Grid Delivery",
    amount: 52.15,
    pct: 32,
    color: "#3B82F6",
    controllable: false,
    yoy: "+$3.40 (+7%)",
    yoyDir: "mod",
    driver:
      "NY PSC approved a 3.5% delivery increase for 2026 to fund grid upgrades. ~25% of this goes to local government property taxes.",
    source: "NY PSC Rate Case 25-E-0072",
    tip: null,
  },
  {
    key: "cleanEnergy",
    label: "Clean Energy Programs",
    amount: 11.8,
    pct: 7,
    color: "#EC4899",
    controllable: false,
    yoy: "+$1.80 (+18%)",
    yoyDir: "mod",
    driver:
      "NY's Climate Leadership Act requires 70% renewable electricity by 2030. These charges fund solar, wind, and low-income assistance.",
    source: "NY PSC, CLCPA Orders",
    tip: null,
  },
  {
    key: "taxes",
    label: "Taxes & Gov Fees",
    amount: 10.8,
    pct: 7,
    color: "#F59E0B",
    controllable: false,
    yoy: "$0 (unchanged)",
    yoyDir: "flat",
    driver:
      "City, state, and federal taxes. Con Edison customers pay over $3.2 billion in embedded infrastructure taxes in 2026.",
    source: "Con Edison, NY Tax Law",
    tip: null,
  },
];

// ── Usage history for bar chart ──
export const usageHistory = [
  { month: "Apr", kwh: 14 },
  { month: "May", kwh: 15 },
  { month: "Jun", kwh: 22 },
  { month: "Jul", kwh: 24 },
  { month: "Aug", kwh: 22 },
  { month: "Sep", kwh: 18 },
  { month: "Oct", kwh: 12 },
  { month: "Nov", kwh: 10 },
  { month: "Dec", kwh: 13 },
  { month: "Jan", kwh: 15 },
  { month: "Feb", kwh: 16 },
  { month: "Mar", kwh: 16 },
];
