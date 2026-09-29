import type { MetadataRoute } from "next";
import { DOMINIO, EQUIVALENTES } from "@/i18n/config";

// El mapa de la web para Google: /sitemap.xml.
//
// Las páginas que existen en los dos idiomas salen de EQUIVALENTES, cada una
// con su pareja al lado, para que Google sepa cuál es la traducción de cuál.
// Las que solo existen en español van en SOLO_ES. Al crear una página nueva,
// va en uno de los dos sitios.
//
// Las legales no están a propósito: no le interesan a nadie que busque, y
// siguen siendo accesibles desde el pie.

const SOLO_ES = ["/perfil", "/webs-para-casas-rurales", "/recomienda"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pares = EQUIVALENTES.flatMap((par) => {
    const languages = {
      es: `${DOMINIO}${par.es}`,
      en: `${DOMINIO}${par.en}`,
    };
    return [
      { url: `${DOMINIO}${par.es}`, alternates: { languages } },
      { url: `${DOMINIO}${par.en}`, alternates: { languages } },
    ];
  });

  const soloEs = SOLO_ES.map((ruta) => ({ url: `${DOMINIO}${ruta}` }));

  return [...pares, ...soloEs];
}
