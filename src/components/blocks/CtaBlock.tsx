import Link from "next/link";
import type { CtaBlock } from "@/lib/content/types";

export function CtaBlockView({ block }: { block: CtaBlock }) {
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
          <Link href={block.buttonHref} className="btn-primary mt-8 inline-flex">
            {block.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
