import type { RichTextBlock } from "@/lib/content/types";

export function RichTextBlockView({ block }: { block: RichTextBlock }) {
  return (
    <section className="site-section">
      <div className="site-container max-w-3xl">
        {block.heading ? (
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--color-fg)] sm:text-4xl">
            {block.heading}
          </h2>
        ) : null}
        <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-muted)] whitespace-pre-wrap">
          {block.body}
        </div>
      </div>
    </section>
  );
}
