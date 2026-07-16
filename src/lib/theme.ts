import type { CSSProperties } from "react";
import type { ThemeColors, ThemeSettings } from "@/lib/content/types";

export const DEFAULT_LIGHT_COLORS: ThemeColors = {
  background: "#f3f4f1",
  foreground: "#14233a",
  muted: "#5f6d7c",
  accent: "#2c4a3e",
  accentForeground: "#f3f4f1",
  surface: "#ffffff",
  border: "#d4d9d2",
};

export const DEFAULT_DARK_COLORS: ThemeColors = {
  background: "#0e1624",
  foreground: "#e6e9e4",
  muted: "#8b97a5",
  accent: "#8faf9c",
  accentForeground: "#0e1624",
  surface: "#172233",
  border: "#2a3548",
};

export function themeToCssVars(theme: ThemeSettings): CSSProperties {
  const light = theme.colors;
  const dark = theme.darkColors || DEFAULT_DARK_COLORS;

  return {
    ["--color-bg" as string]: light.background,
    ["--color-fg" as string]: light.foreground,
    ["--color-muted" as string]: light.muted,
    ["--color-accent" as string]: light.accent,
    ["--color-accent-fg" as string]: light.accentForeground,
    ["--color-surface" as string]: light.surface,
    ["--color-border" as string]: light.border,
    ["--color-bg-dark" as string]: dark.background,
    ["--color-fg-dark" as string]: dark.foreground,
    ["--color-muted-dark" as string]: dark.muted,
    ["--color-accent-dark" as string]: dark.accent,
    ["--color-accent-fg-dark" as string]: dark.accentForeground,
    ["--color-surface-dark" as string]: dark.surface,
    ["--color-border-dark" as string]: dark.border,
    ["--font-display" as string]: `"${theme.fonts.display}", "Times New Roman", serif`,
    ["--font-body" as string]: `"${theme.fonts.body}", system-ui, sans-serif`,
    ["--section-y" as string]: theme.spacing.sectionY,
    ["--content-max" as string]: theme.spacing.contentMax,
  };
}

export function ensureTheme(theme: ThemeSettings): ThemeSettings {
  return {
    ...theme,
    darkColors: theme.darkColors || DEFAULT_DARK_COLORS,
    colors: theme.colors || DEFAULT_LIGHT_COLORS,
  };
}

export const FONT_OPTIONS = [
  "Cormorant Garamond",
  "Source Sans 3",
  "Libre Baskerville",
  "Source Serif 4",
  "IBM Plex Sans",
  "Newsreader",
  "Fraunces",
  "Sora",
];

export const THEME_STORAGE_KEY = "bb-color-mode";
