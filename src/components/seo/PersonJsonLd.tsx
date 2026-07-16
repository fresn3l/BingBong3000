import type { SiteSettings } from "@/lib/content/types";
import { absoluteUrl } from "@/lib/site-url";

export function PersonJsonLd({ settings }: { settings: SiteSettings }) {
  const sameAs = [
    settings.social.linkedin,
    settings.social.github,
  ].filter(Boolean) as string[];

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.siteName,
    description: settings.seoDescription || settings.tagline,
    url: absoluteUrl("/"),
    email: settings.social.email || undefined,
    jobTitle: "Solutions Engineer",
    sameAs: sameAs.length ? sameAs : undefined,
    knowsAbout: [
      "Solutions Engineering",
      "Sales Engineering",
      "Computer Science",
      "Technical discovery",
      "Product demos",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
