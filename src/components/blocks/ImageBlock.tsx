import type { ImageBlock } from "@/lib/content/types";
import { SafeImage } from "@/components/ui/SafeImage";

export function ImageBlockView({ block }: { block: ImageBlock }) {
  return (
    <section className="site-section">
      <div className="site-container">
        <div className="relative aspect-[16/9] w-full max-h-[36rem] overflow-hidden bg-[var(--color-surface)]">
          <SafeImage
            src={block.src}
            alt={block.alt}
            fill
            sizes="(min-width: 1280px) 70rem, 100vw"
            className="object-cover"
          />
        </div>
        {block.caption ? (
          <p className="mt-3 text-sm text-[var(--color-muted)]">{block.caption}</p>
        ) : null}
      </div>
    </section>
  );
}
