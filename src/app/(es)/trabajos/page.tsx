import type { Metadata } from "next";
import PaginaTrabajos from "@/components/PaginaTrabajos";
import { es } from "@/i18n/es";
import { alternativas } from "@/i18n/config";

export const metadata: Metadata = {
  title: es.trabajosPagina.meta.titulo,
  description: es.trabajosPagina.meta.descripcion,
  alternates: alternativas("/trabajos", "es"),
};

export default function TrabajosPage() {
  return <PaginaTrabajos idioma="es" />;
}
