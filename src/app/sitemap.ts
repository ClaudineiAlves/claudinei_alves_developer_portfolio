import { MetadataRoute } from "next";
import { projectsData } from "../../utils/Data/projects-data";
import { certificates } from "@/components/sections/certificates/data";

const baseUrl = "https://claudineiportfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const certificateRoutes: MetadataRoute.Sitemap = certificates.map(
    (certificate) => ({
      url: `${baseUrl}/certificado/${certificate.id}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...projectRoutes, ...certificateRoutes];
}
