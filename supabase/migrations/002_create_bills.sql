create table public.bills (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  total_amount integer not null,
  kwh_usage integer not null,
  billing_period_start date not null,
  billing_period_end date not null,
  service_class text default 'SC1',
  created_at timestamptz default now()
);

alter table public.bills enable row level security;

create policy "Users can view own bills"
  on public.bills for select using (auth.uid() = user_id);

create policy "Users can insert own bills"
  on public.bills for insert with check (auth.uid() = user_id);