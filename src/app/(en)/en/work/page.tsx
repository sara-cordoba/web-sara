import type { Metadata } from "next";
import PaginaTrabajos from "@/components/PaginaTrabajos";
import { en } from "@/i18n/en";
import { alternativas } from "@/i18n/config";

export const metadata: Metadata = {
  title: en.trabajosPagina.meta.titulo,
  description: en.trabajosPagina.meta.descripcion,
  alternates: alternativas("/trabajos", "en"),
};

export default function WorkPage() {
  return <PaginaTrabajos idioma="en" />;
}
