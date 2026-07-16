"use client";

import type { Project } from "@/lib/content/types";
import { emptyProject } from "@/lib/content/projects";

export function ProjectsPanel({
  projects,
  onChange,
}: {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}) {
  function update(id: string, patch: Partial<Project>) {
    onChange(projects.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    onChange(projects.filter((p) => p.id !== id));
  }

  function move(id: string, direction: -1 | 1) {
    const index = projects.findIndex((p) => p.id === id);
    const next = index + direction;
    if (index < 0 || next < 0 || next >= projects.length) return;
    const copy = [...projects];
    const [item] = copy.splice(index, 1);
    copy.splice(next, 0, item);
    onChange(copy);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
            Projects
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Feeds Work page project grids. Unpublished items stay hidden.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange([emptyProject(), ...projects])}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          + Add
        </button>
      </div>

      <ul className="space-y-4">
        {projects.map((project, index) => (
          <li key={project.id} className="editor-panel space-y-2 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-zinc-500">#{index + 1}</span>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  className="text-zinc-400 hover:text-white"
                  onClick={() => move(project.id, -1)}
                  disabled={index === 0}
                >
                  Up
                </button>
                <button
                  type="button"
                  className="text-zinc-400 hover:text-white"
                  onClick={() => move(project.id, 1)}
                  disabled={index === projects.length - 1}
                >
                  Down
                </button>
              </div>
            </div>
            <label className="block">
              <span className="editor-label">Title</span>
              <input
                className="editor-input"
                value={project.title}
                onChange={(e) => update(project.id, { title: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="editor-label">Summary</span>
              <textarea
                className="editor-input"
                rows={3}
                value={project.summary}
                onChange={(e) => update(project.id, { summary: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="editor-label">Tags (comma-separated)</span>
              <input
                className="editor-input"
                value={project.tags.join(", ")}
                onChange={(e) =>
                  update(project.id, {
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
            <label className="block">
              <span className="editor-label">Link</span>
              <input
                className="editor-input"
                value={project.href || ""}
                onChange={(e) => update(project.id, { href: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="editor-label">Image URL</span>
              <input
                className="editor-input"
                value={project.imageUrl || ""}
                onChange={(e) =>
                  update(project.id, { imageUrl: e.target.value })
                }
              />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const form = new FormData();
                form.append("file", file);
                const res = await fetch("/api/media", { method: "POST", body: form });
                const body = await res.json();
                if (res.ok && body.url) {
                  update(project.id, { imageUrl: body.url as string });
                }
              }}
            />
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={project.published}
                onChange={(e) =>
                  update(project.id, { published: e.target.checked })
                }
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={Boolean(project.featured)}
                onChange={(e) =>
                  update(project.id, { featured: e.target.checked })
                }
              />
              Featured
            </label>
            <button
              type="button"
              onClick={() => remove(project.id)}
              className="text-xs text-red-400"
            >
              Delete project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
