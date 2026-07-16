"use client";

import type { Post } from "@/lib/content/types";

export function PostsPanel({
  posts,
  onChange,
}: {
  posts: Post[];
  onChange: (posts: Post[]) => void;
}) {
  function addPost() {
    const post: Post = {
      id: crypto.randomUUID(),
      slug: `post-${posts.length + 1}`,
      title: "New post",
      summary: "Short summary",
      body: "Write your post here.",
      kind: "original",
      published: true,
      publishedAt: new Date().toISOString(),
    };
    onChange([post, ...posts]);
  }

  function update(id: string, patch: Partial<Post>) {
    onChange(posts.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    onChange(posts.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Writing
        </h2>
        <button
          type="button"
          onClick={addPost}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          + Add post
        </button>
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="editor-panel space-y-2 p-3">
            <label className="block">
              <span className="editor-label">Title</span>
              <input
                className="editor-input"
                value={post.title}
                onChange={(e) => update(post.id, { title: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="editor-label">Slug</span>
              <input
                className="editor-input"
                value={post.slug}
                onChange={(e) =>
                  update(post.id, {
                    slug: e.target.value.replace(/\s+/g, "-").toLowerCase(),
                  })
                }
              />
            </label>
            <label className="block">
              <span className="editor-label">Summary</span>
              <textarea
                className="editor-input"
                rows={2}
                value={post.summary}
                onChange={(e) => update(post.id, { summary: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="editor-label">Body</span>
              <textarea
                className="editor-input"
                rows={5}
                value={post.body}
                onChange={(e) => update(post.id, { body: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="editor-label">Kind</span>
              <select
                className="editor-input"
                value={post.kind}
                onChange={(e) =>
                  update(post.id, {
                    kind: e.target.value as "original" | "curated",
                  })
                }
              >
                <option value="original">Original</option>
                <option value="curated">Curated</option>
              </select>
            </label>
            {post.kind === "curated" ? (
              <>
                <label className="block">
                  <span className="editor-label">External URL</span>
                  <input
                    className="editor-input"
                    value={post.externalUrl || ""}
                    onChange={(e) =>
                      update(post.id, { externalUrl: e.target.value })
                    }
                  />
                </label>
                <label className="block">
                  <span className="editor-label">Source</span>
                  <input
                    className="editor-input"
                    value={post.source || ""}
                    onChange={(e) => update(post.id, { source: e.target.value })}
                  />
                </label>
              </>
            ) : null}
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={post.published}
                onChange={(e) => update(post.id, { published: e.target.checked })}
              />
              Published
            </label>
            <button
              type="button"
              onClick={() => remove(post.id)}
              className="text-xs text-red-400"
            >
              Delete post
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
