"use client";

import type { Block } from "@/lib/content/types";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="editor-label">{label}</span>
      {children}
    </label>
  );
}

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/media", { method: "POST", body: form });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || "Upload failed");
  return body.url as string;
}

export function BlockEditor({
  block,
  onChange,
}: {
  block: Block;
  onChange: (block: Block) => void;
}) {
  return (
    <div className="space-y-3 border-t border-zinc-800 pt-4">
      <h3 className="text-sm font-semibold text-zinc-300">Edit · {block.type}</h3>

      {block.type === "hero" ? (
        <>
          <Field label="Eyebrow">
            <input
              className="editor-input"
              value={block.eyebrow || ""}
              onChange={(e) => onChange({ ...block, eyebrow: e.target.value })}
            />
          </Field>
          <Field label="Headline">
            <textarea
              className="editor-input"
              rows={2}
              value={block.headline}
              onChange={(e) => onChange({ ...block, headline: e.target.value })}
            />
          </Field>
          <Field label="Subheadline">
            <textarea
              className="editor-input"
              rows={3}
              value={block.subheadline || ""}
              onChange={(e) => onChange({ ...block, subheadline: e.target.value })}
            />
          </Field>
          <Field label="Primary CTA label">
            <input
              className="editor-input"
              value={block.primaryCtaLabel || ""}
              onChange={(e) =>
                onChange({ ...block, primaryCtaLabel: e.target.value })
              }
            />
          </Field>
          <Field label="Primary CTA href">
            <input
              className="editor-input"
              value={block.primaryCtaHref || ""}
              onChange={(e) =>
                onChange({ ...block, primaryCtaHref: e.target.value })
              }
            />
          </Field>
          <Field label="Secondary CTA label">
            <input
              className="editor-input"
              value={block.secondaryCtaLabel || ""}
              onChange={(e) =>
                onChange({ ...block, secondaryCtaLabel: e.target.value })
              }
            />
          </Field>
          <Field label="Secondary CTA href">
            <input
              className="editor-input"
              value={block.secondaryCtaHref || ""}
              onChange={(e) =>
                onChange({ ...block, secondaryCtaHref: e.target.value })
              }
            />
          </Field>
          <Field label="Image URL">
            <input
              className="editor-input"
              value={block.imageUrl || ""}
              onChange={(e) => onChange({ ...block, imageUrl: e.target.value })}
            />
          </Field>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = await uploadFile(file);
              onChange({ ...block, imageUrl: url });
            }}
          />
        </>
      ) : null}

      {block.type === "richText" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading || ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Body">
            <textarea
              className="editor-input"
              rows={8}
              value={block.body}
              onChange={(e) => onChange({ ...block, body: e.target.value })}
            />
          </Field>
        </>
      ) : null}

      {block.type === "cta" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Body">
            <textarea
              className="editor-input"
              rows={3}
              value={block.body || ""}
              onChange={(e) => onChange({ ...block, body: e.target.value })}
            />
          </Field>
          <Field label="Button label">
            <input
              className="editor-input"
              value={block.buttonLabel}
              onChange={(e) => onChange({ ...block, buttonLabel: e.target.value })}
            />
          </Field>
          <Field label="Button href">
            <input
              className="editor-input"
              value={block.buttonHref}
              onChange={(e) => onChange({ ...block, buttonHref: e.target.value })}
            />
          </Field>
        </>
      ) : null}

      {block.type === "contactForm" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading || ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Intro">
            <textarea
              className="editor-input"
              rows={3}
              value={block.intro || ""}
              onChange={(e) => onChange({ ...block, intro: e.target.value })}
            />
          </Field>
          <Field label="Email fallback">
            <input
              className="editor-input"
              value={block.emailFallback || ""}
              onChange={(e) =>
                onChange({ ...block, emailFallback: e.target.value })
              }
            />
          </Field>
        </>
      ) : null}

      {block.type === "calendly" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading || ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Intro">
            <textarea
              className="editor-input"
              rows={2}
              value={block.intro || ""}
              onChange={(e) => onChange({ ...block, intro: e.target.value })}
            />
          </Field>
          <Field label="Calendly URL (optional — falls back to Theme setting)">
            <input
              className="editor-input"
              placeholder="https://calendly.com/you/15min"
              value={block.url || ""}
              onChange={(e) => onChange({ ...block, url: e.target.value })}
            />
          </Field>
          <Field label="Embed height (px)">
            <input
              className="editor-input"
              type="number"
              min={480}
              value={block.height || 700}
              onChange={(e) =>
                onChange({
                  ...block,
                  height: Number(e.target.value) || 700,
                })
              }
            />
          </Field>
        </>
      ) : null}

      {block.type === "image" ? (
        <>
          <Field label="Image URL">
            <input
              className="editor-input"
              value={block.src}
              onChange={(e) => onChange({ ...block, src: e.target.value })}
            />
          </Field>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = await uploadFile(file);
              onChange({ ...block, src: url });
            }}
          />
          <Field label="Alt text">
            <input
              className="editor-input"
              value={block.alt}
              onChange={(e) => onChange({ ...block, alt: e.target.value })}
            />
          </Field>
          <Field label="Caption">
            <input
              className="editor-input"
              value={block.caption || ""}
              onChange={(e) => onChange({ ...block, caption: e.target.value })}
            />
          </Field>
        </>
      ) : null}

      {block.type === "stats" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading || ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          {block.stats.map((stat, index) => (
            <div key={stat.id} className="editor-panel space-y-2 p-2">
              <Field label="Label">
                <input
                  className="editor-input"
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...block.stats];
                    stats[index] = { ...stat, label: e.target.value };
                    onChange({ ...block, stats });
                  }}
                />
              </Field>
              <Field label="Value">
                <input
                  className="editor-input"
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...block.stats];
                    stats[index] = { ...stat, value: e.target.value };
                    onChange({ ...block, stats });
                  }}
                />
              </Field>
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-emerald-400"
            onClick={() =>
              onChange({
                ...block,
                stats: [
                  ...block.stats,
                  { id: crypto.randomUUID(), label: "Label", value: "Value" },
                ],
              })
            }
          >
            + Add stat
          </button>
        </>
      ) : null}

      {block.type === "services" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading || ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Intro">
            <textarea
              className="editor-input"
              rows={2}
              value={block.intro || ""}
              onChange={(e) => onChange({ ...block, intro: e.target.value })}
            />
          </Field>
          {block.services.map((service, index) => (
            <div key={service.id} className="editor-panel space-y-2 p-2">
              <Field label="Title">
                <input
                  className="editor-input"
                  value={service.title}
                  onChange={(e) => {
                    const services = [...block.services];
                    services[index] = { ...service, title: e.target.value };
                    onChange({ ...block, services });
                  }}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className="editor-input"
                  rows={2}
                  value={service.description}
                  onChange={(e) => {
                    const services = [...block.services];
                    services[index] = {
                      ...service,
                      description: e.target.value,
                    };
                    onChange({ ...block, services });
                  }}
                />
              </Field>
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-emerald-400"
            onClick={() =>
              onChange({
                ...block,
                services: [
                  ...block.services,
                  {
                    id: crypto.randomUUID(),
                    title: "Service",
                    description: "Description",
                  },
                ],
              })
            }
          >
            + Add service
          </button>
        </>
      ) : null}

      {block.type === "projectGrid" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading || ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Intro">
            <textarea
              className="editor-input"
              rows={2}
              value={block.intro || ""}
              onChange={(e) => onChange({ ...block, intro: e.target.value })}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={block.useSiteProjects !== false}
              onChange={(e) =>
                onChange({ ...block, useSiteProjects: e.target.checked })
              }
            />
            Use Projects tab list (recommended)
          </label>
          <p className="text-xs text-zinc-500">
            Manage project cards in the <strong>Projects</strong> admin tab.
            Uncheck only if you need a one-off inline list on this block.
          </p>
        </>
      ) : null}

      {block.type === "articleList" ? (
        <>
          <Field label="Heading">
            <input
              className="editor-input"
              value={block.heading || ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Intro">
            <textarea
              className="editor-input"
              rows={2}
              value={block.intro || ""}
              onChange={(e) => onChange({ ...block, intro: e.target.value })}
            />
          </Field>
          {block.articles.map((article, index) => (
            <div key={article.id} className="editor-panel space-y-2 p-2">
              <Field label="Title">
                <input
                  className="editor-input"
                  value={article.title}
                  onChange={(e) => {
                    const articles = [...block.articles];
                    articles[index] = { ...article, title: e.target.value };
                    onChange({ ...block, articles });
                  }}
                />
              </Field>
              <Field label="Summary">
                <textarea
                  className="editor-input"
                  rows={2}
                  value={article.summary}
                  onChange={(e) => {
                    const articles = [...block.articles];
                    articles[index] = { ...article, summary: e.target.value };
                    onChange({ ...block, articles });
                  }}
                />
              </Field>
              <Field label="Href">
                <input
                  className="editor-input"
                  value={article.href}
                  onChange={(e) => {
                    const articles = [...block.articles];
                    articles[index] = { ...article, href: e.target.value };
                    onChange({ ...block, articles });
                  }}
                />
              </Field>
              <Field label="Kind">
                <select
                  className="editor-input"
                  value={article.kind}
                  onChange={(e) => {
                    const articles = [...block.articles];
                    articles[index] = {
                      ...article,
                      kind: e.target.value as "original" | "curated",
                    };
                    onChange({ ...block, articles });
                  }}
                >
                  <option value="original">Original</option>
                  <option value="curated">Curated</option>
                </select>
              </Field>
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-emerald-400"
            onClick={() =>
              onChange({
                ...block,
                articles: [
                  ...block.articles,
                  {
                    id: crypto.randomUUID(),
                    title: "Article",
                    summary: "Summary",
                    href: "/writing",
                    kind: "original",
                  },
                ],
              })
            }
          >
            + Add article
          </button>
        </>
      ) : null}
    </div>
  );
}
