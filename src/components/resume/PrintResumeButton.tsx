"use client";

import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

export function PrintResumeButton() {
  return (
    <button
      type="button"
      className="btn-primary text-sm no-print"
      onClick={() => {
        trackEvent(AnalyticsEvents.resumePrint);
        window.print();
      }}
    >
      Print / Save PDF
    </button>
  );
}
