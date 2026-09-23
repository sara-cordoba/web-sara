import type { Metadata } from "next";
import PaginaHome from "@/components/PaginaHome";
import { alternativas } from "@/i18n/config";

// El título y la descripción los pone el layout. Aquí solo van las etiquetas
// hreflang que emparejan esta página con su versión inglesa.
export const metadata: Metadata = {
  alternates: alternativas("/", "es"),
};

export default function HomePage() {
  return <PaginaHome idioma="es" />;
}
