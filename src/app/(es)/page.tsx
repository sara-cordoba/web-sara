import type { Metadata } from "next";
import PaginaHome from "@/components/PaginaHome";
import { metaPagina } from "@/i18n/seo";
import { es } from "@/i18n/es";

export const metadata: Metadata = metaPagina({
  idioma: "es",
  ruta: "/",
  titulo: es.meta.titulo,
  descripcion: es.meta.descripcion,
});

export default function HomePage() {
  return <PaginaHome idioma="es" />;
}
