import { projectsData } from "@/../utils/Data/projects-data";
import { isLocale, locales } from "@/i18n";
import { pageSeo } from "@/lib/seo";
import ProjectDetails from "@/components/sections/projects/project-details";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: String(project.id) }));
}

// Título próprio por projeto; o template "%s | Claudinei Alves" de projects/layout completa
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const project = projectsData.find((p) => p.id === parseInt(id));
  if (!project) return {};

  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const items = locales[locale].projects.items as Record<
    string,
    { name?: string; description?: string }
  >;

  const title = items[id]?.name || project.name;
  const description = items[id]?.description || project.description;

  return {
    title,
    description,
    ...pageSeo({ locale, path: `/projects/${id}/`, title, description }),
  };
}

// Server Component: resolve os dados e delega a renderização ao client
// component, que é quem tem acesso ao contexto de idioma.
const ProjectDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
};

export default ProjectDetailsPage;
