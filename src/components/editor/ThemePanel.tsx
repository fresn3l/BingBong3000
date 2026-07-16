"use client";

import { useState } from "react";
import type { SiteSettings, ThemeColors } from "@/lib/content/types";
import { DEFAULT_DARK_COLORS, FONT_OPTIONS } from "@/lib/theme";

const COLOR_FIELDS = [
  ["background", "Background"],
  ["foreground", "Foreground"],
  ["muted", "Muted"],
  ["accent", "Accent"],
  ["accentForeground", "Accent text"],
  ["surface", "Surface"],
  ["border", "Border"],
] as const;

export function ThemePanel({
  settings,
  onChange,
}: {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
}) {
  const theme = settings.theme;
  const darkColors = theme.darkColors || DEFAULT_DARK_COLORS;
  const [palette, setPalette] = useState<"light" | "dark">("light");

  function setColor(key: keyof ThemeColors, value: string) {
    if (palette === "light") {
      onChange({
        ...settings,
        theme: { ...theme, colors: { ...theme.colors, [key]: value } },
      });
      return;
    }
    onChange({
      ...settings,
      theme: {
        ...theme,
        darkColors: { ...darkColors, [key]: value },
      },
    });
  }

  const active = palette === "light" ? theme.colors : darkColors;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Site
        </h2>
        <label className="mt-3 block">
          <span className="editor-label">Site name</span>
          <input
            className="editor-input"
            value={settings.siteName}
            onChange={(e) => onChange({ ...settings, siteName: e.target.value })}
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">Tagline</span>
          <input
            className="editor-input"
            value={settings.tagline}
            onChange={(e) => onChange({ ...settings, tagline: e.target.value })}
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">SEO title</span>
          <input
            className="editor-input"
            value={settings.seoTitle}
            onChange={(e) => onChange({ ...settings, seoTitle: e.target.value })}
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">SEO description</span>
          <textarea
            className="editor-input"
            rows={3}
            value={settings.seoDescription}
            onChange={(e) =>
              onChange({ ...settings, seoDescription: e.target.value })
            }
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">Footer text</span>
          <input
            className="editor-input"
            value={settings.footerText}
            onChange={(e) => onChange({ ...settings, footerText: e.target.value })}
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">Resume URL</span>
          <input
            className="editor-input"
            value={settings.resumeUrl || ""}
            onChange={(e) => onChange({ ...settings, resumeUrl: e.target.value })}
          />
        </label>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Colors
          </h2>
          <div className="flex gap-1 text-xs">
            <button
              type="button"
              onClick={() => setPalette("light")}
              className={`px-2 py-1 ${
                palette === "light" ? "bg-zinc-700 text-white" : "text-zinc-400"
              }`}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setPalette("dark")}
              className={`px-2 py-1 ${
                palette === "dark" ? "bg-zinc-700 text-white" : "text-zinc-400"
              }`}
            >
              Dark
            </button>
          </div>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Corporate / country-club palette. Visitors toggle light/dark on the public site.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {COLOR_FIELDS.map(([key, label]) => (
            <label key={key} className="block">
              <span className="editor-label">{label}</span>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={active[key]}
                  onChange={(e) => setColor(key, e.target.value)}
                  className="h-9 w-10 cursor-pointer border border-zinc-700 bg-transparent"
                />
                <input
                  className="editor-input"
                  value={active[key]}
                  onChange={(e) => setColor(key, e.target.value)}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Fonts
        </h2>
        <label className="mt-3 block">
          <span className="editor-label">Display</span>
          <select
            className="editor-input"
            value={theme.fonts.display}
            onChange={(e) =>
              onChange({
                ...settings,
                theme: {
                  ...theme,
                  fonts: { ...theme.fonts, display: e.target.value },
                },
              })
            }
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block">
          <span className="editor-label">Body</span>
          <select
            className="editor-input"
            value={theme.fonts.body}
            onChange={(e) =>
              onChange({
                ...settings,
                theme: {
                  ...theme,
                  fonts: { ...theme.fonts, body: e.target.value },
                },
              })
            }
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Spacing
        </h2>
        <label className="mt-3 block">
          <span className="editor-label">Section vertical padding</span>
          <input
            className="editor-input"
            value={theme.spacing.sectionY}
            onChange={(e) =>
              onChange({
                ...settings,
                theme: {
                  ...theme,
                  spacing: { ...theme.spacing, sectionY: e.target.value },
                },
              })
            }
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">Content max width</span>
          <input
            className="editor-input"
            value={theme.spacing.contentMax}
            onChange={(e) =>
              onChange({
                ...settings,
                theme: {
                  ...theme,
                  spacing: { ...theme.spacing, contentMax: e.target.value },
                },
              })
            }
          />
        </label>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Social
        </h2>
        <label className="mt-3 block">
          <span className="editor-label">LinkedIn</span>
          <input
            className="editor-input"
            value={settings.social.linkedin || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                social: { ...settings.social, linkedin: e.target.value },
              })
            }
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">GitHub</span>
          <input
            className="editor-input"
            value={settings.social.github || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                social: { ...settings.social, github: e.target.value },
              })
            }
          />
        </label>
        <label className="mt-3 block">
          <span className="editor-label">Email</span>
          <input
            className="editor-input"
            value={settings.social.email || ""}
            onChange={(e) =>
              onChange({
                ...settings,
                social: { ...settings.social, email: e.target.value },
              })
            }
          />
        </label>
      </div>
    </div>
  );
}
