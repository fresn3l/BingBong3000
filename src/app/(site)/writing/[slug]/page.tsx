import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/content/repository";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const path = `/writing/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: absoluteUrl(path),
      type: "article",
    },
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  if (post.kind === "curated" && post.externalUrl) {
    return (
      <section className="site-section">
        <div className="site-container max-w-2xl">
          <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
            Curated
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-[var(--color-muted)]">{post.summary}</p>
          <a
            href={post.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8 inline-flex"
          >
            Read original{post.source ? ` on ${post.source}` : ""}
          </a>
        </div>
      </section>
    );
  }

  return (
    <article className="site-section">
      <div className="site-container max-w-2xl">
        <Link
          href="/writing"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
        >
          ← Writing
        </Link>
        <p className="mt-6 text-sm uppercase tracking-wider text-[var(--color-accent)]">
          Original
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-[var(--color-muted)]">{post.summary}</p>
        <div className="mt-10 space-y-4 whitespace-pre-wrap leading-relaxed text-[var(--color-muted)]">
          {post.body}
        </div>
      </div>
    </article>
  );
}
