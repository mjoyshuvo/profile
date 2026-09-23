export type Position = {
  title: string;
  start: string;
  end: string;
  /** ISO dates, for the JSON-LD and <time> elements. */
  startDate: string;
  endDate?: string;
  bullets?: string[];
};

export type Role = {
  company: string;
  companyUrl?: string;
  /** Total span at the company, shown next to the company name. */
  start: string;
  end: string;
  startDate: string;
  endDate?: string;
  location: string;
  /** Client the work was delivered for, when it wasn't in-house. */
  client?: { name: string; url?: string; blurb: string; logo?: string };
  /**
   * Two or three headline numbers for the role's panel on the career rail.
   * Every one must already be stated in the bullets below (or in the matching
   * project) — this promotes numbers the prose defends, never adds new ones.
   */
  highlights?: { value: string; label: string }[];
  /**
   * LinkedIn-style position stack, newest first. A single-entry stack renders
   * the same as the old flat role, so nothing special-cases the common case.
   */
  positions: Position[];
};

export const experience: Role[] = [
  {
    company: "Cefalo",
    companyUrl: "https://www.cefalo.com/",
    start: "Nov 2022",
    end: "Present",
    startDate: "2022-11-01",
    location: "Dhaka, Bangladesh",
    client: {
      name: "Veyt",
      url: "https://veyt.com/",
      logo: "/logo-veyt.svg",
      blurb:
        "Independent Norwegian market intelligence provider for green certificates — carbon, guarantees of origin, power purchase agreements and renewable fuels. Over 300 firms across the Nordics and Europe price and benchmark against its data. Formerly Greenfact.",
    },
    highlights: [
      { value: "200+", label: "pipelines in production" },
      { value: "~580×", label: "faster core lookup" },
      { value: "12", label: "colleagues taught agentic AI" },
    ],
    positions: [
      {
        title: "Staff Software Engineer",
        start: "Jan 2026",
        end: "Present",
        startDate: "2026-01-01",
        bullets: [
          "On Cefalo's AI pilot, taught 12 colleagues to use agentic AI tools like Claude properly — coding agents, agentic workflows, MCP tooling and prompting that holds up under real work.",
          "Sit on Cefalo's AI Task Force, shaping how the company runs its AI transformation.",
          "Built MCP tools that give agents first-class access to the systems behind Veyt's projects, rather than leaving them to guess.",
          "Designed agentic workflows that take the repetitive work off the team — the recurring tasks that quietly consumed hours every week now run themselves.",
          "Hardened a production auto-fix agent across ~50 automated repairs, closing the gaps in how it checked its own work and lifting the unattended fix rate towards 85%.",
          "Set the technical direction for data engineering work across the Veyt account.",
          "Built an HR agent for Cefalo at a company hackathon — an MCP-based RAG pipeline over the policy documents and the employee database, on LangChain, LangGraph, Pinecone, FastAPI and a local Ollama model.",
        ],
      },
      {
        title: "Senior Software Engineer · Data Engineer",
        start: "Nov 2022",
        end: "Dec 2025",
        startDate: "2022-11-01",
        endDate: "2025-12-31",
        bullets: [
          "Architected and scaled the ingestion layer that pulls from dozens of external registries and APIs, and feeds the analyst dashboards, forecasting and decision tooling built on top of it.",
          "Built and run 200+ data pipelines producing the timeseries, timeseries groups and forecast data behind the platform's market intelligence.",
          "Cut processing time on the slowest pipelines by 50%, by moving the work to multiprocessing and removing the code paths that made it serial in the first place.",
          "Partitioned the large datasets so ETL runs in parallel, which brought down both the latency and the memory footprint of the high-volume executor jobs.",
          "Rewrote the queries and indexes behind the production timeseries API: a core fragment lookup went from 1,141 rows read to 19, and from 99.4 ms to 0.193 ms — about 580 times faster — taking database compute from ~1.75 to ~0.91 CU-h per hour.",
          "Put Redis in front of the heaviest reads and cut query response times by close to 60%.",
          "Reworked the Dockerfile and brought build times down by 40%, which took a slow feedback loop out of every deploy.",
          "Orchestrated every ETL workflow with Prefect, containerised the jobs, and shipped them to GCP Cloud Run through GitHub Actions.",
        ],
      },
    ],
  },
  {
    company: "Brain Station 23",
    companyUrl: "https://brainstation-23.com/",
    start: "Sep 2021",
    end: "Oct 2022",
    startDate: "2021-09-01",
    endDate: "2022-10-31",
    location: "Dhaka, Bangladesh",
    client: {
      name: "Ferdia",
      url: "https://www.ferdia.no/",
      logo: "/logo-ferdia.svg",
      blurb:
        "Norwegian platform that lets bus companies and travel organisers run and connect their operations.",
    },
    highlights: [
      { value: "8", label: "developers led" },
      { value: "+50%", label: "overall performance" },
      { value: "~60%", label: "faster hot paths" },
    ],
    positions: [
      {
        title: "Senior Software Engineer",
        start: "Sep 2021",
        end: "Oct 2022",
        startDate: "2021-09-01",
        endDate: "2022-10-31",
        bullets: [
          "Led 8 developers building a microservice, multi-tenant bus booking platform.",
          "Found the queries that were dragging the system down and rewrote them, for a 50% overall performance gain.",
          "Added a Redis caching layer that cut response times by close to 60% on the hottest paths.",
          "Worked directly with product and design across teams to keep scope and architecture in step.",
        ],
      },
    ],
  },
  {
    company: "ADN DigiNet Ltd.",
    companyUrl: "https://adndiginet.com/",
    start: "Jan 2021",
    end: "Aug 2021",
    startDate: "2021-01-01",
    endDate: "2021-08-31",
    location: "Dhaka, Bangladesh",
    highlights: [
      { value: "5", label: "engineers led" },
      { value: "4", label: "products, one sign-on" },
    ],
    positions: [
      {
        title: "Senior Software Engineer, Team Lead",
        start: "Jan 2021",
        end: "Aug 2021",
        startDate: "2021-01-01",
        endDate: "2021-08-31",
        bullets: [
          "Led a product development team of 5, from system design through feature planning with the business side.",
          "Implemented single sign-on with Keycloak across a microservice architecture.",
          "Built REST APIs in FastAPI and Flask, and containerised the services behind them.",
          "Designed and shipped the billing module for a CRM product, plus reporting on Apache Superset.",
          "Raised the team's baseline on code review, linting, and version control.",
        ],
      },
    ],
  },
  {
    company: "InfoSapex Limited",
    start: "Aug 2016",
    end: "Oct 2020",
    startDate: "2016-08-01",
    endDate: "2020-10-31",
    location: "Dhaka, Bangladesh",
    highlights: [
      { value: "+42%", label: "search accuracy" },
      { value: "−20%", label: "page load time" },
      { value: "3", label: "roles, intern to senior" },
    ],
    positions: [
      {
        title: "Senior Software Engineer",
        start: "Jan 2020",
        end: "Oct 2020",
        startDate: "2020-01-01",
        endDate: "2020-10-31",
        bullets: [
          "Replaced the existing search with ElasticSearch and improved search accuracy by 42%.",
          "Moved slow synchronous work onto Celery and CeleryBeat.",
          "Shipped Django features used daily by some of Bangladesh's largest corporates.",
        ],
      },
      {
        title: "Software Engineer",
        start: "Jan 2017",
        end: "Dec 2019",
        startDate: "2017-01-01",
        endDate: "2019-12-31",
        bullets: [
          "Built and maintained a Document Management System, a hotel booking platform, and BRAC TBCP.",
          "Added features to the booking platform's companion mobile app in Flutter.",
          "Cut page load time by 20% by rewriting the worst of the front-end code.",
        ],
      },
      {
        title: "Software Engineer Intern",
        start: "Aug 2016",
        end: "Dec 2016",
        startDate: "2016-08-01",
        endDate: "2016-12-31",
      },
    ],
  },
];
