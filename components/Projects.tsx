import { ExternalLink, Layers } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { systemDiagrams } from "./SystemDiagrams";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Products and systems"
      icon={<Layers className="h-5 w-5" />}
    >
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
  const Diagram = systemDiagrams[project.diagram];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-rule bg-paper-raised transition-[border-color,box-shadow,transform] duration-200 hover:border-teal [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[var(--shadow)]">
      {/* Soft teal bloom in the corner, the same decorative idiom as the
          contact panel. Fades up on hover rather than sitting at full strength. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-teal/[0.07] blur-3xl transition-opacity duration-300 group-hover:bg-teal/[0.12]"
      />

      <div className="relative p-5 sm:p-7">
        <div className="gap-7 lg:grid lg:grid-cols-[1fr_16rem] lg:items-start">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <span
                className="font-serif text-sm font-bold text-teal/40 tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
                {project.name}
              </h3>
            </div>

            <p className="mt-2 ml-[calc(0.875rem+0.75rem)] text-xs tracking-[0.12em] text-ink-faint uppercase">
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

            {/* Problem and Approach are label-and-value pairs, so they get the
                element that says so — which is also the structure an ATS reads.
                Experience carries the quantified outcomes; these carry the
                decision. */}
            <dl className="mt-5 space-y-4">
              <Field label="Problem">{project.problem}</Field>
              <Field label="Approach">{project.approach}</Field>
            </dl>
          </div>

          {/* The diagram gets its own recessed panel rather than floating on
              the card — it reads as a schematic instead of as decoration. */}
          <div className="order-first mt-6 rounded-xl border border-rule bg-paper p-3 text-ink lg:order-none lg:mt-0">
            <Diagram />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-rule pt-5">
          {/* Not every project has a production number — a hackathon build has
              none, and a made-up one would be worse than none. */}
          {project.metric ? (
            <p className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-teal sm:text-3xl">
                {project.metric.value}
              </span>
              <span className="text-sm text-ink-faint">
                {project.metric.label}
              </span>
            </p>
          ) : null}

          <ul className="flex flex-wrap gap-2 sm:ml-auto">
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-full border border-rule bg-paper px-2.5 py-1 text-xs text-ink-soft transition-colors group-hover:border-teal/30 hover:border-teal hover:text-teal"
              >
                {item}
              </li>
            ))}
          </ul>
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
    <div className="sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-4">
      <dt className="pt-0.5 text-xs tracking-[0.18em] text-ink-faint uppercase">
        {label}
      </dt>
      <dd className="mt-1 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:mt-0">
        {children}
      </dd>
    </div>
  );
}
