export type BlockType =
  | "hero"
  | "richText"
  | "projectGrid"
  | "articleList"
  | "cta"
  | "contactForm"
  | "image"
  | "stats"
  | "services";

export interface HeroBlock {
  id: string;
  type: "hero";
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
}

export interface RichTextBlock {
  id: string;
  type: "richText";
  heading?: string;
  body: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  imageUrl?: string;
}

/** Site-level project for the Projects admin tab and Work grids */
export interface Project extends ProjectItem {
  published: boolean;
  featured?: boolean;
}

export interface ProjectGridBlock {
  id: string;
  type: "projectGrid";
  heading?: string;
  intro?: string;
  /** Legacy inline projects; site-level `projects` take precedence when present */
  projects: ProjectItem[];
  /** When true (default), render published site projects instead of inline list */
  useSiteProjects?: boolean;
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  href: string;
  kind: "original" | "curated";
  source?: string;
  publishedAt?: string;
}

export interface ArticleListBlock {
  id: string;
  type: "articleList";
  heading?: string;
  intro?: string;
  articles: ArticleItem[];
}

export interface CtaBlock {
  id: string;
  type: "cta";
  heading: string;
  body?: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface ContactFormBlock {
  id: string;
  type: "contactForm";
  heading?: string;
  intro?: string;
  emailFallback?: string;
}

export interface ImageBlock {
  id: string;
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export interface StatsBlock {
  id: string;
  type: "stats";
  heading?: string;
  stats: StatItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ServicesBlock {
  id: string;
  type: "services";
  heading?: string;
  intro?: string;
  services: ServiceItem[];
}

export type Block =
  | HeroBlock
  | RichTextBlock
  | ProjectGridBlock
  | ArticleListBlock
  | CtaBlock
  | ContactFormBlock
  | ImageBlock
  | StatsBlock
  | ServicesBlock;

export interface NavItem {
  label: string;
  href: string;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  accentForeground: string;
  surface: string;
  border: string;
}

export interface ThemeSettings {
  /** Light mode palette (corporate / country-club clean) */
  colors: ThemeColors;
  /** Dark mode palette */
  darkColors: ThemeColors;
  fonts: {
    display: string;
    body: string;
  };
  spacing: {
    sectionY: string;
    contentMax: string;
  };
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  nav: NavItem[];
  footerText: string;
  social: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
  theme: ThemeSettings;
  resumeUrl?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  seoDescription?: string;
  blocks: Block[];
  updatedAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  kind: "original" | "curated";
  externalUrl?: string;
  source?: string;
  published: boolean;
  publishedAt: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
}

export interface ResumeLink {
  label: string;
  href: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  location?: string;
  start: string;
  end?: string;
  bullets: string[];
}

export interface ResumeEducation {
  id: string;
  school: string;
  degree: string;
  year?: string;
  details?: string;
}

export interface ResumeSkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  headline: string;
  location?: string;
  email?: string;
  phone?: string;
  summary?: string;
  links: ResumeLink[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
}

export interface SiteData {
  settings: SiteSettings;
  pages: Page[];
  posts: Post[];
  leads: ContactLead[];
  resume: ResumeData;
  projects: Project[];
}

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  richText: "Rich text",
  projectGrid: "Project grid",
  articleList: "Article list",
  cta: "Call to action",
  contactForm: "Contact form",
  image: "Image",
  stats: "Stats",
  services: "Services",
};
