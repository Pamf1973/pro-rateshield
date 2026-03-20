// Con Edison SC1 Residential Tariff - Effective January 2026
// Source: NY PSC approved rate case, Con Edison published tariffs

export const SC1_TARIFF = {
  serviceClass: "SC1",
  effectiveDate: "2026-01-22",
  sourceCitation: "NY PSC, Con Edison Rate Case, approved January 22, 2026",

  // Fixed monthly charges
  basicServiceCharge: 1658, // cents ($16.58/month)

  // Per-kWh rates (cents per kWh)
  rates: {
    energySupply: 8.51,
    capacity: 2.98,
    transmission: 1.12,
    distribution: 9.87,
    systemBenefitsCharge: 0.56,
    transitionalCharge: 0.44,
    nycSurcharge: 0.62,
  },

  // NYC sales tax on utilities
  taxRate: 0.08875,

  // Which charges are usage-driven vs system-driven
  classification: {
    usageDriven: ["energySupply", "transmission"],
    systemDriven: [
      "capacity",
      "distribution",
      "systemBenefitsCharge",
      "transitionalCharge",
      "nycSurcharge",
    ],
  },
};

// NYISO Zone J wholesale price context
export const NYISO_CONTEXT = {
  zone: "ZONE_J",
  avg2024: 41.81,
  avg2025: 74.4,
  yoyChange: 78,
  primaryDrivers: [
    "Natural gas prices at Transco Zone 6 surged 120%",
    "Data center interconnection requests nearly doubled (6,800 MW to 12,000 MW in 4 months)",
    "Summer 2026 reliability shortfall projected at 410-650 MW",
  ],
  source:
    "NYISO White Paper, Impact of National & Global Conditions on Electricity Prices in New York, February 2026",
};

// Approved rate increases
export const RATE_INCREASES = {
  2026: { percent: 3.5, effectiveDate: "2026-01-22" },
  2027: { percent: 3.2, effectiveDate: "2027-01-01" },
  2028: { percent: 3.1, effectiveDate: "2028-01-01" },
};