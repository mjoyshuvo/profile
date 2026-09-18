import { Compass } from "lucide-react";
import { pillars } from "@/content/identity";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Three parallel disciplines, read as one triad.
 *
 * These used to be three full-width raised cards — the same card the project
 * index uses — each carrying a solid teal 01/02/03 chip. That spent three
 * screens on three things that belong side by side, put a rank on work that
 * has none, and made this section indistinguishable from Products and systems
 * a scroll further down. The raised card now belongs to the projects alone.
 * What is left here is an accent rule, a discipline glyph and the prose.
 */
export function Identity() {
  return (
    <Section
      id="identity"
      title="Engineering identity"
      icon={<Compass className="h-6 w-6" />}
    >
      {/* A <ul>: the items are a set, not a sequence. One observed container
          drives the whole ladder — see the stagger rules in globals.css. */}
      <Reveal
        mode="stagger"
        as="ul"
        step={0.07}
        className="grid gap-8 sm:gap-10 lg:grid-cols-3"
      >
        {pillars.map(({ eyebrow, icon: Icon, title, body }) => (
          <li
            key={title}
            // The accent rule is the whole frame. It rests in --rule and takes
            // the teal on hover, so the section keeps the page's one
            // interaction without borrowing the card's lift and shadow.
            className="group border-l-2 border-rule pl-5 transition-colors duration-200 hover:border-teal"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-wash text-teal"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>

              {/* The role is the label a skimming reader sorts by, so it
                  carries the teal and sits level with the glyph. */}
              <p className="font-display text-[0.8125rem] font-bold tracking-[0.14em] text-teal uppercase">
                {eyebrow}
              </p>
            </div>

            <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.03em]">
              {title}
            </h3>

            {/* Capped at a column's worth below lg, where the row still spans
                the page — 130 characters a line is not a line anyone
                finishes. In the three-column layout the grid already caps it. */}
            <p className="mt-2.5 max-w-[68ch] text-sm leading-relaxed text-ink-soft">
              {body}
            </p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
