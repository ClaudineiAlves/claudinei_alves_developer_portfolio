import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Claudinei Alves Portfolio",
    short_name: "Claudinei",
    description:
      "Portfólio de Claudinei Alves — Projetos em Inteligência Artificial, Ciência de Dados e Engenharia de Software.",

    start_url: "/",
    display: "standalone",

    background_color: "#000000",
    theme_color: "#000000",

    // Sem ícone o navegador não oferece instalar o PWA
    icons: [
      {
        src: "/logo.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
