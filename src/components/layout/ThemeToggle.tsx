"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Mode = "light" | "dark";

function applyMode(mode: Mode) {
  document.documentElement.setAttribute("data-theme", mode);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // ignore
  }
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme");
    if (stored === "dark" || stored === "light") {
      setMode(stored);
      return;
    }
    try {
      const fromStore = localStorage.getItem(THEME_STORAGE_KEY);
      if (fromStore === "dark" || fromStore === "light") {
        applyMode(fromStore);
        setMode(fromStore);
        return;
      }
    } catch {
      // ignore
    }
    applyMode("light");
  }, []);

  function toggle() {
    const next: Mode = mode === "light" ? "dark" : "light";
    applyMode(next);
    setMode(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-ghost"
      aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={mode === "light" ? "Dark mode" : "Light mode"}
    >
      {mode === "light" ? (
        <span aria-hidden className="text-sm">
          Dark
        </span>
      ) : (
        <span aria-hidden className="text-sm">
          Light
        </span>
      )}
    </button>
  );
}

/** Inline script to set theme before paint and avoid flash */
export const themeInitScript = `
(function(){
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var mode = stored === 'dark' || stored === 'light' ? stored : 'light';
    document.documentElement.setAttribute('data-theme', mode);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;
