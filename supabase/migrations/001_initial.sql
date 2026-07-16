-- BingBong3000 initial schema
-- Run in Supabase SQL editor or via CLI

create extension if not exists "pgcrypto";

create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists pages (
  id text primary key,
  slug text not null unique,
  title text not null,
  published boolean not null default true,
  seo_description text,
  blocks jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists posts (
  id text primary key,
  slug text not null unique,
  title text not null,
  summary text not null default '',
  body text not null default '',
  kind text not null check (kind in ('original', 'curated')),
  external_url text,
  source text,
  published boolean not null default true,
  published_at timestamptz not null default now()
);

create table if not exists leads (
  id text primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists media (
  id text primary key,
  path text not null,
  url text not null,
  alt text,
  created_at timestamptz not null default now()
);

-- Storage bucket for media (create via dashboard if needed): site-media

alter table site_settings enable row level security;
alter table pages enable row level security;
alter table posts enable row level security;
alter table leads enable row level security;
alter table media enable row level security;

-- Public read for published content
create policy "Public read settings"
  on site_settings for select
  using (true);

create policy "Public read published pages"
  on pages for select
  using (published = true);

create policy "Public read published posts"
  on posts for select
  using (published = true);

create policy "Public read media"
  on media for select
  using (true);

-- Authenticated admin full access
create policy "Admin all settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin all pages"
  on pages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin all posts"
  on posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin read leads"
  on leads for select
  using (auth.role() = 'authenticated');

create policy "Anyone insert leads"
  on leads for insert
  with check (true);

create policy "Admin all media"
  on media for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
