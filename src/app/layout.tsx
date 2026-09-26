import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/../utils/ScrollToTopButton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RecaptchaProvider } from "@/components/RecaptchaProvider";
import AccessibilityToggle from "@/components/AccessibilityToggle";
import SkipLink from "@/components/SkipLink";
import { RegisterSW } from "@/components/RegisterSW";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  // ✅ Removido: preload: false é o padrão, declaração desnecessária
});

const VALID_LOCALES = ["en", "pt"] as const;
type ValidLocale = (typeof VALID_LOCALES)[number];
const DEFAULT_LOCALE: ValidLocale = "en";

function sanitizeLocale(value: unknown): ValidLocale {
  if (
    typeof value === "string" &&
    VALID_LOCALES.includes(value as ValidLocale)
  ) {
    return value as ValidLocale;
  }
  return DEFAULT_LOCALE;
}

const metadataDict = {
  pt: {
    title: "Claudinei Alves Portfolio | Portfólio de IA & Cientista de Dados",
    description:
      "Portfolio de Claudinei Alves — Desenvolvedor focado em Inteligência Artificial, Ciência de Dados e Engenharia de Software. Projetos com Python, Machine Learning e análise de dados aplicada a problemas reais. Acesse claudineiportfolio.vercel.app",
    ogTitle: "Claudinei Alves Portfolio | Portfólio de IA & Ciência de Dados",
    ogDescription:
      "Projetos em Inteligência Artificial, Ciência de Dados e Desenvolvimento de Software focados em resolver problemas reais com tecnologia.",
    twitterTitle: "Claudinei Alves Portfolio | Engenheiro de IA",
    twitterDescription:
      "Projetos de Inteligência Artificial, Machine Learning e desenvolvimento web moderno. Portfólio de Claudinei Alves.",
    locale: "pt_BR",
  },
  en: {
    title: "Claudinei Alves Portfolio | AI Engineer & Data Scientist",
    description:
      "Claudinei Alves' Portfolio — Developer focused on Artificial Intelligence, Data Science and Software Engineering. Projects with Python, Machine Learning and data analysis applied to real-world problems. Visit claudineiportfolio.vercel.app",
    ogTitle: "Claudinei Alves Portfolio | AI & Data Science Portfolio",
    ogDescription:
      "Projects in Artificial Intelligence, Data Science and Software Development focused on solving real problems with technology.",
    twitterTitle: "Claudinei Alves Portfolio | AI Engineer",
    twitterDescription:
      "Projects in Artificial Intelligence, Machine Learning and modern web development. Claudinei Alves Portfolio.",
    locale: "en_US",
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

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("portfolio-locale")?.value;
  const locale = sanitizeLocale(rawLocale);

  const data = metadataDict[locale];

  return {
    metadataBase: new URL("https://claudineiportfolio.vercel.app"),
    title: {
      default: data.title,
      template: "%s | Claudinei Alves",
    },
    description: data.description,
    keywords: [
      "Claudinei Alves",
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
      url: "https://claudineiportfolio.vercel.app",
      siteName: "Claudinei Alves Portfolio",
      images: [
        {
          url: "/portfolio-preview.png",
          width: 1200,
          height: 630,
          alt: "Claudinei Alves Portfolio Preview",
          type: "image/png",
        },
      ],
      locale: data.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.twitterTitle,
      description: data.twitterDescription,
      images: ["/portfolio-preview.png"],
      creator: "@claudinei_alves",
    },
    alternates: {
      canonical: "https://claudineiportfolio.vercel.app",
      languages: {
        "pt-BR": "https://claudineiportfolio.vercel.app/pt",
        "en-US": "https://claudineiportfolio.vercel.app/en",
      },
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

function generateStructuredData(locale: ValidLocale) {
  const isPt = locale === "pt";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Claudinei Alves",
    jobTitle: isPt
      ? "Engenheiro de IA & Cientista de Dados"
      : "AI Engineer & Data Scientist",
    url: "https://claudineiportfolio.vercel.app",
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
    worksFor: {
      "@type": "Organization",
      name: "Freelancer",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("portfolio-locale")?.value;
  const serverLocale = sanitizeLocale(rawLocale);

  const structuredData = generateStructuredData(serverLocale);

  return (
    <html
      lang={serverLocale}
      data-locale={serverLocale}
      suppressHydrationWarning
      className="dark"
      dir="ltr"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var VALID_LOCALES = ["en","pt"];
                  var DEFAULT = "${serverLocale}";

                  var saved = localStorage.getItem("portfolio-locale");
                  var cookieMatch = document.cookie.match(/(?:^|; )portfolio-locale=([^;]*)/);
                  var cookie = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;

                  var locale = saved || cookie || DEFAULT;

                  if (VALID_LOCALES.indexOf(locale) === -1) {
                    locale = DEFAULT;
                  }

                  document.documentElement.lang = locale;
                  document.documentElement.setAttribute("data-locale", locale);
                } catch(e) {
                  document.documentElement.lang = "${serverLocale}";
                  document.documentElement.setAttribute("data-locale", "${serverLocale}");
                }
              })();
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

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
          <LanguageProvider initialLocale={serverLocale}>
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
