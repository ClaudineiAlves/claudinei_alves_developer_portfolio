import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/../utils/ScrollToTopButton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RecaptchaProvider } from "@/components/RecaptchaProvider";
import AccessibilityToggle from "@/components/AccessibilityToggle";
import SkipLink from "@/components/SkipLink";
import { RegisterSW } from "@/components/RegisterSW";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  type Locale,
  LOCALES,
  htmlLang,
  isLocale,
  localizePath,
  ogLocale,
} from "@/i18n";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  // ✅ Removido: preload: false é o padrão, declaração desnecessária
});

// Cada idioma é gerado no build. O middleware reescreve as URLs sem prefixo
// para /en/… internamente, então só "en" e "pt" chegam aqui; o notFound()
// cobre caminhos fora do middleware (ex.: /arquivo-inexistente.txt).
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

const metadataDict = {
  pt: {
    title: "Claudinei Alves Portfolio | Portfólio de IA & Cientista de Dados",
    description:
      "Portfolio de Claudinei Alves (Claudinei Alves Reis) — Desenvolvedor focado em Inteligência Artificial, Ciência de Dados e Engenharia de Software. Projetos com Python, Machine Learning e análise de dados aplicada a problemas reais. Acesse claudineiportfolio.vercel.app",
    ogTitle: "Claudinei Alves Portfolio | Portfólio de IA & Ciência de Dados",
    ogDescription:
      "Projetos em Inteligência Artificial, Ciência de Dados e Desenvolvimento de Software focados em resolver problemas reais com tecnologia.",
    twitterTitle: "Claudinei Alves Portfolio | Engenheiro de IA",
    twitterDescription:
      "Projetos de Inteligência Artificial, Machine Learning e desenvolvimento web moderno. Portfólio de Claudinei Alves.",
  },
  en: {
    title: "Claudinei Alves Portfolio | AI Engineer & Data Scientist",
    description:
      "Claudinei Alves' Portfolio (Claudinei Alves Reis) — Developer focused on Artificial Intelligence, Data Science and Software Engineering. Projects with Python, Machine Learning and data analysis applied to real-world problems. Visit claudineiportfolio.vercel.app",
    ogTitle: "Claudinei Alves Portfolio | AI & Data Science Portfolio",
    ogDescription:
      "Projects in Artificial Intelligence, Data Science and Software Development focused on solving real problems with technology.",
    twitterTitle: "Claudinei Alves Portfolio | AI Engineer",
    twitterDescription:
      "Projects in Artificial Intelligence, Machine Learning and modern web development. Claudinei Alves Portfolio.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  // ✅ "dark light" permite suporte a tema claro no futuro sem quebrar nada
  colorScheme: "dark light",
};

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);

  const data = metadataDict[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: data.title,
      template: "%s | Claudinei Alves",
    },
    description: data.description,
    keywords: [
      "Claudinei Alves",
      "Claudinei Alves Reis",
      "AI Engineer",
      "Data Scientist",
      "Machine Learning",
      "Python Developer",
      "Artificial Intelligence",
      "Computer Vision",
      "Data Analysis",
      "Deep Learning",
      "Portfolio",
    ],
    authors: [
      { name: "Claudinei Alves", url: "https://github.com/ClaudineiAlves" },
    ],
    creator: "Claudinei Alves",
    publisher: "Claudinei Alves",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: localizePath("/", locale),
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      locale: ogLocale[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.twitterTitle,
      description: data.twitterDescription,
      images: [OG_IMAGE.url],
      creator: "@claudinei_alves",
    },
    verification: {
      google: "7wqyeqXdmhd8uuXTlIk4Gmu-bNZNeD4yCtUxmg9Hr4Y",
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
        "yandex-verification":
          process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "",
      },
    },
    category: "technology",
  };
}

function generateStructuredData(locale: Locale) {
  const isPt = locale === "pt";
  const url = `${SITE_URL}${localizePath("/", locale)}`;

  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Claudinei Alves",
    // Nome completo usado no GitHub e no LinkedIn
    alternateName: "Claudinei Alves Reis",
    jobTitle: isPt
      ? "Engenheiro de IA & Cientista de Dados"
      : "AI Engineer & Data Scientist",
    url,
    sameAs: [
      "https://github.com/ClaudineiAlves",
      "https://www.linkedin.com/in/claudinei-alves-reis/",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Python",
      "Deep Learning",
      "Computer Vision",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url,
        name: SITE_NAME,
        inLanguage: htmlLang[locale],
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LocaleParams>) {
  const locale = await resolveLocale(params);
  const structuredData = generateStructuredData(locale);

  return (
    <html
      lang={htmlLang[locale]}
      data-locale={locale}
      suppressHydrationWarning
      className="dark"
      dir="ltr"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Claudinei Alves" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-bg-primary text-content-primary min-h-screen`}
      >
        <RegisterSW />
        <RecaptchaProvider>
          <LanguageProvider locale={locale}>
            {/* Primeiro elemento focável da página; dentro do provider para seguir o idioma */}
            <SkipLink />
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <ScrollToTopButton />
              <AccessibilityToggle />
            </div>
          </LanguageProvider>
        </RecaptchaProvider>
      </body>
    </html>
  );
}
