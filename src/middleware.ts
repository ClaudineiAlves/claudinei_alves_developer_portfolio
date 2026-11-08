import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/i18n";

// URLs públicas: EN sem prefixo (/projects/1/), PT com /pt (/pt/projects/1/).
// Internamente as páginas vivem em app/[locale]/, então as URLs sem prefixo
// são reescritas para /en/… e servidas do HTML gerado no build.
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // /en/… não é URL pública: redireciona para a versão sem prefixo
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    return NextResponse.next();
  }

  // Quem escolheu PT no seletor volta direto para /pt/…. Robôs de busca não
  // mandam cookie, então sempre veem a URL que pediram.
  if (request.cookies.get(LOCALE_COOKIE)?.value === "pt") {
    const url = request.nextUrl.clone();
    url.pathname = `/pt${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Tudo menos API, assets do Next e arquivos com extensão (imagens, sitemap,
  // robots, manifest, sw.js, chave do IndexNow…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
