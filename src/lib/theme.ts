import type { CSSProperties } from "react";
import type { ThemeSettings } from "@/lib/content/types";

export function themeToCssVars(theme: ThemeSettings): CSSProperties {
  return {
    ["--color-bg" as string]: theme.colors.background,
    ["--color-fg" as string]: theme.colors.foreground,
    ["--color-muted" as string]: theme.colors.muted,
    ["--color-accent" as string]: theme.colors.accent,
    ["--color-accent-fg" as string]: theme.colors.accentForeground,
    ["--color-surface" as string]: theme.colors.surface,
    ["--color-border" as string]: theme.colors.border,
    ["--font-display" as string]: `"${theme.fonts.display}", Georgia, serif`,
    ["--font-body" as string]: `"${theme.fonts.body}", system-ui, sans-serif`,
    ["--section-y" as string]: theme.spacing.sectionY,
    ["--content-max" as string]: theme.spacing.contentMax,
  };
}

export const FONT_OPTIONS = [
  "Fraunces",
  "Sora",
  "Space Grotesk",
  "IBM Plex Sans",
  "Source Serif 4",
  "DM Sans",
  "Libre Baskerville",
];
