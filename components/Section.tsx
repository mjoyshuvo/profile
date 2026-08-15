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
      className="scroll-mt-24 py-14 sm:py-20"
    >
      {/* Same container as the nav, the hero and the footer. Every section on
          the page shares one left edge — see README design constraints. */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* `hold` rather than `rise`: the heading row itself doesn't move, it
            just tells the words inside when they're on screen. Fading the row
            as well would double the motion on every section. */}
        <Reveal
          mode="hold"
          className="mb-8 flex items-center gap-3 border-b border-rule pb-3"
        >
          {icon ? (
            <span className="text-teal" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            <SplitWords text={title} />
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
