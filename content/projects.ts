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
  /**
   * Supporting figures, surfaced as before-and-after tiles at the top of the
   * case study. Every pair here must already be accounted for in `work` — this
   * promotes numbers the prose defends, and is never a place to add new ones.
   * Where the prose gives only a percentage cut, `before` is the plain 100%
   * that percentage is a share of; inventing an absolute would be worse than
   * showing the ratio it actually states.
   *
   * The headline `metric` never repeats here — it has its own slot. Optional,
   * for the same reason `metric` is: a project with one number worth showing
   * puts it in `metric` and leaves this off.
   */
  stats?: { before: string; after: string; label: string }[];
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
    name: "Data platform",
    client: "Veyt",
    clientUrl: "https://veyt.com/",
    company: "Cefalo",
    period: "2022 – present",
    gist: "The pipelines, APIs and agent tooling behind Veyt's published curves for green-energy markets.",
    product:
      "Veyt sells market intelligence across every green-energy market it covers — carbon, guarantees of origin, power purchase agreements and renewable fuels. Traders and analysts act on the published curves the same day they land.",
    work: "I architected the ingestion layer that reaches dozens of external registries and APIs, and I build and run the pipelines feeding all of it: Python ETL publishing timeseries, timeseries groups and forecast curves from upstream sources that each define a schedule and a format differently, orchestrated with Prefect and shipped to Cloud Run through GitHub Actions — including the sources that publish nothing and have to be scraped with BeautifulSoup and Playwright. I cut processing time on the slowest jobs by 50% with multiprocessing and by removing the code paths that forced them to run serially, and took 40% off build times by reworking the Docker layers. On the timeseries API I rewrote the queries and indexes — one core lookup went from reading 1,141 rows to 19, and from 99.4 ms to 0.193 ms — which took database compute from ~1.75 to ~0.91 CU-h an hour. I also build the REST APIs the platform exposes, and the MCP servers that give agents authenticated, typed access to the same systems.",
    metric: { value: "200+", label: "pipelines in production" },
    stats: [
      { before: "100%", after: "50%", label: "runtime, slowest jobs" },
      { before: "100%", after: "60%", label: "build time" },
      {
        before: "99.4 ms",
        after: "0.193 ms",
        label: "core lookup on the timeseries API",
      },
    ],
    tech: [
      "Python",
      "FastAPI",
      "ETL",
      "Prefect",
      "Pandas",
      "Playwright",
      "Timeseries",
      "MCP",
      "PostgreSQL",
      "Redis",
      "Docker",
      "GCP Cloud Run",
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
    stats: [
      { before: "1x", after: "1.5x", label: "overall performance" },
      { before: "100%", after: "~40%", label: "response time, hottest paths" },
    ],
    tech: ["Python", "Microservices", "Redis", "PostgreSQL"],
  },
  {
    slug: "roboket-suite",
    name: "Roboket — CRM, ads manager and reporting suite",
    company: "ADN DigiNet Ltd.",
    period: "2021",
    gist: "A distributed product suite behind one sign-on: CRM, ads manager, URL shortener and reporting.",
    product:
      "Roboket is ADN Telecom's marketing product suite — a CRM, a Facebook ads manager, a URL shortener and a reporting module, each its own service, all behind a single sign-on.",
    work: "I led the team of five and built the backend services in FastAPI and Flask, with SQLAlchemy over the data layer and Celery for the work that had no business blocking a request. I put Keycloak in front of the whole suite so one account opens every module, wired the ads manager to the Facebook Marketing API, shipped the CRM billing module, and stood the reporting up on Apache Superset.",
    tech: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Celery",
      "Keycloak",
      "Apache Superset",
      "MongoDB",
      "Docker",
    ],
  },
  {
    slug: "infosapex-products",
    name: "Document management, hotel booking and BRAC TBCP",
    company: "InfoSapex Limited",
    period: "2016 – 2020",
    gist: "Three Django products for Bangladesh's largest corporates, and the Flutter app that goes with the booking one.",
    product:
      "Django products used daily by some of Bangladesh's largest corporates — a document management system, BRAC's TB Control Programme, and a hotel booking platform with a companion mobile app.",
    work: "I built these products end to end, and shipped features on the Flutter companion app alongside them. I replaced the search backend with ElasticSearch, where most of the work went into analysers and field weighting rather than the swap itself, for a 42% accuracy gain. I moved the long-running jobs onto Celery and CeleryBeat so requests stopped waiting on work nobody was watching, and rewrote the worst of the front-end code where it was the real cause of a slow page.",
    metric: { value: "+42%", label: "search accuracy" },
    stats: [{ before: "100%", after: "80%", label: "page load time" }],
    tech: ["Django", "Flutter", "ElasticSearch", "Celery"],
  },
];
