import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/BlockRenderer";
import { getPageBySlug, getSiteData } from "@/lib/content/repository";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  const path = `/${page.slug}`;
  return {
    title: page.title,
    description: page.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.seoDescription,
      url: absoluteUrl(path),
      type: "website",
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") notFound();
  const data = await getSiteData();
  const page = data.pages.find((p) => p.slug === slug && p.published);
  if (!page) notFound();
  return <Blocks blocks={page.blocks} projects={data.projects} />;
}
