import type { MetadataRoute } from "next";
import { DOMINIO } from "@/i18n/config";

// /robots.txt: todo se puede rastrear, y aquí está el mapa de la web.
// El CV en PDF no se bloquea aquí sino con X-Robots-Tag en netlify.toml:
// si se bloqueara aquí, Google no podría leer el "noindex" y podría acabar
// listando la URL igualmente.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${DOMINIO}/sitemap.xml`,
    host: DOMINIO,
  };
}
