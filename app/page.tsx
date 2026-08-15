import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";
import { Writing } from "@/components/Writing";
import { profile } from "@/content/profile";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:text-on-teal"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="w-full flex-1">
        <Hero />
        <Experience />
        <Skills />
        <Writing />
        <Education />
        <Contact />
      </main>

      <footer className="no-print border-t border-rule">
        <div className="mx-auto flex max-w-4xl flex-col gap-1 px-5 py-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  );
}
