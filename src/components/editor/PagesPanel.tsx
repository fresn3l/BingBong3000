"use client";

import type { Page } from "@/lib/content/types";

export function PagesPanel({
  pages,
  selectedId,
  onSelect,
  onChange,
}: {
  pages: Page[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onChange: (pages: Page[]) => void;
}) {
  function addPage() {
    const slug = `page-${pages.length + 1}`;
    const page: Page = {
      id: crypto.randomUUID(),
      slug,
      title: "New page",
      published: true,
      blocks: [],
      updatedAt: new Date().toISOString(),
    };
    onChange([...pages, page]);
    onSelect(page.id);
  }

  function update(id: string, patch: Partial<Page>) {
    onChange(pages.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function remove(id: string) {
    if (!confirm("Delete this page?")) return;
    onChange(pages.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Pages
        </h2>
        <button
          type="button"
          onClick={addPage}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          + Add
        </button>
      </div>
      <ul className="space-y-3">
        {pages.map((page) => (
          <li
            key={page.id}
            className={`editor-panel space-y-2 p-3 ${
              selectedId === page.id ? "ring-1 ring-emerald-400/50" : ""
            }`}
          >
            <button
              type="button"
              className="w-full text-left text-sm font-medium"
              onClick={() => onSelect(page.id)}
            >
              {page.title}{" "}
              <span className="text-zinc-500">/{page.slug}</span>
            </button>
            <label className="block">
              <span className="editor-label">Title</span>
              <input
                className="editor-input"
                value={page.title}
                onChange={(e) => update(page.id, { title: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="editor-label">Slug</span>
              <input
                className="editor-input"
                value={page.slug}
                onChange={(e) =>
                  update(page.id, {
                    slug: e.target.value.replace(/\s+/g, "-").toLowerCase(),
                  })
                }
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={page.published}
                onChange={(e) => update(page.id, { published: e.target.checked })}
              />
              Published
            </label>
            <button
              type="button"
              onClick={() => remove(page.id)}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Delete page
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
