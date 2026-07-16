import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { seedData } from "./seed";
import type {
  ContactLead,
  Page,
  Post,
  SiteData,
  SiteSettings,
} from "./types";
import { ensureTheme } from "@/lib/theme";
import { ensureResume } from "./resume";
import { ensureProjects } from "./projects";

const DATA_PATH = path.join(process.cwd(), "data", "site.json");

function normalizeSiteData(data: SiteData): SiteData {
  const pages = data.pages || [];
  return {
    ...data,
    settings: {
      ...data.settings,
      theme: ensureTheme(data.settings.theme),
      resumeUrl: data.settings.resumeUrl || "/resume",
    },
    resume: ensureResume(data.resume),
    projects: ensureProjects(data.projects, pages),
    posts: data.posts || [],
    leads: data.leads || [],
    pages,
  };
}

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

async function ensureLocalFile(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return normalizeSiteData(JSON.parse(raw) as SiteData);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(seedData, null, 2), "utf8");
    return structuredClone(seedData);
  }
}

async function writeLocal(data: SiteData) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

async function loadFromSupabase(): Promise<SiteData | null> {
  try {
    const sb = adminClient();
    const [{ data: settingsRow }, { data: pages }, { data: posts }, { data: leads }] =
      await Promise.all([
        sb.from("site_settings").select("data").eq("id", 1).maybeSingle(),
        sb.from("pages").select("*").order("slug"),
        sb.from("posts").select("*").order("published_at", { ascending: false }),
        sb.from("leads").select("*").order("created_at", { ascending: false }),
      ]);

    if (!settingsRow?.data) return null;

    const raw = settingsRow.data as
      | SiteSettings
      | {
          settings: SiteSettings;
          resume?: SiteData["resume"];
          projects?: SiteData["projects"];
        };

    const settings =
      raw && typeof raw === "object" && "settings" in raw
        ? raw.settings
        : (raw as SiteSettings);
    const resume =
      raw && typeof raw === "object" && "settings" in raw
        ? raw.resume
        : undefined;
    const projects =
      raw && typeof raw === "object" && "settings" in raw
        ? raw.projects
        : undefined;

    const mappedPages = (pages || []).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      published: p.published,
      seoDescription: p.seo_description ?? undefined,
      blocks: p.blocks,
      updatedAt: p.updated_at,
    }));

    return {
      settings,
      resume: ensureResume(resume),
      projects: ensureProjects(projects, mappedPages),
      pages: mappedPages,
      posts: (posts || []).map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        body: p.body,
        kind: p.kind,
        externalUrl: p.external_url ?? undefined,
        source: p.source ?? undefined,
        published: p.published,
        publishedAt: p.published_at,
      })),
      leads: (leads || []).map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        company: l.company ?? undefined,
        message: l.message,
        createdAt: l.created_at,
      })),
    };
  } catch {
    return null;
  }
}

async function saveToSupabase(data: SiteData) {
  const sb = adminClient();
  await sb.from("site_settings").upsert({
    id: 1,
    data: {
      settings: data.settings,
      resume: data.resume,
      projects: data.projects,
    },
    updated_at: new Date().toISOString(),
  });

  for (const page of data.pages) {
    await sb.from("pages").upsert({
      id: page.id,
      slug: page.slug,
      title: page.title,
      published: page.published,
      seo_description: page.seoDescription ?? null,
      blocks: page.blocks,
      updated_at: page.updatedAt,
    });
  }

  for (const post of data.posts) {
    await sb.from("posts").upsert({
      id: post.id,
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      body: post.body,
      kind: post.kind,
      external_url: post.externalUrl ?? null,
      source: post.source ?? null,
      published: post.published,
      published_at: post.publishedAt,
    });
  }
}

export async function getSiteData(): Promise<SiteData> {
  if (isSupabaseConfigured()) {
    const remote = await loadFromSupabase();
    if (remote) return normalizeSiteData(remote);
  }
  return ensureLocalFile();
}

export async function saveSiteData(data: SiteData): Promise<SiteData> {
  const next = normalizeSiteData({
    ...data,
    pages: data.pages.map((p) => ({
      ...p,
      updatedAt: new Date().toISOString(),
    })),
  });

  const isProd = process.env.NODE_ENV === "production";

  if (isProd && !isSupabaseConfigured()) {
    throw new Error(
      "Production saves require Supabase. Set NEXT_PUBLIC_SUPABASE_URL and keys.",
    );
  }

  if (isSupabaseConfigured()) {
    await saveToSupabase(next);
    // Still mirror locally in development for easy inspection.
    if (!isProd) {
      await writeLocal(next);
    }
    return next;
  }

  await writeLocal(next);
  return next;
}

export async function getSettings(): Promise<SiteSettings> {
  const data = await getSiteData();
  return data.settings;
}

export async function getPages(): Promise<Page[]> {
  const data = await getSiteData();
  return data.pages.filter((p) => p.published);
}

export async function getAllPages(): Promise<Page[]> {
  const data = await getSiteData();
  return data.pages;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const data = await getSiteData();
  const normalized = slug === "" || slug === "/" ? "home" : slug;
  return data.pages.find((p) => p.slug === normalized && p.published) ?? null;
}

export async function getPosts(): Promise<Post[]> {
  const data = await getSiteData();
  return data.posts.filter((p) => p.published);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await getSiteData();
  return data.posts.find((p) => p.slug === slug && p.published) ?? null;
}

export async function addLead(
  lead: Omit<ContactLead, "id" | "createdAt">,
): Promise<ContactLead> {
  const entry: ContactLead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...lead,
  };

  if (isSupabaseConfigured()) {
    try {
      const sb = adminClient();
      await sb.from("leads").insert({
        id: entry.id,
        name: entry.name,
        email: entry.email,
        company: entry.company ?? null,
        message: entry.message,
        created_at: entry.createdAt,
      });
    } catch {
      // local fallback below
    }
  }

  const data = await getSiteData();
  data.leads = [entry, ...data.leads];
  await writeLocal(data);
  return entry;
}

export async function getResume() {
  const data = await getSiteData();
  return data.resume;
}

export async function getProjects() {
  const data = await getSiteData();
  return data.projects.filter((p) => p.published);
}

export { isSupabaseConfigured };
