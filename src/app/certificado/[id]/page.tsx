// src/app/certificado/[id]/page.tsx
import CertificateDetails from "@/components/sections/certificates/certificate-details";
import { certificates } from "@/components/sections/certificates/data";
import { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { notFound } from "next/navigation";

interface CertificatePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Gerar metadata dinâmica
export async function generateMetadata({
  params,
}: CertificatePageProps): Promise<Metadata> {
  const { id } = await params;
  const certificate = certificates.find((c) => c.id === id);

  if (!certificate) {
    return {
      title: "Certificado não encontrado",
    };
  }

  const title = `${certificate.title} | Certificado`;

  return {
    title,
    description: certificate.description,
    ...pageSeo({
      path: `/certificado/${id}/`,
      title,
      description: certificate.description,
    }),
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
