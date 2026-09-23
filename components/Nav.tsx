"use client";

import { Menu, X } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Seven labels, one of them long, need roughly 660px inside the pill — too
 * tight at `md`, so the row appears at `lg`. Below that the same links sit
 * behind the Menu disclosure rather than being absent.
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
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);

  // The pill tucks away while the reader scrolls down into the page and comes
  // back the moment they scroll up — the nav is there when they reach for it
  // and out of the way while they read. Never while the menu is open.
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    const menuOpen = menu.current?.hasAttribute("open");
    setTucked(!menuOpen && y > previous && y > 480);
  });

  // The reading-progress line along the pill's bottom edge. Sprung, so a jump
  // from a nav click glides instead of snapping.
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  // A native <details> rather than state, so the menu opens with JavaScript
  // off. The one thing it can't do on its own is shut after a jump, so that
  // part is scripted.
  const closeMenu = () => menu.current?.removeAttribute("open");

  // What a native <details> doesn't give a menu: Escape and a tap outside.
  // They read `open` off the element rather than mirroring it into React
  // state, so the menu's openness has one source of truth.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !el.hasAttribute("open")) return;
      closeMenu();
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
    // The header is a transparent strip; only the pill inside it takes
    // pointer events, so the page stays clickable around it.
    <header className="no-print pointer-events-none sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <motion.nav
        aria-label="Section navigation"
        animate={{ y: tucked ? "-140%" : "0%" }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        className={`nav-pill pointer-events-auto relative mx-auto flex w-full max-w-6xl items-center justify-between gap-1 rounded-full border border-rule bg-paper-raised/75 backdrop-blur-xl backdrop-saturate-150 transition-[padding,box-shadow] duration-300 lg:w-fit lg:justify-start ${
          scrolled
            ? "p-1 shadow-[var(--shadow-float)]"
            : "p-1.5 shadow-[var(--shadow)]"
        }`}
      >
        {/* A wordmark, not a byline: first name and a full stop, set heavy and
            tight. The stop matches the hero triad — "Engineer. Mentor.
            Builder." — so the page has one idiom. */}
        <a
          href="#top"
          className="tap group flex min-w-0 items-center rounded-full px-3 py-1.5 lg:mr-1 lg:border-r lg:border-rule lg:rounded-none lg:pr-4"
        >
          <span
            className="min-w-0 font-display text-base font-bold tracking-[-0.03em] transition-colors group-hover:text-teal"
            aria-hidden="true"
          >
            {profile.name.split(" ")[0]}
            <span className="text-teal">.</span>
          </span>
          <span className="sr-only">{profile.name} — back to top</span>
        </a>

        <ul className="hidden items-center lg:flex">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative isolate block rounded-full px-3 py-1.5 font-display text-sm font-medium transition-colors hover:text-teal ${
                    isActive ? "text-teal" : "text-ink-soft"
                  }`}
                >
                  {/* One pill for the whole row, handed from link to link by
                      a shared layout id, so it slides to the section the
                      reader has reached instead of blinking on and off. */}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-teal-wash"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  ) : null}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 lg:ml-1">
          <details ref={menu} className="nav-menu lg:hidden">
            <summary className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 font-display text-xs font-semibold tracking-[0.1em] text-ink-soft uppercase transition-colors hover:bg-teal-wash/60 hover:text-teal">
              <Menu className="nav-menu-open h-4 w-4" aria-hidden="true" />
              <X className="nav-menu-close h-4 w-4" aria-hidden="true" />
              {/* The visible word is the accessible name, so "tap Menu" works
                  under voice control. */}
              Menu
              <span className="sr-only"> — section navigation</span>
            </summary>

            {/* A sheet hung under the pill. Opaque: over the hero's display
                type a translucent panel left the words legible through the
                links. The rows stagger in — see `.nav-menu[open]` in CSS. */}
            <ul className="nav-sheet absolute inset-x-0 top-full mt-2 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-3xl border border-rule bg-paper-raised p-2 shadow-[var(--shadow-float)]">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active === link.href ? "location" : undefined}
                    className={`block rounded-2xl px-4 py-3 font-display text-base font-medium transition-colors ${
                      active === link.href
                        ? "bg-teal-wash text-teal"
                        : "text-ink-soft hover:bg-teal-wash/50"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <ThemeToggle />
        </div>

        {/* Reading progress, riding the pill's lower edge. Decorative. */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="pointer-events-none absolute right-6 bottom-0 left-6 h-0.5 origin-left rounded-full bg-teal"
        />
      </motion.nav>
    </header>
  );
}
