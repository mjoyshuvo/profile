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
 * Descriptive, not aphoristic. Each body says what the work actually is —
 * the technologies, the layer, the scale. No closing one-liners.
 *
 * The 01/02/03 numeral is derived from the array index at render time and never
 * stored here, so reordering this list can't leave a stale numeral behind.
 */
export const pillars: Pillar[] = [
  {
    eyebrow: "Backend",
    title: "Services, data models, and the queries underneath",
    body: "REST APIs and microservices in Python — Django, Django REST Framework, FastAPI and Flask — with the data model designed before the endpoints. Multi-tenant architecture where the tenancy boundary is enforced in one place, single sign-on across services with Keycloak, Redis caching on measured hot paths, Celery and CeleryBeat for work that should never block a request, and Docker-based deployment. Most of the performance work has been query profiling and rewriting rather than adding capacity.",
  },
  {
    eyebrow: "Data engineering",
    title: "Pipelines publishing timeseries and forecast data",
    body: "500+ production pipelines behind Veyt's market intelligence, producing the timeseries, timeseries groups and forecast curves the platform sells across carbon, guarantees of origin, power purchase agreements and renewable fuels. Python ETL over market data sources with their own schedules and failure modes, dependency-aware orchestration, schema design for timeseries at volume, monitoring that surfaces a failed run before a customer does, and multiprocessing work that took 50% off the slowest jobs.",
  },
  {
    eyebrow: "AI",
    title: "MCP tooling and agentic workflows on real systems",
    body: "MCP servers that give agents authenticated, typed access to internal systems, so an agent reads the actual state instead of inferring it. Agentic workflows built on top of those tools for recurring engineering tasks, LLM API integration inside existing Python services, and coaching Cefalo teams through adopting both — including where the approach does not pay.",
  },
];
