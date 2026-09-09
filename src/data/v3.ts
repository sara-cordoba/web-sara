export const SOLUTIONS = [
  {
    icon: "01",
    title: "Diseño & Producto",
    sub: "Web · Diseño · Marca",
    items: [
      "Webs a medida — WordPress y Elementor, o desarrollo propio si el proyecto lo pide",
      "Diseño de interfaz y experiencia",
      "Sistemas de marca completos",
    ],
  },
  {
    icon: "02",
    title: "Contenido & Comunicación",
    sub: "Redes · Copy · Mensaje",
    items: [
      "Estrategia y producción para Instagram, TikTok, LinkedIn y YouTube",
      "Copys que conectan y posicionan",
      "Mensaje y storytelling",
    ],
  },
  {
    icon: "03",
    title: "Edición de vídeos",
    sub: "Edición · Narrativa · Motion",
    items: [
      "CapCut · Motion graphics",
      "Color, ritmo y narrativa cuidados",
      "Reels, after-movies, vídeo-podcasts",
    ],
  },
  {
    icon: "04",
    title: "Dirección creativa",
    sub: "Gestión del proyecto",
    items: [
      "Coordino a todo el equipo: diseño, desarrollo, contenido",
      "Marco objetivos, plazos y entregas",
      "Tú no gestionas, tú decides",
    ],
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    body: "Hablamos. Entiendo tu negocio, tu cliente y por qué ahora. Sin compromiso, sin venta dura.",
  },
  {
    n: "02",
    title: "Propuesta",
    body: "Te entrego una propuesta clara: qué construyo, en qué tiempos, con qué presupuesto y qué resultado esperar.",
  },
  {
    n: "03",
    title: "Ejecución",
    body: "Diseño, programo, edito y/o coordino. Tú revisas en hitos. Sin sorpresas, sin emails de relleno.",
  },
];

export type Work = {
  title: string;
  year: string;
  type: string;
  logo?: string;
  logoBg?: string;
  logoFill?: boolean;
  /** Las tres líneas de cada ficha. */
  necesitaba: string;
  hice: string;
  resultado: string;
  /** Enlace a la web en vivo, solo si existe y el cliente autoriza enseñarla. */
  url?: string;
};


// ORDEN: de más reciente a más antiguo por fecha de fin, con una excepción
// fija: Cronos AI Consulting va SIEMPRE primero. Es el único proyecto en
// curso y el más importante, así que no entra en el orden por fecha.
// Al añadir una ficha nueva, colócala por su fecha de fin y no delante de
// Cronos.
export const WORKS: Work[] = [
  {
    title: "Cronos AI Consulting",
    year: "2025 — ACTUAL",
    type: "Marca · Web · Contenido",
    logo: "/img/cronos.png",
    logoBg: "#000",
    logoFill: true,
    necesitaba: "No tenía ni marca, ni web, ni redes.",
    hice: "Identidad visual completa, web corporativa bilingüe, contenido y automatización de procesos con IA.",
    resultado:
      "El canal de YouTube pasó de 0 a 12.500 suscriptores en 17 meses, con 128 vídeos producidos y editados por mí.",
    // Se enlaza a la www a propósito: el dominio sin www está sin certificado
    // y no conecta. Mismo motivo que en la burbuja de Nika (src/data/chatbot.ts).
    url: "https://www.cronosaiconsulting.com/",
  },
  {
    title: "GPAthletes",
    year: "2026",
    type: "Identidad · Redes · Contenido",
    logo: "/img/gpathletes.jpg",
    logoBg: "#bfe0e5",
    logoFill: true,
    necesitaba: "Presencia constante en redes y una identidad reconocible.",
    hice: "Creación de contenido, edición de reels y apoyo en branding, traduciendo sus mensajes estratégicos a piezas visuales.",
    resultado:
      "7 meses de contenido continuado, de febrero a agosto de 2026.",
  },
  {
    title: "Ser Annora",
    year: "2026",
    type: "Web",
    // El símbolo de Annora, en su marrón de marca sobre su crema. Va solo el
    // símbolo y no el logo entero porque el hueco es de 54 px: con la palabra
    // al lado, "Centro Holístico" queda en una mancha ilegible.
    logo: "/img/annora.webp",
    logoBg: "#f2ece3",
    necesitaba:
      "Una landing para promocionar su curso online de terapia.",
    hice: "La diseñé y desarrollé en WordPress con Elementor: estructura, organización del contenido, diseño responsive y experiencia de usuario.",
    resultado: "Entregada en junio de 2026 y en uso desde entonces.",
    url: "https://annora.es/ser-annora-aprender-a-parar/",
  },
  {
    title: "AJE Madrid",
    year: "2026",
    type: "Eventos · Gráfica · Contenido",
    logo: "/img/aje-madrid.png",
    logoBg: "#fff",
    necesitaba:
      "Materiales gráficos para sus eventos presenciales y acciones de comunicación.",
    hice: "Cartelería, mailing, presentaciones y piezas para redes, con coherencia visual y adaptadas a cada canal.",
    resultado:
      "Materiales para varios eventos entre marzo y mayo de 2026.",
  },
  {
    title: "Ajedrez Sistémico",
    year: "2026",
    type: "Web",
    logo: "/img/guillermo-amor.png",
    logoBg: "#000",
    necesitaba:
      "Una web para un proyecto de terapia con enfoque formativo, clara de navegar y alineada con su método.",
    hice: "La diseñé y desarrollé en WordPress: estructura de página, organización del contenido y adaptación visual de la marca.",
    resultado: "Entregada en febrero de 2026.",
    // SIN ENLACE, y no es un olvido: el cliente NO autoriza publicar la URL.
    // No se enlaza ni se busca. Si alguien la pide, la respuesta es que no.
  },
  {
    title: "Develand Academia",
    year: "2026",
    type: "Edición de vídeo",
    logo: "/img/develand.png",
    logoBg: "#0e1a2b",
    necesitaba: "Montar las piezas de una campaña publicitaria.",
    hice: "Edición de vídeo: ritmo, cortes, subtítulos y estructura narrativa, adaptada a formatos digitales y redes.",
    resultado: "Campaña entregada en enero de 2026.",
  },
];
