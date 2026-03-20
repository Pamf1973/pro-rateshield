export interface Recommendation {
  type: "actionable" | "honest";
  title: string;
  description: string;
  estimatedSavings?: string;
}

export function generateRecommendations(
  usageDrivenPercent: number,
  systemDrivenPercent: number,
  kwhUsage: number,
  totalCents: number
): { actionable: Recommendation[]; honest: Recommendation[] } {
  const actionable: Recommendation[] = [
    {
      type: "actionable",
      title: "Shift heavy usage to off-peak hours",
      description:
        "Run your dishwasher, laundry, and other heavy appliances after 11 PM when wholesale prices are lowest. Time-of-use rates mean off-peak electricity costs significantly less.",
      estimatedSavings: "$8–15/month",
    },
    {
      type: "actionable",
      title: "Check your AC unit efficiency",
      description:
        "If your window AC is more than 8 years old, replacing it with an Energy Star unit can cut cooling costs by 30-40%. This is especially impactful during NYC's summer peak when prices spike.",
      estimatedSavings: "$15–25/month (summer)",
    },
    {
      type: "actionable",
      title: "Unplug phantom loads",
      description:
        "Electronics on standby (TV, game consoles, chargers, cable boxes) draw power 24/7. A smart power strip can eliminate $5-10/month in phantom usage.",
      estimatedSavings: "$5–10/month",
    },
  ];

  if (kwhUsage > 800) {
    actionable.push({
      type: "actionable",
      title: "Your usage is above the NYC average",
      description:
        "The average NYC apartment uses 500-600 kWh/month. At your usage level, an energy audit could identify specific appliances or habits driving the excess. Con Edison offers free home energy assessments.",
      estimatedSavings: "$20–40/month",
    });
  }

  const honest: Recommendation[] = [
    {
      type: "honest",
      title: `${Math.round(systemDrivenPercent)}% of your bill is outside your control`,
      description: `$${((totalCents * systemDrivenPercent) / 10000).toFixed(2)} of your bill comes from wholesale prices, capacity charges, delivery infrastructure, and taxes. No change in your behavior will affect this portion. These costs are set by NYISO markets, NY PSC rate cases, and state/city tax policy.`,
    },
    {
      type: "honest",
      title: "Wholesale prices nearly doubled in 2025",
      description:
        "NYISO Zone J wholesale prices jumped 78% in one year ($41.81 → $74.40/MWh). This was driven by natural gas price surges and data center demand growth — not residential consumption. Every Con Edison customer is absorbing this increase.",
    },
    {
      type: "honest",
      title: "Rate increases are locked in through 2028",
      description:
        "The NY PSC has already approved Con Edison rate increases: 3.5% for 2026, 3.2% for 2027, and 3.1% for 2028. These are automatic and will hit your bill regardless of your usage. Three bills in the NY Senate aim to address the root causes.",
    },
  ];

  return { actionable, honest };
}