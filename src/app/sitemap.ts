import { MetadataRoute } from "next";
import { projectsData } from "../../utils/Data/projects-data";
import { certificates } from "@/components/sections/certificates/data";
import { LOCALES, localizePath } from "@/i18n";
import { SITE_URL } from "@/lib/seo";

type Entry = Pick<
  MetadataRoute.Sitemap[number],
  "changeFrequency" | "priority"
> & {
  // Caminho sem prefixo de idioma e com barra final (trailingSlash: true)
  path: string;
};

const pages: Entry[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/projects/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy/", changeFrequency: "yearly", priority: 0.3 },
  ...projectsData.map(
    (project): Entry => ({
      path: `/projects/${project.id}/`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ),
  ...certificates.map(
    (certificate): Entry => ({
      path: `/certificado/${certificate.id}/`,
      changeFrequency: "yearly",
      priority: 0.6,
    }),
  ),
];

// Uma entrada por idioma, cada uma listando as duas versões (hreflang).
// Sem lastModified: a data do build mudaria a cada deploy e o Google passa a
// ignorar o campo quando ele não reflete mudanças reais.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, ...rest }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localizePath(path, locale)}`,
      ...rest,
      alternates: {
        languages: {
          en: `${SITE_URL}${localizePath(path, "en")}`,
          "pt-BR": `${SITE_URL}${localizePath(path, "pt")}`,
        },
      },
    })),
  );
}
