import { CONTACT_EMAIL } from "@/data/site";
import { DOMINIO, enlace, type Idioma } from "@/i18n/config";
import { textos } from "@/i18n";

/* Datos para Google en formato JSON-LD (schema.org): quién es Sara, a qué se
   dedica y dónde están sus perfiles. No se ven en la página; sirven para que
   Google entienda la web y pueda enseñar una ficha al buscar su nombre.

   REGLA: aquí solo va lo que ya está publicado en la web o en el CV. Nada de
   valoraciones, precios ni cifras: Google penaliza los datos que no se ven. */

const PERFILES = [
  "https://www.linkedin.com/in/sara-c%C3%B3rdoba-l%C3%A1zaro-b6a964309",
  "https://github.com/sara-cordoba",
];

const SABE_DE: Record<Idioma, string[]> = {
  es: [
    "Desarrollo web",
    "Diseño web",
    "WordPress",
    "Elementor",
    "Next.js",
    "Branding",
    "Identidad visual",
    "Diseño gráfico",
    "Contenido para redes sociales",
    "Edición de vídeo",
    "Chatbots con IA",
    "Automatización con IA",
  ],
  ca: [
    "Desenvolupament web",
    "Disseny web",
    "WordPress",
    "Elementor",
    "Next.js",
    "Branding",
    "Identitat visual",
    "Disseny gràfic",
    "Contingut per a xarxes socials",
    "Edició de vídeo",
    "Xatbots amb IA",
    "Automatització amb IA",
  ],
  en: [
    "Web development",
    "Web design",
    "WordPress",
    "Elementor",
    "Next.js",
    "Branding",
    "Visual identity",
    "Graphic design",
    "Social media content",
    "Video editing",
    "AI chatbots",
    "AI automation",
  ],
};

const PUESTO: Record<Idioma, string> = {
  es: "Diseñadora y desarrolladora web freelance",
  ca: "Dissenyadora i desenvolupadora web freelance",
  en: "Freelance web designer and developer",
};

export default function DatosEstructurados({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma);
  const inicio = idioma === "es" ? DOMINIO : `${DOMINIO}${enlace("/", idioma)}`;

  const datos = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${DOMINIO}/#web`,
        url: inicio,
        name: "Sara Córdoba",
        description: t.meta.descripcion,
        inLanguage: idioma,
        publisher: { "@id": `${DOMINIO}/#sara` },
      },
      {
        "@type": "Person",
        "@id": `${DOMINIO}/#sara`,
        name: "Sara Córdoba",
        alternateName: "Sara Córdoba Lázaro",
        url: inicio,
        image: `${DOMINIO}/img/sara.png`,
        jobTitle: PUESTO[idioma],
        description: t.about.lede,
        email: `mailto:${CONTACT_EMAIL}`,
        address: { "@type": "PostalAddress", addressCountry: "ES" },
        knowsAbout: SABE_DE[idioma],
        knowsLanguage: ["es", "ca", "en"],
        sameAs: PERFILES,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify no escapa "<": se cambia a mano para que ningún texto
      // pueda cerrar la etiqueta <script> antes de tiempo.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, "\\u003c"),
      }}
    />
  );
}
