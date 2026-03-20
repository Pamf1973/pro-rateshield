-- Seed energy assistance programs available to Con Edison customers
-- Source: Con Edison, NYC HRA, NY State OTDA
-- Run this in your Supabase SQL Editor after running all migrations.

insert into public.assistance_programs (name, eligibility_summary, how_to_apply, direct_link)
values
(
  'HEAP / LIHEAP (Home Energy Assistance Program)',
  'Income at or below 60% of NY State median income (expanded to 80% under S6394A effective April 2026). Household must pay for heat or electricity. Available year-round; Emergency HEAP opens November–March.',
  'Apply online at myBenefits.ny.gov or in person at your local NYC HRA office. Have your Con Edison account number, proof of income (last 30 days), and ID ready. Benefits are paid directly to Con Edison.',
  'https://www.mybenefits.ny.gov'
),
(
  'Con Edison EnergyShare',
  'Open to all Con Edison customers regardless of income with a past-due balance on their account. Priority given to customers facing disconnection. Available funds are limited — apply early in the heating season.',
  'Call Con Edison at 1-800-752-6633 and ask for EnergyShare, or apply through a participating community organization. Con Edison will connect you to a local agency that administers funds.',
  'https://www.coned.com/en/save-money/payment-plans-and-assistance-programs/energyshare'
),
(
  'Deferred Payment Agreement (DPA)',
  'Available to any Con Edison residential customer with a past-due balance. Allows you to pay your past-due amount in installments added to your current monthly bill. No income requirement.',
  'Call Con Edison at 1-800-752-6633 or log in to your account at coned.com. Request a Deferred Payment Agreement. You can negotiate the down payment amount (typically 10–25% of past-due balance).',
  'https://www.coned.com/en/save-money/payment-plans-and-assistance-programs/deferred-payment-agreement'
),
(
  'Disconnection Protection (Cold Weather Rule)',
  'Con Edison cannot shut off heat-related service (gas or electric heat) between November 1 and April 15 for households with children under 18, elderly (62+), or disabled members, regardless of income.',
  'Proactively notify Con Edison if your household qualifies. Call 1-800-752-6633 to register. If you receive a shut-off notice during the protected period, call immediately — shutoff is prohibited by NY PSC Order.',
  'https://www.coned.com/en/save-money/payment-plans-and-assistance-programs/disconnection-protection'
);
