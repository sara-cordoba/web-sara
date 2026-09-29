import type { Metadata } from "next";
import PaginaTrabajos from "@/components/PaginaTrabajos";
import { es } from "@/i18n/es";
import { metaPagina } from "@/i18n/seo";

export const metadata: Metadata = metaPagina({
  idioma: "es",
  ruta: "/trabajos",
  titulo: es.trabajosPagina.meta.titulo,
  descripcion: es.trabajosPagina.meta.descripcion,
});

export default function TrabajosPage() {
  return <PaginaTrabajos idioma="es" />;
}
