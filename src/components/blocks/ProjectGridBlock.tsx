import Link from "next/link";
import type { ProjectGridBlock } from "@/lib/content/types";
import { SafeImage } from "@/components/ui/SafeImage";

export function ProjectGridBlockView({ block }: { block: ProjectGridBlock }) {
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {block.projects.map((project) => {
            const inner = (
              <>
                {project.imageUrl ? (
                  <div className="relative mb-4 aspect-video w-full overflow-hidden bg-[var(--color-border)]">
                    <SafeImage
                      src={project.imageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <h3 className="text-xl font-semibold text-[var(--color-fg)]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {project.summary}
                </p>
                {project.tags.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="text-xs uppercase tracking-wider text-[var(--color-accent)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            );

            return project.href ? (
              <Link
                key={project.id}
                href={project.href}
                className="group border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[var(--color-accent)]"
              >
                {inner}
              </Link>
            ) : (
              <div
                key={project.id}
                className="border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
