-- Schedule daily NYISO Zone J price ingestion via pg_cron + pg_net.
-- Run this in your Supabase SQL Editor AFTER you have deployed the edge function.
--
-- NYISO publishes Day-Ahead Market results by ~11 AM ET the prior day.
-- This cron runs at 13:00 UTC (9 AM ET) to ensure yesterday's data is available.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.schedule(
  'ingest-nyiso-daily',
  '0 13 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://ntvbauxjilnzzctuqhol.supabase.co/functions/v1/ingest-nyiso',
    headers := '{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmJhdXhqaWxuenpjdHVxaG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDM2NzQsImV4cCI6MjA4ODQxOTY3NH0.0okiUrrnPcIxV73pZ78GGHb5nLAcdsI6uOwklx4DIDw", "Content-Type": "application/json"}'::jsonb,
    body    := '{}'::jsonb
  );
  $$
);
