# RateShield NYC

**The "Truth-Teller" for your Con Edison bill.**

RateShield is a web-based transparency platform designed to demystify electricity costs for 3.4 million New Yorkers. While most energy apps focus on telling you to "turn off the lights," RateShield reveals the 76% of your bill that you can't control — the system-driven charges fueled by wholesale market volatility, data center demand, and regulatory rate hikes.

Public URL: https://pro-rateshield-production.up.railway.app/

Live demo: https://www.loom.com/share/19da2c905e7f4ecead61d85c00ead786

## ⚡ The Problem

New York City electricity rates have climbed 43% since 2020. Most consumers carry a sense of "usage guilt," yet the majority of their bill increases are driven by external forces:

- **Wholesale Spikes:** NYISO prices nearly doubled in 2025 ($41.81 → $74.40/MWh).
- **Grid Strain:** A 410–650 MW reliability shortfall is projected for Summer 2026.
- **Hidden Costs:** Capacity charges, infrastructure mandates, and clean energy surcharges buried in tariff jargon.
- **Rate Hikes on Autopilot:** 3.5% approved for 2026, 3.2% for 2027, 3.1% for 2028.

No existing product tells consumers what portion of their bill increase is actually within their control. RateShield does.

---

## 🛡️ Three Screens to Transparency

**Screen 1 — The Input**
Enter three numbers from your Con Ed bill: Total $, Billing Period, and kWh. No account required. No linking. Three fields.

**Screen 2 — The Honesty Filter**
A plain-English breakdown that separates **Charges You Control** (~24%, usage-driven) from **Charges You Don't** (~76%, system/regulatory). Every number is sourced. Every claim is cited.

**Screen 3 — The Game Plan**
Actionable recommendations for the usage portion you can reduce, and direct advocacy links (active legislation, moratoriums, assistance programs) for the system costs set by Albany and the grid.

---

## 🚀 Features

- **Bill Attribution Engine** — Maps your specific bill to real-time NYISO Zone J wholesale data and NY PSC rate case filings. Breaks every dollar into its true source.
- **Legislation Tracker** — Connects your bill directly to pending NY Senate bills (S9144, S8540, S6394A) and Governor Hochul's PSC directive on data center grid costs.
- **Assistance Integration** — One-tap access to LIHEAP, Con Edison's EnergyShare, payment plans, and disconnection protection policies.
- **B2B Portfolio Intelligence** *(Paid Tier)* — Multi-building dashboard, 12–36 month cost forecasting, budget variance alerts, and exportable reports for schools, hospitals, and property managers.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR, file-based routing, API routes |
| Language | TypeScript | Type safety for financial data |
| Styling | Tailwind CSS | Utility-first design system |
| Charts | Recharts | Bill breakdown pie charts, trend lines |
| State | Zustand | Bill data state management |
| Forms | React Hook Form | Bill entry validation |
| Backend | Supabase (PostgreSQL + Edge Functions) | Database, auth, serverless logic |
| Auth | Supabase Auth | Email/password, Google SSO, Apple SSO |
| Hosting | Vercel | Auto-deploy from GitHub, edge network |
| CI/CD | GitHub Actions | Lint, type-check, test on every PR |

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18+
- [Git](https://git-scm.com)
- A [Supabase](https://supabase.com) account (free tier works)

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/rateshield.git
cd rateshield

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
```

Open `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find both values in your Supabase dashboard under **Settings → API**.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database setup

Run the SQL migrations in the `supabase/migrations/` folder against your Supabase project (via the SQL Editor in your Supabase dashboard), in order:

1. `001_create_profiles.sql`
2. `002_create_bills.sql`
3. `003_create_nyiso_prices.sql`
4. `004_create_tariff_maps.sql`
5. `005_create_legislation.sql`
6. `006_create_assistance_programs.sql`

Seed data for tariffs, legislation, and assistance programs is in `supabase/seed/`.

---

## 📁 Project Structure

```
rateshield/
├── src/
│   ├── app/                    # Next.js App Router (pages)
│   │   ├── bill/enter/         # Bill entry form
│   │   ├── bill/[id]/          # Bill breakdown view
│   │   ├── history/            # Cost trend timeline
│   │   ├── legislation/        # Active bills feed
│   │   ├── assistance/         # Hardship programs
│   │   └── api/decompose/      # BFF route → Supabase Edge Function
│   ├── components/             # UI components
│   │   ├── bill/               # BillEntryForm, CostBreakdownChart, etc.
│   │   ├── legislation/        # BillCard
│   │   └── layout/             # Navbar, Footer
│   ├── lib/
│   │   ├── engine/             # Decomposition engine, tariff logic
│   │   ├── supabase/           # Client + server Supabase clients
│   │   ├── types/              # TypeScript types (bill, tariff)
│   │   └── utils/              # Formatters, constants
│   └── stores/                 # Zustand state management
├── supabase/
│   ├── migrations/             # SQL table definitions
│   ├── functions/              # Edge Functions (decompose, NYISO ingest)
│   └── seed/                   # Tariff maps, legislation, programs
└── .vscode/                    # Shared editor config
```

---

## 📊 Data Sources

All data inputs are publicly available. No proprietary agreements required.

| Source | Data | Access |
|--------|------|--------|
| [NYISO](https://www.nyiso.com) | Wholesale prices (LBMP), capacity auctions (ICAP), load forecasts, interconnection queue | Public (CSV/XML) |
| [NY PSC](https://documents.dps.ny.gov) | Con Edison rate case filings, approved rate increases, tariff schedules | Public |
| [Con Edison](https://www.coned.com) | Published tariffs (SC1, SC2, SC9), Monthly Adjustment Clause | Public |
| [NY Senate](https://www.nysenate.gov) | Bill status (S9144, S8540, S6394A) | Public (API) |

---

## 📅 Roadmap

| Phase | Timeline | Milestone |
|-------|----------|-----------|
| Tariff Mapping | Weeks 1–4 | SC1, SC2, SC9 mapped and QA'd against 50+ real bills |
| NYISO Pipeline | Weeks 3–6 | Daily Zone J price ingestion running |
| Consumer MVP | Weeks 5–12 | Bill entry → breakdown → attribution → recommendations |
| B2B MVP | Weeks 8–14 | Multi-building dashboard, cost forecasting, PDF export |
| Consumer Beta | Week 14 | 1,000 Con Edison customers |
| B2B Beta | Week 16 | 20 organizations |
| **Public Launch** | **Week 22** | **Timed for Summer 2026 peak / reliability shortfall** |

---

## 🔒 Scope

**v1 covers the Con Edison service territory only** — NYC (all five boroughs) and Westchester. This maps to NYISO Zone J. Phase 2 expands to National Grid (Long Island + Upstate NY), Phase 3 to PJM utilities.

---

## 📄 License

This project is proprietary. All rights reserved.

---

**RateShield NYC** — Know what you're paying for.
