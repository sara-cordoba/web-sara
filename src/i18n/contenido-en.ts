// La traducción al inglés del contenido que vive en src/data/.
//
// POR QUÉ ESTÁ AQUÍ Y NO ALLÍ: src/data/ es la fuente en español y se queda
// tal cual. Así se puede añadir un proyecto, un testimonio o una pieza de
// galería sin tocar nada del inglés, y el README sigue diciendo la verdad
// sobre dónde están los textos.
//
// CÓMO FUNCIONA: cada lista se recorre SIEMPRE por la española, y de aquí
// solo se saca la traducción de cada elemento. Si falta una clave, ese
// elemento sale en español en la web inglesa. Es feo, pero es mucho mejor
// que desaparecer de la página o romper la construcción.
//
// AL AÑADIR UN PROYECTO NUEVO en src/data/v3.ts, añade aquí su traducción
// con el mismo título. Mientras no lo hagas, la ficha se ve en español.

import type { Pieza } from "@/data/galeria";
import type { Testimonio } from "@/data/testimonios";
import type { Work } from "@/data/v3";

// ---------------------------------------------------------------------------
// Fichas de proyecto — la clave es el título, que no se traduce nunca.
// ---------------------------------------------------------------------------

type TrabajoEn = Partial<
  Pick<Work, "year" | "type" | "necesitaba" | "hice" | "resultado">
>;

export const TRABAJOS_EN: Record<string, TrabajoEn> = {
  "Cronos AI Consulting": {
    year: "2025 — PRESENT",
    type: "Brand · Web · Content",
    necesitaba: "No brand, no website, no social media.",
    hice: "Full visual identity, bilingual corporate website, content, and process automation with AI.",
    // 12.500 en español es 12,500 en inglés. El número es el mismo.
    resultado:
      "The YouTube channel went from 0 to 12,500 subscribers in 17 months, with 128 videos produced and edited by me.",
  },
  GPAthletes: {
    type: "Brand identity · Social media · Content",
    necesitaba: "A steady presence on social media and a recognisable identity.",
    hice: "Content creation, reel editing and branding support, turning their strategic messages into visual pieces.",
    resultado:
      "Seven months of continuous content, from February to August 2026.",
  },
  "Ser Annora": {
    type: "Web",
    necesitaba: "A landing page to promote their online therapy course.",
    hice: "Designed and built in WordPress with Elementor: structure, content organisation, responsive design and user experience.",
    resultado: "Delivered in June 2026 and in use ever since.",
  },
  "AJE Madrid": {
    type: "Events · Graphic design · Content",
    necesitaba:
      "Graphic materials for their in-person events and communication campaigns.",
    hice: "Posters, mailings, presentations and social media pieces, visually consistent and adapted to each channel.",
    resultado: "Materials for several events between March and May 2026.",
  },
  "Ajedrez Sistémico": {
    type: "Web",
    necesitaba:
      "A website for a therapy project with a teaching focus: easy to navigate and aligned with their method.",
    hice: "Designed and built in WordPress: page structure, content organisation and visual adaptation of the brand.",
    resultado: "Delivered in February 2026.",
    // Sigue sin enlace, igual que en español: el cliente no autoriza
    // publicar la URL. Aquí no se añade ninguna.
  },
  "Develand Academia": {
    type: "Video editing",
    necesitaba: "Editing the pieces for an advertising campaign.",
    hice: "Video editing: pacing, cuts, subtitles and narrative structure, adapted to digital and social formats.",
    resultado: "Campaign delivered in January 2026.",
  },
  WakandIA: {
    type: "Brand identity · Web · Content",
    necesitaba:
      "An education brand from scratch, linked to Cronos AI Consulting, to teach artificial intelligence in an accessible way.",
    hice: "Visual identity and branding, tone of voice, site structure, social media content and graphic materials.",
    resultado:
      "A complete brand built in five months, from April to August 2025.",
  },
};

export function trabajoEn(w: Work): Work {
  const traduccion = TRABAJOS_EN[w.title];
  return traduccion ? { ...w, ...traduccion } : w;
}

// ---------------------------------------------------------------------------
// Servicios — la clave es el número, que no cambia.
// ---------------------------------------------------------------------------

type Servicio = { title: string; sub: string; items: string[] };

export const SERVICIOS_EN: Record<string, Servicio> = {
  "01": {
    title: "Design & Product",
    sub: "Web · Design · Brand",
    items: [
      "Custom websites — WordPress and Elementor, or custom development if the project calls for it",
      "UI and UX design",
      "Complete brand systems",
    ],
  },
  "02": {
    title: "Content & Communication",
    sub: "Social · Copy · Message",
    items: [
      "Strategy and production for Instagram, TikTok, LinkedIn and YouTube",
      "Copy that connects and positions you",
      "Messaging and storytelling",
    ],
  },
  "03": {
    title: "Video editing",
    sub: "Editing · Narrative · Motion",
    items: [
      "CapCut · Motion graphics",
      "Careful colour, pacing and narrative",
      "Reels, after-movies, video podcasts",
    ],
  },
  "04": {
    title: "Creative direction",
    sub: "Project management",
    items: [
      "I coordinate the whole team: design, development, content",
      "I set the goals, the deadlines and the deliverables",
      "You don't manage, you decide",
    ],
  },
};

