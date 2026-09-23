import type { Metadata } from "next";
import PaginaContacto from "@/components/PaginaContacto";
import { en } from "@/i18n/en";
import { alternativas } from "@/i18n/config";

export const metadata: Metadata = {
  title: en.contactoPagina.meta.titulo,
  description: en.contactoPagina.meta.descripcion,
  alternates: alternativas("/contacto", "en"),
};

export default function ContactPage() {
  return <PaginaContacto idioma="en" />;
}
