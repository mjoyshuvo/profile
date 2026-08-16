import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Lato, Poppins } from "next/font/google";
import { SITE_URL, profile } from "@/content/profile";
import { personJsonLd } from "@/lib/seo";
import "./globals.css";

// Neither face is a variable font, so the weights have to be listed. Only the
// ones the page actually sets are here — every extra weight is another file
// over the wire for text nobody sees.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const pageTitle = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pageTitle,
  description: profile.metaDescription,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    "Mrityunjoy Das",
    "Staff Software Engineer",
    "Data Engineer",
    "Python Developer",
    "Django",
    "FastAPI",
    "ETL",
    "Dhaka",
    "Bangladesh",
  ],
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: pageTitle,
    description: profile.metaDescription,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: profile.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Runs before first paint so an explicitly chosen theme never flashes the
 * wrong palette. Kept inline and dependency-free on purpose.
 */
const themeScript = `
(function () {
  var d = document.documentElement;
  // Marks that JS is available, which is what arms the scroll-reveal styles.
  d.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || t === "light") {
      d.setAttribute("data-theme", t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The head script below adds `js` and may set `data-theme` before React
    // hydrates — that's the whole point of running it pre-paint. Both land on
    // this element, so React must be told not to flag the difference.
    <html
      lang="en"
      className={`${lato.variable} ${poppins.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {/* Cookieless page counts, so there's some signal on whether the site
            actually gets read. No personal data leaves the page. */}
        <Analytics />
      </body>
    </html>
  );
}