export function servicioEn<T extends { icon: string }>(s: T): T {
  const traduccion = SERVICIOS_EN[s.icon];
  return traduccion ? { ...s, ...traduccion } : s;
}

// ---------------------------------------------------------------------------
// Testimonios.
//
// La clave es el texto español entero. Es largo, sí, pero es lo único que
// identifica a un testimonio sin lugar a dudas: no hay nombres (los clientes
// no quieren salir) y el trabajo y la provincia se pueden repetir.
//
// Son citas literales de clientes, traducidas para que se entiendan. La
// provincia no se traduce: es un nombre propio.
// ---------------------------------------------------------------------------

type TestimonioEn = { texto: string; trabajo: string };

export const TESTIMONIOS_EN: Record<string, TestimonioEn> = {
  "Muy confiable y profesional. Teníamos muchas dudas en cómo transmitir en nuestra web el concepto de nuestro negocio y no sabíamos por dónde empezar. Sara nos ayudó mucho y, después de una reunión, entendió lo que queríamos hacer desde el principio. Muy recomendable.":
    {
      texto:
        "Reliable and professional. We had a lot of doubts about how to get the concept of our business across on our website, and we didn't know where to start. Sara helped us a great deal and, after a single meeting, she understood what we wanted to do. Highly recommended.",
      trabajo: "Web design client",
    },
  "Sara me ayudó a reconstruir mi marca. Estaba muy perdida, deambulando entre varias ideas, y eso hacía que no terminase de arrancar mi proyecto. Gracias a ella creamos el branding completo para mis redes sociales, e incluso hizo un calendario de publicaciones con plantillas reutilizables: ya no tengo que crear mi contenido desde cero.":
    {
      texto:
        "Sara helped me rebuild my brand. I was lost, drifting between several ideas, and my project never quite got off the ground. Together we created the full branding for my social media, and she even built a posting calendar with reusable templates: I no longer have to create my content from scratch.",
      trabajo: "Brand and content client",
    },
  "Es mi persona de confianza total. Delego mis redes sociales en ella y sabe bien lo que quiero comunicar y expresar. Es puntual y muy responsable.":
    {
      texto:
        "She is the person I trust completely. I hand my social media over to her and she knows exactly what I want to say. She is punctual and very dependable.",
      trabajo: "Social media management client",
    },
  "Nos ha editado todos los cursos de nuestra web y desde el inicio nos presentó la propuesta y los plazos. Me he sentido en confianza en todo momento porque nos ha estado informando de cada avance. Es una persona cercana y muy comprometida con su trabajo.":
    {
      texto:
        "She edited every course on our website, and she set out the proposal and the timeline from the start. I felt confident the whole way through because she kept us posted on every step. She is approachable and genuinely committed to her work.",
      trabajo: "Video editing client",
    },
};

export function testimonioEn(t: Testimonio): Testimonio {
  const traduccion = TESTIMONIOS_EN[t.texto];
  return traduccion ? { ...t, ...traduccion } : t;
}

/** La línea que va encima del carrusel. */
export const ALCANCE_EN =
  "I work remotely with clients and companies across Spain.";

// ---------------------------------------------------------------------------
// Galería — la clave es el nombre del archivo, que no cambia nunca.
// ---------------------------------------------------------------------------

type PiezaEn = { titulo: string; tipo: string; alt?: string };

export const GALERIA_EN: Record<string, PiezaEn> = {
  "folleto-campana-publicidad.mp4": {
    titulo: "Campaign brochure",
    tipo: "Print & posters",
  },
  "mockup-triptico.mp4": {
    titulo: "Trifold brochure",
    tipo: "Print & posters",
  },
  "web-ser-annora.mp4": {
    titulo: "Ser Annora",
    tipo: "Web",
    alt: "Walkthrough of the Ser Annora website, top to bottom",
  },
  "web-cronos.mp4": {
    titulo: "Cronos AI Consulting",
    tipo: "Web",
    alt: "Walkthrough of the Cronos AI Consulting website, top to bottom",
  },
  "diseno-evento.mp4": { titulo: "Event design", tipo: "Print & posters" },
  "post-redes.webp": { titulo: "Social media post", tipo: "Social media" },
  "post-redes-2.webp": { titulo: "Social media post", tipo: "Social media" },
  "diseno-curso.mp4": { titulo: "Course design", tipo: "Social media" },
  "portada-triptico.mp4": {
    titulo: "Trifold cover",
    tipo: "Print & posters",
  },
};

export function piezaEn(p: Pieza): Pieza {
  const traduccion = GALERIA_EN[p.archivo];
  // El tipo español está acotado a la lista de CATEGORIAS; el inglés no puede
  // estarlo, así que se fuerza aquí. Solo se enseña, no se filtra por él.
  return traduccion ? ({ ...p, ...traduccion } as Pieza) : p;
}
