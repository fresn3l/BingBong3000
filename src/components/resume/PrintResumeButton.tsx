"use client";

export function PrintResumeButton() {
  return (
    <button
      type="button"
      className="btn-primary text-sm no-print"
      onClick={() => window.print()}
    >
      Print / Save PDF
    </button>
  );
}
