"use client";

import type { Page, SiteData } from "@/lib/content/types";
import { Blocks } from "@/components/blocks/BlockRenderer";
import { themeToCssVars } from "@/lib/theme";

export function LivePreview({
  data,
  page,
}: {
  data: SiteData;
  page: Page | null;
}) {
  const cssVars = themeToCssVars(data.settings.theme);

  return (
    <div className="max-h-[calc(100vh-53px)] overflow-y-auto bg-zinc-950 p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-zinc-500">
        <span>Live preview {page ? `· /${page.slug === "home" ? "" : page.slug}` : ""}</span>
        <span>Unsaved changes appear here instantly — click Save to persist</span>
      </div>
      <div
        className="min-h-[70vh] overflow-hidden border border-zinc-800"
        style={{
          ...cssVars,
          background: "var(--color-bg)",
          color: "var(--color-fg)",
          fontFamily: "var(--font-body)",
          ["--color-bg" as string]: data.settings.theme.colors.background,
          ["--color-fg" as string]: data.settings.theme.colors.foreground,
          ["--color-muted" as string]: data.settings.theme.colors.muted,
          ["--color-accent" as string]: data.settings.theme.colors.accent,
          ["--color-accent-fg" as string]:
            data.settings.theme.colors.accentForeground,
          ["--color-surface" as string]: data.settings.theme.colors.surface,
          ["--color-border" as string]: data.settings.theme.colors.border,
        }}
      >
        <div className="border-b border-[var(--color-border)] px-6 py-4 text-sm">
          <span className="font-[family-name:var(--font-display)] text-[var(--color-fg)]">
            {data.settings.siteName}
          </span>
          <span className="ml-4 text-[var(--color-muted)]">
            {data.settings.nav.map((n) => n.label).join(" · ")}
          </span>
        </div>
        {page ? (
          <Blocks blocks={page.blocks} />
        ) : (
          <p className="p-8 text-[var(--color-muted)]">Select a page to preview.</p>
        )}
      </div>
    </div>
  );
}
