import type { StatsBlock } from "@/lib/content/types";

export function StatsBlockView({ block }: { block: StatsBlock }) {
  return (
    <section className="site-section border-y border-[var(--color-border)] bg-[var(--color-surface)]/40">
      <div className="site-container">
        {block.heading ? (
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--color-fg)]">
            {block.heading}
          </h2>
        ) : null}
        <dl className="grid gap-8 sm:grid-cols-3">
          {block.stats.map((stat) => (
            <div key={stat.id} className="animate-rise">
              <dt className="text-sm uppercase tracking-wider text-[var(--color-muted)]">
                {stat.label}
              </dt>
              <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--color-fg)] sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
