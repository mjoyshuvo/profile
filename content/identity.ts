export type Pillar = {
  /** Small uppercase label above the heading. */
  eyebrow: string;
  /** Rendered as the <h3>. */
  title: string;
  body: string;
};

/**
 * One pillar per discipline named in `profile.disciplines`, in the same order,
 * so this section expands the ruled list under the hero portrait rather than
 * introducing a second taxonomy of the same work.
 *
 * First person and descriptive. Each body says what the work actually is —
 * the technologies, the layer, the scale — in my own voice. No closing
 * one-liners.
 *
 * The 01/02/03 numeral is derived from the array index at render time and never
 * stored here, so reordering this list can't leave a stale numeral behind.
 */
export const pillars: Pillar[] = [
  {
    eyebrow: "Backend",
    title: "Services, data models, and the queries underneath",
    body: "I build REST APIs and microservices in Python — Django, Django REST Framework, FastAPI and Flask — and I design the data model before the endpoints. I keep the tenancy boundary in one place on multi-tenant systems, run single sign-on across services with Keycloak, cache on hot paths I have measured rather than guessed at, and move anything slow onto Celery so it never blocks a request. Most of my performance work has been profiling and rewriting queries rather than adding capacity.",
  },
  {
    eyebrow: "Data engineering",
    title: "Pipelines publishing timeseries and forecast data",
    body: "I build and run the 500+ production pipelines behind Veyt's market intelligence, producing the timeseries, timeseries groups and forecast curves the platform sells across carbon, guarantees of origin, power purchase agreements and renewable fuels. I write the Python ETL over sources that each have their own schedule and failure mode, design the schemas for timeseries at volume, and care most about the monitoring — I would rather find a failed run than have a customer find it. Multiprocessing took 50% off the slowest jobs.",
  },
  {
    eyebrow: "AI",
    title: "MCP tooling and agentic workflows on real systems",
    body: "I build MCP servers that give agents authenticated, typed access to internal systems, so an agent reads the actual state instead of inferring it. On top of those I build the workflows that absorb recurring engineering tasks, integrate LLM APIs inside existing Python services, and coach Cefalo teams through adopting both — including the parts where I think the approach does not pay.",
  },
];
