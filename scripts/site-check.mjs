#!/usr/bin/env node
/**
 * Verificação de saúde e SEO do site em produção.
 *
 * Checa: páginas do sitemap, canonical/og:url/og:image por página, imagens OG,
 * robots.txt, sitemap, chave do IndexNow, headers de segurança, 404, acesso dos
 * robôs de busca, redirecionamento do domínio antigo, tags de verificação e
 * presença no índice do Bing (informativo).
 *
 * Uso: `npm run check:site`  (SITE_URL=https://... para outro host)
 * Sai com código 1 se houver alguma falha (✗). Avisos (⚠) não falham.
 */

import { appendFile, readFile } from "node:fs/promises";

const SITE = (
  process.env.SITE_URL ?? "https://claudineiportfolio.vercel.app"
).replace(/\/$/, "");
const OLD_DOMAIN = "https://claudineiportifolio.vercel.app";
const SLOW_MS = 2000;
const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";
// UA de crawler de preview: o Next 15 só coloca os metadados no <head> para estes
const PREVIEW_UA = "LinkedInBot/1.0";
const BOTS = {
  Googlebot:
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  Bingbot:
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  YandexBot: "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
};

const results = [];
const pass = (area, msg) => results.push({ level: "pass", area, msg });
const warn = (area, msg) => results.push({ level: "warn", area, msg });
const fail = (area, msg) => results.push({ level: "fail", area, msg });

async function get(url, { ua = BROWSER_UA, method = "GET" } = {}) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method,
      redirect: "manual",
      headers: { "User-Agent": ua },
      signal: AbortSignal.timeout(20000),
    });
    const body = method === "HEAD" ? "" : await res.text();
    return { res, body, ms: Date.now() - start };
  } catch (err) {
    return { res: null, body: "", ms: Date.now() - start, error: err.message };
  }
}

