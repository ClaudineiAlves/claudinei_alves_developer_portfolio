import type { Metadata } from "next";

export const SITE_URL = "https://claudineiportfolio.vercel.app";
export const SITE_NAME = "Claudinei Alves Portfolio";

export const OG_IMAGE = {
  url: "/Website-overview.png",
  width: 1920,
  height: 1047,
  alt: "Claudinei Alves Portfolio Preview",
  type: "image/png",
};

interface PageSeoInput {
  /** Caminho com barra final (trailingSlash: true), ex.: "/projects/1/" */
  path: string;
  title: string;
  description?: string;
}

// openGraph e twitter de um segmento substituem os do pai por inteiro (não há
// merge), então cada página precisa repetir imagem e siteName.
export function pageSeo({
  path,
  title,
  description,
}: PageSeoInput): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const fullTitle = `${title} | Claudinei Alves`;

  return {
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
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
