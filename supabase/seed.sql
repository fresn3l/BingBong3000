-- Optional: seed Supabase after running 001_initial.sql
-- Prefer using the app's local data/site.json + Save once Supabase is connected,
-- or insert from your exported JSON.

-- Minimal settings row so getSiteData can read from Supabase:
-- (Replace the jsonb payload with a full export from data/site.json settings)

insert into site_settings (id, data)
values (
  1,
  '{
    "siteName": "Alex Rivera",
    "tagline": "Solutions engineer bridging product, code, and customers",
    "seoTitle": "Alex Rivera — Solutions Engineer",
    "seoDescription": "Computer science background. Sales and solutions engineering focus.",
    "nav": [
      {"label":"Home","href":"/"},
      {"label":"About","href":"/about"},
      {"label":"Work","href":"/work"},
      {"label":"Writing","href":"/writing"},
      {"label":"Contact","href":"/contact"}
    ],
    "footerText": "Open to solutions engineering and sales engineering roles.",
    "social": {"linkedin":"https://linkedin.com","github":"https://github.com","email":"hello@example.com"},
    "resumeUrl": "#",
    "theme": {
      "colors": {
        "background":"#0c1210",
        "foreground":"#e8f0ea",
        "muted":"#9bb0a2",
        "accent":"#3dd68c",
        "accentForeground":"#062116",
        "surface":"#15201a",
        "border":"#2a3b32"
      },
      "fonts": {"display":"Fraunces","body":"Sora"},
      "spacing": {"sectionY":"5rem","contentMax":"72rem"}
    }
  }'::jsonb
)
on conflict (id) do nothing;

-- Create an admin user in Authentication → Users in the Supabase dashboard.
-- Create a public storage bucket named: site-media
