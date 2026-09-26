"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectCardProps } from "@/Types/types";
import { ChevronUp, Code, ExternalLink, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const [showAllTags, setShowAllTags] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNew, setIsNew] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Defer image rendering to client to keep SSR/client HTML identical
  useEffect(() => {
    setMounted(true);
  }, []);

  const firstImage = mounted ? project.images?.[0] : undefined;

  const maxVisibleTags = 5;
  const hasMoreTags = project.tools.length > maxVisibleTags;
  const visibleTools = showAllTags
    ? project.tools
    : project.tools.slice(0, maxVisibleTags);

  // Computed client-side only to avoid hydration mismatch with Date.now()
  useEffect(() => {
    if (!project.date) return;
    try {
      const projectDate = new Date(project.date);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      setIsNew(projectDate >= oneMonthAgo && projectDate <= new Date());
    } catch {
      setIsNew(false);
    }
  }, [project.date]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      {/* Spotlight Effect - cor atualizada */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.15), transparent 40%)`,
        }}
      />

      <Card className="relative flex flex-col h-full justify-between border border-bg-tertiary bg-bg-secondary/30 backdrop-blur-xl rounded-2xl shadow-card overflow-hidden transition-all duration-500 hover:border-primary-500/30 hover:shadow-glow-sm">
        <div className="flex-1">
          <div className="relative overflow-hidden aspect-video">
            {project.videos?.[0] ? (
              <video
                src={project.videos[0]}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            ) : firstImage ? (
              <Image
                src={firstImage}
                width={800}
                height={450}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-bg-tertiary flex items-center justify-center">
                <span className="text-content-subtle">{project.name}</span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent opacity-80" />

            {isNew && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-primary-900 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-glow-sm animate-pulse z-10 border border-primary-500/20">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold tracking-wider">
                  NEW
                </span>
              </div>
            )}
          </div>

          <CardHeader className="p-6 pb-2">
            <Link
              href={`/projects/${project.id}`}
              className="group/title inline-block"
            >
              <CardTitle className="text-xl font-bold text-content-primary group-hover/title:text-primary-400 transition-colors flex items-center gap-2 tracking-tight">
                {project.name}
                <ExternalLink className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 group-hover/title:translate-x-0 transition-all text-primary-500" />
              </CardTitle>
            </Link>
          </CardHeader>

          <CardContent className="px-6">
            <p className="text-body-small text-content-secondary line-clamp-2 mb-6 leading-relaxed font-medium italic">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {visibleTools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-caption font-medium bg-bg-tertiary border border-bg-tertiary text-content-secondary rounded-lg hover:bg-primary-500/10 hover:border-primary-500/30 hover:text-primary-400 transition-all duration-300"
                >
                  {tool}
                </span>
              ))}
              {hasMoreTags && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllTags(!showAllTags);
                  }}
                  className="flex items-center gap-1 text-primary-500 hover:text-primary-400 text-caption font-bold transition-colors pl-1 uppercase tracking-wider"
                >
                  {showAllTags ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    `+${project.tools.length - maxVisibleTags}`
                  )}
                </button>
              )}
            </div>
          </CardContent>
        </div>

        {/* Os botões quebram de linha quando o card fica estreito (celular, zoom de 400%) */}
        <CardFooter className="p-6 pt-2 flex flex-wrap gap-4">
          <Link
            href={project.demo || "#"}
            target="_blank"
            className="flex-1 basis-auto"
          >
            <Button
              className={`w-full h-11 rounded-xl text-caption font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                project.demo
                  ? "bg-bg-secondary hover:bg-primary-600 text-content-primary hover:text-white border border-bg-tertiary hover:border-primary-500 hover:shadow-glow-sm"
                  : "bg-bg-tertiary/50 text-content-subtle cursor-not-allowed border-none"
              }`}
              disabled={!project.demo}
            >
              <Globe className="w-4 h-4" />
              {t("projects.demo")}
            </Button>
          </Link>
          <Link
            href={project.code || "#"}
            target="_blank"
            className="flex-1 basis-auto"
          >
            <Button
              className={`w-full h-11 rounded-xl text-caption font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                project.code
                  ? "bg-bg-secondary hover:bg-primary-700 text-content-primary hover:text-white border border-bg-tertiary hover:border-primary-600 hover:shadow-glow-sm"
                  : "bg-bg-tertiary/50 text-content-subtle cursor-not-allowed border-none"
              }`}
              disabled={!project.code}
            >
              <Code className="w-4 h-4" />
              {t("projects.code")}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
