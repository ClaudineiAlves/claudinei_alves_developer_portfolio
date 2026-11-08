"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Certificate } from "./types";

interface CertificateDetailsProps {
  certificate: Certificate;
  relatedCertificates: Certificate[];
}

export default function CertificateDetails({
  certificate,
  relatedCertificates,
}: CertificateDetailsProps) {
  const { t, localePath } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href={localePath("/#certificates")}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <ArrowLeft size={20} className="shrink-0" />
            <span>{t("certificate_detail.back")}</span>
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
            <Award size={18} className="text-red-500" />
            <span className="text-red-400 text-sm font-medium">
              {t("certificate_detail.badge")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 break-words">
            {certificate.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-400">
            {certificate.institution}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Coluna da Imagem */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#333] shadow-2xl">
              <Image
                src={certificate.image}
                alt={certificate.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 min-w-0 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all hover:scale-105 text-center"
              >
                <ExternalLink size={20} className="shrink-0" />
                {t("certificate_detail.view_official")}
              </a>

              <button
                className="p-3 border border-[#333] hover:border-red-500 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                aria-label={t("certificate_detail.share")}
              >
                <Share2 size={20} />
              </button>

              <button
                className="p-3 border border-[#333] hover:border-red-500 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                aria-label={t("certificate_detail.download")}
              >
                <Download size={20} />
              </button>
            </div>
          </div>

          {/* Coluna de Informações */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-5 sm:p-6">
                <Calendar className="text-red-500 mb-2" size={24} />
                <div className="text-sm text-gray-500 mb-1">
                  {t("certificate_detail.date_label")}
                </div>
                <div className="text-lg font-semibold text-white">
                  {certificate.date}
                </div>
              </div>

              {certificate.hours && (
                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-5 sm:p-6">
                  <Clock className="text-red-500 mb-2" size={24} />
                  <div className="text-sm text-gray-500 mb-1">
                    {t("certificate_detail.hours_label")}
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {certificate.hours}
                  </div>
                </div>
              )}
            </div>

            {/* Descrição */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-5 sm:p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-red-500 shrink-0" size={24} />
                {t("certificate_detail.about_title")}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {certificate.description}
              </p>
            </div>

            {/* Tags */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-5 sm:p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                {t("certificate_detail.skills_title")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {certificate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ID do Certificado */}
            <div className="text-center p-4 bg-[#0d0d0d] rounded-lg border border-dashed border-[#333]">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {t("certificate_detail.id_label")}
              </span>
              <div className="text-sm font-mono text-gray-400 mt-1 break-all">
                {certificate.id}-
                {certificate.institution.replace(/\s+/g, "-").toLowerCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Certificados Relacionados */}
        {relatedCertificates.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Award className="text-red-500 shrink-0" size={28} />
              {t("certificate_detail.related_title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCertificates.map((cert) => (
                <Link
                  key={cert.id}
                  href={localePath(`/certificado/${cert.id}/`)}
                >
                  <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#333] hover:border-red-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {cert.institution}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
