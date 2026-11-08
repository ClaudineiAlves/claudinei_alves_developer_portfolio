import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

const isDev = process.env.NODE_ENV === "development";

// 'unsafe-inline' em script-src é necessário porque o Next injeta scripts
// inline e o site é estático (sem nonce por requisição). O ganho da CSP aqui
// é restringir a ORIGEM de scripts, frames e conexões.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.google.com https://www.gstatic.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.gstatic.com https://www.google.com",
  "font-src 'self' data:",
  // reCAPTCHA. Se o AnimationLottie voltar a ser usado, liberar 'wasm-unsafe-eval'
  // em script-src e https://cdn.jsdelivr.net https://unpkg.com aqui (WASM do dotlottie).
  "connect-src 'self' https://www.google.com https://www.gstatic.com",
  "frame-src https://www.google.com https://recaptcha.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  reactStrictMode: true,
  images: {
    // ✅ Otimização habilitada (unoptimized removido)
    // Next.js comprime automaticamente e converte para WebP/AVIF
    // Para imagens de domínios externos, descomente e adicione os hosts:
    // remotePatterns: [
    //   { protocol: "https", hostname: "exemplo.com" },
    // ],
  },
  trailingSlash: true,
  poweredByHeader: false,
};

const nextConfigFunction = async (phase: string) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
      // ✅ PWA desabilitado em dev — evita conflitos com hot reload
      disable: phase === PHASE_DEVELOPMENT_SERVER,
    });

    return withSerwist(nextConfig);
  }

  return nextConfig;
};

export default nextConfigFunction;
