create table public.tariff_maps (
  id uuid default gen_random_uuid() primary key,
  service_class text not null,
  effective_date date not null,
  components jsonb not null,
  source_citation text,
  created_at timestamptz default now()
);

create index idx_tariff_maps_lookup
  on public.tariff_maps (service_class, effective_date);