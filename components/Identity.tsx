import { Compass } from "lucide-react";
import { pillars } from "@/content/identity";
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
        className="space-y-10 sm:space-y-12"
      >
        {pillars.map((pillar, i) => (
          <li
            key={pillar.title}
            className="grid gap-2 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
          >
            {/* aria-hidden so a screen reader announcing list positions doesn't
                read "one, oh-one". */}
            <span
              className="font-display text-3xl leading-none font-bold text-teal/30 sm:text-4xl"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <p className="text-xs tracking-[0.18em] text-ink-faint uppercase">
                {pillar.eyebrow}
              </p>
              <h3 className="mt-1.5 font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                {pillar.title}
              </h3>
              {/* The section spans the full page width like every other, but
                  the reading measure is capped — 130 characters a line is not
                  a line anyone finishes. */}
              <p className="mt-2.5 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                {pillar.body}
              </p>
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
