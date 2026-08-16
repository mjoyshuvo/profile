"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

/**
 * Six labels, one of them long, need roughly 600px — too tight at `md`
 * alongside the masthead, so the row appears at `lg`. Writing is reachable by
 * scrolling; it lost its slot to Recommendations.
 */
const links = [
  { href: "#identity", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#recommendations", label: "Recommendations" },
  { href: "#skills", label: "Skills" },
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
  "#writing",
  "#education",
  "#contact",
];

export function Nav() {
  const [active, setActive] = useState<string>("");

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
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Masthead: avatar and name. */}
        <a href="#top" className="group flex min-w-0 items-center gap-2.5">
          <Image
            src={profile.sketch}
            alt=""
            aria-hidden="true"
            width={640}
            height={603}
            sizes="32px"
            // The sketch is transparent line art, so the coin carries its own
            // paper — otherwise the ink disappears on the dark palette.
            className="h-8 w-8 shrink-0 rounded-full bg-[#efece4] object-cover object-[50%_18%] ring-1 ring-rule"
          />
          <span className="min-w-0 font-serif text-base font-semibold tracking-tight transition-colors group-hover:text-teal">
            {profile.name}
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  // Hovering fills the pill with the same teal wash the active
                  // one carries, so the highlight the reader is about to move
                  // to is the highlight they already see.
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-teal-wash/60 hover:text-teal ${
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
