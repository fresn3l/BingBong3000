"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Login failed");
      router.push("/editor");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="editor-shell flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="editor-panel w-full max-w-md space-y-4 p-8">
        <div>
          <h1 className="text-2xl font-semibold">Site editor</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Local mode: password only (default <code>changeme</code>). With Supabase,
            use your admin email + password.
          </p>
        </div>
        <label className="block">
          <span className="editor-label">Email (Supabase mode)</span>
          <input
            className="editor-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label className="block">
          <span className="editor-label">Password</span>
          <input
            type="password"
            className="editor-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-400 px-4 py-2 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
