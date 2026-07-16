import type { Block } from "@/lib/content/types";
import { HeroBlockView } from "./HeroBlock";
import { RichTextBlockView } from "./RichTextBlock";
import { ProjectGridBlockView } from "./ProjectGridBlock";
import { ArticleListBlockView } from "./ArticleListBlock";
import { CtaBlockView } from "./CtaBlock";
import { ContactFormBlockView } from "./ContactFormBlock";
import { ImageBlockView } from "./ImageBlock";
import { StatsBlockView } from "./StatsBlock";
import { ServicesBlockView } from "./ServicesBlock";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return <HeroBlockView block={block} />;
    case "richText":
      return <RichTextBlockView block={block} />;
    case "projectGrid":
      return <ProjectGridBlockView block={block} />;
    case "articleList":
      return <ArticleListBlockView block={block} />;
    case "cta":
      return <CtaBlockView block={block} />;
    case "contactForm":
      return <ContactFormBlockView block={block} />;
    case "image":
      return <ImageBlockView block={block} />;
    case "stats":
      return <StatsBlockView block={block} />;
    case "services":
      return <ServicesBlockView block={block} />;
    default:
      return null;
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
