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
        "Norwegian market intelligence provider covering carbon, guarantees of origin, power purchase agreements and renewable fuels. Formerly Greenfact.",
    },
    positions: [
      {
        title: "Staff Software Engineer",
        start: "Jan 2026",
        end: "Present",
        startDate: "2026-01-01",
        bullets: [
          "I coach Cefalo teams on agentic workflows that automate their repetitive work.",
          "I built MCP tools that give agents first-class access to the systems behind Veyt's projects, rather than leaving them to guess.",
          "I designed agentic workflows that take the repetitive work off the team — the recurring tasks that quietly consumed hours every week now run themselves.",
          "I set the technical direction for data engineering work across the Veyt account.",
          "I built a RAG service for the Cefalo HR portal at a company hackathon, using LangChain, LangGraph and a Pinecone vector database.",
        ],
      },
      {
        title: "Senior Software Engineer · Data Engineer",
        start: "Nov 2022",
        end: "Jan 2026",
        startDate: "2022-11-01",
        endDate: "2026-01-31",
        bullets: [
          "I cut processing time on the slowest pipelines by 50%, by moving the work to multiprocessing and removing the code paths that made it serial in the first place.",
          "I reworked the Dockerfile and brought build times down by 40%, which took a slow feedback loop out of every deploy.",
          "I build and run 500+ data pipelines producing the timeseries, timeseries groups and forecast data behind the platform's market intelligence.",
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
    positions: [
      {
        title: "Senior Software Engineer",
        start: "Sep 2021",
        end: "Oct 2022",
        startDate: "2021-09-01",
        endDate: "2022-10-31",
        bullets: [
          "I led 8 developers building a microservice, multi-tenant bus booking platform.",
          "I found the queries that were dragging the system down and rewrote them, for a 50% overall performance gain.",
          "I added a Redis caching layer that cut response times by close to 60% on the hottest paths.",
          "I worked directly with product and design across teams to keep scope and architecture in step.",
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
    positions: [
      {
        title: "Senior Software Engineer, Team Lead",
        start: "Jan 2021",
        end: "Aug 2021",
        startDate: "2021-01-01",
        endDate: "2021-08-31",
        bullets: [
          "I led a product development team of 5, from system design through feature planning with the business side.",
          "I implemented single sign-on with Keycloak across a microservice architecture.",
          "I built REST APIs in FastAPI and Flask, and containerised the services behind them.",
          "I designed and shipped the billing module for a CRM product, plus reporting on Apache Superset.",
          "I raised the team's baseline on code review, linting, and version control.",
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
    positions: [
      {
        title: "Senior Software Engineer",
        start: "Jan 2020",
        end: "Oct 2020",
        startDate: "2020-01-01",
        endDate: "2020-10-31",
        bullets: [
          "I replaced the existing search with ElasticSearch and improved search accuracy by 42%.",
          "I moved slow synchronous work onto Celery and CeleryBeat.",
          "I shipped Django features used daily by some of Bangladesh's largest corporates.",
        ],
      },
      {
        title: "Software Engineer",
        start: "Jan 2017",
        end: "Dec 2019",
        startDate: "2017-01-01",
        endDate: "2019-12-31",
        bullets: [
          "I built and maintained a Document Management System, an online booking platform, and BRAC TBCP.",
          "I added features to the companion mobile app in Flutter.",
          "I cut page load time by 20% by rewriting the worst of the front-end code.",
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
