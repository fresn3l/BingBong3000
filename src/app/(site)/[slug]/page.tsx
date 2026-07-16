import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/BlockRenderer";
import { getPageBySlug } from "@/lib/content/repository";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.seoDescription,
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") notFound();
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return <Blocks blocks={page.blocks} />;
}
