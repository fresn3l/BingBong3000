import type { Block, Project } from "@/lib/content/types";
import { HeroBlockView } from "./HeroBlock";
import { RichTextBlockView } from "./RichTextBlock";
import { ProjectGridBlockView } from "./ProjectGridBlock";
import { ArticleListBlockView } from "./ArticleListBlock";
import { CtaBlockView } from "./CtaBlock";
import { ContactFormBlockView } from "./ContactFormBlock";
import { CalendlyBlockView } from "./CalendlyBlock";
import { ImageBlockView } from "./ImageBlock";
import { StatsBlockView } from "./StatsBlock";
import { ServicesBlockView } from "./ServicesBlock";

export function BlockRenderer({
  block,
  projects = [],
  calendlyUrl,
}: {
  block: Block;
  projects?: Project[];
  calendlyUrl?: string;
}) {
  switch (block.type) {
    case "hero":
      return <HeroBlockView block={block} />;
    case "richText":
      return <RichTextBlockView block={block} />;
    case "projectGrid":
      return <ProjectGridBlockView block={block} siteProjects={projects} />;
    case "articleList":
      return <ArticleListBlockView block={block} />;
    case "cta":
      return <CtaBlockView block={block} />;
    case "contactForm":
      return <ContactFormBlockView block={block} />;
    case "calendly":
      return <CalendlyBlockView block={block} fallbackUrl={calendlyUrl} />;
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

export function Blocks({
  blocks,
  projects = [],
  calendlyUrl,
}: {
  blocks: Block[];
  projects?: Project[];
  calendlyUrl?: string;
}) {
  return (
    <div className="flex flex-col">
      {blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          block={block}
          projects={projects}
          calendlyUrl={calendlyUrl}
        />
      ))}
    </div>
  );
}
