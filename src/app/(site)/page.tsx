import { Blocks } from "@/components/blocks/BlockRenderer";
import { getPageBySlug } from "@/lib/content/repository";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const page = await getPageBySlug("home");
  if (!page) notFound();
  return <Blocks blocks={page.blocks} />;
}
