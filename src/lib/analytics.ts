"use client";

import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

function cleanProps(props?: Props) {
  if (!props) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;
    out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Fire a custom event to Vercel Analytics and Plausible (if configured). */
export function trackEvent(name: string, props?: Props) {
  const cleaned = cleanProps(props);
  try {
    track(name, cleaned);
  } catch {
    // Analytics may be blocked or unavailable locally.
  }
  try {
    if (typeof window !== "undefined" && typeof window.plausible === "function") {
      window.plausible(name, cleaned ? { props: cleaned } : undefined);
    }
  } catch {
    // ignore
  }
}

export const AnalyticsEvents = {
  hireMeClick: "Hire Me Click",
  contactSubmit: "Contact Submit",
  contactSubmitError: "Contact Submit Error",
  resumePrint: "Resume Print",
  calendlyView: "Calendly View",
  calendlyBooked: "Calendly Booked",
  scrollDepth: "Scroll Depth",
  timeOnPage: "Time On Page",
} as const;
