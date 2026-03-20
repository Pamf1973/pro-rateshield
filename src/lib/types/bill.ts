export interface BillInput {
  totalAmount: number;    // dollars
  kwhUsage: number;       // kilowatt-hours
  billingPeriodStart: string;  // ISO date
  billingPeriodEnd: string;    // ISO date
  serviceClass: "SC1" | "SC2" | "SC9";
}

export interface BillBreakdown {
  energySupply: number;     // cents
  capacity: number;         // cents
  transmission: number;     // cents
  distribution: number;     // cents
  taxesSurcharges: number;  // cents
  usageDrivenTotal: number; // cents
  systemDrivenTotal: number; // cents
  usageDrivenPercent: number;
  systemDrivenPercent: number;
}

export interface BillAttribution {
  component: string;
  explanation: string;
  sourceCitation: string;
  canControl: boolean;
}

export interface DecomposedBill {
  input: BillInput;
  breakdown: BillBreakdown;
  attributions: BillAttribution[];
  recommendations: string[];
}