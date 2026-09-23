// Todos los textos de la web en español.
//
// Esto es SOLO lo que antes estaba escrito dentro del marcado. El contenido
// que ya vivía separado en src/data/ (las fichas de proyecto, los servicios,
// los testimonios, la galería) sigue allí y no se duplica aquí: src/data/ es
// la fuente en español, y su traducción al inglés está en contenido-en.ts.
//
// Las frases con una parte en negrita o en verde van partidas en trozos
// (antes / fuerte / despues) en vez de llevar etiquetas dentro del texto:
// así el diseño se queda en el componente y aquí solo hay palabras.

export const es = {
  meta: {
    titulo: "Sara Córdoba · Desarrollo web y branding",
    descripcion:
      "Desarrollo web y branding en remoto desde España. Diseño, dirección creativa y sistemas visuales para marcas con algo verdadero que decir.",
  },

  navbar: {
    subtitulo: "Webs, marca y contenido",
    inicio: "Inicio",
    trabajos: "Trabajos",
    cv: "CV",
    contacto: "Contacto",
    cta: "¡Hablemos!",
    // En el perfil profesional lo lee quien contrata, no quien compra.
    ctaPerfil: "Contacto",
    abrirMenu: "Abrir el menú",
    cerrarMenu: "Cerrar el menú",
    menuPrincipal: "Menú principal",
  },

  idioma: {
    etiqueta: "Idioma",
    verEnEspanol: "Ver en español",
    verEnIngles: "Ver en inglés",
  },

  // Esta barra solo sale en las páginas españolas y solo si el navegador
  // está en inglés, así que va escrita EN INGLÉS a propósito: la lee quien
  // no entiende la página que tiene delante.
  sugerencia: {
    texto: "This site is also available in English.",
    enlace: "Read it in English",
    cerrar: "Dismiss",
  },

  hero: {
    aria: "Inicio",
    reelTitulos: "Reel — capa de títulos",
    reelDisenos: "Reel — capa de diseños",
    disciplinas: "DISEÑO · CONTENIDO · DESARROLLO",
    clientes: "Clientes destacados",
  },

  statement: {
    aria: "Manifiesto",
    eyebrow: "España · Remoto",
    // El trozo tachado va aparte porque el efecto de máquina de escribir
    // necesita saber dónde empieza y dónde acaba, y eso no se puede fijar
    // con un número de letra si la frase cambia de idioma.
    linea1: { antes: "No es ", tachado: "solo", despues: " contenido." },
    linea2: { antes: "Es contenido que ", destacado: "conecta", despues: "." },
    parrafo: {
      antes:
        "Si estás aquí es porque algo en tu marca no termina de encajar. La web no convence, el contenido no conecta, o simplemente no sabes por dónde empezar.",
      fuerte: "Yo me encargo de eso.",
    },
    cta: "¡Hablemos!",
  },

  solution: {
    eyebrow: "Servicios",
    h2: "Lo que hago.",
    lede: "Marca, web, contenido, vídeo y dirección.",
  },

  process: {
    eyebrow: "Cómo funciono",
    h2: "Cómo trabajo contigo.",
    pasos: [
      {
        n: "01",
        titulo: "Diagnóstico",
        antes:
          "Hablamos sin compromiso. Te escucho, entiendo qué quieres conseguir y por qué ahora.",
        fuerte: "No vendo nada que no necesites.",
        despues: "",
      },
      {
        n: "02",
        titulo: "Propuesta",
        antes: "Te mando una propuesta clara:",
        fuerte:
          "qué hago, cuándo lo entrego, cuánto cuesta y qué vas a conseguir",
        despues: ". Sin sorpresas.",
      },
      {
        n: "03",
        titulo: "Ejecución",
        antes:
          "Me pongo manos a la obra. Tú revisas en puntos clave, yo me ocupo del resto.",
        fuerte: "Sin emails de relleno, sin retrasos por mi parte.",
        despues: "",
      },
    ],
  },

  works: {
    eyebrow: "Trabajos seleccionados",
    h2: { antes: "Proyectos ", destacado: "recientes", despues: "." },
    necesitaba: "Necesitaba",
    hice: "Hice",
    resultado: "Resultado",
    verWeb: "Ver la web",
  },

  antesDespues: {
    eyebrow: "Antes y después",
    h2: { antes: "Cómo estaba y ", destacado: "cómo quedó", despues: "." },
    lede: "Arrastra la línea de en medio para comparar.",
  },

  testimonios: {
    eyebrow: "Lo que dicen",
    h2: {
      antes: "Clientes que ya lo ",
      destacado: "tienen hecho",
      despues: ".",
    },
    aria: "Testimonios de clientes",
    irAl: "Ir al testimonio",
    anterior: "Testimonio anterior",
    siguiente: "Testimonio siguiente",
  },

  about: {
    eyebrow: "Quién hay detrás",
    h2: { antes: "¡Hola! Soy ", destacado: "Sara", despues: "." },
    p1: {
      antes:
        "Llevo un año dentro de una startup de IA viendo cómo se construye una marca desde cero mientras todo cambia a tu alrededor, eso te da una",
      fuerte: "visión que no se aprende en ningún curso",
      despues: ".",
    },
    p2: {
      antes: "No trabajo con todo el mundo. Me interesa",
      fuerte: "entender tu proyecto de verdad",
      despues: "antes de meterme en él.",
    },
    p3: "Si crees que encajamos, ¡escríbeme!",
    bullets: [
      {
        titulo: "Soluciones a medida",
        texto:
          "Cada proyecto se diseña a partir de tu operativa real, no de una plantilla.",
      },
      {
        titulo: "Conversación honesta",
        texto:
          "Si algo no encaja te lo digo. Si no soy la persona indicada, también.",
      },
    ],
  },

  banner: {
    h2: {
      antes: "¿Listo para que tu marca",
      destacado: "cuente lo que vale",
      despues: "?",
    },
    parrafo: {
      antes: "Cuéntame qué tienes y qué necesitas. Te respondo con una",
      fuerte: "propuesta personalizada",
      despues: ".",
    },
    cta: "¡Hablemos!",
    nota: "Sin compromiso · Cada mensaje lo respondo personalmente",
  },

  footer: {
    lema: "Diseño con propósito para marcas que tienen algo verdadero que decir.",
    navegacion: "Navegación",
    inicio: "Inicio",
    trabajos: "Trabajos",
    contacto: "Contacto",
    perfil: "Perfil profesional",
    contactoTitulo: "Contacto",
    ubicacion: "España · Remoto",
    copyright: "© 2026 · España",
    enlacesLegales: "Enlaces legales",
    recomienda: "Recomiéndame",
    avisoLegal: "Aviso Legal",
    privacidad: "Privacidad",
    cookies: "Cookies",
  },

  trabajosPagina: {
    meta: {
      titulo: "Trabajos · Sara Córdoba",
      descripcion:
        "Galería de diseños: carteles, identidades, piezas para redes y webs. Trabajo hecho para clientes y proyectos propios.",
    },
    eyebrow: "Trabajos",
    h1: { antes: "Lo que sale de ", destacado: "aquí", despues: "." },
    lede: "Cartelería y piezas para redes. Haz clic en cualquiera para verla en grande.",
    cta: "¿Quieres algo así?",
    notaCta: "Cuéntame qué necesitas y te digo cómo lo haría.",
    sinPiezas: "Estoy preparando esta sección.",
  },

  galeria: {
    ampliar: "Ampliar",
    cerrar: "Cerrar",
    anterior: "Anterior",
    siguiente: "Siguiente",
  },

  // La página española de contacto NO exporta metadata: hereda el título del
  // layout, como hasta ahora. Estas dos líneas las usa solo la inglesa.
  contactoPagina: {
    meta: {
      titulo: "Contacto · Sara Córdoba",
      descripcion:
        "Cuéntame tu proyecto. Respondo personalmente con una propuesta, sin compromiso.",
    },
    eyebrow: "Contacto",
    h1: "Cuéntame tu proyecto.",
    lede: "Cuéntame los detalles de tu proyecto. Te respondo con una propuesta personalizada, sin compromiso.",
  },

  formulario: {
    necesidades: [
      "Diseño & producto",
      "Contenido & comunicación",
      "Vídeo & motion",
      "Dirección creativa",
    ],
    puntos: [
      "Marca nueva, parto de cero",
      "Tengo marca pero necesita un refresh",
      "Marca consolidada, busco acompañamiento",
      "Solo exploro opciones",
    ],
    cuando: [
      "Ya, urgente",
      "Próximos 1-2 meses",
      "Próximos 3-6 meses",
      "Aún explorando",
    ],
    presupuestos: [
      "Menos de 3.000 €",
      "3.000 € — 8.000 €",
      "8.000 € — 20.000 €",
      "Más de 20.000 €",
      "Prefiero hablarlo",
    ],
    prefieroHablarlo: "Prefiero hablarlo",
    exitoTitulo: "¡Mensaje enviado!",
    exitoGracias: "Gracias",
    exitoResto:
      ". He recibido tu brief y te respondo personalmente en menos de 48h.",
    nombre: "Nombre",
    nombrePlaceholder: "Tu nombre",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    empresa: "Empresa o marca",
    webInstagram: "Web o Instagram",
    opcional: "Opcional",
    queNecesitas: "¿Qué necesitas?",
    enQuePunto: "¿En qué punto estás?",
    cuandoEmpezar: "¿Cuándo te gustaría empezar?",
    presupuesto: "Presupuesto orientativo",
    presupuestoPlaceholder: "Opcional · puedes elegir 'Prefiero hablarlo'",
    selecciona: "Selecciona una opción",
    cuentame: "Cuéntame más sobre tu proyecto",
    cuentamePlaceholder:
      "Contexto, objetivos, lo que ya has intentado, lo que esperas conseguir…",
    consentimientoAntes: "He leído y acepto la",
    consentimientoEnlace: "Política de Privacidad",
    consentimientoDespues: ".",
    errorAntes: "Algo ha fallado al enviar. Inténtalo de nuevo o escríbeme a",
    errorDespues: ".",
    enviando: "Enviando…",
    enviar: "Enviar",
    aviso:
      "Te respondo personalmente en menos de 48h. Tus datos solo se usan para responder a tu consulta.",
  },
};

/** El inglés tiene que tener exactamente esta forma. Lo comprueba TypeScript. */
export type Diccionario = typeof es;
