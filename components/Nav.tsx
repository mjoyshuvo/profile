"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#writing", label: "Writing" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");

  // Scrollspy. Purely decorative — the links are plain anchors and work with
  // JavaScript disabled.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
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
        {/* Masthead: avatar, name, and the disciplines as a role line. */}
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
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-teal ${
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
    </header>
  );
}
