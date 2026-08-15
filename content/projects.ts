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
  /** What the product is, who depends on it, and where I sat in it. */
  product: string;
  /** My part in it — written in the first person, because it is mine. */
  work: string;
  /**
   * The one number worth remembering. Optional — a hackathon build has no
   * production metric, and inventing one to fill the slot would be worse than
   * leaving it out.
   */
  metric?: { value: string; label: string };
  tech: string[];
};

/**
 * Each entry says what the product is and what I did on it. Experience still
 * carries the dated bullets an ATS parser reads; this is where the product gets
 * described to a human.
 */
export const projects: Project[] = [
  {
    slug: "veyt-market-data",
    name: "Market-data platform",
    client: "Veyt",
    clientUrl: "https://veyt.com/",
    company: "Cefalo",
    period: "2022 – present",
    product:
      "Veyt sells market intelligence across every green-energy market it covers — carbon, guarantees of origin, power purchase agreements and renewable fuels. My pipelines feed all of it, and traders act on the curves the same day they land.",
    work:
      "I build and run the pipelines feeding all of it: Python ETL publishing timeseries, timeseries groups and forecast curves from upstream sources that each define a schedule and a format differently. I cut processing time on the slowest jobs by 50% with multiprocessing and by removing the code paths that forced them to run serially, and took 40% off build times by reworking the Docker layers.",
    metric: { value: "500+", label: "pipelines in production" },
    tech: ["Python", "ETL", "Timeseries", "PostgreSQL", "Docker"],
  },
  {
    slug: "agentic-workflows",
    name: "Agentic tooling — MCP servers and a RAG service",
    company: "Cefalo",
    period: "2026 – present",
    product:
      "Internal tooling I built for Cefalo's engineering teams: MCP servers that give agents authenticated, typed access to the systems behind Veyt's projects, and a retrieval service that answers questions against the company's HR portal.",
    work:
      "I built the MCP servers and the agentic workflows on top of them, and I coach the teams that now run them day to day. The RAG service came out of a company hackathon — documents chunked and embedded into a Pinecone vector database, retrieval and prompt orchestration in LangChain, and LangGraph for the queries that need more than one lookup before they can be answered.",
    metric: { value: "Hrs/wk", label: "returned to the team" },
    tech: [
      "MCP",
      "Claude Code",
      "Python",
      "LangChain",
      "LangGraph",
      "Pinecone",
      "RAG",
    ],
  },
  {
    slug: "ferdia-booking",
    name: "Multi-tenant bus booking platform",
    client: "Ferdia",
    clientUrl: "https://www.ferdia.no/",
    company: "Brain Station 23",
    period: "2021 – 2022",
    product:
      "A Norwegian platform that lets bus companies and travel organisers run and connect their operations — booking, fleet and scheduling, multi-tenant across every operator on it. I led the team that built it.",
    work:
      "I led eight engineers through the microservice split, keeping the tenancy boundary in a single layer instead of letting it leak into every service. I profiled and rewrote the queries carrying real load, then put Redis in front of what was left — overall performance up 50%, and the hottest paths close to 60% faster.",
    metric: { value: "~60%", label: "faster on the hottest paths" },
    tech: ["Python", "Microservices", "Redis", "PostgreSQL"],
  },
  {
    slug: "infosapex-search",
    name: "Search and async processing",
    company: "InfoSapex Limited",
    period: "2016 – 2020",
    product:
      "Django products used daily by some of Bangladesh's largest corporates — a document management system, an online booking platform, and BRAC TBCP. I worked across all three.",
    work:
      "I replaced the search backend with ElasticSearch, where most of the work went into analysers and field weighting rather than the swap itself, for a 42% accuracy gain. I moved the long-running jobs onto Celery and CeleryBeat so requests stopped waiting on work nobody was watching, and rewrote the worst of the front-end code where it was the real cause of a slow page.",
    metric: { value: "+42%", label: "search accuracy" },
    tech: ["Django", "ElasticSearch", "Celery"],
  },
];
