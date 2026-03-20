create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  borough text,
  building_type text,
  service_class text default 'SC1',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);