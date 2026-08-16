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
  /**
   * One line for the collapsed row — what this is, before the reader opens it.
   * The card rests on this, so it has to carry the project on its own.
   */
  gist: string;
  /** What the product is, and who depends on it. */
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
 *
 * Entries are named after the product, not after whichever piece of it makes
 * the best headline — naming one after its search rewrite once buried three
 * products under a feature.
 */
export const projects: Project[] = [
  {
    slug: "veyt-market-data",
    name: "Market-data platform",
    client: "Veyt",
    clientUrl: "https://veyt.com/",
    company: "Cefalo",
    period: "2022 – present",
    gist: "The pipelines, APIs and agent tooling behind Veyt's published curves for green-energy markets.",
    product:
      "Veyt sells market intelligence across every green-energy market it covers — carbon, guarantees of origin, power purchase agreements and renewable fuels. Traders and analysts act on the published curves the same day they land.",
    work: "I build and run the pipelines feeding all of it: Python ETL publishing timeseries, timeseries groups and forecast curves from upstream sources that each define a schedule and a format differently. I cut processing time on the slowest jobs by 50% with multiprocessing and by removing the code paths that forced them to run serially, and took 40% off build times by reworking the Docker layers. I also build the REST APIs the platform exposes, and the MCP servers that give agents authenticated, typed access to the same systems.",
    metric: { value: "500+", label: "pipelines in production" },
    tech: [
      "Python",
      "ETL",
      "Timeseries",
      "REST API",
      "MCP",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    slug: "hr-portal-rag",
    name: "Retrieval service for the HR portal",
    company: "Cefalo",
    period: "2026 – present",
    gist: "A retrieval service that answers questions against Cefalo's HR portal, and the agentic workflows the teams run on it.",
    product:
      "Internal tooling for Cefalo's engineering teams: a retrieval service that answers questions against the company's HR portal, and the agentic workflows the teams now run day to day.",
    work: "It came out of a company hackathon — documents chunked and embedded into a Pinecone vector database, retrieval and prompt orchestration in LangChain, and LangGraph for the queries that need more than one lookup before they can be answered. I coach the teams that run it and the workflows around it.",
    tech: [
      "Python",
      "LangChain",
      "LangGraph",
      "Pinecone",
      "RAG",
      "Claude Code",
    ],
  },
  {
    slug: "ferdia-booking",
    name: "Multi-tenant bus booking platform",
    client: "Ferdia",
    clientUrl: "https://www.ferdia.no/",
    company: "Brain Station 23",
    period: "2021 – 2022",
    gist: "Backend work across a Norwegian platform for bus operators — booking, fleet and scheduling.",
    product:
      "A Norwegian platform that lets bus companies and travel organisers run and connect their operations — booking, fleet and scheduling, multi-tenant across every operator using it.",
    work: "I worked across the backend — several of the services in the microservice split, with the tenancy boundary kept in a single layer instead of leaking into every one of them. Most of my time went on performance: I profiled and rewrote the queries carrying real load, then put Redis in front of what was left. Overall performance up 50%, and the hottest paths close to 60% faster.",
    metric: { value: "~60%", label: "faster on the hottest paths" },
    tech: ["Python", "Microservices", "Redis", "PostgreSQL"],
  },
  {
    slug: "infosapex-products",
    name: "Django products for Bangladeshi enterprises",
    company: "InfoSapex Limited",
    period: "2016 – 2020",
    gist: "A document management system, BRAC's TB control programme and an online booking platform, built in Django.",
    product:
      "Django products used daily by some of Bangladesh's largest corporates — a document management system, BRAC's TB Control Programme, and an online booking platform.",
    work: "I built these products end to end. I replaced the search backend with ElasticSearch, where most of the work went into analysers and field weighting rather than the swap itself, for a 42% accuracy gain. I moved the long-running jobs onto Celery and CeleryBeat so requests stopped waiting on work nobody was watching, and rewrote the worst of the front-end code where it was the real cause of a slow page.",
    metric: { value: "+42%", label: "search accuracy" },
    tech: ["Django", "ElasticSearch", "Celery"],
  },
];
