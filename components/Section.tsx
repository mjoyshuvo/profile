import type { ReactNode } from "react";

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
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="mb-8 flex items-center gap-3 border-b border-rule pb-3">
          {icon ? (
            <span className="text-teal" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
