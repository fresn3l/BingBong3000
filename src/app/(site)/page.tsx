import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/BlockRenderer";
import { getPageBySlug, getSettings } from "@/lib/content/repository";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPageBySlug("home"),
    getSettings(),
  ]);
  const title = settings.seoTitle;
  const description = page?.seoDescription || settings.seoDescription;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/"),
      type: "website",
    },
  };
}

export default async function HomePage() {
  const page = await getPageBySlug("home");
  if (!page) notFound();
  return <Blocks blocks={page.blocks} />;
}
