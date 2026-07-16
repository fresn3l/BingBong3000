import type { ImageBlock } from "@/lib/content/types";

export function ImageBlockView({ block }: { block: ImageBlock }) {
  return (
    <section className="site-section">
      <div className="site-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={block.src}
          alt={block.alt}
          className="w-full max-h-[36rem] object-cover"
        />
        {block.caption ? (
          <p className="mt-3 text-sm text-[var(--color-muted)]">{block.caption}</p>
        ) : null}
      </div>
    </section>
  );
}
