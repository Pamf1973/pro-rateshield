import { NYISO_CONTEXT } from "../data/tariff-sc1";

export interface Attribution {
  component: string;
  label: string;
  explanation: string;
  source: string;
  canControl: boolean;
}

export function buildAttributions(): Attribution[] {
  return [
    {
      component: "energySupply",
      label: "Energy Supply",
      explanation: `This is the cost of the actual electricity you used. It's based on NYISO wholesale prices for Zone J (NYC). In 2025, wholesale prices averaged $${NYISO_CONTEXT.avg2025}/MWh — up ${NYISO_CONTEXT.yoyChange}% from $${NYISO_CONTEXT.avg2024}/MWh in 2024. The primary drivers: natural gas prices surged and data center demand nearly doubled.`,
      source: NYISO_CONTEXT.source,
      canControl: true,
    },
    {
      component: "capacity",
      label: "Capacity Charges",
      explanation:
        "This pays for guaranteeing enough power plants exist to meet peak demand in NYC. It's shared across all Con Edison customers regardless of your personal usage. You cannot reduce this by using less electricity. NYISO's capacity auction sets these costs based on projected demand — and demand is surging from data centers.",
      source: "NYISO ICAP Market Reports, Zone J Capacity Auction Results",
      canControl: false,
    },
    {
      component: "transmission",
      label: "Transmission",
      explanation:
        "This covers moving electricity from power plants across high-voltage lines into NYC. It includes NYISO transmission charges and ancillary services (keeping the grid stable). These costs rise when the grid is congested or when new infrastructure is needed.",
      source: "NYISO Transmission Service Charges, Con Edison Tariff Schedule",
      canControl: false,
    },
    {
      component: "distribution",
      label: "Distribution",
      explanation:
        "This is what Con Edison charges to deliver electricity through local power lines to your home. It includes a fixed basic service charge ($16.58/month) plus a per-kWh delivery rate. These rates were increased by 3.5% effective January 2026 as approved by the NY Public Service Commission.",
      source:
        "NY PSC, Con Edison Rate Case, approved January 22, 2026. 3.5% electric increase.",
      canControl: false,
    },
    {
      component: "taxesSurcharges",
      label: "Taxes & Surcharges",
      explanation:
        "This includes NYC sales tax (8.875%), the System Benefits Charge (funding clean energy programs), the Transitional Charge (legacy cost recovery), and NYC-specific surcharges. These are set by law and regulation — not by your usage.",
      source: "NYC Department of Finance, NY PSC System Benefits Charge Order",
      canControl: false,
    },
  ];
}