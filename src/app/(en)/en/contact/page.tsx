import type { Metadata } from "next";
import PaginaContacto from "@/components/PaginaContacto";
import { en } from "@/i18n/en";
import { metaPagina } from "@/i18n/seo";

export const metadata: Metadata = metaPagina({
  idioma: "en",
  ruta: "/en/contact",
  titulo: en.contactoPagina.meta.titulo,
  descripcion: en.contactoPagina.meta.descripcion,
});

export default function ContactPage() {
  return <PaginaContacto idioma="en" />;
}
