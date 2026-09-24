"use client";

import { useProjects } from "@/hooks/useTranslatedData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./project-card";
import RevealText from "@/components/RevealText";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedProjects = () => {
  const { t } = useLanguage();
  const projectsData = useProjects();

  return (
    <section id="projects" className="py-24 lg:py-48 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <RevealText>
            <p className="text-caption text-primary-400 mb-4">
              {t("projects.section_label") || "Portfólio"}
            </p>
          </RevealText>
          <RevealText delay={100}>
            <h2 className="text-headline font-bold text-content-primary text-center">
              {t("projects.title_word1") || "Projetos"}{" "}
              <span className="title-gradient">
                {t("projects.title_word2") || "Destacados"}
              </span>
            </h2>
          </RevealText>
        </div>

        {/* Carousel */}
        <RevealText delay={200}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {projectsData.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <ProjectCard project={project} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-bg-secondary border-bg-tertiary text-content-primary hover:bg-bg-tertiary hover:text-primary-400 hover:border-primary-500/30 transition-all" />
            <CarouselNext className="hidden md:flex -right-12 bg-bg-secondary border-bg-tertiary text-content-primary hover:bg-bg-tertiary hover:text-primary-400 hover:border-primary-500/30 transition-all" />
          </Carousel>
        </RevealText>
      </div>
    </section>
  );
};

export default FeaturedProjects;
