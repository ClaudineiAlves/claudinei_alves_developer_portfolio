import type { Metadata } from "next";
import { cookies } from "next/headers";
import { locales } from "@/i18n";
import { pageSeo } from "@/lib/seo";

// page.tsx é client component e não pode exportar metadata
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale =
    cookieStore.get("portfolio-locale")?.value === "pt" ? "pt" : "en";

  const title = locales[locale].nav.projects;
  const description = locales[locale].projects.subtitle;

  // Um título em string aqui cortaria o template do layout raiz para /projects/[id].
  // /projects/[id] sobrescreve canonical e openGraph com os próprios valores.
  return {
    title: {
      default: title,
      template: "%s | Claudinei Alves",
    },
    description,
    ...pageSeo({ path: "/projects/", title, description }),
  };
}

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
