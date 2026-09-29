import type { Metadata } from "next";
import PaginaTrabajos from "@/components/PaginaTrabajos";
import { ca } from "@/i18n/ca";
import { metaPagina } from "@/i18n/seo";

export const metadata: Metadata = metaPagina({
  idioma: "ca",
  ruta: "/ca/treballs",
  titulo: ca.trabajosPagina.meta.titulo,
  descripcion: ca.trabajosPagina.meta.descripcion,
});

export default function TreballsPage() {
  return <PaginaTrabajos idioma="ca" />;
}
