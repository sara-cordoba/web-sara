import type { Metadata } from "next";
import PaginaContacto from "@/components/PaginaContacto";
import { metaPagina } from "@/i18n/seo";
import { es } from "@/i18n/es";

export const metadata: Metadata = metaPagina({
  idioma: "es",
  ruta: "/contacto",
  titulo: es.contactoPagina.meta.titulo,
  descripcion: es.contactoPagina.meta.descripcion,
});

export default function ContactoPage() {
  return <PaginaContacto idioma="es" />;
}
