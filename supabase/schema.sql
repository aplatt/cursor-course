create extension if not exists "pgcrypto";

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  key_value text not null,
  key_type text not null default 'development',
  monthly_limit integer,
  limit_enabled boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  last_used timestamptz
);

create index if not exists api_keys_created_at_idx on public.api_keys (created_at desc);
create index if not exists api_keys_key_type_idx on public.api_keys (key_type);
