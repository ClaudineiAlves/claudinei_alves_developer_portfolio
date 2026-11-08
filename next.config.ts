import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
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
