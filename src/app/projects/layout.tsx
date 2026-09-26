import type { Metadata } from "next";
import { cookies } from "next/headers";
import { locales } from "@/i18n";

// page.tsx é client component e não pode exportar metadata
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale =
    cookieStore.get("portfolio-locale")?.value === "pt" ? "pt" : "en";

  // Um título em string aqui cortaria o template do layout raiz para /projects/[id]
  return {
    title: {
      default: locales[locale].nav.projects,
      template: "%s | Claudinei Alves",
    },
  };
}

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
