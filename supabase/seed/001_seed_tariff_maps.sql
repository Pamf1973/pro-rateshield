-- Seed Con Edison tariff maps for SC1, SC2, SC9
-- Source: Con Edison Tariff Book, NY PSC Rate Case 25-E-0072
-- Effective: January 1, 2025 (current approved rates)
-- Run this in your Supabase SQL Editor after running all migrations.

-- SC1: Residential Service
insert into public.tariff_maps (service_class, effective_date, components, source_citation)
values (
  'SC1',
  '2025-01-01',
  '{
    "components": [
      {
        "name": "Energy Supply",
        "ratePerKwh": 0.11649,
        "description": "Wholesale electricity commodity cost (NYISO Zone J market rate)",
        "usageDriven": true
      },
      {
        "name": "Merchant Function Charge",
        "ratePerKwh": 0.00196,
        "description": "Con Edison supply procurement and billing administration fee",
        "usageDriven": true
      },
      {
        "name": "Basic Service Charge",
        "fixedCharge": 20.91,
        "description": "Fixed monthly charge for maintaining grid connection",
        "usageDriven": false
      },
      {
        "name": "Delivery",
        "ratePerKwh": 0.17917,
        "description": "Regulated charge for transmitting electricity from power plants to your home",
        "usageDriven": false
      },
      {
        "name": "System Benefit Charge",
        "ratePerKwh": 0.00678,
        "description": "NY State Clean Energy Fund — funds solar, efficiency programs, and low-income assistance",
        "usageDriven": false
      }
    ]
  }',
  'Con Edison SC1 Tariff, NY PSC Rate Case 25-E-0072, effective January 2025'
);

-- SC2: Small Commercial Service (up to 10 kW demand)
insert into public.tariff_maps (service_class, effective_date, components, source_citation)
values (
  'SC2',
  '2025-01-01',
  '{
    "components": [
      {
        "name": "Energy Supply",
        "ratePerKwh": 0.11649,
        "description": "Wholesale electricity commodity cost (NYISO Zone J market rate)",
        "usageDriven": true
      },
      {
        "name": "Merchant Function Charge",
        "ratePerKwh": 0.00196,
        "description": "Con Edison supply procurement and billing administration fee",
        "usageDriven": true
      },
      {
        "name": "Basic Service Charge",
        "fixedCharge": 35.00,
        "description": "Fixed monthly charge for maintaining commercial grid connection",
        "usageDriven": false
      },
      {
        "name": "Delivery",
        "ratePerKwh": 0.16450,
        "description": "Regulated charge for transmitting electricity to your business",
        "usageDriven": false
      },
      {
        "name": "System Benefit Charge",
        "ratePerKwh": 0.00678,
        "description": "NY State Clean Energy Fund",
        "usageDriven": false
      }
    ]
  }',
  'Con Edison SC2 Tariff, NY PSC Rate Case 25-E-0072, effective January 2025'
);

-- SC9: Large Commercial / Industrial Service (over 10 kW demand)
insert into public.tariff_maps (service_class, effective_date, components, source_citation)
values (
  'SC9',
  '2025-01-01',
  '{
    "components": [
      {
        "name": "Energy Supply",
        "ratePerKwh": 0.11649,
        "description": "Wholesale electricity commodity cost (NYISO Zone J market rate)",
        "usageDriven": true
      },
      {
        "name": "Merchant Function Charge",
        "ratePerKwh": 0.00196,
        "description": "Con Edison supply procurement and billing administration fee",
        "usageDriven": true
      },
      {
        "name": "Basic Service Charge",
        "fixedCharge": 150.00,
        "description": "Fixed monthly charge for large commercial service",
        "usageDriven": false
      },
      {
        "name": "Delivery",
        "ratePerKwh": 0.13200,
        "description": "Regulated delivery charge (lower per-kWh rate for high-volume users)",
        "usageDriven": false
      },
      {
        "name": "System Benefit Charge",
        "ratePerKwh": 0.00678,
        "description": "NY State Clean Energy Fund",
        "usageDriven": false
      }
    ]
  }',
  'Con Edison SC9 Tariff, NY PSC Rate Case 25-E-0072, effective January 2025'
);
