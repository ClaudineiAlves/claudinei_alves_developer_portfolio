import type { Metadata } from "next";
import { type Locale, localizePath, ogLocale } from "@/i18n";

export const SITE_URL = "https://claudineiportfolio.vercel.app";
export const SITE_NAME = "Claudinei Alves Portfolio";

export const OG_IMAGE = {
  url: "/Website-overview.png",
  width: 1920,
  height: 1047,
  alt: "Claudinei Alves Portfolio Preview",
  type: "image/png",
};

/**
 * Canonical da página no idioma atual + hreflang apontando para as duas versões.
 * `path` é o caminho sem prefixo de idioma e com barra final (trailingSlash: true).
 */
export function alternatesFor(
  locale: Locale,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localizePath(path, locale),
    languages: {
      en: localizePath(path, "en"),
      "pt-BR": localizePath(path, "pt"),
      "x-default": localizePath(path, "en"),
    },
  };
}

interface PageSeoInput {
  locale: Locale;
  /** Caminho sem prefixo de idioma, com barra final, ex.: "/projects/1/" */
  path: string;
  title: string;
  description?: string;
}

// openGraph e twitter de um segmento substituem os do pai por inteiro (não há
// merge), então cada página precisa repetir imagem e siteName.
export function pageSeo({
  locale,
  path,
  title,
  description,
}: PageSeoInput): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const fullTitle = `${title} | Claudinei Alves`;

  return {
    alternates: alternatesFor(locale, path),
    openGraph: {
      title: fullTitle,
      description,
      url: localizePath(path, locale),
      siteName: SITE_NAME,
      locale: ogLocale[locale],
      images: [OG_IMAGE],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
