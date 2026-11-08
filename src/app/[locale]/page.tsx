import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero-section";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Certificates from "@/components/sections/certificates";
import SectionReveal from "@/components/SectionReveal";
import Education from "@/components/sections/education";

import "../css/card.css";

import type { Metadata } from "next";
import { isLocale } from "@/i18n";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesFor(isLocale(locale) ? locale : "en", "/") };
}

// ✅ Descomente quando a seção Experience estiver pronta:
// import Experience from "@/components/sections/experience";

export default function Home() {
  return (
    // Sem `container` aqui: cada seção já aplica o próprio container/padding.
    // Aninhar dois containers dobrava o padding lateral no mobile (32px por lado).
    <div className="w-full">
      <HeroSection />

      <SectionReveal>
        <About />
      </SectionReveal>

      <SectionReveal>
        <Education />
      </SectionReveal>

      {/*
        <SectionReveal>
          <Experience />
        </SectionReveal>
      */}

      <SectionReveal>
        <Skills />
      </SectionReveal>

      <SectionReveal>
        <Projects />
      </SectionReveal>

      <SectionReveal>
        <Certificates />
      </SectionReveal>

      <SectionReveal>
        <Contact />
      </SectionReveal>
    </div>
  );
}
