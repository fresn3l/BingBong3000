"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

const SCROLL_MARKS = [25, 50, 75, 100] as const;
const TIME_MARKS_MS = [15_000, 30_000, 60_000, 120_000] as const;

/**
 * Tracks scroll-depth milestones and time-on-page for the current route.
 * Fires once per milestone per page view.
 */
export function EngagementTracker() {
  const pathname = usePathname();
  const scrollSeen = useRef(new Set<number>());
  const timeSeen = useRef(new Set<number>());
  const startedAt = useRef(Date.now());

  useEffect(() => {
    scrollSeen.current = new Set();
    timeSeen.current = new Set();
    startedAt.current = Date.now();

    function scrollPercent() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      if (height <= 0) return 100;
      return Math.min(100, Math.round((scrollTop / height) * 100));
    }

    function onScroll() {
      const pct = scrollPercent();
      for (const mark of SCROLL_MARKS) {
        if (pct >= mark && !scrollSeen.current.has(mark)) {
          scrollSeen.current.add(mark);
          trackEvent(AnalyticsEvents.scrollDepth, {
            percent: mark,
            path: pathname,
          });
        }
      }
    }

    const timers = TIME_MARKS_MS.map((ms) =>
      window.setTimeout(() => {
        if (timeSeen.current.has(ms)) return;
        timeSeen.current.add(ms);
        trackEvent(AnalyticsEvents.timeOnPage, {
          seconds: Math.round(ms / 1000),
          path: pathname,
        });
      }, ms),
    );

    function flushFinalTime() {
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      if (seconds < 3) return;
      trackEvent(AnalyticsEvents.timeOnPage, {
        seconds,
        path: pathname,
        final: true,
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", flushFinalTime);
    onScroll();

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flushFinalTime);
      flushFinalTime();
    };
  }, [pathname]);

  return null;
}
