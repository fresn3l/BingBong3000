import type { Block, BlockType } from "./types";

export function createEmptyBlock(type: BlockType): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case "hero":
      return {
        id,
        type: "hero",
        eyebrow: "Eyebrow",
        headline: "New headline",
        subheadline: "Supporting sentence.",
        primaryCtaLabel: "Primary",
        primaryCtaHref: "/contact",
      };
    case "richText":
      return {
        id,
        type: "richText",
        heading: "Section heading",
        body: "Write your content here.",
      };
    case "projectGrid":
      return {
        id,
        type: "projectGrid",
        heading: "Projects",
        useSiteProjects: true,
        projects: [],
      };
    case "articleList":
      return {
        id,
        type: "articleList",
        heading: "Articles",
        articles: [
          {
            id: crypto.randomUUID(),
            title: "Article title",
            summary: "Summary",
            href: "/writing",
            kind: "original",
          },
        ],
      };
    case "cta":
      return {
        id,
        type: "cta",
        heading: "Call to action",
        body: "Optional supporting text.",
        buttonLabel: "Learn more",
        buttonHref: "/contact",
      };
    case "contactForm":
      return {
        id,
        type: "contactForm",
        heading: "Contact",
        intro: "Send a message.",
        emailFallback: "hello@example.com",
      };
    case "image":
      return {
        id,
        type: "image",
        src: "/uploads/placeholder.jpg",
        alt: "Image description",
      };
    case "stats":
      return {
        id,
        type: "stats",
        heading: "Stats",
        stats: [
          { id: crypto.randomUUID(), label: "Label", value: "Value" },
        ],
      };
    case "services":
      return {
        id,
        type: "services",
        heading: "Services",
        services: [
          {
            id: crypto.randomUUID(),
            title: "Service",
            description: "Description",
          },
        ],
      };
  }
}
