import { Compass } from "lucide-react";
import { pillars } from "@/content/identity";
import { CardWash } from "./CardWash";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Identity() {
  return (
    <Section
      id="identity"
      title="Engineering identity"
      icon={<Compass className="h-6 w-6" />}
    >
      {/* An <ol>: the items are genuinely ordinal, so the visible numerals and
          the markup should agree. One observed container drives the whole
          ladder — see the stagger rules in globals.css. */}
      <Reveal
        mode="stagger"
        as="ol"
        step={0.07}
        className="space-y-5 sm:space-y-6"
      >
        {pillars.map((pillar, i) => (
          <li key={pillar.title}>
            <article className="group relative overflow-hidden rounded-2xl border border-rule bg-paper-raised p-5 transition-[border-color,box-shadow,transform] duration-200 hover:border-teal sm:p-7 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[var(--shadow)]">
              <CardWash />

              <div className="relative">
                <div className="flex items-center gap-3.5">
                  {/* aria-hidden so a screen reader announcing list positions
                      doesn't read "one, oh-one". */}
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal font-display text-xs font-bold text-on-teal tabular-nums"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* The role is the label a skimming reader sorts by, so it
                      carries the teal and sits level with the title rather
                      than shrinking above it. */}
                  <p className="font-display text-[0.8125rem] font-bold tracking-[0.14em] text-teal uppercase">
                    {pillar.eyebrow}
                  </p>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                  {pillar.title}
                </h3>

                {/* The card spans the full page width like every other, but
                    the reading measure is capped — 130 characters a line is
                    not a line anyone finishes. */}
                <p className="mt-2.5 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            </article>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
