import type { SiteData } from "./types";

const now = new Date().toISOString();

export const seedData: SiteData = {
  settings: {
    siteName: "Alex Rivera",
    tagline: "Solutions engineer bridging product, code, and customers",
    seoTitle: "Alex Rivera — Solutions Engineer",
    seoDescription:
      "Computer science background. Sales and solutions engineering focus. Technical storytelling that helps teams buy and ship the right thing.",
    nav: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Writing", href: "/writing" },
      { label: "Contact", href: "/contact" },
    ],
    footerText: "Open to solutions engineering and sales engineering roles.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "hello@example.com",
    },
    resumeUrl: "#",
    theme: {
      // Light: cool ivory + navy + hunter green (corporate / country-club)
      colors: {
        background: "#f3f4f1",
        foreground: "#14233a",
        muted: "#5f6d7c",
        accent: "#2c4a3e",
        accentForeground: "#f3f4f1",
        surface: "#ffffff",
        border: "#d4d9d2",
      },
      // Dark: deep navy clubroom
      darkColors: {
        background: "#0e1624",
        foreground: "#e6e9e4",
        muted: "#8b97a5",
        accent: "#8faf9c",
        accentForeground: "#0e1624",
        surface: "#172233",
        border: "#2a3548",
      },
      fonts: {
        display: "Cormorant Garamond",
        body: "Source Sans 3",
      },
      spacing: {
        sectionY: "5.5rem",
        contentMax: "70rem",
      },
    },
  },
  pages: [
    {
      id: "page-home",
      slug: "home",
      title: "Home",
      published: true,
      seoDescription:
        "Solutions engineer with a CS foundation — demos, discovery, and technical trust.",
      updatedAt: now,
      blocks: [
        {
          id: "home-hero",
          type: "hero",
          eyebrow: "Solutions / Sales Engineering",
          headline: "I turn complex products into clear customer outcomes.",
          subheadline:
            "CS-trained. Customer-facing. I run discovery, build demos, and partner with sales to close technical deals without the jargon fog.",
          primaryCtaLabel: "Hire me",
          primaryCtaHref: "/contact",
          secondaryCtaLabel: "See work",
          secondaryCtaHref: "/work",
        },
        {
          id: "home-stats",
          type: "stats",
          heading: "How I show up",
          stats: [
            {
              id: "s1",
              label: "Background",
              value: "Computer Science",
            },
            {
              id: "s2",
              label: "Focus",
              value: "Solutions Eng",
            },
            {
              id: "s3",
              label: "Strength",
              value: "Technical narrative",
            },
          ],
        },
        {
          id: "home-services",
          type: "services",
          heading: "Where I help",
          intro:
            "Placeholder services aimed at hiring managers evaluating SE / sales engineering talent.",
          services: [
            {
              id: "svc1",
              title: "Discovery & scoping",
              description:
                "Translate customer problems into requirements sales and product can act on.",
            },
            {
              id: "svc2",
              title: "Demos & POCs",
              description:
                "Ship credible technical proofs that match the buyer’s environment.",
            },
            {
              id: "svc3",
              title: "Deal support",
              description:
                "Partner with AEs on RFPs, security reviews, and architecture conversations.",
            },
          ],
        },
        {
          id: "home-cta",
          type: "cta",
          heading: "Looking for an SE who can code and communicate?",
          body: "Let’s talk about your pipeline, product, and how I can help customers say yes.",
          buttonLabel: "Get in touch",
          buttonHref: "/contact",
        },
      ],
    },
    {
      id: "page-about",
      slug: "about",
      title: "About",
      published: true,
      seoDescription: "CS background moving into sales and solutions engineering.",
      updatedAt: now,
      blocks: [
        {
          id: "about-hero",
          type: "hero",
          eyebrow: "About",
          headline: "From computer science to customer-facing engineering.",
          subheadline:
            "I like systems that work — and explanations that make people trust them.",
        },
        {
          id: "about-body",
          type: "richText",
          heading: "The path",
          body: "Placeholder bio: I studied computer science and built things end-to-end — APIs, UIs, data pipelines. Along the way I discovered I enjoy the boundary between product and people: sitting with a customer, hearing the real constraint, then shaping a technical story that is honest and useful.\n\nSales and solutions engineering is where that lands for me. I want to be the person who can open the docs, sketch the architecture, run the demo, and still leave the room with a clear next step for the deal.",
        },
        {
          id: "about-services",
          type: "services",
          heading: "What I bring",
          services: [
            {
              id: "ab1",
              title: "Technical depth",
              description:
                "Comfortable reading code, APIs, and architecture diagrams.",
            },
            {
              id: "ab2",
              title: "Clear storytelling",
              description:
                "I translate features into outcomes hiring managers and buyers care about.",
            },
            {
              id: "ab3",
              title: "Collaborative sales motion",
              description:
                "I work with AEs, PMs, and customers — not as a lone demo machine.",
            },
          ],
        },
        {
          id: "about-cta",
          type: "cta",
          heading: "Want the longer version?",
          body: "Grab the resume or send a note — happy to walk through projects live.",
          buttonLabel: "Contact",
          buttonHref: "/contact",
        },
      ],
    },
    {
      id: "page-work",
      slug: "work",
      title: "Work",
      published: true,
      seoDescription: "Selected projects and case studies.",
      updatedAt: now,
      blocks: [
        {
          id: "work-hero",
          type: "hero",
          eyebrow: "Work",
          headline: "Projects that prove I can go deep and explain clearly.",
          subheadline:
            "Placeholder case studies. Swap these for real customer or personal builds in the editor.",
        },
        {
          id: "work-grid",
          type: "projectGrid",
          heading: "Selected work",
          intro: "Technical credibility for solutions engineering interviews.",
          projects: [
            {
              id: "p1",
              title: "API integration demo kit",
              summary:
                "Built a reusable demo environment that walks buyers through auth, webhooks, and a happy-path workflow in under 15 minutes.",
              tags: ["APIs", "Demo", "DX"],
              href: "#",
            },
            {
              id: "p2",
              title: "Customer health dashboard",
              summary:
                "Designed a metrics view that sales and CS used to spot expansion signals — not just vanity charts.",
              tags: ["Data", "Product", "Narrative"],
              href: "#",
            },
            {
              id: "p3",
              title: "Security questionnaire playbook",
              summary:
                "Turned recurring RFP / security questions into a living knowledge base with clear owners and sample answers.",
              tags: ["Process", "Trust", "Sales"],
              href: "#",
            },
          ],
        },
      ],
    },
    {
      id: "page-writing",
      slug: "writing",
      title: "Writing",
      published: true,
      seoDescription: "Notes, posts, and articles worth reading.",
      updatedAt: now,
      blocks: [
        {
          id: "writing-hero",
          type: "hero",
          eyebrow: "Writing",
          headline: "Things I’ve written — and things I keep coming back to.",
          subheadline:
            "Original notes plus curated articles. Edit this list anytime in the admin.",
        },
        {
          id: "writing-list",
          type: "articleList",
          heading: "Latest",
          intro: "Mix of original posts and curated reading.",
          articles: [
            {
              id: "a1",
              title: "What good discovery sounds like on a sales call",
              summary:
                "Placeholder original post on listening for constraints instead of pitching features.",
              href: "/writing/good-discovery",
              kind: "original",
              publishedAt: "2026-06-01",
            },
            {
              id: "a2",
              title: "How to demo without drowning the buyer",
              summary:
                "Placeholder original post on pacing, proof, and leaving room for questions.",
              href: "/writing/demo-without-drowning",
              kind: "original",
              publishedAt: "2026-05-12",
            },
            {
              id: "a3",
              title: "The art of the technical win",
              summary:
                "A curated piece on earning trust in enterprise evaluations.",
              href: "https://example.com/technical-win",
              kind: "curated",
              source: "Industry blog",
              publishedAt: "2026-04-20",
            },
          ],
        },
      ],
    },
    {
      id: "page-contact",
      slug: "contact",
      title: "Contact",
      published: true,
      seoDescription: "Get in touch about solutions engineering roles.",
      updatedAt: now,
      blocks: [
        {
          id: "contact-hero",
          type: "hero",
          eyebrow: "Contact",
          headline: "Let’s talk about the role — or the deal.",
          subheadline:
            "Hiring for SE / sales engineering, or want a quick intro call? Send a note.",
        },
        {
          id: "contact-form",
          type: "contactForm",
          heading: "Hire me",
          intro:
            "Placeholder form. Submissions are stored locally (or in Supabase when connected). Email delivery can be wired via Resend later.",
          emailFallback: "hello@example.com",
        },
      ],
    },
  ],
  posts: [
    {
      id: "post-1",
      slug: "good-discovery",
      title: "What good discovery sounds like on a sales call",
      summary:
        "Listening for constraints instead of pitching features — a placeholder essay.",
      body: "Placeholder content.\n\nGood discovery is less about a script and more about curiosity. Ask what happens if nothing changes. Ask who feels the pain when the current tool fails. Ask what “done” looks like in their language — not yours.\n\nThen map your product to that reality. That’s solutions engineering.",
      kind: "original",
      published: true,
      publishedAt: "2026-06-01T12:00:00.000Z",
    },
    {
      id: "post-2",
      slug: "demo-without-drowning",
      title: "How to demo without drowning the buyer",
      summary: "Pacing, proof, and leaving room for questions.",
      body: "Placeholder content.\n\nA demo is a guided story with receipts. Start with their workflow, not your nav bar. Show one path that solves one painful job. Leave breadcrumbs for depth if they ask.\n\nIf they leave confused, you lost — even if every feature was “shown.”",
      kind: "original",
      published: true,
      publishedAt: "2026-05-12T12:00:00.000Z",
    },
  ],
  leads: [],
};
