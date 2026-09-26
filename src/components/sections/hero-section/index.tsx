"use client";

import { personalData } from "@/../utils/Data/PersonalData";
import { usePersonalData } from "@/hooks/useTranslatedData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import Tilt from "react-parallax-tilt";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import TypeWriter from "@/components/TypeWriter";

const indent = (level: number) => ({ paddingLeft: `${level * 2}ch` });

const HeroSection = () => {
  const { t } = useLanguage();
  const isTouch = useIsTouchDevice();
  const { designation, designationAlternateWords } = usePersonalData();

  const containerRef = useRef<HTMLDivElement>(null);
  const designationRef = useRef<HTMLElement>(null);
  const codeCardRef = useRef<HTMLDivElement>(null);
  const resumeDropdownRef = useRef<HTMLDivElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        resumeDropdownRef.current &&
        !resumeDropdownRef.current.contains(e.target as Node)
      ) {
        setResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);

      const titles = designationAlternateWords;
      let index = 0;

      const introTl = gsap.timeline();
      introTl
        .fromTo(
          ".hero-tag",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        )
        .fromTo(
          ".hero-heading",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power4.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          codeCardRef.current,
          { opacity: 0, x: 50, rotateY: 10 },
          { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power4.out" },
          "-=1",
        );

      const runDesignationAnimation = () => {
        const el = designationRef.current;
        if (!el) return;

        const tl = gsap.timeline({
          onComplete: () => {
            index = (index + 1) % titles.length;
            runDesignationAnimation();
          },
        });

        el.textContent = titles[index];
        const split = new SplitText(el, { type: "chars", aria: "hidden" });

        tl.from(split.chars, {
          opacity: 0,
          y: 10,
          rotateX: -90,
          stagger: 0.04,
          duration: 0.6,
          ease: "back.out(1.7)",
        }).to(split.chars, {
          opacity: 0,
          y: -10,
          rotateX: 90,
          stagger: 0.02,
          duration: 0.5,
          ease: "back.in(1.7)",
          delay: 2,
          onComplete: () => split.revert(),
        });
      };

      runDesignationAnimation();

      gsap.to(".social-icon", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  const codeLines: { line: string; content: React.ReactNode; level: number }[] =
    [
      {
        line: "01",
        level: 0,
        content: (
          <>
            <span className="text-purple-400">import</span>{" "}
            <span className="text-content-primary">
              artificial_intelligence
            </span>{" "}
            <span className="text-purple-400">as</span>{" "}
            <span className="text-content-primary">ai</span>
          </>
        ),
      },
      {
        line: "02",
        level: 0,
        content: (
          <>
            <span className="text-purple-400">import</span>{" "}
            <span className="text-content-primary">data_science</span>{" "}
            <span className="text-purple-400">as</span>{" "}
            <span className="text-content-primary">ds</span>
          </>
        ),
      },
      { line: "03", level: 0, content: null },
      {
        line: "04",
        level: 0,
        content: (
          <>
            <span className="text-purple-400">class</span>{" "}
            <span className="text-yellow-400">Developer</span>
            <span className="text-content-primary">:</span>
          </>
        ),
      },
      { line: "05", level: 0, content: null },
      {
        line: "06",
        level: 1,
        content: (
          <>
            <span className="text-purple-400">def</span>{" "}
            <span className="text-blue-400">__init__</span>
            <span className="text-content-primary">(self):</span>
          </>
        ),
      },
      {
        line: "07",
        level: 2,
        content: (
          <>
            <span className="text-primary-400">self</span>
            <span className="text-content-primary">.nome = </span>
            <span className="text-green-400">&quot;Claudinei Alves&quot;</span>
          </>
        ),
      },
      {
        line: "08",
        level: 2,
        content: (
          <>
            <span className="text-primary-400">self</span>
            <span className="text-content-primary">.area = </span>
            <span className="text-green-400">
              &quot;Data Science &amp; AI&quot;
            </span>
          </>
        ),
      },
      { line: "09", level: 0, content: null },
      {
        line: "10",
        level: 2,
        content: (
          <>
            <span className="text-primary-400">self</span>
            <span className="text-content-primary">.skills = [</span>
          </>
        ),
      },
      {
        line: "11",
        level: 3,
        content: <span className="text-green-400">&quot;Python&quot;,</span>,
      },
      {
        line: "12",
        level: 3,
        content: (
          <span className="text-green-400">&quot;Machine Learning&quot;,</span>
        ),
      },
      {
        line: "13",
        level: 3,
        content: (
          <span className="text-green-400">&quot;Deep Learning&quot;,</span>
        ),
      },
      {
        line: "14",
        level: 3,
        content: (
          <span className="text-green-400">&quot;Data Analysis&quot;</span>
        ),
      },
      {
        line: "15",
        level: 2,
        content: <span className="text-content-primary">]</span>,
      },
      { line: "16", level: 0, content: null },
      {
        line: "17",
        level: 1,
        content: (
          <>
            <span className="text-purple-400">def</span>{" "}
            <span className="text-blue-400">build</span>
            <span className="text-content-primary">(self):</span>
          </>
        ),
      },
      {
        line: "18",
        level: 2,
        content: (
          <>
            <span className="text-purple-400">return</span>{" "}
            <span className="text-green-400">
              &quot;Intelligent Solutions&quot;
            </span>
          </>
        ),
      },
    ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center py-12 lg:py-24 overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-900/10 blur-[150px] rounded-full animate-pulse delay-700" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4 md:px-8 relative z-10 w-full max-w-7xl mx-auto">
        <div className="order-2 lg:order-1 flex flex-col items-start gap-8 min-w-0 w-full">
          <div className="flex flex-col gap-6 w-full">
            <span className="hero-tag self-start px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-caption">
              {t("hero.welcome")}
            </span>

            {/* text-4xl no mobile: "Desenvolvendo" estourava a largura em 48px */}
            <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-content-primary leading-[1.1] break-words">
              {t("hero.title_line1")}{" "}
              <span className="title-gradient font-extrabold hover:tracking-tight transition-all duration-300 cursor-default">
                {t("hero.title_line2")}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-900">
                {t("hero.title_line3")}
              </span>
            </h1>

            <div className="hero-description text-lead max-w-xl leading-relaxed">
              <span className="text-content-secondary">
                {t("hero.intro_prefix")}{" "}
                <strong className="text-content-primary font-semibold">
                  {personalData.name}
                </strong>
                , {t("hero.intro_connector")}
              </span>
              {/* O cargo gira animado; o leitor de tela recebe só o cargo principal */}
              <span
                className="text-primary-500 ml-2 font-bold inline-block sm:min-w-[250px] text-glow"
                ref={designationRef}
                aria-hidden="true"
              >
                {designation}
              </span>
              <span className="sr-only"> {designation}</span>
              <div className="mt-4 text-body-large text-content-muted">
                <TypeWriter
                  text={t("hero.description")}
                  speed={25}
                  delay={1500}
                  cursor={true}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center gap-4">
              <Link
                href={personalData.github}
                target="_blank"
                aria-label="GitHub"
                className="social-icon p-3 rounded-xl bg-bg-secondary border border-bg-tertiary text-content-secondary hover:text-primary-400 hover:border-primary-500/50 hover:shadow-glow-sm transition-all duration-300"
              >
                <BsGithub size={24} />
              </Link>
              <Link
                href={personalData.linkedIn}
                target="_blank"
                aria-label="LinkedIn"
                className="social-icon p-3 rounded-xl bg-bg-secondary border border-bg-tertiary text-content-secondary hover:text-primary-400 hover:border-primary-500/50 hover:shadow-glow-sm transition-all duration-300"
              >
                <BsLinkedin size={24} />
              </Link>
            </div>

            <div className="hero-cta flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
              <Link
                href="/#contact"
                className="btn-primary group flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span className="relative flex items-center gap-2">
                  {t("hero.cta_contact")}
                  <RiContactsFill className="group-hover:scale-110 transition-transform" />
                </span>
              </Link>

              <div
                ref={resumeDropdownRef}
                className="relative w-full sm:w-auto"
              >
                <button
                  onClick={() => setResumeOpen((prev) => !prev)}
                  className="btn-secondary group flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {t("hero.cta_resume")}
                  <MdDownload className="group-hover:translate-y-1 transition-transform" />
                </button>

                {resumeOpen && (
                  <div className="absolute left-0 top-full mt-2 z-50 min-w-[180px] rounded-xl border border-bg-tertiary bg-bg-secondary shadow-card overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <a
                      href="/cv/CV-Claudinei-Alves-Reis-PT.docx"
                      download
                      onClick={() => setResumeOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-content-secondary hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                    >
                      <span className="text-base">🇧🇷</span>
                      Português
                    </a>
                    <div className="h-px bg-bg-tertiary" />
                    <a
                      href="/cv/CV-Claudinei-Alves-Reis-EN.docx"
                      download
                      onClick={() => setResumeOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-content-secondary hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                    >
                      <span className="text-base">🇺🇸</span>
                      English
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Code Card */}
        <div className="order-1 lg:order-2 flex justify-center min-w-0 w-full">
          <Tilt
            perspective={1000}
            tiltEnable={!isTouch}
            glareEnable={!isTouch}
            glareMaxOpacity={0.15}
            scale={isTouch ? 1 : 1.02}
            transitionSpeed={2000}
            className="w-full max-w-[550px]"
          >
            <div
              ref={codeCardRef}
              className="relative rounded-3xl border border-bg-tertiary bg-bg-secondary/90 backdrop-blur-xl overflow-hidden shadow-card group hover:border-primary-700/50 transition-all duration-500"
            >
              {/* Header do editor */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-bg-tertiary bg-bg-tertiary/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-600" />
                  <div className="w-3 h-3 rounded-full bg-primary-400/50" />
                  <div className="w-3 h-3 rounded-full bg-primary-300/20" />
                </div>
                <div className="text-xs font-mono text-content-subtle flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                  developer.py
                </div>
              </div>

              {/* Código */}
              {/* overflow-x-auto: as linhas longas não cabem em telas estreitas */}
              <div className="p-4 sm:p-6 lg:p-10 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                <div className="space-y-1 min-w-max">
                  {codeLines.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-2 sm:gap-4 group/line hover:bg-white/5 rounded px-2 -mx-2 transition-colors"
                    >
                      <span className="text-content-subtle select-none w-5 sm:w-6 text-right text-[10px] sm:text-xs opacity-50 shrink-0">
                        {item.line}
                      </span>
                      <span
                        className="text-content-primary whitespace-nowrap"
                        style={indent(item.level)}
                      >
                        {item.content}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
