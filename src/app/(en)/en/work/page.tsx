import type { Metadata } from "next";
import PaginaTrabajos from "@/components/PaginaTrabajos";
import { en } from "@/i18n/en";
import { metaPagina } from "@/i18n/seo";

export const metadata: Metadata = metaPagina({
  idioma: "en",
  ruta: "/en/work",
  titulo: en.trabajosPagina.meta.titulo,
  descripcion: en.trabajosPagina.meta.descripcion,
});

export default function WorkPage() {
  return <PaginaTrabajos idioma="en" />;
}
