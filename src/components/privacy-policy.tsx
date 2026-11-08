"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  { title: "privacy.site_title", body: ["privacy.site_body"] },
  {
    title: "privacy.app_title",
    body: ["privacy.app_body", "privacy.limited_use", "privacy.revoke"],
  },
  { title: "privacy.contact_title", body: ["privacy.contact_body"] },
] as const;

export default function PrivacyPolicy() {
  const { t, localePath } = useLanguage();

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-24 sm:px-8">
      <article className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <h1 className="break-words text-4xl font-black tracking-tighter text-content-primary sm:text-5xl">
            {t("privacy.title")}
          </h1>
          <p className="text-sm text-content-muted">{t("privacy.updated")}</p>
          <p className="text-lg leading-relaxed text-content-secondary">
            {t("privacy.intro")}
          </p>
        </header>

        {SECTIONS.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-content-primary">
              {t(section.title)}
            </h2>
            {section.body.map((key) => (
              <p key={key} className="leading-relaxed text-content-secondary">
                {t(key)}
              </p>
            ))}
          </section>
        ))}

        <Link
          href={localePath("/")}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700"
        >
          <ArrowLeft size={20} className="shrink-0" />
          {t("privacy.back")}
        </Link>
      </article>
    </main>
  );
}
