import type { Metadata } from "next";
import PaginaHome from "@/components/PaginaHome";
import { metaPagina } from "@/i18n/seo";
import { en } from "@/i18n/en";

export const metadata: Metadata = metaPagina({
  idioma: "en",
  ruta: "/en",
  titulo: en.meta.titulo,
  descripcion: en.meta.descripcion,
});

export default function HomePageEn() {
  return <PaginaHome idioma="en" />;
}
