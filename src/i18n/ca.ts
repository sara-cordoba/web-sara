// Tots els textos de la web en català.
//
// Aquest fitxer té exactament la mateixa forma que es.ts. Ho comprova
// TypeScript: si falta una clau o està mal escrita, la construcció falla en
// lloc de publicar un text en castellà a la web catalana.
//
// TO: el mateix que en castellà, en un català natural i no calcat. Els noms
// de clients i de projectes no es tradueixen mai. Es fa servir "la Sara",
// amb article, com es diu en català.

import type { Diccionario } from "./es";

export const ca: Diccionario = {
  meta: {
    titulo: "Sara Córdoba · Desenvolupament web, WordPress i branding",
    descripcion:
      "Dissenyadora i desenvolupadora web freelance en remot des d'Espanya: webs en WordPress o a mida, branding, disseny gràfic, contingut per a xarxes i xatbots amb IA.",
  },

  navbar: {
    subtitulo: "Webs, marca i contingut",
    inicio: "Inici",
    trabajos: "Treballs",
    cv: "CV",
    contacto: "Contacte",
    cta: "Parlem!",
    ctaPerfil: "Contacte",
    abrirMenu: "Obre el menú",
    cerrarMenu: "Tanca el menú",
    menuPrincipal: "Menú principal",
  },

  idioma: {
    etiqueta: "Idioma",
    verEnEspanol: "Veure en castellà",
    verEnCatalan: "Veure en català",
    verEnIngles: "Veure en anglès",
  },

  // No es fa servir en català: la barra només surt a les pàgines en
  // castellà. És aquí perquè el diccionari ha de tenir la mateixa forma.
  sugerencia: {
    texto: "This site is also available in English.",
    enlace: "Read it in English",
    cerrar: "Dismiss",
  },

  hero: {
    aria: "Inici",
    reelTitulos: "Reel — capa de títols",
    reelDisenos: "Reel — capa de dissenys",
    disciplinas: "DISSENY · CONTINGUT · DESENVOLUPAMENT",
    clientes: "Clients destacats",
    conoceme: "Coneix-me",
  },

  statement: {
    aria: "Manifest",
    eyebrow: "Espanya · En remot",
    linea1: { antes: "No és ", tachado: "només", despues: " contingut." },
    linea2: { antes: "És contingut que ", destacado: "connecta", despues: "." },
    parrafo: {
      antes:
        "Si ets aquí és perquè alguna cosa de la teva marca no acaba d'encaixar. La web no convenç, el contingut no connecta o, simplement, no saps per on començar.",
      fuerte: "Jo me n'encarrego.",
    },
    cta: "Parlem!",
  },

  solution: {
    eyebrow: "Serveis",
    h2: "El que faig.",
    lede: "Marca, web, contingut, vídeo i direcció.",
  },

  process: {
    eyebrow: "Com funciono",
    h2: "Com treballo amb tu.",
    pasos: [
      {
        n: "01",
        titulo: "Diagnòstic",
        antes:
          "En parlem sense compromís. T'escolto i entenc què vols aconseguir i per què ara.",
        fuerte: "No et venc res que no necessitis.",
        despues: "",
      },
      {
        n: "02",
        titulo: "Proposta",
        antes: "T'envio una proposta clara:",
        fuerte:
          "què faig, quan ho lliuro, quant costa i què aconseguiràs",
        despues: ". Sense sorpreses.",
      },
      {
        n: "03",
        titulo: "Execució",
        antes:
          "Hi poso fil a l'agulla. Tu revises els punts clau i jo m'ocupo de la resta.",
        fuerte: "Sense correus de farciment, sense retards per part meva.",
        despues: "",
      },
    ],
  },

  works: {
    eyebrow: "Treballs seleccionats",
    h2: { antes: "Projectes ", destacado: "recents", despues: "." },
    necesitaba: "Necessitava",
    hice: "Què vaig fer",
    resultado: "Resultat",
    verWeb: "Veure la web",
    verCaso: "Veure el cas",
  },

  antesDespues: {
    eyebrow: "Abans i després",
    h2: { antes: "Com era i ", destacado: "com ha quedat", despues: "." },
    lede: "Arrossega la línia del mig per comparar.",
  },

  testimonios: {
    eyebrow: "El que diuen",
    h2: {
      antes: "Clients que ja ho ",
      destacado: "tenen fet",
      despues: ".",
    },
    aria: "Testimonis de clients",
    irAl: "Ves al testimoni",
    anterior: "Testimoni anterior",
    siguiente: "Testimoni següent",
  },

  about: {
    eyebrow: "Qui hi ha al darrere",
    h2: { antes: "Hola! Soc la ", destacado: "Sara", despues: "." },
    p1: {
      antes:
        "Fa un any que soc dins d'una startup d'IA i veig com es construeix una marca des de zero mentre tot canvia al teu voltant. Això et dona una",
      fuerte: "visió que no s'aprèn en cap curs",
      despues: ".",
    },
    p3: "Si creus que encaixem, escriu-me!",
    lede: "Disseny i desenvolupament web en WordPress o a mida, branding, disseny gràfic, contingut per a xarxes socials i xatbots amb IA. En remot des d'Espanya.",
    bullets: [
      {
        titulo: "Solucions a mida",
        texto:
          "Cada projecte es dissenya a partir de com treballes de debò, no d'una plantilla.",
      },
      {
        titulo: "Conversa honesta",
        texto:
          "Si alguna cosa no encaixa, t'ho dic. Si no soc la persona indicada, també.",
      },
    ],
  },

  banner: {
    h2: {
      antes: "A punt perquè la teva marca",
      destacado: "transmeti el que val",
      despues: "?",
    },
    parrafo: {
      antes: "Explica'm què tens i què necessites. Et respondré amb una",
      fuerte: "proposta personalitzada",
      despues: ".",
    },
    cta: "Parlem!",
    nota: "Sense compromís · Responc personalment cada missatge",
  },

  footer: {
    lema: "Disseny amb propòsit per a marques que tenen alguna cosa autèntica a dir.",
    navegacion: "Navegació",
    inicio: "Inici",
    trabajos: "Treballs",
    contacto: "Contacte",
    perfil: "Perfil professional",
    contactoTitulo: "Contacte",
    ubicacion: "Espanya · En remot",
    copyright: "© 2026 · Espanya",
    enlacesLegales: "Enllaços legals",
    recomienda: "Recomana'm",
    avisoLegal: "Avís legal",
    privacidad: "Privacitat",
    cookies: "Galetes",
  },

  trabajosPagina: {
    meta: {
      titulo: "Treballs de disseny gràfic, branding i webs · Sara Córdoba",
      descripcion:
        "Galeria de dissenys: cartells, identitats, peces per a xarxes i webs. Feina feta per a clients i per a projectes propis.",
    },
    eyebrow: "Treballs",
    h1: { antes: "El que surt d'", destacado: "aquí", despues: "." },
    lede: "Cartells i peces per a xarxes. Fes clic a qualsevol per veure-la en gran.",
    cta: "Vols alguna cosa així?",
    notaCta: "Explica'm què necessites i et dic com ho faria.",
    sinPiezas: "Estic preparant aquesta secció.",
  },

  galeria: {
    ampliar: "Amplia",
    cerrar: "Tanca",
    anterior: "Anterior",
    siguiente: "Següent",
  },

  contactoPagina: {
    meta: {
      titulo: "Contacte · Sara Córdoba",
      descripcion:
        "Explica'm el teu projecte. Et responc personalment amb una proposta, sense compromís.",
    },
    eyebrow: "Contacte",
    h1: "Explica'm el teu projecte.",
    lede: "Explica'm els detalls del teu projecte. Et respondré amb una proposta personalitzada, sense compromís.",
  },

  formulario: {
    necesidades: [
      "Disseny & producte",
      "Contingut & comunicació",
      "Vídeo & motion",
      "Direcció creativa",
    ],
    puntos: [
      "Marca nova, començo de zero",
      "Tinc marca, però necessita un refresh",
      "Marca consolidada, busco acompanyament",
      "Només exploro opcions",
    ],
    cuando: [
      "Ja, és urgent",
      "Els pròxims 1-2 mesos",
      "Els pròxims 3-6 mesos",
      "Encara m'ho estic mirant",
    ],
    presupuestos: [
      "Menys de 3.000 €",
      "3.000 € — 8.000 €",
      "8.000 € — 20.000 €",
      "Més de 20.000 €",
      "Prefereixo parlar-ne",
    ],
    prefieroHablarlo: "Prefereixo parlar-ne",
    exitoTitulo: "Missatge enviat!",
    exitoGracias: "Gràcies",
    exitoResto:
      ". He rebut el teu brief i et respondré personalment en menys de 48 h.",
    nombre: "Nom",
    nombrePlaceholder: "El teu nom",
    email: "Correu electrònic",
    emailPlaceholder: "nom@correu.com",
    empresa: "Empresa o marca",
    webInstagram: "Web o Instagram",
    opcional: "Opcional",
    queNecesitas: "Què necessites?",
    enQuePunto: "En quin punt et trobes?",
    cuandoEmpezar: "Quan t'agradaria començar?",
    presupuesto: "Pressupost orientatiu",
    presupuestoPlaceholder: "Opcional · pots triar 'Prefereixo parlar-ne'",
    selecciona: "Tria una opció",
    cuentame: "Explica'm més coses del teu projecte",
    cuentamePlaceholder:
      "Context, objectius, què has provat fins ara, què esperes aconseguir…",
    consentimientoAntes: "He llegit i accepto la",
    consentimientoEnlace: "Política de privacitat",
    consentimientoDespues: ".",
    errorAntes: "Alguna cosa ha fallat en l'enviament. Torna-ho a provar o escriu-me a",
    errorDespues: ".",
    enviando: "Enviant…",
    enviar: "Envia",
    aviso:
      "Et responc personalment en menys de 48 h. Les teves dades només es fan servir per respondre la teva consulta.",
  },
};
