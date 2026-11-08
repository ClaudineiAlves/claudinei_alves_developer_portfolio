import CertificateDetails from "@/components/sections/certificates/certificate-details";
import { certificates } from "@/components/sections/certificates/data";
import { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { isLocale, locales } from "@/i18n";
import { notFound } from "next/navigation";

interface CertificatePageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

// Gerar metadata dinâmica
export async function generateMetadata({
  params,
}: CertificatePageProps): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = locales[locale];
  const certificate = certificates.find((c) => c.id === id);

  if (!certificate) {
    return { title: dict.certificate_detail.not_found_title };
  }

  const items = dict.certificates.items as Record<
    string,
    { title?: string; description?: string }
  >;
  const title = `${items[id]?.title || certificate.title} | ${dict.certificate_detail.meta_label}`;
  const description = items[id]?.description || certificate.description;

  return {
    title,
    description,
    ...pageSeo({ locale, path: `/certificado/${id}/`, title, description }),
  };
}

// Gerar páginas estáticas para cada certificado
export async function generateStaticParams() {
  return certificates.map((cert) => ({
    id: cert.id,
  }));
}

// Server Component: resolve os dados e delega a renderização ao client
// component, que é quem tem acesso ao contexto de idioma.
export default async function CertificatePage({
  params,
}: CertificatePageProps) {
  const { id } = await params;
  const certificate = certificates.find((c) => c.id === id);

  if (!certificate) {
    notFound();
  }

  // Certificados relacionados (mesmas tags)
  const relatedCertificates = certificates
    .filter(
      (c) =>
        c.id !== certificate.id &&
        c.tags.some((tag) => certificate.tags.includes(tag)),
    )
    .slice(0, 3);

  return (
    <CertificateDetails
      certificate={certificate}
      relatedCertificates={relatedCertificates}
    />
  );
}
