create table public.legislation (
  id uuid default gen_random_uuid() primary key,
  bill_number text not null,
  title text not null,
  summary text not null,
  status text not null,
  sponsor text,
  potential_cost_impact text,
  source_url text,
  last_updated timestamptz default now(),
  created_at timestamptz default now()
);