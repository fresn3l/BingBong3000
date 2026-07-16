import type { ServicesBlock } from "@/lib/content/types";

export function ServicesBlockView({ block }: { block: ServicesBlock }) {
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
        <div className="grid gap-8 md:grid-cols-3">
          {block.services.map((service, index) => (
            <div key={service.id} className="animate-rise" style={{ animationDelay: `${index * 80}ms` }}>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl text-[var(--color-fg)]">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
