import type { Metadata } from "next";
import PaginaHome from "@/components/PaginaHome";
import { metaPagina } from "@/i18n/seo";
import { ca } from "@/i18n/ca";

export const metadata: Metadata = metaPagina({
  idioma: "ca",
  ruta: "/ca",
  titulo: ca.meta.titulo,
  descripcion: ca.meta.descripcion,
});

export default function HomePageCa() {
  return <PaginaHome idioma="ca" />;
}
