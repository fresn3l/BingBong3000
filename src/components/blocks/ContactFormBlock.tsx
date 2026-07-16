"use client";

import { FormEvent, useState } from "react";
import type { ContactFormBlock } from "@/lib/content/types";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

export function ContactFormBlockView({ block }: { block: ContactFormBlock }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const hasCompany = Boolean(String(data.get("company") || "").trim());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send");
      }
      trackEvent(AnalyticsEvents.contactSubmit, { hasCompany });
      setStatus("done");
      form.reset();
    } catch (err) {
      trackEvent(AnalyticsEvents.contactSubmitError);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="site-section">
      <div className="site-container grid gap-10 lg:grid-cols-2">
        <div>
          {block.heading ? (
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--color-fg)] sm:text-4xl">
              {block.heading}
            </h2>
          ) : null}
          {block.intro ? (
            <p className="mt-4 text-[var(--color-muted)]">{block.intro}</p>
          ) : null}
          {block.emailFallback ? (
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Prefer email?{" "}
              <a
                className="text-[var(--color-accent)] underline-offset-4 hover:underline"
                href={`mailto:${block.emailFallback}`}
              >
                {block.emailFallback}
              </a>
            </p>
          ) : null}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm text-[var(--color-muted)]">Name</span>
            <input name="name" required className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-[var(--color-muted)]">Email</span>
            <input name="email" type="email" required className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-[var(--color-muted)]">
              Company (optional)
            </span>
            <input name="company" className="field" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-[var(--color-muted)]">Message</span>
            <textarea name="message" required rows={5} className="field" />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
          {status === "done" ? (
            <p className="text-sm text-[var(--color-accent)]">Thanks — message received.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-400">{error}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
