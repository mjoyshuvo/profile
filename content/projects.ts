/** Which system diagram to draw. A closed union rather than a component
 *  reference, so `content/` stays free of JSX. */
export type DiagramKey = "pipeline" | "agent" | "multi-tenant" | "search";

export type Project = {
  /** Anchor slug — the card renders as id={`project-${slug}`}. */
  slug: string;
  name: string;
  /** The end client, when the work was delivered for one. */
  client?: string;
  clientUrl?: string;
  /**
   * Must match a `Role.company` in content/experience.ts. That's what lets
   * Experience find its case study without a hand-maintained second list.
   */
  company: string;
  period: string;
  /** The problem, in one sentence. */
  problem: string;
  /** The approach, in one or two. */
  approach: string;
  /**
   * The one number worth remembering. Optional — a hackathon build has no
   * production metric, and inventing one to fill the slot would be worse than
   * leaving it out.
   */
  metric?: { value: string; label: string };
  tech: string[];
  diagram: DiagramKey;
};

/**
 * Deliberately short. Experience already lists what changed, with the numbers
 * an ATS parser needs; these say what the system was and what the interesting
 * decision was. Two sentences each is the budget — if a case needs more, it
 * wants to be a written piece in `content/writing.ts` instead.
 */
export const projects: Project[] = [
  {
    slug: "veyt-market-data",
    name: "Market-data platform",
    client: "Veyt",
    clientUrl: "https://veyt.com/",
    company: "Cefalo",
    period: "2022 – present",
    problem:
      "The pipelines feed every product line — carbon, guarantees of origin, power purchase agreements and renewable fuels — and analysts act on the curves the same day they are published, so ingestion failures have to surface before a customer finds them.",
    approach:
      "Python ETL publishing timeseries, timeseries groups and forecast curves from upstream sources with differing schedules and formats. Processing time on the slowest jobs came down 50% through multiprocessing and removing serial code paths; Docker layer caching took 40% off build times.",
    metric: { value: "500+", label: "pipelines in production" },
    tech: ["Python", "ETL", "Timeseries", "PostgreSQL", "Docker"],
    diagram: "pipeline",
  },
  {
    slug: "agentic-workflows",
    name: "Agentic tooling — MCP servers and a RAG service",
    company: "Cefalo",
    period: "2026 – present",
    problem:
      "Recurring engineering work was too small to justify bespoke automation and too frequent to keep doing by hand. Internally, HR answers were spread across documents nobody searched.",
    approach:
      "MCP servers giving agents authenticated, typed access to the systems behind Veyt's projects, with agentic workflows built on top of them and coaching for the teams that now run them. The same stack went into a RAG service for the Cefalo HR portal at a company hackathon: documents chunked and embedded into a Pinecone vector database, retrieval and prompt orchestration in LangChain, and LangGraph for the queries that need more than one lookup.",
    metric: { value: "Hours", label: "returned to the team each week" },
    tech: [
      "MCP",
      "Claude Code",
      "Python",
      "LangChain",
      "LangGraph",
      "Pinecone",
      "RAG",
    ],
    diagram: "agent",
  },
  {
    slug: "ferdia-booking",
    name: "Multi-tenant bus booking platform",
    client: "Ferdia",
    clientUrl: "https://www.ferdia.no/",
    company: "Brain Station 23",
    period: "2021 – 2022",
    problem:
      "A multi-tenant booking platform where every slow query degraded all operators at once, built by a team of eight that needed the service boundaries settled to work in parallel.",
    approach:
      "Microservice architecture with the tenancy boundary enforced in a single layer, query profiling and rewrites across the paths carrying load, and a Redis cache layer on the remainder. Overall performance improved 50%, with response times on the hottest paths down close to 60%.",
    metric: { value: "~60%", label: "faster on the hottest paths" },
    tech: ["Python", "Microservices", "Redis", "PostgreSQL"],
    diagram: "multi-tenant",
  },
  {
    slug: "infosapex-search",
    name: "Search and async processing",
    company: "InfoSapex Limited",
    period: "2016 – 2020",
    problem:
      "Django products used daily by large corporate customers, where search quality was the main complaint and long-running work was blocking the request cycle.",
    approach:
      "Replaced the search backend with ElasticSearch, tuning analysers and field weighting for a 42% accuracy gain, and moved the blocking work onto Celery and CeleryBeat.",
    metric: { value: "+42%", label: "search accuracy" },
    tech: ["Django", "ElasticSearch", "Celery"],
    diagram: "search",
  },
];
