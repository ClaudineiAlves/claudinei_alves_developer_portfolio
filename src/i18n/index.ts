import en from "./locales/en.json";
import pt from "./locales/pt.json";

export type Locale = "en" | "pt";

export const locales: Record<Locale, typeof en> = { en, pt };

export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

export const defaultLocale: Locale = "en";

export type TranslationKeys = typeof en;

export const LOCALES: readonly Locale[] = ["en", "pt"];
export const LOCALE_COOKIE = "portfolio-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

// EN fica na raiz (/projects/1/), PT ganha prefixo (/pt/projects/1/).
// `path` começa com "/" e pode ter hash: "/#about" → "/pt/#about".
export function localizePath(path: string, locale: Locale): string {
  return locale === "pt" ? `/pt${path}` : path;
}

export function stripLocale(pathname: string): string {
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    return pathname.slice(3) || "/";
  }
  return pathname;
}

export const htmlLang: Record<Locale, string> = { en: "en", pt: "pt-BR" };
export const ogLocale: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };
