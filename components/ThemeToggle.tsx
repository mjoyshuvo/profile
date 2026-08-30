"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Stateless by design. The active theme lives on <html data-theme>, so the
 * button reads it at click time and CSS picks the icon — no React state to
 * fall out of sync, and the correct icon shows before hydration.
 *
 * The head script always writes `data-theme`, resolving the OS preference when
 * nothing is stored, so the attribute is never absent and the first click is
 * never a no-op for a reader on a dark-mode machine.
 */
export function ThemeToggle() {
  function toggle() {
    const current = document.documentElement.getAttribute(
      "data-theme",
    ) as Theme | null;
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
      // 44px on touch, matching the Menu button beside it; the desktop row has
      // a pointer and can take the tighter circle.
      className="grid h-11 w-11 place-items-center rounded-full border border-rule text-ink-soft transition-colors hover:border-teal hover:text-teal lg:h-9 lg:w-9"
    >
      <Sun className="theme-icon-sun h-4 w-4" aria-hidden="true" />
      <Moon className="theme-icon-moon h-4 w-4" aria-hidden="true" />
    </button>
  );
}
