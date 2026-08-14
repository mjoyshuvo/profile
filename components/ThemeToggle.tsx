"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Light is the site default and the OS preference is deliberately ignored, so
 * an unset theme always means light. Reading the OS here instead would make
 * the first click a no-op for anyone on a dark-mode machine.
 */
const DEFAULT_THEME: Theme = "light";

/**
 * Stateless by design. The active theme lives on <html data-theme>, so the
 * button reads it at click time and CSS picks the icon — no React state to
 * fall out of sync, and the correct icon shows before hydration.
 */
export function ThemeToggle() {
  function toggle() {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ?? DEFAULT_THEME;
    const next: Theme = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing / storage disabled — the choice just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle between light and dark theme"
      className="grid h-9 w-9 place-items-center rounded-full border border-rule text-ink-soft transition-colors hover:border-teal hover:text-teal"
    >
      <Sun className="theme-icon-sun h-4 w-4" aria-hidden="true" />
      <Moon className="theme-icon-moon h-4 w-4" aria-hidden="true" />
    </button>
  );
}
