// Los metadatos de cada página, en un solo sitio.
//
// Cada página llama a metaPagina() con su ruta, su título y su descripción, y
// de ahí sale todo lo demás: canonical, hreflang (si la página existe en los
// dos idiomas), la tarjeta de Open Graph para LinkedIn o WhatsApp y la de
// Twitter/X. Así ninguna página se queda sin vista previa al compartirla.

import type { Metadata } from "next";
import { DOMINIO, EQUIVALENTES, alternativas, type Idioma } from "./config";

/** La imagen que sale al compartir un enlace. 1200 × 630, la medida estándar.
 *  Se generan a mano desde una plantilla HTML: si cambian los textos de
 *  arriba de la web, hay que volver a sacarlas. */
export const IMAGEN_COMPARTIR: Record<Idioma, { url: string; alt: string }> = {
  es: {
    url: "/og/sara-cordoba-es.jpg",
    alt: "Sara Córdoba · Diseño y desarrollo web, WordPress y branding",
  },
  en: {
    url: "/og/sara-cordoba-en.jpg",
    alt: "Sara Córdoba · Web design and development, WordPress and branding",
  },
};

const LOCALE: Record<Idioma, string> = { es: "es_ES", en: "en_GB" };

type Opciones = {
  idioma: Idioma;
  /** La ruta de ESTA página en su idioma: "/trabajos", "/en/work"... */
  ruta: string;
  titulo: string;
  descripcion: string;
  /** Solo si la tarjeta al compartir debe decir otra cosa que la página. */
  tituloCompartir?: string;
  descripcionCompartir?: string;
  tipo?: "website" | "profile";
};

export function metaPagina({
  idioma,
  ruta,
  titulo,
  descripcion,
  tituloCompartir = titulo,
  descripcionCompartir = descripcion,
  tipo = "website",
}: Opciones): Metadata {
  const par = EQUIVALENTES.find((p) => p[idioma] === ruta);
  const otro: Idioma = idioma === "es" ? "en" : "es";
  const imagen = IMAGEN_COMPARTIR[idioma];

  return {
    title: titulo,
    description: descripcion,
    // Con pareja en el otro idioma, canonical + hreflang; sin ella, solo
    // canonical: anunciar una versión que no existe es peor que no anunciarla.
    alternates: par
      ? alternativas(par.es, idioma)
      : { canonical: `${DOMINIO}${ruta}` },
    openGraph: {
      type: tipo,
      siteName: "Sara Córdoba",
      locale: LOCALE[idioma],
      ...(par ? { alternateLocale: [LOCALE[otro]] } : {}),
      url: `${DOMINIO}${ruta}`,
      title: tituloCompartir,
      description: descripcionCompartir,
      images: [{ url: imagen.url, width: 1200, height: 630, alt: imagen.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloCompartir,
      description: descripcionCompartir,
      images: [imagen.url],
    },
  };
}
