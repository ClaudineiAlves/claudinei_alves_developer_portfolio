import { notFound } from "next/navigation";

// Qualquer rota desconhecida dentro de um idioma cai aqui e renderiza o
// not-found.tsx do idioma (com Navbar, Footer e textos traduzidos).
export default function CatchAll() {
  notFound();
}
