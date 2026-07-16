import type { HeroBlock } from "@/lib/content/types";
import { HireMeLink, TrackedLink } from "@/components/analytics/TrackedLink";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnalyticsEvents } from "@/lib/analytics";

function isHireCta(label?: string, href?: string) {
  const text = (label || "").toLowerCase();
  return Boolean(
    href === "/contact" ||
      text.includes("hire") ||
      text.includes("get in touch") ||
      text.includes("contact"),
  );
}

export function HeroBlockView({ block }: { block: HeroBlock }) {
  return (
    <section className="site-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-accent)_18%,transparent),transparent_55%)]" />
      <div className="site-container relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="animate-rise max-w-3xl">
          {block.eyebrow ? (
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {block.eyebrow}
            </p>
          ) : null}
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[var(--color-fg)] sm:text-5xl lg:text-6xl">
            {block.headline}
          </h1>
          {block.subheadline ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
              {block.subheadline}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {block.primaryCtaLabel && block.primaryCtaHref ? (
              isHireCta(block.primaryCtaLabel, block.primaryCtaHref) ? (
                <HireMeLink
                  href={block.primaryCtaHref}
                  location="hero-primary"
                  className="btn-primary"
                >
                  {block.primaryCtaLabel}
                </HireMeLink>
              ) : (
                <TrackedLink
                  href={block.primaryCtaHref}
                  className="btn-primary"
                  event="CTA Click"
                  eventProps={{
                    location: "hero-primary",
                    label: block.primaryCtaLabel,
                    href: block.primaryCtaHref,
                  }}
                >
                  {block.primaryCtaLabel}
                </TrackedLink>
              )
            ) : null}
            {block.secondaryCtaLabel && block.secondaryCtaHref ? (
              <TrackedLink
                href={block.secondaryCtaHref}
                className="btn-secondary"
                event={
                  isHireCta(block.secondaryCtaLabel, block.secondaryCtaHref)
                    ? AnalyticsEvents.hireMeClick
                    : "CTA Click"
                }
                eventProps={{
                  location: "hero-secondary",
                  label: block.secondaryCtaLabel,
                  href: block.secondaryCtaHref,
                }}
              >
                {block.secondaryCtaLabel}
              </TrackedLink>
            ) : null}
          </div>
        </div>
        <div className="relative hidden aspect-[4/5] w-full overflow-hidden bg-[linear-gradient(145deg,var(--color-surface),var(--color-border))] lg:block">
          {block.imageUrl ? (
            <SafeImage
              src={block.imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="animate-fade object-cover"
              priority
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
