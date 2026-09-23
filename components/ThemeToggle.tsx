"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Stateless by design. The active theme lives on <html data-theme>, so the
 * button reads it at click time and CSS picks the icon — no React state to
 * fall out of sync, and the correct icon shows before hydration.
 *
 * Where the browser has the View Transitions API, the new palette spreads out
 * in a circle from the button. The circle is drawn on the `::view-transition-new`
 * snapshot (see globals.css), so no page content moves. Without the API, or
 * with reduced motion, the swap is instant.
 */
export function ThemeToggle() {
  function apply(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing / storage disabled — the choice just won't persist.
    }
  }

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const current = document.documentElement.getAttribute(
      "data-theme",
    ) as Theme | null;
    const next: Theme = current === "dark" ? "light" : "dark";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reduce) {
      apply(next);
      return;
    }

    // Keyboard activation reports 0,0 — start from the button's centre then.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => apply(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 560,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle between light and dark theme"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-rule text-ink-soft transition-[color,border-color,transform] duration-200 hover:rotate-12 hover:border-teal hover:text-teal lg:h-9 lg:w-9"
    >
      <Sun className="theme-icon-sun h-4 w-4" aria-hidden="true" />
      <Moon className="theme-icon-moon h-4 w-4" aria-hidden="true" />
    </button>
  );
}
