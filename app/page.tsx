import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Identity } from "@/components/Identity";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Recommendations } from "@/components/Recommendations";
import { Skills } from "@/components/Skills";
import { Writing } from "@/components/Writing";
import { profile } from "@/content/profile";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-on-teal"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="w-full flex-1">
        <Hero />
        <Identity />
        <Experience />
        <Projects />
        <Recommendations />
        <Skills />
        <Writing />
        <Education />
        <Contact />
      </main>

      <footer className="no-print border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-10 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  );
}
