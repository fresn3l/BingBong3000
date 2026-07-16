import type { CtaBlock } from "@/lib/content/types";
import { HireMeLink, TrackedLink } from "@/components/analytics/TrackedLink";

function isHireCta(label: string, href: string) {
  const text = label.toLowerCase();
  return (
    href === "/contact" ||
    text.includes("hire") ||
    text.includes("get in touch") ||
    text.includes("contact")
  );
}

export function CtaBlockView({ block }: { block: CtaBlock }) {
  const hire = isHireCta(block.buttonLabel, block.buttonHref);

  return (
    <section className="site-section">
      <div className="site-container">
        <div className="border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-surface),transparent)] px-6 py-10 sm:px-10">
          <h2 className="font-[family-name:var(--font-display)] max-w-2xl text-3xl tracking-tight text-[var(--color-fg)] sm:text-4xl">
            {block.heading}
          </h2>
          {block.body ? (
            <p className="mt-4 max-w-xl text-[var(--color-muted)]">{block.body}</p>
          ) : null}
          {hire ? (
            <HireMeLink
              href={block.buttonHref}
              location="cta-block"
              className="btn-primary mt-8 inline-flex"
            >
              {block.buttonLabel}
            </HireMeLink>
          ) : (
            <TrackedLink
              href={block.buttonHref}
              className="btn-primary mt-8 inline-flex"
              event="CTA Click"
              eventProps={{
                location: "cta-block",
                label: block.buttonLabel,
                href: block.buttonHref,
              }}
            >
              {block.buttonLabel}
            </TrackedLink>
          )}
        </div>
      </div>
    </section>
  );
}
