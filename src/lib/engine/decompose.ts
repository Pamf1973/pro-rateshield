import { applyTariff } from "./tariff";
import { buildAttributions, Attribution } from "./attribution";
import { generateRecommendations, Recommendation } from "./recommend";

export interface DecomposeInput {
  totalAmount: number;
  kwhUsage: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
}

export interface ComponentBreakdown {
  name: string;
  label: string;
  cents: number;
  dollars: number;
  percent: number;
  canControl: boolean;
}

export interface DecomposeResult {
  input: DecomposeInput;
  components: ComponentBreakdown[];
  usageDrivenCents: number;
  systemDrivenCents: number;
  usageDrivenPercent: number;
  systemDrivenPercent: number;
  totalCalculatedCents: number;
  attributions: Attribution[];
  actionableRecs: Recommendation[];
  honestRecs: Recommendation[];
}

export function decomposeBill(input: DecomposeInput): DecomposeResult {
  const tariffResult = applyTariff(input.kwhUsage);
  const totalCalculatedCents =
    tariffResult.energySupply +
    tariffResult.capacity +
    tariffResult.transmission +
    tariffResult.distribution +
    tariffResult.taxesSurcharges;

  const userTotalCents = Math.round(input.totalAmount * 100);
  const scaleFactor =
    totalCalculatedCents > 0 ? userTotalCents / totalCalculatedCents : 1;

  const scaled = {
    energySupply: Math.round(tariffResult.energySupply * scaleFactor),
    capacity: Math.round(tariffResult.capacity * scaleFactor),
    transmission: Math.round(tariffResult.transmission * scaleFactor),
    distribution: Math.round(tariffResult.distribution * scaleFactor),
    taxesSurcharges: Math.round(tariffResult.taxesSurcharges * scaleFactor),
  };

  const total =
    scaled.energySupply +
    scaled.capacity +
    scaled.transmission +
    scaled.distribution +
    scaled.taxesSurcharges;

  const usageDrivenCents = scaled.energySupply + scaled.transmission;
  const systemDrivenCents =
    scaled.capacity + scaled.distribution + scaled.taxesSurcharges;

  const usageDrivenPercent = total > 0 ? (usageDrivenCents / total) * 100 : 0;
  const systemDrivenPercent = total > 0 ? (systemDrivenCents / total) * 100 : 0;

  const components: ComponentBreakdown[] = [
    {
      name: "energySupply",
      label: "Energy Supply",
      cents: scaled.energySupply,
      dollars: scaled.energySupply / 100,
      percent: total > 0 ? (scaled.energySupply / total) * 100 : 0,
      canControl: true,
    },
    {
      name: "capacity",
      label: "Capacity Charges",
      cents: scaled.capacity,
      dollars: scaled.capacity / 100,
      percent: total > 0 ? (scaled.capacity / total) * 100 : 0,
      canControl: false,
    },
    {
      name: "transmission",
      label: "Transmission",
      cents: scaled.transmission,
      dollars: scaled.transmission / 100,
      percent: total > 0 ? (scaled.transmission / total) * 100 : 0,
      canControl: false,
    },
    {
      name: "distribution",
      label: "Distribution",
      cents: scaled.distribution,
      dollars: scaled.distribution / 100,
      percent: total > 0 ? (scaled.distribution / total) * 100 : 0,
      canControl: false,
    },
    {
      name: "taxesSurcharges",
      label: "Taxes & Surcharges",
      cents: scaled.taxesSurcharges,
      dollars: scaled.taxesSurcharges / 100,
      percent: total > 0 ? (scaled.taxesSurcharges / total) * 100 : 0,
      canControl: false,
    },
  ];

  const attributions = buildAttributions();
  const { actionable, honest } = generateRecommendations(
    usageDrivenPercent,
    systemDrivenPercent,
    input.kwhUsage,
    total
  );

  return {
    input,
    components,
    usageDrivenCents,
    systemDrivenCents,
    usageDrivenPercent,
    systemDrivenPercent,
    totalCalculatedCents: total,
    attributions,
    actionableRecs: actionable,
    honestRecs: honest,
  };
}