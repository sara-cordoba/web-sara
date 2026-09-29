// La traducción al catalán del contenido que vive en src/data/.
//
// Funciona exactamente igual que contenido-en.ts (ver la explicación allí):
// cada lista se recorre SIEMPRE por la española y de aquí solo se saca la
// traducción de cada elemento. Si falta una clave, ese elemento sale en
// español en la web catalana.
//
// AL AÑADIR UN PROYECTO, UN TESTIMONIO O UNA PIEZA en src/data/, añade aquí
// su traducción con la misma clave que en contenido-en.ts.

import type { Pieza } from "@/data/galeria";
import type { Testimonio } from "@/data/testimonios";
import type { Work } from "@/data/v3";

// ---------------------------------------------------------------------------
// Fichas de proyecto — la clave es el título, que no se traduce nunca.
// ---------------------------------------------------------------------------

type TrabajoCa = Partial<
  Pick<Work, "year" | "type" | "necesitaba" | "hice" | "resultado">
>;

export const TRABAJOS_CA: Record<string, TrabajoCa> = {
  "Cronos AI Consulting": {
    year: "2025 — ACTUALITAT",
    type: "Marca · Web · Contingut",
    necesitaba: "No tenia ni marca, ni web, ni xarxes.",
    hice: "Identitat visual completa, web corporativa bilingüe, contingut i automatització de processos amb IA.",
    resultado:
      "128 vídeos produïts i editats per mi per al canal de YouTube.",
  },
  GPAthletes: {
    type: "Identitat · Xarxes · Contingut",
    necesitaba: "Presència constant a les xarxes i una identitat reconeixible.",
    hice: "Creació de contingut, edició de reels i suport en branding, traduint els seus missatges estratègics en peces visuals.",
    resultado:
      "7 mesos de contingut continuat, de febrer a agost de 2026.",
  },
  "Ser Annora": {
    type: "Web",
    necesitaba:
      "Una landing per promocionar el seu curs en línia de teràpia.",
    hice: "La vaig dissenyar i desenvolupar a WordPress amb Elementor: estructura, organització del contingut, disseny responsive i experiència d'usuari.",
    resultado: "Lliurada el juny de 2026 i en ús des d'aleshores.",
  },
  "AJE Madrid": {
    type: "Esdeveniments · Gràfica · Contingut",
    necesitaba:
      "Materials gràfics per als seus esdeveniments presencials i accions de comunicació.",
    hice: "Cartells, mailing, presentacions i peces per a xarxes, amb coherència visual i adaptades a cada canal.",
    resultado:
      "Materials per a diversos esdeveniments entre març i maig de 2026.",
  },
  "Ajedrez Sistémico": {
    type: "Web",
    necesitaba:
      "Una web per a un projecte de teràpia amb un enfocament formatiu, fàcil de navegar i alineada amb el seu mètode.",
    hice: "La vaig dissenyar i desenvolupar a WordPress: estructura de pàgina, organització del contingut i adaptació visual de la marca.",
    resultado: "Lliurada el febrer de 2026.",
    // Sense enllaç, igual que en castellà: el client no autoritza publicar
    // la URL. Aquí no se n'afegeix cap.
  },
  "Develand Academia": {
    type: "Edició de vídeo",
    necesitaba: "Muntar les peces d'una campanya publicitària.",
    hice: "Edició de vídeo: ritme, talls, subtítols i estructura narrativa, adaptada a formats digitals i xarxes.",
    resultado: "Campanya lliurada el gener de 2026.",
  },
  WakandIA: {
    type: "Identitat · Web · Contingut",
    necesitaba:
      "Una marca educativa des de zero, vinculada a Cronos AI Consulting, per ensenyar intel·ligència artificial de manera accessible.",
    hice: "Identitat visual i branding, to de comunicació, estructura web, continguts per a xarxes i materials gràfics.",
    resultado:
      "Marca construïda sencera en cinc mesos, d'abril a agost de 2025.",
  },
};

export function trabajoCa(w: Work): Work {
  const traduccion = TRABAJOS_CA[w.title];
  return traduccion ? { ...w, ...traduccion } : w;
}

// ---------------------------------------------------------------------------
// Servicios — la clave es el número, que no cambia.
// ---------------------------------------------------------------------------

type Servicio = { title: string; sub: string; items: string[] };

export const SERVICIOS_CA: Record<string, Servicio> = {
  "01": {
    title: "Disseny & Producte",
    sub: "Web · Disseny · Marca",
    items: [
      "Webs a mida — WordPress i Elementor, o desenvolupament propi si el projecte ho demana",
      "Disseny d'interfície i experiència",
      "Sistemes de marca complets",
    ],
  },
  "02": {
    title: "Contingut & Comunicació",
    sub: "Xarxes · Copy · Missatge",
    items: [
      "Estratègia i producció per a Instagram, TikTok, LinkedIn i YouTube",
      "Copys que connecten i posicionen",
      "Missatge i storytelling",
    ],
  },
  "03": {
    title: "Edició de vídeos",
    sub: "Edició · Narrativa · Motion",
    items: [
      "CapCut · Motion graphics",
      "Color, ritme i narrativa ben cuidats",
      "Reels, after-movies, videopodcasts",
    ],
  },
  "04": {
    title: "Direcció creativa",
    sub: "Gestió del projecte",
    items: [
      "Coordino tot l'equip: disseny, desenvolupament, contingut",
      "Marco objectius, terminis i lliuraments",
      "Tu no gestiones, tu decideixes",
    ],
  },
};

