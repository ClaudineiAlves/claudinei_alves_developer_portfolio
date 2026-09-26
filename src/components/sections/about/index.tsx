"use client";

import { personalData } from "@/../utils/Data/PersonalData";
import { usePersonalData } from "@/hooks/useTranslatedData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/dist/SplitText";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { User, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

function About() {
  const { t } = useLanguage();
  const isTouch = useIsTouchDevice();
  const { description } = usePersonalData();

  useGSAP(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const split = new SplitText(".about-description", {
      type: "lines,words",
      aria: "hidden",
      linesClass: "overflow-hidden",
    });

    gsap.from(split.words, {
      opacity: 0,
      y: 30,
      rotateX: -45,
      stagger: 0.015,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-description",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    gsap.fromTo(
      ".about-image-card",
      { opacity: 0, scale: 0.9, x: 50 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-image-card",
          start: "top 80%",
        },
      },
    );
  }, []);

  return (
    <section id="about" className="relative py-24 lg:py-48 overflow-hidden">
      {/* Background glows com novas cores */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-primary-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Conteúdo textual */}
          <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
            {/* Header da seção */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary-500 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                  <User className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-caption text-primary-400">
                  {t("about.section_label")}
                </span>
              </div>

              <h2 className="text-headline font-bold text-content-primary leading-tight">
                {t("about.title_word1")}{" "}
                <span className="title-gradient">{t("about.title_word2")}</span>
              </h2>
            </div>

            {/* Card de descrição com novo estilo */}
            <div className="relative group p-6 sm:p-8 lg:p-10 rounded-3xl border border-bg-tertiary bg-bg-secondary/50 backdrop-blur-3xl overflow-hidden shadow-card hover:border-primary-700/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles className="w-24 h-24 text-primary-500" />
              </div>

              {/* Descrição com animação SplitText mantida */}
              <div
                className="about-description text-body-large text-content-secondary leading-relaxed text-justify space-y-4 font-medium italic"
                aria-hidden="true"
              >
                {description}
              </div>
              {/* Cópia para leitor de tela: o SplitText quebra o texto em palavras soltas */}
              <p className="sr-only">{description}</p>

              {/* Barra lateral decorativa */}
              <div className="absolute w-1 h-20 bg-gradient-to-b from-primary-600 to-transparent left-0 top-10 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Stats com nova tipografia */}
            {/* Grid de 3 colunas no mobile: em flex-wrap os separadores quebravam de linha */}
            <div className="grid grid-cols-3 gap-4 items-start sm:flex sm:flex-wrap sm:gap-8 sm:items-center mt-4">
              <div className="flex flex-col group cursor-default">
                <span className="text-headline font-bold text-content-primary font-variable group-hover:text-primary-400 transition-colors">
                  1+
                </span>
                <span className="text-caption text-content-subtle">
                  {t("about.stat_experience")}
                </span>
              </div>

              <div className="hidden sm:block w-[1px] h-10 bg-bg-tertiary" />

              <div className="flex flex-col group cursor-default">
                <span className="text-headline font-bold text-content-primary font-variable group-hover:text-primary-400 transition-colors">
                  2+
                </span>
                <span className="text-caption text-content-subtle">
                  {t("about.stat_projects")}
                </span>
              </div>

              <div className="hidden sm:block w-[1px] h-10 bg-bg-tertiary" />

              <div className="flex flex-col group cursor-default">
                <span className="text-headline font-bold text-content-primary font-variable group-hover:text-primary-400 transition-colors">
                  10+
                </span>
                <span className="text-caption text-content-subtle">
                  {t("about.stat_technologies")}
                </span>
              </div>
            </div>
          </div>

          {/* Imagem com Tilt */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Tilt
              perspective={1500}
              tiltEnable={!isTouch}
              glareEnable={!isTouch}
              glareMaxOpacity={0.15}
              glareColor="#ef4444"
              scale={isTouch ? 1 : 1.05}
              className="about-image-card"
            >
              <div className="relative group">
                {/* Anéis decorativos */}
                <div className="absolute -inset-4 border border-primary-500/20 rounded-3xl group-hover:-inset-6 transition-all duration-500 opacity-50" />
                <div className="absolute -inset-8 border border-primary-900/20 rounded-[40px] group-hover:-inset-12 transition-all duration-700 delay-75 opacity-30" />

                {/* Container da imagem */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-bg-tertiary shadow-glow-sm bg-bg-primary group-hover:shadow-glow-md transition-all duration-500">
                  <Image
                    src={personalData.profile}
                    fill
                    alt={personalData.name}
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />

                  {/* Quote no hover — sempre visível onde não há hover (toque) */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-bg-secondary/80 backdrop-blur-xl border border-bg-tertiary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0">
                    <p className="text-content-primary font-bold text-center tracking-widest uppercase text-xs">
                      {t("about.quote")}
                    </p>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
