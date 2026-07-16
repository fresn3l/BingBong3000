import Link from "next/link";
import type { ArticleListBlock } from "@/lib/content/types";

export function ArticleListBlockView({ block }: { block: ArticleListBlock }) {
  return (
    <section className="site-section">
      <div className="site-container">
        {(block.heading || block.intro) && (
          <div className="mb-10 max-w-2xl">
            {block.heading ? (
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--color-fg)] sm:text-4xl">
                {block.heading}
              </h2>
            ) : null}
            {block.intro ? (
              <p className="mt-3 text-[var(--color-muted)]">{block.intro}</p>
            ) : null}
          </div>
        )}
        <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {block.articles.map((article) => {
            const external = article.href.startsWith("http");
            const Comp = external ? "a" : Link;
            const props = external
              ? { href: article.href, target: "_blank", rel: "noreferrer" }
              : { href: article.href };

            return (
              <li key={article.id}>
                <Comp
                  {...(props as { href: string })}
                  className="group flex flex-col gap-2 py-6 transition hover:bg-[var(--color-surface)]/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-2"
                >
                  <div>
                    <div className="mb-1 flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--color-accent)]">
                      <span>{article.kind === "original" ? "Original" : "Curated"}</span>
                      {article.source ? <span>· {article.source}</span> : null}
                    </div>
                    <h3 className="text-xl text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">
                      {article.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
                      {article.summary}
                    </p>
                  </div>
                  {article.publishedAt ? (
                    <time className="shrink-0 text-sm text-[var(--color-muted)]">
                      {article.publishedAt}
                    </time>
                  ) : null}
                </Comp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
