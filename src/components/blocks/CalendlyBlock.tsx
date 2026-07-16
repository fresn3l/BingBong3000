"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import type { CalendlyBlock } from "@/lib/content/types";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

function loadCalendlyScript() {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function CalendlyBlockView({
  block,
  fallbackUrl,
}: {
  block: CalendlyBlock;
  fallbackUrl?: string;
}) {
  const reactId = useId();
  const containerId = useMemo(
    () => `calendly-${reactId.replace(/:/g, "")}`,
    [reactId],
  );
  const trackedSchedule = useRef(false);

  const url = (block.url || fallbackUrl || "").trim();
  const height = block.height && block.height > 400 ? block.height : 700;

  useEffect(() => {
    if (!url) return;
    loadCalendlyScript();

    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || typeof data !== "object") return;
      const name = String((data as { event?: string }).event || "");
      if (!name.startsWith("calendly.")) return;

      if (name === "calendly.event_scheduled" && !trackedSchedule.current) {
        trackedSchedule.current = true;
        trackEvent(AnalyticsEvents.calendlyBooked, { path: window.location.pathname });
      }
      if (name === "calendly.profile_page_viewed") {
        trackEvent(AnalyticsEvents.calendlyView, { path: window.location.pathname });
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [url]);

  return (
    <section className="site-section">
      <div className="site-container">
        {(block.heading || block.intro) && (
          <div className="mb-8 max-w-2xl">
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

        {!url ? (
          <div className="border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-sm text-[var(--color-muted)]">
            Add your Calendly link in <strong>Theme → Calendly URL</strong> or
            edit this block’s URL (e.g.{" "}
            <code>https://calendly.com/your-name/15min</code>).
          </div>
        ) : (
          <div
            id={containerId}
            className="calendly-inline-widget w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
            data-url={url}
            style={{ minWidth: "320px", height }}
          />
        )}
      </div>
    </section>
  );
}
