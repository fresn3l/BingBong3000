import type { MetadataRoute } from "next";
import { getAllPages, getPosts, getSettings } from "@/lib/content/repository";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, pages, posts] = await Promise.all([
    getSettings(),
    getAllPages(),
    getPosts(),
  ]);

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: getSiteUrl(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/resume"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  for (const page of pages) {
    if (!page.published || page.slug === "home") continue;
    entries.push({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: new Date(page.updatedAt),
      changeFrequency: "weekly",
      priority: page.slug === "contact" ? 0.9 : 0.7,
    });
  }

  for (const post of posts) {
    entries.push({
      url: absoluteUrl(`/writing/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Keep settings reference so SEO title changes don't get tree-shaken oddly in edge cases
  void settings.siteName;

  return entries;
}
