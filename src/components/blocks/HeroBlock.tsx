import Link from "next/link";
import type { HeroBlock } from "@/lib/content/types";

export function HeroBlockView({ block }: { block: HeroBlock }) {
  return (
    <section className="site-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--color-accent)/0.18),transparent_55%)]" />
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
              <Link href={block.primaryCtaHref} className="btn-primary">
                {block.primaryCtaLabel}
              </Link>
            ) : null}
            {block.secondaryCtaLabel && block.secondaryCtaHref ? (
              <Link href={block.secondaryCtaHref} className="btn-secondary">
                {block.secondaryCtaLabel}
              </Link>
            ) : null}
          </div>
        </div>
        {block.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={block.imageUrl}
            alt=""
            className="animate-fade aspect-[4/5] w-full object-cover"
          />
        ) : (
          <div className="animate-fade hidden aspect-[4/5] w-full bg-[linear-gradient(145deg,var(--color-surface),var(--color-border))] lg:block" />
        )}
      </div>
    </section>
  );
}
