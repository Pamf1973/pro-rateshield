create table public.nyiso_prices (
  id bigint generated always as identity primary key,
  timestamp timestamptz not null,
  zone text not null default 'ZONE_J',
  lbmp_total numeric(10,2),
  lbmp_energy numeric(10,2),
  lbmp_congestion numeric(10,2),
  lbmp_losses numeric(10,2),
  created_at timestamptz default now()
);

create index idx_nyiso_prices_timestamp on public.nyiso_prices (timestamp);
create index idx_nyiso_prices_zone on public.nyiso_prices (zone);