import Link from "next/link";
import type { SiteSettings } from "@/lib/content/types";
import { HireMeLink } from "@/components/analytics/TrackedLink";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--color-border)]/80 bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="site-container flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--color-fg)]"
        >
          {settings.siteName}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--color-muted)] md:flex">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--color-fg)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <HireMeLink location="header" className="btn-primary text-sm" />
        </div>
      </div>
      <nav className="site-container flex gap-4 overflow-x-auto pb-3 text-sm text-[var(--color-muted)] md:hidden">
        {settings.nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="no-print mt-auto border-t border-[var(--color-border)]">
      <div className="site-container flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-fg)]">
            {settings.siteName}
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{settings.footerText}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
          {settings.social.linkedin ? (
            <a href={settings.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          {settings.social.github ? (
            <a href={settings.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {settings.resumeUrl ? (
            <a href={settings.resumeUrl}>Resume</a>
          ) : null}
          <HireMeLink
            location="footer"
            className="text-[var(--color-accent)] hover:underline"
          />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
