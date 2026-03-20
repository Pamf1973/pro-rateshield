-- Allow anonymous bill operations for pre-auth MVP.
-- Once user authentication is added, these policies will coexist with the
-- existing "Users can view/insert own bills" policies.
-- Run this in your Supabase SQL Editor.

CREATE POLICY "Allow anonymous bill inserts"
  ON public.bills FOR INSERT
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Allow reading anonymous bills"
  ON public.bills FOR SELECT
  USING (user_id IS NULL);
