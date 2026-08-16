import { ExternalLink, Layers } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { CardWash } from "./CardWash";
import { Disclosure } from "./Disclosure";
import { OpenOnHash } from "./OpenOnHash";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * An index of the work first: each project rests as a row a reader can take in
 * at a glance — name, client, period, the one-line gist and the headline figure
 * — and the case study opens underneath on demand. Four full cards of prose
 * arriving straight after the Experience timeline was more than anyone skims.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      title="Products and systems"
      icon={<Layers className="h-6 w-6" />}
    >
      <OpenOnHash />

      <ul className="space-y-5 sm:space-y-6">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            id={`project-${project.slug}`}
            // Clears the sticky nav when Experience links straight to a card.
            className="scroll-mt-24"
          >
            <Reveal delay={i * 0.05}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const bodyId = `project-${project.slug}-body`;

  return (
    <article className="proj-card group relative overflow-hidden rounded-2xl border border-rule bg-paper-raised transition-[border-color,box-shadow,transform] duration-200 hover:border-teal [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[var(--shadow)]">
      <CardWash />

      <div className="relative p-5 sm:p-7">
        <div className="gap-7 lg:grid lg:grid-cols-[1fr_13rem] lg:items-start">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <span
                className="font-mono text-xs font-semibold text-teal/50 tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                {project.name}
              </h3>
            </div>

            <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase sm:ml-[calc(1.5rem+0.75rem)]">
              {project.client ? (
                <>
                  {project.clientUrl ? (
                    <a
                      href={project.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-teal"
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
                className="transition-colors hover:text-teal"
              >
                via {project.company}
              </a>
            </p>

            {/* What the card rests on. One line, so the row can be read at a
                glance and the case study stays optional. */}
            <p className="mt-3 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:ml-[calc(1.5rem+0.75rem)]">
              {project.gist}
            </p>
          </div>

          {/* The headline figure is the card's graphic. A schematic here was
              decoration standing in for a fact; the number is the fact. */}
          {project.metric ? (
            <p className="order-first mt-5 flex items-baseline gap-3 rounded-xl border border-rule bg-paper px-4 py-3 lg:order-none lg:mt-0 lg:block lg:px-5 lg:py-5 lg:text-center">
              <span className="font-display text-3xl leading-none font-bold text-teal tabular-nums sm:text-4xl lg:text-5xl">
                {project.metric.value}
              </span>
              <span className="font-mono text-[0.6875rem] leading-snug tracking-[0.08em] text-ink-faint uppercase lg:mt-3 lg:block">
                {project.metric.label}
              </span>
            </p>
          ) : null}
        </div>

        {/* The case study. Clipped rather than removed — see Disclosure — so
            it's in the DOM and in the accessibility tree whether or not the
            reader opens it. The padding sits inside the clipped box, so a
            closed card contributes no height at all.

            Label-and-value pairs, so they get the element that says so — which
            is also the structure an ATS reads. */}
        <div id={bodyId} className="proj-body">
          <dl className="space-y-4 pt-6">
            <Field label="Product">{project.product}</Field>
            <Field label="What I did">{project.work}</Field>
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-rule pt-5">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-full border border-rule bg-paper px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft transition-colors group-hover:border-teal/30 hover:border-teal hover:text-teal"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* The first card opens by default: the section should lead with a
              worked example rather than four closed doors. */}
          <Disclosure
            more="Case study"
            less="Close"
            controls={bodyId}
            defaultOpen={index === 0}
          />
        </div>
      </div>
    </article>
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
      <dt className="pt-0.5 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
        {label}
      </dt>
      <dd className="mt-1 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:mt-0">
        {children}
      </dd>
    </div>
  );
}
