export interface TariffComponent {
  name: string;
  ratePerKwh?: number;
  fixedCharge?: number;
  description: string;
  usageDriven: boolean;
}

export interface TariffMap {
  serviceClass: string;
  effectiveDate: string;
  components: TariffComponent[];
  sourceCitation: string;
}