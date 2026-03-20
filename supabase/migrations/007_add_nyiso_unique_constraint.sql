-- Add unique constraint on (timestamp, zone) to enable upsert without duplicates.
-- Run this in your Supabase SQL Editor before deploying the ingest-nyiso edge function.

ALTER TABLE public.nyiso_prices
  ADD CONSTRAINT nyiso_prices_timestamp_zone_key UNIQUE (timestamp, zone);
