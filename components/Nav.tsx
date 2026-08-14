"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
  { href: "#skills", label: "Skills" },
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
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
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
        className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#top"
          className="font-serif text-base font-semibold tracking-tight transition-colors hover:text-teal"
        >
          {profile.name}
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
