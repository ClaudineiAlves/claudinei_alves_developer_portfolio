"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const { t, localePath } = useLanguage();

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="max-w-md text-center">
        <p className="mb-4 text-6xl font-black text-primary-500">404</p>
        <h1 className="mb-4 break-words text-3xl font-bold text-content-primary sm:text-4xl">
          {t("not_found.title")}
        </h1>
        <p className="mb-8 text-content-secondary">
          {t("not_found.description")}
        </p>
        <Link
          href={localePath("/")}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700"
        >
          <ArrowLeft size={20} className="shrink-0" />
          {t("not_found.back")}
        </Link>
      </div>
    </section>
  );
}
