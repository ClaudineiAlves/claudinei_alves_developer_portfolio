"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Locale,
  LOCALE_COOKIE,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  /** Prefixa um caminho interno com o idioma atual: "/projects/" → "/pt/projects/" */
  localePath: (path: string) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Lido pelo middleware para mandar quem já escolheu PT direto para /pt/…
function setLocaleCookie(value: Locale, days = 365): void {
  const cookieParts = [
    `${LOCALE_COOKIE}=${value}`,
    `max-age=${days * 24 * 60 * 60}`,
    `path=/`,
    `SameSite=Lax`,
  ];

  if (window.location.protocol === "https:") {
    cookieParts.push("Secure");
  }

  document.cookie = cookieParts.join(";");
}

function getNestedValue(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof result === "string" ? result : undefined;
}

interface LanguageProviderProps {
  children: ReactNode;
  /** Idioma da rota ([locale]); a URL é a fonte da verdade */
  locale: Locale;
}

export function LanguageProvider({ children, locale }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;

      try {
        setLocaleCookie(newLocale);
      } catch (error) {
        console.error("[LanguageProvider] Erro ao salvar idioma:", error);
      }

      const target = localizePath(stripLocale(pathname), newLocale);
      router.push(`${target}${window.location.hash}`, { scroll: false });
    },
    [locale, pathname, router],
  );

  const localePath = useCallback(
    (path: string) => localizePath(path, locale),
    [locale],
  );

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(
        locales[locale] as unknown as Record<string, unknown>,
        key,
      );

      if (value === undefined) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[i18n] Tradução ausente: "${key}" no locale "${locale}"`,
          );
        }
        return "";
      }

      return value;
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      localePath,
      isReady,
    }),
    [locale, setLocale, t, localePath, isReady],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
