import type { Metadata } from "next";
import PaginaContacto from "@/components/PaginaContacto";
import { ca } from "@/i18n/ca";
import { metaPagina } from "@/i18n/seo";

export const metadata: Metadata = metaPagina({
  idioma: "ca",
  ruta: "/ca/contacte",
  titulo: ca.contactoPagina.meta.titulo,
  descripcion: ca.contactoPagina.meta.descripcion,
});

export default function ContactePage() {
  return <PaginaContacto idioma="ca" />;
}
