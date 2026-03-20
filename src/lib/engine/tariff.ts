import { SC1_TARIFF } from "../data/tariff-sc1";

export interface TariffResult {
  energySupply: number;
  capacity: number;
  transmission: number;
  distribution: number;
  taxesSurcharges: number;
  basicServiceCharge: number;
}

export function applyTariff(kwhUsage: number): TariffResult {
  const t = SC1_TARIFF;
  const r = t.rates;

  const energySupply = Math.round(kwhUsage * r.energySupply);
  const capacity = Math.round(kwhUsage * r.capacity);
  const transmission = Math.round(kwhUsage * r.transmission);
  const distribution = Math.round(
    kwhUsage * r.distribution + t.basicServiceCharge
  );
  const subtotal = energySupply + capacity + transmission + distribution;

  const sbc = Math.round(kwhUsage * r.systemBenefitsCharge);
  const rtc = Math.round(kwhUsage * r.transitionalCharge);
  const nyc = Math.round(kwhUsage * r.nycSurcharge);
  const taxes = Math.round(subtotal * t.taxRate);
  const taxesSurcharges = sbc + rtc + nyc + taxes;

  return {
    energySupply,
    capacity,
    transmission,
    distribution,
    taxesSurcharges,
    basicServiceCharge: t.basicServiceCharge,
  };
}