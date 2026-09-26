import { projectsData } from "@/../utils/Data/projects-data";
import { locales } from "@/i18n";
import ProjectDetails from "@/components/sections/projects/project-details";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

// Título próprio por projeto; o template "%s | Claudinei Alves" de projects/layout completa
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === parseInt(id));
  if (!project) return {};

  const cookieStore = await cookies();
  const locale =
    cookieStore.get("portfolio-locale")?.value === "pt" ? "pt" : "en";
  const items = locales[locale].projects.items as Record<
    string,
    { name?: string; description?: string }
  >;

  return {
    title: items[id]?.name || project.name,
    description: items[id]?.description || project.description,
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