const meta = (html, attr, name) =>
  html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`, "i"))?.[1];
const canonicalOf = (html) =>
  html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];

async function checkSitemap() {
  const { res, body } = await get(`${SITE}/sitemap.xml`);
  if (res?.status !== 200) {
    fail("sitemap", `sitemap.xml respondeu ${res?.status ?? "erro"}`);
    return [];
  }
  const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim(),
  );
  if (urls.length === 0) fail("sitemap", "sitemap.xml sem URLs");
  const bad = urls.filter((u) => !u.startsWith(`${SITE}/`) || !u.endsWith("/"));
  if (bad.length)
    fail("sitemap", `URLs fora do host ou sem barra final: ${bad.join(", ")}`);
  else pass("sitemap", `${urls.length} URLs, todas com barra final`);
  return urls;
}

async function checkPage(url, ogImages) {
  const { res, body, ms, error } = await get(url, { ua: PREVIEW_UA });
  const path = url.replace(SITE, "") || "/";
  if (!res) return fail("página", `${path}: ${error}`);
  if (res.status !== 200)
    return fail("página", `${path}: HTTP ${res.status} (esperado 200)`);

  const problems = [];
  if (!/<title>[^<]+<\/title>/.test(body)) problems.push("sem <title>");
  if (!meta(body, "name", "description")) problems.push("sem description");
  if (/noindex/i.test(meta(body, "name", "robots") ?? ""))
    problems.push("robots=noindex");
  const canonical = canonicalOf(body);
  if (canonical !== url) problems.push(`canonical=${canonical ?? "ausente"}`);
  const ogUrl = meta(body, "property", "og:url");
  if (ogUrl !== url) problems.push(`og:url=${ogUrl ?? "ausente"}`);
  const ogImage = meta(body, "property", "og:image");
  if (!ogImage) problems.push("sem og:image");
  else ogImages.add(ogImage);
  for (const [, href] of body.matchAll(
    /<link rel="alternate" hrefLang="[^"]+" href="([^"]+)"/gi,
  )) {
    const alt = await get(href, { method: "HEAD" });
    if (alt.res?.status !== 200)
      problems.push(`hreflang ${href} → ${alt.res?.status}`);
  }

  if (problems.length) fail("página", `${path}: ${problems.join("; ")}`);
  else pass("página", `${path} (${ms} ms)`);
  if (ms > SLOW_MS) warn("desempenho", `${path} levou ${ms} ms`);
}

async function checkOgImages(ogImages) {
  for (const img of ogImages) {
    const { res } = await get(img, { method: "HEAD" });
    const type = res?.headers.get("content-type") ?? "";
    if (res?.status === 200 && type.startsWith("image/"))
      pass("imagem OG", `${img.replace(SITE, "")} (${type})`);
    else fail("imagem OG", `${img} → HTTP ${res?.status}, ${type}`);
  }
}

async function checkRobots() {
  const { res, body } = await get(`${SITE}/robots.txt`);
  if (res?.status !== 200)
    return fail("robots", `robots.txt respondeu ${res?.status}`);
  if (!body.includes(`Sitemap: ${SITE}/sitemap.xml`))
    fail("robots", "robots.txt não aponta para o sitemap");
  else if (
    /User-Agent: \*\s*\n(?:Allow: [^\n]*\n)*Disallow: \/\s*$/im.test(body)
  )
    fail("robots", "robots.txt bloqueia o site inteiro");
  else pass("robots", "robots.txt ok e aponta para o sitemap");
}

async function checkIndexNowKey() {
  const src = await readFile(
    new URL("./indexnow.mjs", import.meta.url),
    "utf8",
  );
  const key = src.match(/const KEY = "([^"]+)"/)?.[1];
  if (!key) return warn("indexnow", "chave não encontrada em indexnow.mjs");
  const { res, body } = await get(`${SITE}/${key}.txt`);
  if (res?.status === 200 && body.trim() === key)
    pass("indexnow", "arquivo de chave publicado");
  else fail("indexnow", `arquivo de chave: HTTP ${res?.status}`);
}

async function checkHome() {
  const { res, body } = await get(`${SITE}/`, { ua: PREVIEW_UA });
  if (!res) return;
  const h = res.headers;
  const expected = {
    "strict-transport-security": /max-age=\d+/,
    "x-content-type-options": /nosniff/,
    "x-frame-options": /DENY|SAMEORIGIN/,
    "referrer-policy": /.+/,
  };
  const missing = Object.entries(expected)
    .filter(([k, re]) => !re.test(h.get(k) ?? ""))
    .map(([k]) => k);
  if (missing.length)
    fail("segurança", `headers ausentes: ${missing.join(", ")}`);
  else pass("segurança", "HSTS, nosniff, X-Frame-Options e Referrer-Policy");
  if (h.get("x-powered-by")) warn("segurança", "x-powered-by exposto");
  if (!h.get("content-security-policy"))
    warn("segurança", "sem Content-Security-Policy");

  const region = h.get("x-vercel-id")?.split("::").slice(-2, -1)[0];
  if (region && region !== "gru1")
    warn("desempenho", `função rodando em ${region} (esperado gru1)`);

  if (!meta(body, "name", "google-site-verification"))
    fail("verificação", "meta google-site-verification ausente");
  else pass("verificação", "meta do Google Search Console presente");
  if (!meta(body, "name", "yandex-verification"))
    warn("verificação", "meta yandex-verification ausente");

  const ld = body.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  try {
    const data = JSON.parse(ld ?? "");
    if (data["@type"] === "Person" && data.alternateName)
      pass(
        "dados estruturados",
        `Person (${data.name} / ${data.alternateName})`,
      );
    else warn("dados estruturados", "JSON-LD Person sem alternateName");
  } catch {
    fail("dados estruturados", "JSON-LD ausente ou inválido");
  }
}

async function checkNotFound() {
  const { res } = await get(`${SITE}/__site-check-${Date.now()}/`);
  if (res?.status === 404) pass("404", "rota inexistente retorna 404");
  else fail("404", `rota inexistente retornou ${res?.status} (soft 404)`);
}

async function checkBots(sampleUrl) {
  for (const [name, ua] of Object.entries(BOTS)) {
    const { res } = await get(sampleUrl, { ua, method: "HEAD" });
    if (res?.status === 200) pass("robôs", `${name} recebe 200`);
    else fail("robôs", `${name} recebeu ${res?.status ?? "erro"}`);
  }
}

async function checkOldDomain() {
  const { res } = await get(`${OLD_DOMAIN}/`, { method: "HEAD" });
  const location = res?.headers.get("location") ?? "";
  if (!res || !location.startsWith(SITE))
    return warn("domínio antigo", `${OLD_DOMAIN} não redireciona para ${SITE}`);
  if ([301, 308].includes(res.status))
    pass("domínio antigo", `redireciona com ${res.status} (permanente)`);
  else
    warn(
      "domínio antigo",
      `redireciona com ${res.status}; use 308 na Vercel (Settings → Domains)`,
    );
}

// Informativo: o Bing pode bloquear ou mudar o HTML a qualquer momento
async function checkBingIndex() {
  const host = new URL(SITE).host;
  const { res, body } = await get(
    `https://www.bing.com/search?q=site%3A${host}&setlang=en&cc=US`,
  );
  if (res?.status !== 200)
    return warn(
      "índice",
      `Bing: não foi possível consultar (HTTP ${res?.status})`,
    );
  const found = new Set(
    [...body.matchAll(/<cite>([^<]*)<\/cite>/g)]
      .map((m) => m[1])
      .filter((c) => c.includes(host)),
  );
  if (found.size)
    pass("índice", `Bing: ${found.size} resultado(s) para site:${host}`);
  else warn("índice", `Bing: nenhum resultado para site:${host} ainda`);
}

const ICON = { pass: "✓", warn: "⚠", fail: "✗" };

async function report() {
  const counts = { pass: 0, warn: 0, fail: 0 };
  for (const r of results) counts[r.level]++;

  for (const r of results) console.log(`${ICON[r.level]} [${r.area}] ${r.msg}`);
  console.log(
    `\n${counts.pass} ok · ${counts.warn} aviso(s) · ${counts.fail} falha(s) — ${SITE}`,
  );

  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = results
      .map(
        (r) =>
          `| ${ICON[r.level]} | ${r.area} | ${r.msg.replace(/\|/g, "\\|")} |`,
      )
      .join("\n");
    await appendFile(
      process.env.GITHUB_STEP_SUMMARY,
      `## Verificação do site\n\n**${counts.pass} ok · ${counts.warn} aviso(s) · ${counts.fail} falha(s)** — ${SITE}\n\n| | Área | Detalhe |\n|---|---|---|\n${rows}\n`,
    );
  }
  return counts.fail;
}

(async () => {
  const urls = await checkSitemap();
  const ogImages = new Set();
  for (const url of urls) await checkPage(url, ogImages);
  await checkOgImages(ogImages);
  await Promise.all([
    checkRobots(),
    checkIndexNowKey(),
    checkHome(),
    checkNotFound(),
    checkBots(urls[1] ?? `${SITE}/`),
    checkOldDomain(),
    checkBingIndex(),
  ]);
  const failures = await report();
  process.exit(failures ? 1 : 0);
})().catch((err) => {
  console.error(`✗ erro inesperado: ${err.stack ?? err}`);
  process.exit(1);
});
