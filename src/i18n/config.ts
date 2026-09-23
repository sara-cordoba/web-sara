// Los dos idiomas de la web y el mapa de rutas entre ellos.
//
// El español es el idioma por defecto y vive en las rutas de siempre, sin
// prefijo: /trabajos, /contacto. El inglés va colgado de /en.
//
// QUÉ HAY QUE TOCAR AL AÑADIR UNA PÁGINA EN LOS DOS IDIOMAS:
// una línea en EQUIVALENTES de aquí abajo. Con eso ya funcionan el selector
// de idioma de la cabecera y las etiquetas hreflang de esa página.

export const IDIOMAS = ["es", "en"] as const;

export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = "es";

/** Sin barra final. Se usa para las URLs absolutas de hreflang y canonical. */
export const DOMINIO = "https://saracordoba.com";

/**
 * Páginas que existen en los dos idiomas.
 *
 * Las que NO están aquí solo existen en español y es a propósito: /perfil
 * (el CV, con su PDF en español), /recomienda (el programa, con precios en
 * euros), /webs-para-casas-rurales (campaña para alojamientos españoles) y
 * las tres legales. Desde el inglés, el selector lleva a la home inglesa.
 */
export const EQUIVALENTES: { es: string; en: string }[] = [
  { es: "/", en: "/en" },
  { es: "/trabajos", en: "/en/work" },
  { es: "/contacto", en: "/en/contact" },
];

/** En qué idioma está una ruta. Todo lo que cuelga de /en es inglés. */
export function idiomaDe(ruta: string): Idioma {
  return ruta === "/en" || ruta.startsWith("/en/") ? "en" : "es";
}

/**
 * La misma página en el otro idioma.
 * Si esa página no existe traducida, se va a la home del idioma pedido:
 * es preferible a dejar el botón muerto o a llevar a un 404.
 */
export function otraVersion(ruta: string, destino: Idioma): string {
  const origen = idiomaDe(ruta);
  if (origen === destino) return ruta;

  const par = EQUIVALENTES.find((p) => p[origen] === ruta);
  if (par) return par[destino];

  return destino === "en" ? "/en" : "/";
}

/**
 * Las etiquetas hreflang y el canonical de una página, para el metadata de
 * Next. Se le pasa SIEMPRE la ruta española del par, que es la clave.
 *
 * Solo se emiten en las páginas que existen en los dos idiomas: anunciar una
 * versión inglesa que no existe es peor que no anunciar ninguna.
 */
export function alternativas(rutaEs: string, idioma: Idioma) {
  const par = EQUIVALENTES.find((p) => p.es === rutaEs);
  if (!par) return undefined;

  const actual = idioma === "en" ? par.en : par.es;

  return {
    canonical: `${DOMINIO}${actual}`,
    languages: {
      es: `${DOMINIO}${par.es}`,
      en: `${DOMINIO}${par.en}`,
      // Quien llega sin idioma claro, al español, que es el original.
      "x-default": `${DOMINIO}${par.es}`,
    },
  };
}
