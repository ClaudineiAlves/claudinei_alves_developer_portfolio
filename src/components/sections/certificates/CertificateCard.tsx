// src/components/certificates/CertificateCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Certificate } from "./types";
import { Calendar, Clock, Award, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const { t, localePath } = useLanguage();

  return (
    <Link
      href={localePath(`/certificado/${certificate.id}/`)}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-xl"
    >
      <article
        className="relative group h-full bg-gradient-to-br from-bg-secondary to-bg-primary 
                   border border-bg-tertiary rounded-xl overflow-hidden shadow-card 
                   hover:shadow-glow-md hover:border-primary-500/30 
                   transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
      >
        {/* Imagem do Certificado */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 380px"
          />

          {/* Gradient overlay refinado */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Badge de horas - novo estilo */}
          {certificate.hours && (
            <div className="absolute top-3 right-3 bg-primary-600/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-primary-500/30 shadow-lg">
              <Clock size={12} className="text-white" />
              <span className="text-xs font-semibold text-white">
                {certificate.hours}
              </span>
            </div>
          )}

          {/* Overlay com ícone no hover */}
          <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
            <div className="bg-primary-600 p-3 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-500 shadow-glow-lg">
              <ArrowUpRight size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-5 space-y-3">
          {/* Título com nova tipografia */}
          <h3 className="text-lg font-bold text-content-primary line-clamp-2 group-hover:text-primary-400 transition-colors duration-300 font-variable">
            {certificate.title}
          </h3>

          {/* Instituição */}
          <div className="flex items-center gap-2 text-body text-content-secondary">
            <Award size={14} className="text-primary-500 flex-shrink-0" />
            <span className="line-clamp-1">{certificate.institution}</span>
          </div>

          {/* Data */}
          <div className="flex items-center gap-2 text-caption text-content-subtle">
            <Calendar size={14} className="flex-shrink-0" />
            <span>
              {t("certificates.completed_in")} {certificate.date}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {certificate.tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-primary-500/10 text-primary-400 rounded-md border border-primary-500/20 
                         hover:bg-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {tag}
              </span>
            ))}
            {certificate.tags.length > 3 && (
              <span className="text-xs px-2.5 py-1 text-content-subtle">
                +{certificate.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Barra de progresso decorativa no bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg-tertiary overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </article>
    </Link>
  );
}
