"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Seven labels, one of them long, need roughly 660px — too tight at `md`
 * alongside the masthead, so the row appears at `lg`. Below that the same
 * links are behind the Menu disclosure rather than absent, which is what they
 * were before: the row was `hidden lg:flex` with nothing standing in for it,
 * so a phone got a masthead and no navigation at all.
 */
const links = [
  { href: "#identity", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#recommendations", label: "Recommendations" },
  { href: "#skills", label: "Skills" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

/**
 * Every section the scrollspy watches — deliberately a superset of `links`.
 *
 * Building the observer from `links` alone meant a section with no nav entry
 * was never observed, so the last-lit pill stayed lit while the reader was
 * somewhere else entirely. Watching everything means those sections simply
 * clear the highlight, which is the honest answer.
 */
const spySections = [
  "#identity",
  "#experience",
  "#projects",
  "#recommendations",
  "#skills",
  "#certifications",
  "#writing",
  "#education",
  "#contact",
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const menu = useRef<HTMLDetailsElement>(null);

  // A native <details> rather than state, so the menu opens with JavaScript
  // off — same reasoning as the recommendation quote. The one thing it can't
  // do on its own is shut after a jump, so that part is scripted.
  const closeMenu = () => menu.current?.removeAttribute("open");

  // What a native <details> doesn't give a menu: Escape and a tap outside.
  // Both listeners are always mounted and cheap — they read `open` off the
  // element rather than mirroring it into React state, which would make the
  // menu's openness two sources of truth instead of one.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !el.hasAttribute("open")) return;
      closeMenu();
      // Escape should leave the reader on the control they opened, not adrift
      // at the top of the document.
      el.querySelector("summary")?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!el.hasAttribute("open")) return;
      if (event.target instanceof Node && el.contains(event.target)) return;
      closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  // Scrollspy. Purely decorative — the links are plain anchors and work with
  // JavaScript disabled.
  useEffect(() => {
    const sections = spySections
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <nav
        aria-label="Section navigation"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 sm:px-8"
      >
        {/* Masthead: the wordmark alone. The sketch used to sit beside it, but
            it is the same drawing the hero shows at ten times the size a
            screen-length below, and a pencil portrait at 32px is a grey smudge
            rather than a face — it also needed its own cream coin to survive
            the dark palette, so it read as a disc stuck on the paper. */}
        <a href="#top" className="tap group flex min-w-0 items-center">
          {/* A wordmark, not a byline: first name and a full stop, set heavy
              and tight. The full name is a sentence, and a sentence in the
              masthead competes with the six links beside it. The stop matches
              the hero triad — "Engineer. Mentor. Builder." — so the page has
              one idiom rather than two. The teal is on the stop alone, which
              is as much accent as a 16px mark can carry. */}
          <span
            className="min-w-0 font-display text-lg font-bold tracking-[-0.03em] transition-colors group-hover:text-teal"
            aria-hidden="true"
          >
            {profile.name.split(" ")[0]}
            <span className="text-teal">.</span>
          </span>
          {/* The mark says "Mrityunjoy"; the link still has to say where it
              goes and who it belongs to. */}
          <span className="sr-only">{profile.name} — back to top</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "location" : undefined}
                  // Hovering fills the pill with the same teal wash the active
                  // one carries, so the highlight the reader is about to move
                  // to is the highlight they already see.
                  className={`rounded-full px-3 py-1.5 font-display text-sm font-medium transition-colors hover:bg-teal-wash/60 hover:text-teal ${
                    active === link.href
                      ? "bg-teal-wash text-teal"
                      : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* The same links under `lg`. The panel hangs off the header rather
              than the button so it can span the full width without the button
              having to be full width. */}
          <details ref={menu} className="nav-menu lg:hidden">
            <summary
              // min-h-11 rather than padding alone: this is the one standalone
              // control on a phone, and 44px is the tap target it should be.
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rule px-4 font-display text-xs font-semibold tracking-[0.1em] text-ink-soft uppercase transition-colors hover:border-teal hover:text-teal"
            >
              <Menu className="nav-menu-open h-4 w-4" aria-hidden="true" />
              <X className="nav-menu-close h-4 w-4" aria-hidden="true" />
              {/* The visible word is the accessible name. An `aria-label` here
                  read "Open section navigation", which does not contain "Menu"
                  — so "tap Menu" failed under voice control, and the label
                  still said "Open" while the menu was open. The extra context
                  is appended instead of replacing the name. */}
              Menu
              <span className="sr-only"> — section navigation</span>
            </summary>

            {/* Opaque, unlike the header above it. The bar can be translucent
                because it is a 3.5rem strip; a panel this tall over the hero
                left the display type legible straight through the links. */}
            <ul className="absolute inset-x-0 top-full max-h-[calc(100svh-3.5rem)] overflow-y-auto border-b border-rule bg-paper px-6 py-3 shadow-[var(--shadow)] sm:px-8">
              {links.map((link) => (
                <li
                  key={link.href}
                  className="border-b border-rule/60 last:border-0"
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active === link.href ? "location" : undefined}
                    // A full-width row, not a pill: at this size the target
                    // should be the whole line rather than the word.
                    className={`block rounded-lg px-3 py-3 font-display text-base font-medium transition-colors ${
                      active === link.href
                        ? "bg-teal-wash text-teal"
                        : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Last in the cluster and outside the `lg` split, so the control is
              in the same corner at every width rather than appearing and
              disappearing with the link row. */}
          <ThemeToggle />
        </div>
      </nav>

      {/* Scroll progress. CSS-only — a JS scroll listener would put per-frame
          work on the main thread for a decorative hairline. Engines without
          scroll-driven animations never show it, which is a fine outcome for
          something purely decorative. */}
      <span className="scroll-progress no-print" aria-hidden="true" />
    </header>
  );
}
