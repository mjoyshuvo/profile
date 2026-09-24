import { ArrowRight, ExternalLink, Layers } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { CardWash } from "./CardWash";
import { Disclosure } from "./Disclosure";
import { OpenOnHash } from "./OpenOnHash";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { StackEffect } from "./StackEffect";

/** Shown while the card rests; the remainder arrives with the case study. */
const TECH_AT_REST = 5;

/**
 * An index of the work first: each project rests as a row a reader can take in
 * at a glance — name, client, period, the one-line gist and a drawing of it
 * — and the case study opens underneath on demand. Four full cards of prose
 * arriving straight after the Experience timeline was more than anyone skims.
 *
 * This is now the page's only raised card. Engineering identity used to carry
 * the same one, which made two different kinds of thing read as one long
 * stream; it has been quietened to an accent rule so the box means "a product"
 * wherever it appears.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      title="Products and systems"
      icon={<Layers className="h-6 w-6" />}
    >
      <OpenOnHash />
      <StackEffect />

      {/* From `md` up the cards pin and stack as the reader scrolls — see
          `.proj-stack` in globals.css. `--i` steps each pinned card a little
          lower than the last, so the edges of the ones beneath still show. */}
      <ul className="proj-stack space-y-5 sm:space-y-6 md:space-y-10">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            // Deep-linked from Experience. The nav is cleared by
            // `scroll-padding-top` on <html>, so no scroll-margin here.
            id={`project-${project.slug}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="proj-layer">
              <Reveal delay={i * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const bodyId = `project-${project.slug}-body`;
  const restingTech = project.tech.slice(0, TECH_AT_REST);
  const remainingTech = project.tech.slice(TECH_AT_REST);

  return (
    <article className="proj-card spot-card lift-card group relative overflow-hidden rounded-3xl border border-rule bg-paper-raised shadow-[var(--shadow)]">
      <CardWash />

      <div className="relative p-5 sm:p-7">
        {/* Title and figure share the top line. The card used to lead with a
            teal 01/02/03 ordinal, which ranked four projects that aren't
            ranked and forced every line beneath it into a hanging indent to
            clear the numeral. The drawing earns that space instead. */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
              {project.name}
            </h3>

            <p className="mt-2 font-display font-semibold text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
              {project.client ? (
                <>
                  {project.clientUrl ? (
                    <a
                      href={project.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap inline-flex items-center gap-1 transition-colors hover:text-teal"
                    >
                      {project.client}
                      <ExternalLink
                        className="h-3 w-3 opacity-60"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    project.client
                  )}
                  <span className="mx-2 text-rule" aria-hidden="true">
                    /
                  </span>
                </>
              ) : null}
              {project.period}
              <span className="mx-2 text-rule" aria-hidden="true">
                /
              </span>
              {/* Points back at the timeline entry this was delivered under. */}
              <a
                href="#experience"
                className="tap inline-block transition-colors hover:text-teal"
              >
                via {project.company}
              </a>
            </p>

            {/* What the card rests on. One line, so the row can be read at a
                glance and the case study stays optional. Beside the figures,
                so the panel on the right has text to stand next to. */}
            <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              {project.gist}
            </p>
          </div>

          {/* The card's graphic: a drawing of what the product is. Its
              numbers are in Experience and in the case study below. */}
          <ProjectVisual project={project} />
        </div>

        {/* The case study. Clipped rather than removed — see Disclosure — so
            it's in the DOM and in the accessibility tree whether or not the
            reader opens it. The padding sits inside the clipped box, so a
            closed card contributes no height at all. */}
        {/* A one-row grid whose track opens from 0fr to 1fr, so the body
            animates to its real height — no max-height ceiling to outgrow. */}
        <div id={bodyId} className="proj-body">
          <div className="proj-body-inner">
            {project.stats ? <Stats stats={project.stats} /> : null}

            {/* Label-and-value pairs get the element that says so — which is
                also the structure an ATS reads. */}
            <dl className="proj-body-fields space-y-4 pt-6">
              <Field label="Product">{project.product}</Field>
              <Field label="What I did">{project.work}</Field>
            </dl>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-rule pt-5">
          {/* Twelve pills on the Veyt card buried the five that matter. A
              resting card shows five and a count; the rest arrive with the
              case study, which is where a reader who wants the full stack
              already is. The count is aria-hidden because the pills it stands
              for are hidden too — a screen reader is told five, then all
              twelve, and never "plus seven" with nothing to point at. */}
          <ul className="flex flex-wrap gap-2">
            {restingTech.map((item) => (
              <TechPill key={item}>{item}</TechPill>
            ))}
            {remainingTech.map((item, i) => (
              <TechPill
                key={item}
                className="proj-tech-rest"
                style={{ "--i": i } as React.CSSProperties}
              >
                {item}
              </TechPill>
            ))}
            {remainingTech.length > 0 ? (
              <li
                className="proj-tech-count rounded-full border border-teal/30 bg-teal-wash px-2.5 py-1 font-display text-[0.6875rem] font-semibold text-teal"
                aria-hidden="true"
              >
                +{remainingTech.length}
              </li>
            ) : null}
          </ul>

          {/* Every card rests closed, including the first. Opening one by
              default gave the section two different shapes and the top card
              read as a different kind of thing than the three below it. */}
          <Disclosure more="Case study" less="Close" controls={bodyId} />
        </div>
      </div>
    </article>
  );
}

/**
 * Before-and-after tiles.
 *
 * Every figure the case studies carry is a comparison — 99.4 ms became
 * 0.193 ms, the slowest jobs lost half their runtime — and a number alone in a
 * box states the result while throwing the comparison away. The old value is
 * struck through in faint ink, the new one lands in teal, and a hairline runs
 * between them as the card opens. A proportional bar was the obvious
 * alternative and it fails here: a 515x speed-up draws as a 2% sliver that
 * reads as a rendering fault. This shape holds at every ratio.
 *
 * The motion is in globals.css, keyed to the card being open.
 */
function Stats({ stats }: { stats: NonNullable<Project["stats"]> }) {
  return (
    <ul className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="stat-tile rounded-xl border border-rule bg-paper p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-teal/40"
        >
          <p className="flex items-baseline gap-2.5">
            <span className="font-display text-sm font-semibold whitespace-nowrap text-ink-faint line-through tabular-nums">
              {stat.before}
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 shrink-0 text-teal"
              aria-hidden="true"
            />
            <span className="stat-fig font-display text-xl leading-none font-extrabold whitespace-nowrap text-teal tabular-nums">
              {stat.after}
            </span>
          </p>

          <span
            aria-hidden="true"
            className="stat-rule mt-3.5 block h-0.5 rounded-full bg-[linear-gradient(to_right,var(--rule),var(--teal))]"
          />

          <p className="mt-3 font-display font-semibold text-[0.6875rem] leading-snug tracking-[0.08em] text-ink-faint uppercase">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

function TechPill({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <li
      style={style}
      className={`rounded-full border border-rule bg-paper px-2.5 py-1 font-display text-[0.6875rem] font-medium text-ink-soft transition-colors group-hover:border-teal/30 hover:border-teal hover:text-teal ${className}`}
    >
      {children}
    </li>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="pt-0.5 font-display font-semibold text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
        {label}
      </dt>
      <dd className="mt-1 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:mt-0">
        {children}
      </dd>
    </div>
  );
}
