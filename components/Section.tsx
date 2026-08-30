import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitWords } from "./SplitWords";

type SectionProps = {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
};

/**
 * Every content section shares this shell: a real <section> labelled by its
 * own <h2>, so the heading outline reads correctly to screen readers and to
 * anything parsing the page as a résumé.
 */
export function Section({ id, title, icon, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      // Vertical rhythm: 40px of air above and below on a phone, 64px from
      // `sm` up. The section padding is the largest gap on the page — it has
      // to out-measure the 24/32px heading gap inside it by a clear step, or
      // the sections read as one column of blocks. 48/80 cleared that bar with
      // room to spare and simply made the page longer to scroll.
      className="py-10 sm:py-16"
    >
      {/* Same container as the nav, the hero and the footer. Every section on
          the page shares one left edge — see README design constraints. */}
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        {/* `hold` rather than `rise`: the heading row itself doesn't move, it
            just tells the words inside when they're on screen. Fading the row
            as well would double the motion on every section. */}
        <Reveal
          mode="hold"
          className="mb-6 flex items-center gap-3 border-b border-rule pb-3 sm:mb-8"
        >
          {icon ? (
            <span className="section-icon text-teal" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="font-display text-2xl font-bold tracking-[-0.035em] sm:text-3xl"
          >
            <SplitWords text={title} />
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
