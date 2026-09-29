// Los tres idiomas de la web y el mapa de rutas entre ellos.
//
// El español es el idioma por defecto y vive en las rutas de siempre, sin
// prefijo: /trabajos, /contacto. El catalán va colgado de /ca y el inglés
// de /en.
//
// QUÉ HAY QUE TOCAR AL AÑADIR UNA PÁGINA EN LOS TRES IDIOMAS:
// una línea en EQUIVALENTES de aquí abajo. Con eso ya funcionan el selector
// de idioma de la cabecera, las etiquetas hreflang y el sitemap de esa página.

/** El orden es el del selector de la cabecera: ES · CA · EN. */
export const IDIOMAS = ["es", "ca", "en"] as const;

export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = "es";

/** Sin barra final. Se usa para las URLs absolutas de hreflang y canonical. */
export const DOMINIO = "https://saracordoba.com";

/**
 * Páginas que existen en los tres idiomas.
 *
 * Las que NO están aquí solo existen en español y es a propósito: /perfil
 * (el CV, con su PDF en español), /recomienda (el programa, con precios en
 * euros), /webs-para-casas-rurales (campaña para alojamientos españoles) y
 * las tres legales. Desde otro idioma, el selector lleva a su home.
 */
export const EQUIVALENTES: Record<Idioma, string>[] = [
  { es: "/", ca: "/ca", en: "/en" },
  { es: "/trabajos", ca: "/ca/treballs", en: "/en/work" },
  { es: "/contacto", ca: "/ca/contacte", en: "/en/contact" },
];

/** En qué idioma está una ruta. Todo lo que cuelga de /ca o /en es suyo. */
export function idiomaDe(ruta: string): Idioma {
  for (const idioma of IDIOMAS) {
    if (idioma === IDIOMA_POR_DEFECTO) continue;
    if (ruta === `/${idioma}` || ruta.startsWith(`/${idioma}/`)) return idioma;
  }
  return IDIOMA_POR_DEFECTO;
}

/**
 * La ruta de una página en el idioma pedido, a partir de la española.
 * enlace("/contacto", "ca") → "/ca/contacte". Para los enlaces de dentro de
 * la web: así ningún componente tiene que saberse las rutas de cada idioma.
 */
export function enlace(rutaEs: string, idioma: Idioma): string {
  const par = EQUIVALENTES.find((p) => p.es === rutaEs);
  return par ? par[idioma] : rutaEs;
}

/**
 * La misma página en otro idioma.
 * Si esa página no existe traducida, se va a la home del idioma pedido:
 * es preferible a dejar el botón muerto o a llevar a un 404.
 */
export function otraVersion(ruta: string, destino: Idioma): string {
  const origen = idiomaDe(ruta);
  if (origen === destino) return ruta;

  const par = EQUIVALENTES.find((p) => p[origen] === ruta);
  if (par) return par[destino];

  return EQUIVALENTES[0][destino];
}

/**
 * Las etiquetas hreflang y el canonical de una página, para el metadata de
 * Next. Se le pasa SIEMPRE la ruta española del par, que es la clave.
 *
 * Solo se emiten en las páginas que existen en los tres idiomas: anunciar
 * una versión que no existe es peor que no anunciar ninguna.
 */
export function alternativas(rutaEs: string, idioma: Idioma) {
  const par = EQUIVALENTES.find((p) => p.es === rutaEs);
  if (!par) return undefined;

  return {
    canonical: `${DOMINIO}${par[idioma]}`,
    languages: {
      ...idiomasDe(par),
      // Quien llega sin idioma claro, al español, que es el original.
      "x-default": `${DOMINIO}${par.es}`,
    },
  };
}

/** { es: "https://…/contacto", ca: "https://…/ca/contacte", en: … } */
export function idiomasDe(par: Record<Idioma, string>) {
  return Object.fromEntries(
    IDIOMAS.map((idioma) => [idioma, `${DOMINIO}${par[idioma]}`]),
  ) as Record<Idioma, string>;
}
