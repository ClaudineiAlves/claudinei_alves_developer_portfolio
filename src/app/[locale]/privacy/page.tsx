import PrivacyPolicy from "@/components/privacy-policy";
import type { Metadata } from "next";
import { isLocale, locales } from "@/i18n";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const title = locales[locale].privacy.title;
  const description = locales[locale].privacy.meta_description;

  return {
    title,
    description,
    ...pageSeo({ locale, path: "/privacy/", title, description }),
  };
}

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
