# BingBong3000 — Personal professional site + admin page builder

Personal hire-me site for a CS → sales/solutions engineering path, with a full admin customizer for theme, pages, blocks, content, and writing.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Local JSON store** (`data/site.json`) so the site works without Supabase
- **Supabase** (optional) for auth, Postgres persistence, and media storage
- Deploy on **Vercel**

## Quick start

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin editor

1. Go to [http://localhost:3000/editor/login](http://localhost:3000/editor/login)
2. Local mode password: `changeme` (or `ADMIN_PASSWORD` from `.env.local`)
3. Email is only required when Supabase auth is configured
4. Edit theme / pages / blocks / writing → **Save**

Public pages: `/`, `/about`, `/work`, `/writing`, `/contact`, and `/writing/[slug]` for posts.

## Environment variables

See [`.env.local.example`](.env.local.example).

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Local editor password when Supabase is not configured |
| `ADMIN_SESSION_SECRET` | Signs the local admin cookie |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side writes / storage (keep secret) |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` | Optional email delivery for the contact form |

Without Supabase, content persists to `data/site.json` and uploads go to `public/uploads/`.

## Supabase setup

1. Create a Supabase project
2. Run [`supabase/migrations/001_initial.sql`](supabase/migrations/001_initial.sql) in the SQL editor
3. Optionally run [`supabase/seed.sql`](supabase/seed.sql), or Save once from the editor after connecting
4. Create auth user (Authentication → Users) — no public signup
5. Create a public Storage bucket named `site-media`
6. Fill `.env.local` and restart `npm run dev`

When Supabase env vars are present, the app reads/writes there (with local file as fallback).

## Editor capabilities

- **Theme:** colors, fonts, spacing, site name, SEO, social links
- **Pages:** create, rename, publish toggle, delete
- **Blocks:** add / remove / drag-reorder section types (hero, rich text, projects, articles, CTA, contact form, image, stats, services)
- **Content fields:** text, links, images (upload)
- **Writing:** original posts and curated external articles
- **Live preview** in the editor

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import in Vercel
3. Set the same env vars (for production, configure Supabase so saves persist across serverless instances)
4. Deploy

Local file persistence does **not** survive on Vercel’s read-only filesystem — use Supabase for production saves.

## Open questions

See [`QUESTIONS_NEEDED.md`](QUESTIONS_NEEDED.md) for deferred discovery questions (domain, brand assets, Calendly, analytics, etc.).
