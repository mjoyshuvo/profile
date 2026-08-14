import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SITE_URL, profile } from "@/content/profile";
import { personJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const pageTitle = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pageTitle,
  description: profile.tagline,
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
    description: profile.tagline,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: profile.tagline,
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
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
