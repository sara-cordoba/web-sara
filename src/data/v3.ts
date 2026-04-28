export const SOLUTIONS = [
  {
    icon: "01",
    title: "Diseño & Producto",
    sub: "Web · UI/UX · Branding",
    items: [
      "Webs en React, Angular u Odoo",
      "Diseño de interfaz y experiencia",
      "Sistemas de marca completos",
    ],
  },
  {
    icon: "02",
    title: "Contenido & Comunicación",
    sub: "Redes · Copy · Mensaje",
    items: [
      "Estrategia y producción para Instagram, TikTok y LinkedIn",
      "Copys que conectan y posicionan",
      "Mensaje y storytelling",
    ],
  },
  {
    icon: "03",
    title: "Vídeo & Motion",
    sub: "Audiovisual de marca",
    items: [
      "CapCut · Motion graphics",
      "Color, ritmo y narrativa cuidados",
      "Reels, after-movies, vídeo-podcasts",
    ],
  },
  {
    icon: "04",
    title: "Dirección creativa",
    sub: "COO · CMO · Project lead",
    items: [
      "Coordinación de creativos, devs y partners",
      "Briefs, roadmap y entregables claros",
      "Que todo llegue a tiempo y sin perder el alma",
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
  placeholder?: boolean;
};

export const WORKS: Work[] = [
  {
    title: "Cronos AI Consulting",
    year: "2025",
    type: "Brand · Web",
    logo: "/img/cronos.jpg",
    logoBg: "#000",
  },
  {
    title: "GPAthletes",
    year: "2025",
    type: "Identidad · Redes",
    logo: "/img/gpathletes.jpg",
    logoBg: "#bfe0e5",
    logoFill: true,
  },
  {
    title: "Develand",
    year: "2024",
    type: "Web · Producto",
    logo: "/img/develand.png",
    logoBg: "#0e1a2b",
  },
  {
    title: "Guillermo Amor",
    year: "2024",
    type: "Personal brand",
    logo: "/img/guillermo-amor.png",
    logoBg: "#000",
  },
  {
    title: "AJE Madrid",
    year: "2024",
    type: "Eventos · Vídeo",
    logo: "/img/aje-madrid.png",
    logoBg: "#fff",
  },
  {
    title: "October Hollow Studio",
    year: "2025",
    type: "Próximamente",
    placeholder: true,
  },
];