export function servicioCa<T extends { icon: string }>(s: T): T {
  const traduccion = SERVICIOS_CA[s.icon];
  return traduccion ? { ...s, ...traduccion } : s;
}

// ---------------------------------------------------------------------------
// Testimonios — la clave es el texto español entero (ver contenido-en.ts).
// Son citas de clientes, traducidas. La provincia no se traduce.
// ---------------------------------------------------------------------------

type TestimonioCa = { texto: string; trabajo: string };

export const TESTIMONIOS_CA: Record<string, TestimonioCa> = {
  "Muy confiable y profesional. Teníamos muchas dudas en cómo transmitir en nuestra web el concepto de nuestro negocio y no sabíamos por dónde empezar. Sara nos ayudó mucho y, después de una reunión, entendió lo que queríamos hacer desde el principio. Muy recomendable.":
    {
      texto:
        "Molt fiable i professional. Teníem molts dubtes sobre com transmetre a la nostra web el concepte del nostre negoci i no sabíem per on començar. La Sara ens va ajudar molt i, després d'una reunió, va entendre el que volíem fer des del principi. Molt recomanable.",
      trabajo: "Client de disseny web",
    },
  "Sara me ayudó a reconstruir mi marca. Estaba muy perdida, deambulando entre varias ideas, y eso hacía que no terminase de arrancar mi proyecto. Gracias a ella creamos el branding completo para mis redes sociales, e incluso hizo un calendario de publicaciones con plantillas reutilizables: ya no tengo que crear mi contenido desde cero.":
    {
      texto:
        "La Sara em va ajudar a reconstruir la meva marca. Estava molt perduda, donant voltes a diverses idees, i això feia que el meu projecte no acabés d'arrencar. Gràcies a ella vam crear el branding complet per a les meves xarxes socials, i fins i tot va fer un calendari de publicacions amb plantilles reutilitzables: ja no he de crear el meu contingut des de zero.",
      trabajo: "Client de marca i contingut",
    },
  "Es mi persona de confianza total. Delego mis redes sociales en ella y sabe bien lo que quiero comunicar y expresar. Es puntual y muy responsable.":
    {
      texto:
        "És la meva persona de confiança total. Li delego les xarxes socials i sap bé què vull comunicar i expressar. És puntual i molt responsable.",
      trabajo: "Client de gestió de xarxes socials",
    },
  "Nos ha editado todos los cursos de nuestra web y desde el inicio nos presentó la propuesta y los plazos. Me he sentido en confianza en todo momento porque nos ha estado informando de cada avance. Es una persona cercana y muy comprometida con su trabajo.":
    {
      texto:
        "Ens ha editat tots els cursos de la nostra web i des del principi ens va presentar la proposta i els terminis. M'he sentit en confiança en tot moment perquè ens ha anat informant de cada avenç. És una persona propera i molt compromesa amb la seva feina.",
      trabajo: "Client d'edició de vídeo",
    },
};

export function testimonioCa(t: Testimonio): Testimonio {
  const traduccion = TESTIMONIOS_CA[t.texto];
  return traduccion ? { ...t, ...traduccion } : t;
}

/** La línea que va encima del carrusel. */
export const ALCANCE_CA =
  "Treballo en remot amb clients i empreses d'arreu d'Espanya.";

// ---------------------------------------------------------------------------
// Galería — la clave es el nombre del archivo, que no cambia nunca.
// ---------------------------------------------------------------------------

type PiezaCa = { titulo: string; tipo: string; alt?: string };

export const GALERIA_CA: Record<string, PiezaCa> = {
  "folleto-campana-publicidad.mp4": {
    titulo: "Fullet de campanya",
    tipo: "Cartelleria",
  },
  "mockup-triptico.mp4": { titulo: "Tríptic", tipo: "Cartelleria" },
  "web-ser-annora.mp4": {
    titulo: "Ser Annora",
    tipo: "Web",
    alt: "Recorregut per la web de Ser Annora, de dalt a baix",
  },
  "web-cronos.mp4": {
    titulo: "Cronos AI Consulting",
    tipo: "Web",
    alt: "Recorregut per la web de Cronos AI Consulting, de dalt a baix",
  },
  "diseno-evento.mp4": {
    titulo: "Disseny d'esdeveniment",
    tipo: "Cartelleria",
  },
  "post-redes.webp": { titulo: "Post per a xarxes", tipo: "Xarxes socials" },
  "post-redes-2.webp": { titulo: "Post per a xarxes", tipo: "Xarxes socials" },
  "diseno-curso.mp4": { titulo: "Disseny de curs", tipo: "Xarxes socials" },
  "portada-triptico.mp4": {
    titulo: "Portada de tríptic",
    tipo: "Cartelleria",
  },
};

export function piezaCa(p: Pieza): Pieza {
  const traduccion = GALERIA_CA[p.archivo];
  // Mismo motivo que en piezaEn: el tipo traducido no está en CATEGORIAS.
  return traduccion ? ({ ...p, ...traduccion } as Pieza) : p;
}
