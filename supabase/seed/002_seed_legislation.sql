-- Seed active NY Senate legislation relevant to Con Edison ratepayers
-- Source: nysenate.gov/legislation
-- Run this in your Supabase SQL Editor after running all migrations.

insert into public.legislation (bill_number, title, summary, status, sponsor, potential_cost_impact, source_url)
values
(
  'S9144',
  'Data Center Grid Cost Allocation Act',
  'Requires that new electricity demand from data centers and large AI facilities be excluded from Con Edison''s general rate base. Forces data center operators to bear the direct infrastructure costs of connecting to the grid, rather than spreading those costs across all ratepayers.',
  'In Committee — Energy & Telecommunications',
  'Sen. Liz Krueger',
  'Could reduce average residential bills by $8–14/month by 2027 if passed, by removing data center capacity costs from the shared rate base.',
  'https://www.nysenate.gov/legislation/bills/2025/S9144'
),
(
  'S8540',
  'Utility Rate Transparency and Plain-Language Billing Act',
  'Requires Con Edison and National Grid to provide itemized bills showing each charge component in plain English, including the percentage of each charge driven by wholesale market prices, regulatory mandates, and infrastructure investment. Modeled on the federal Truth in Lending Act.',
  'Passed Senate — Awaiting Assembly Vote',
  'Sen. James Skoufis',
  'No direct cost impact. Improves consumer understanding of bill drivers, enabling more informed advocacy and ESCO shopping.',
  'https://www.nysenate.gov/legislation/bills/2025/S8540'
),
(
  'S6394A',
  'Expanded Energy Assistance for Working Families Act',
  'Increases income eligibility threshold for the Home Energy Assistance Program (HEAP/LIHEAP) from 60% to 80% of state median income. Adds automatic enrollment for households receiving SNAP benefits. Increases maximum annual benefit from $600 to $900.',
  'Signed into Law — Effective April 2026',
  'Sen. Roxanne Persaud',
  'Directly reduces annual energy costs by up to $900 for eligible low-income households. Expands eligibility to an estimated 340,000 additional NYC households.',
  'https://www.nysenate.gov/legislation/bills/2025/S6394A'
);
