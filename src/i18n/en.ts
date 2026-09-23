// Every piece of interface text in English.
//
// This file mirrors es.ts exactly. TypeScript enforces that: if a key is
// missing or misspelled, the build fails instead of shipping a Spanish
// string into the English site.
//
// TONE: plain professional English. Short sentences, industry words used the
// way the industry uses them, no inflated marketing. Client and project names
// are never translated.

import type { Diccionario } from "./es";

export const en: Diccionario = {
  meta: {
    titulo: "Sara Córdoba · Web development and branding",
    descripcion:
      "Remote web development and branding from Spain. Design, creative direction and visual systems for brands with something real to say.",
  },

  navbar: {
    subtitulo: "Web, brand and content",
    inicio: "Home",
    trabajos: "Work",
    cv: "CV",
    contacto: "Contact",
    cta: "Let's talk",
    ctaPerfil: "Contact",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    menuPrincipal: "Main menu",
  },

  idioma: {
    etiqueta: "Language",
    verEnEspanol: "View in Spanish",
    verEnIngles: "View in English",
  },

  // No se usa en inglés: la barra solo sale en las páginas españolas.
  sugerencia: {
    texto: "This site is also available in English.",
    enlace: "Read it in English",
    cerrar: "Dismiss",
  },

  hero: {
    aria: "Home",
    reelTitulos: "Reel — titles layer",
    reelDisenos: "Reel — designs layer",
    disciplinas: "DESIGN · CONTENT · DEVELOPMENT",
    clientes: "Featured clients",
  },

  statement: {
    aria: "Manifesto",
    eyebrow: "Spain · Remote",
    linea1: { antes: "It's not ", tachado: "just", despues: " content." },
    linea2: {
      antes: "It's content that ",
      destacado: "connects",
      despues: ".",
    },
    parrafo: {
      antes:
        "You're here because something about your brand isn't quite working. The site doesn't convince, the content doesn't connect, or you simply don't know where to start.",
      fuerte: "That's where I come in.",
    },
    cta: "Let's talk",
  },

  solution: {
    eyebrow: "Services",
    h2: "What I do.",
    lede: "Brand, web, content, video and creative direction.",
  },

  process: {
    eyebrow: "How I work",
    h2: "How we work together.",
    pasos: [
      {
        n: "01",
        titulo: "Discovery",
        antes:
          "We talk, with no obligation. I listen, and I work out what you want to achieve and why now.",
        fuerte: "I won't sell you anything you don't need.",
        despues: "",
      },
      {
        n: "02",
        titulo: "Proposal",
        antes: "I send you a clear proposal:",
        fuerte:
          "what I build, when I deliver it, what it costs and what you get",
        despues: ". No surprises.",
      },
      {
        n: "03",
        titulo: "Delivery",
        antes:
          "I get to work. You review at the key milestones, I handle the rest.",
        fuerte: "No filler emails, no delays on my side.",
        despues: "",
      },
    ],
  },

  works: {
    eyebrow: "Selected work",
    h2: { antes: "Recent ", destacado: "projects", despues: "." },
    necesitaba: "Needed",
    hice: "What I did",
    resultado: "Result",
    verWeb: "Visit the site",
  },

  antesDespues: {
    eyebrow: "Before and after",
    h2: {
      antes: "How it looked and ",
      destacado: "how it turned out",
      despues: ".",
    },
    lede: "Drag the middle line to compare.",
  },

  testimonios: {
    eyebrow: "What they say",
    h2: {
      antes: "Clients who already ",
      destacado: "got it done",
      despues: ".",
    },
    aria: "Client testimonials",
    irAl: "Go to testimonial",
    anterior: "Previous testimonial",
    siguiente: "Next testimonial",
  },

  about: {
    eyebrow: "Who's behind this",
    h2: { antes: "Hi! I'm ", destacado: "Sara", despues: "." },
    p1: {
      antes:
        "I've spent a year inside an AI startup, watching a brand get built from nothing while everything around it kept changing. That gives you a",
      fuerte: "perspective no course teaches",
      despues: ".",
    },
    p2: {
      antes: "I don't work with everyone. I want to",
      fuerte: "really understand your project",
      despues: "before I take it on.",
    },
    p3: "If you think we're a fit, get in touch.",
    bullets: [
      {
        titulo: "Tailored solutions",
        texto:
          "Every project is designed around how you actually work, not around a template.",
      },
      {
        titulo: "Straight answers",
        texto:
          "If something doesn't fit, I'll say so. If I'm not the right person for the job, I'll say that too.",
      },
    ],
  },

  banner: {
    h2: {
      antes: "Ready for your brand to",
      destacado: "say what it's worth",
      despues: "?",
    },
    parrafo: {
      antes: "Tell me what you have and what you need. I'll reply with a",
      fuerte: "tailored proposal",
      despues: ".",
    },
    cta: "Let's talk",
    nota: "No obligation · I answer every message myself",
  },

  footer: {
    lema: "Design with purpose, for brands with something real to say.",
    navegacion: "Navigation",
    inicio: "Home",
    trabajos: "Work",
    contacto: "Contact",
    // Las dos siguientes no se enseñan en inglés: sus páginas solo existen
    // en español. Están aquí porque el diccionario tiene que tener la misma
    // forma en los dos idiomas.
    perfil: "Professional profile",
    recomienda: "Refer a client",
    contactoTitulo: "Contact",
    ubicacion: "Spain · Remote",
    copyright: "© 2026 · Spain",
    enlacesLegales: "Legal links",
    avisoLegal: "Legal Notice",
    privacidad: "Privacy",
    cookies: "Cookies",
  },

  trabajosPagina: {
    meta: {
      titulo: "Work · Sara Córdoba",
      descripcion:
        "Design gallery: posters, brand identities, social media pieces and websites. Work made for clients and for my own projects.",
    },
    eyebrow: "Work",
    h1: { antes: "What comes out of ", destacado: "here", despues: "." },
    lede: "Posters and social media pieces. Click any of them to see it full size.",
    cta: "Want something like this?",
    notaCta: "Tell me what you need and I'll tell you how I'd approach it.",
    sinPiezas: "This section is on its way.",
  },

  galeria: {
    ampliar: "Enlarge",
    cerrar: "Close",
    anterior: "Previous",
    siguiente: "Next",
  },

  contactoPagina: {
    meta: {
      titulo: "Contact · Sara Córdoba",
      descripcion:
        "Tell me about your project. I reply personally with a proposal, no obligation.",
    },
    eyebrow: "Contact",
    h1: "Tell me about your project.",
    lede: "Send me the details of your project. I'll reply with a tailored proposal, no obligation.",
  },

  formulario: {
    necesidades: [
      "Design & product",
      "Content & communication",
      "Video & motion",
      "Creative direction",
    ],
    puntos: [
      "New brand, starting from scratch",
      "I have a brand but it needs a refresh",
      "Established brand, looking for support",
      "Just exploring options",
    ],
    cuando: [
      "Right away, urgent",
      "Next 1-2 months",
      "Next 3-6 months",
      "Still exploring",
    ],
    presupuestos: [
      "Under €3,000",
      "€3,000 — €8,000",
      "€8,000 — €20,000",
      "Over €20,000",
      "I'd rather discuss it",
    ],
    prefieroHablarlo: "I'd rather discuss it",
    exitoTitulo: "Message sent",
    exitoGracias: "Thanks",
    exitoResto:
      ". I have your brief and I'll reply personally within 48 hours.",
    nombre: "Name",
    nombrePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@email.com",
    empresa: "Company or brand",
    webInstagram: "Website or Instagram",
    opcional: "Optional",
    queNecesitas: "What do you need?",
    enQuePunto: "Where are you right now?",
    cuandoEmpezar: "When would you like to start?",
    presupuesto: "Rough budget",
    presupuestoPlaceholder: "Optional · you can pick 'I'd rather discuss it'",
    selecciona: "Choose an option",
    cuentame: "Tell me more about your project",
    cuentamePlaceholder:
      "Context, goals, what you have already tried, what you want to achieve…",
    consentimientoAntes: "I have read and accept the",
    consentimientoEnlace: "Privacy Policy",
    consentimientoDespues: ".",
    errorAntes: "Something went wrong. Try again or email me at",
    errorDespues: ".",
    enviando: "Sending…",
    enviar: "Send",
    aviso:
      "I reply personally within 48 hours. Your details are only used to answer your enquiry.",
  },
};
