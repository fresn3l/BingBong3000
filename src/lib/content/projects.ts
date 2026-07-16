import type { Page, Project, ProjectItem, SiteData } from "./types";

function fromItem(item: ProjectItem, index: number): Project {
  return {
    ...item,
    published: true,
    featured: index < 3,
  };
}

/** Harvest projects embedded in page projectGrid blocks (legacy). */
export function harvestProjectsFromPages(pages: Page[]): Project[] {
  const seen = new Set<string>();
  const out: Project[] = [];
  for (const page of pages) {
    for (const block of page.blocks) {
      if (block.type !== "projectGrid") continue;
      block.projects.forEach((item, index) => {
        if (seen.has(item.id)) return;
        seen.add(item.id);
        out.push(fromItem(item, out.length + index));
      });
    }
  }
  return out;
}

export function ensureProjects(
  projects: Project[] | undefined,
  pages: Page[] = [],
): Project[] {
  if (Array.isArray(projects) && projects.length > 0) {
    return projects.map((p, index) => ({
      id: p.id || crypto.randomUUID(),
      title: p.title || "Untitled project",
      summary: p.summary || "",
      tags: p.tags || [],
      href: p.href,
      imageUrl: p.imageUrl,
      published: p.published !== false,
      featured: Boolean(p.featured) || index < 3,
    }));
  }
  return harvestProjectsFromPages(pages);
}

export function publishedProjects(projects: Project[]): ProjectItem[] {
  return projects.filter((p) => p.published);
}

export function resolveProjectGridItems(
  blockProjects: ProjectItem[],
  siteProjects: Project[],
  useSiteProjects: boolean | undefined,
): ProjectItem[] {
  const preferSite = useSiteProjects !== false && siteProjects.length > 0;
  if (preferSite) return publishedProjects(siteProjects);
  return blockProjects;
}

export function emptyProject(): Project {
  return {
    id: crypto.randomUUID(),
    title: "New project",
    summary: "Short case-study summary.",
    tags: ["Tag"],
    href: "#",
    published: true,
    featured: false,
  };
}

export function withProjects(
  data: Pick<SiteData, "projects" | "pages">,
): Project[] {
  return ensureProjects(data.projects, data.pages);
}
