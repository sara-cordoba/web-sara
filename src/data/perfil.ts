// Contenido de /perfil — la página que se enlaza desde el CV y desde LinkedIn.
// La lee quien contrata, no quien compra: aquí no hay precios, ni paquetes,
// ni llamadas a la acción de venta.

export const CABECERA = {
  nombre: "Sara Córdoba",
  titular:
    "Marketing digital · Content Manager · Social Media · Diseño y desarrollo web",
  busqueda:
    "Busco incorporarme a un equipo estable donde sostener una estrategia de contenido en el tiempo. 100 % remoto o híbrido en Cataluña.",
};

export const PERFIL_PROFESIONAL =
  "Responsable de marketing y contenido digital con dos años de experiencia, trabajando como autónoma desde 2025 para cartera propia de clientes. He llevado sola toda la presencia digital de una startup B2B desde cero: identidad de marca, estrategia y calendario de contenido, redes sociales, web corporativa bilingüe y automatización de procesos con IA. El canal de YouTube que gestioné pasó de 0 a 12.500 suscriptores en 17 meses con 128 vídeos producidos por mí. Vengo del desarrollo web, así que además de diseñar la web la construyo.";

export type Puesto = {
  puesto: string;
  empresa: string;
  fechas: string;
  contexto?: string;
  /** Una o dos líneas. Salen de las fichas de proyecto. */
  descripcion?: string;
};

export const EXPERIENCIA: Puesto[] = [
  {
    puesto: "Responsable de marketing y contenido digital",
    empresa: "Cronos AI Consulting",
    fechas: "abr. 2025 – actualidad",
    contexto: "Remoto",
    descripcion:
      "Entré cuando no había ni marca, ni web, ni redes: identidad visual completa, web corporativa bilingüe, contenido y automatización de procesos con IA. El canal de YouTube pasó de 0 a 12.500 suscriptores en 17 meses, con 128 vídeos producidos y editados por mí.",
  },
  {
    puesto: "Social Media Manager y diseño de marca",
    empresa: "GPAthletes",
    fechas: "feb. 2026 – ago. 2026",
    contexto: "Remoto · Cliente propio",
    descripcion:
      "Necesitaban presencia constante en redes y una identidad reconocible: creación de contenido, edición de reels y apoyo en branding, traduciendo sus mensajes estratégicos a piezas visuales. Siete meses de contenido continuado.",
  },
  {
    puesto: "Diseñadora gráfica",
    empresa: "AJE Madrid",
    fechas: "mar. 2026 – may. 2026",
    contexto: "Remoto · Cliente propio",
    descripcion:
      "Materiales gráficos para sus eventos presenciales y acciones de comunicación: cartelería, mailing, presentaciones y piezas para redes, con coherencia visual y adaptadas a cada canal.",
  },
  {
    puesto: "Diseñadora y desarrolladora web",
    empresa: "Ser Annora",
    fechas: "may. 2026 – jun. 2026",
    contexto: "Remoto · Cliente propio",
    descripcion:
      "Landing para promocionar su curso online de terapia, diseñada y desarrollada en WordPress con Elementor: estructura, organización del contenido, versión móvil y experiencia de usuario. Entregada en junio y en uso desde entonces.",
  },
  {
    puesto: "Diseñadora y desarrolladora web",
    empresa: "Ajedrez Sistémico",
    fechas: "ene. 2026 – feb. 2026",
    contexto: "Remoto · Cliente propio",
    descripcion:
      "Web para un proyecto de terapia con enfoque formativo, clara de navegar y alineada con su método: estructura de página, organización del contenido y adaptación visual de la marca. Entregada en febrero.",
  },
  {
    puesto: "Editora de vídeo",
    empresa: "Develand Academia",
    fechas: "dic. 2025 – ene. 2026",
    contexto: "Remoto · Cliente propio",
    descripcion:
      "Montaje de las piezas de una campaña publicitaria: ritmo, cortes, subtítulos y estructura narrativa, adaptados a formatos digitales y redes. Campaña entregada en enero.",
  },
  {
    puesto: "Desarrolladora front-end junior (prácticas)",
    empresa: "Aqua Connect",
    fechas: "jun. 2024 – mar. 2025",
    contexto: "Remoto",
    descripcion:
      "Desarrollo web sobre Odoo v17: integración de OpenStreetMap para mapas interactivos, vinculación automatizada de contactos y direcciones, y mejoras de interfaz. Única etapa en entorno de empresa.",
  },
];

export const HERRAMIENTAS: { grupo: string; items: string }[] = [
  {
    grupo: "Marketing y contenido",
    items:
      "Estrategia de contenido, calendario editorial, redes (Instagram, LinkedIn, TikTok, YouTube), copywriting, SEO, email marketing",
  },
  {
    grupo: "Diseño",
    items: "Identidad visual, diseño gráfico, UX/UI, Figma, Canva",
  },
  {
    grupo: "Audiovisual",
    items: "Edición de vídeo, reels, shorts, subtitulado, miniaturas, CapCut",
  },
  {
    grupo: "Desarrollo web",
    items:
      "WordPress, Elementor, Odoo v17, Angular, TypeScript, JavaScript, HTML5, CSS3, SCSS, Git",
  },
  {
    grupo: "IA aplicada",
    items:
      "Claude, Claude Code, ChatGPT. Automatización de procesos, generación de contenido, documentación operativa",
  },
  {
    grupo: "Gestión",
    items: "Notion, bases de datos y documentación de procesos",
  },
];

// No hay titulación universitaria: es formación en cursos y se enseña como tal,
// con la plataforma y el año a la vista.
export const FORMACION: { titulo: string; centro: string; anios: string }[] = [
  { titulo: "Diseño UX/UI y Figma", centro: "Udemy", anios: "2026" },
  { titulo: "Claude Code, curso completo", centro: "Udemy", anios: "2026" },
  {
    titulo: "Canva: diseño, redes sociales, branding e IA",
    centro: "Udemy",
    anios: "2026",
  },
  { titulo: "Marketing Digital", centro: "HubSpot Academy", anios: "2025" },
  { titulo: "SEO, curso completo", centro: "Udemy", anios: "2025" },
  {
    titulo: "Máster en JavaScript (JavaScript, jQuery, Angular, Node)",
    centro: "Udemy",
    anios: "2024",
  },
  { titulo: "Angular desde cero", centro: "Sergie Code", anios: "2024" },
];

/** Va en letra pequeña debajo de la lista de cursos. */
export const FORMACION_OTRA =
  "Otra formación técnica: Node.js con Express, MongoDB, PostgreSQL y Docker · Desarrollo web (HTML5, CSS3, JavaScript, PHP, MySQL) · CSS3, Flexbox y CSS Grid · Git y GitHub · Lógica de programación (2023-2024)";

export const IDIOMAS = [
  { idioma: "Castellano", nivel: "Nativo" },
  { idioma: "Catalán", nivel: "Nativo" },
  { idioma: "Inglés", nivel: "Básico" },
];

/** El PDF va en public/. El botón solo sale si el archivo existe de verdad. */
export const CV_PDF = "/CV_Sara_Cordoba_ES.pdf";
