create table public.assistance_programs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  eligibility_summary text not null,
  how_to_apply text not null,
  direct_link text,
  created_at timestamptz default now()
);