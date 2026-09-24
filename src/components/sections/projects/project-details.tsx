"use client";

import FeaturedProjects from "@/components/sections/projects/featured-projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjects } from "@/hooks/useTranslatedData";
import { Project } from "@/Types/types";
import {
  ArrowLeft,
  Calendar,
  Code,
  Cpu,
  Globe,
  ShieldCheck,
  User,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project: rawProject }: ProjectDetailsProps) => {
  const { t } = useLanguage();
  // O servidor entrega o projeto cru (em PT); o texto no idioma ativo vem do contexto.
  const project: Project =
    useProjects().find((p) => p.id === rawProject.id) ?? rawProject;

  return (
    <div className="min-h-screen text-white py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-8 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t("project_detail.back")}</span>
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl mb-12">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.images?.[0] || "/placeholder/placeholder.png"}
              alt={project.name}
              fill
              className="object-cover opacity-20 blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 p-5 sm:p-8 lg:p-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Project Banner Image */}
            <div className="w-full lg:w-1/2 aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src={project.images?.[0] || "/placeholder/placeholder.png"}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Project Header Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-500 hover:bg-black border-red-500/20 px-3 py-1 font-bold tracking-wider"
                >
                  {project.date || "2024"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-red-950/20 text-red-400 hover:bg-black border-red-900/30 px-3 py-1 font-bold tracking-wider"
                >
                  {project.role}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black break-words bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-slate-400">
                {project.name}
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium italic">
                {project.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-4 w-full">
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg shadow-red-600/20 transition-all hover:scale-105 active:scale-95 flex gap-2 font-bold uppercase tracking-wider sm:tracking-widest">
                      <Globe className="w-5 h-5 shrink-0" />
                      {t("project_detail.view_project")}
                    </Button>
                  </Link>
                )}
                {project.code && (
                  <Link
                    href={project.code}
                    target="_blank"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-white/10 bg-white/5 hover:bg-red-950/20 hover:text-red-500 hover:border-red-500/30 text-white px-5 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl transition-all hover:scale-105 active:scale-95 flex gap-2 font-bold uppercase tracking-wider sm:tracking-widest"
                    >
                      <Code className="w-5 h-5 shrink-0" />
                      {t("project_detail.view_code")}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 flex flex-col gap-12 lg:gap-16">
            {/* Highlights */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white break-words">
                  {t("project_detail.highlights_title")}
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {project.highlights?.map((highlight, index) => (
                  <li
                    key={index}
                    className="group p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-red-500/[0.03] hover:border-red-500/20 transition-all duration-300 flex gap-4"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-900/10 flex items-center justify-center border border-red-900/20 shrink-0">
                    <Wrench className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white break-words">
                    {t("project_detail.challenges_title")}
                  </h2>
                </div>
                <ul className="grid grid-cols-1 gap-4">
                  {project.challenges.map((challenge, index) => (
                    <li
                      key={index}
                      className="group p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-red-500/[0.03] hover:border-red-500/20 transition-all duration-300 flex gap-4"
                    >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-red-900 shadow-[0_0_10px_rgba(127,29,29,0.8)] shrink-0 group-hover:scale-125 transition-transform" />
                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                        {challenge}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery */}
            {project.images && project.images.length > 1 && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-900/10 flex items-center justify-center border border-red-900/20 shrink-0">
                    <Calendar className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white break-words">
                    {t("project_detail.gallery_title")}
                  </h2>
                </div>
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.images.slice(1).map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group bg-[#050505]">
                          <Image
                            src={image}
                            alt={`${project.name} — ${t("project_detail.screenshot_alt")} ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 shadow-2xl opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-red-600/20 border-red-600/30 hover:bg-red-600 text-white transition-all backdrop-blur-md" />
                  <CarouselNext className="right-4 bg-red-600/20 border-red-600/30 hover:bg-red-600 text-white transition-all backdrop-blur-md" />
                </Carousel>
              </section>
            )}
          </div>

          {/* Sidebar (Right) */}
          <aside className="flex flex-col gap-8">
            {/* Tech Stack Card */}
            <Card className="bg-[#050505]/20 border-white/10 rounded-3xl overflow-hidden sticky top-24 shadow-2xl">
              <CardContent className="p-6 sm:p-8 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {t("project_detail.tech_title")}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-4 py-1.5 bg-white/5 border-white/10 text-slate-300 rounded-full hover:border-red-500/50 hover:bg-red-500/10 hover:text-white transition-all cursor-default font-semibold text-[11px] uppercase tracking-wider"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-900/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {t("project_detail.details_title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center gap-4 text-sm">
                      <span className="text-slate-500 font-medium">
                        {t("project_detail.role_label")}
                      </span>
                      <span className="text-slate-300 font-bold uppercase tracking-widest text-[10px] bg-white/5 px-2 py-1 rounded-md text-right">
                        {project.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4 text-sm">
                      <span className="text-slate-500 font-medium">
                        {t("project_detail.completed_label")}
                      </span>
                      <span className="text-slate-300 font-bold">
                        {project.date || "2024"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href="/#contact" className="w-full">
                    <Button className="w-full bg-red-600/10 border border-red-600/20 hover:bg-red-600 hover:text-white py-6 rounded-xl text-red-500 font-bold uppercase tracking-widest text-xs transition-all duration-300 group flex gap-2 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                        {t("project_detail.cta_talk")}
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Similar Projects */}
        <div className="mt-24 lg:mt-32 pt-16 lg:pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter break-words">
                {t("project_detail.other_projects_title")}
              </h2>
              <p className="text-slate-400 text-base sm:text-lg font-medium">
                {t("project_detail.other_projects_subtitle")}
              </p>
            </div>
            <Link
              href="/#projects"
              className="text-red-500 font-black uppercase tracking-[0.2em] text-sm hover:text-red-400 transition-colors flex items-center gap-2 group shrink-0"
            >
              {t("project_detail.view_all_projects")}{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
          <FeaturedProjects />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
