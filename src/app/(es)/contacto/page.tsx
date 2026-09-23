import type { Metadata } from "next";
import PaginaContacto from "@/components/PaginaContacto";
import { alternativas } from "@/i18n/config";

// Sin título propio: hereda el del layout, como hasta ahora.
export const metadata: Metadata = {
  alternates: alternativas("/contacto", "es"),
};

export default function ContactoPage() {
  return <PaginaContacto idioma="es" />;
}
