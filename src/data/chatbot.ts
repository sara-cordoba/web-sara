// Guion de Nika, el asistente de la web.
//
// ═══ CÓMO FUNCIONA ═══
// Nika NO tiene inteligencia artificial, ni servidor, ni claves de nada.
// Todo lo que dice está escrito aquí abajo. Si no está aquí, no lo dice.
// Cambiar el guion es cambiar este archivo y ya está.
//
// ═══ REGLAS QUE NO SE SALTAN ═══
//  · Nika no improvisa. Nunca. Si le preguntan algo que no está previsto,
//    ofrece pasar el mensaje a Sara.
//  · NO DA CIFRAS DE PRECIO. Sí da condiciones y descuentos.
//  · NO DA NÚMEROS PEQUEÑOS de nada: ni webs entregadas, ni clientes, ni años.
//    Se dice "varias", o no se dice. Los números grandes sí van: los de
//    YouTube, que son los que impresionan.
//  · No se abre solo nunca.
//  · De cualquier paso se puede volver atrás y se puede empezar de nuevo.
//    Nadie se queda encerrado por pulsar el botón que no era.
//
// ═══ LOS BOTONES SON PARTE DE LA FRASE ═══
// Un botón no es un menú suelto: es la respuesta que da el visitante a lo que
// Nika acaba de decir. Por eso, al tocar un nodo hay que leerlo entero, con
// sus botones detrás, y comprobar tres cosas:
//
//  1. QUE EL BOTÓN CONTESTE A LA PREGUNTA. Si el saludo pregunta "qué es lo
//     que no te funciona", un botón que dice "represento a una empresa" no
//     contesta a eso: no es una avería, es quién eres.
//  2. QUE LO QUE SEÑALA EXISTA Y ESTÉ DICHO. "Ver ESAS webs" solo vale si las
//     burbujas de arriba han hablado de unas webs. Y "Ver trabajos" solo vale
//     si en /trabajos hay de eso: de chatbots no hay ninguno.
//  3. QUE NO SEA UN CALLEJÓN. Todo nodo de servicio lleva al precio, el precio
//     lleva a cómo se empieza, y de todos se puede escribir a Sara. La misma
//     acción se llama SIEMPRE igual en todos los nodos.
//
// ═══ CÓMO SE ESCRIBEN LAS BURBUJAS ═══
//  · DOS TOPES QUE NO SE PASAN, porque esto se lee en un móvil:
//      - 3 burbujas por respuesta como mucho
//      - 2 líneas por burbuja como mucho
//    Dos líneas son unos 75 caracteres, y no siempre: depende de por dónde
//    parta la última palabra. Está medido dentro del chat, no calculado a
//    ojo: a 390 px la burbuja mide 302 px y le caben 268 px de texto de
//    14 px. Al tocar una burbuja, compruébala; 75 es la guía, no la ley.
//    Si algo no cabe, se quita lo que sobra: no se parte la frase en trozos
//    ni se reparte en una burbuja más.
//  · Frases cortas. Es una ventana de chat en un móvil, no un folleto.
//  · Lo que va entre **asteriscos** sale en negrita.
//  · Un salto de línea dentro de una burbuja se escribe con \n, pero se come
//    una de las dos líneas que hay: casi nunca compensa.

export const NOMBRE = "Nika";

/**
 * Páginas donde Nika NO aparece. En las legales nadie quiere charlar: va a
 * leer una cosa concreta y el chat solo estorba.
 * En /perfil sí sale a propósito: la rama de empresas es justo para quien
 * llega ahí desde el CV o desde LinkedIn.
 */
export const PAGINAS_SIN_NIKA = ["/aviso-legal", "/privacidad", "/cookies"];

export type Boton = {
  /** Lo que se lee en el botón. También es lo que se apunta en el recorrido. */
  texto: string;
  /** Ir a otro punto del guion. */
  nodo?: string;
  /** Ir a una página de la web. El chat se queda abierto. */
  ir?: string;
  /**
   * Lo que dice Nika ANTES de llevarte, y el motivo de que exista este campo:
   * sin él pulsas, cambia la página por debajo y el chat se queda mudo. Parece
   * que no ha pasado nada, o que lo que hay escrito no viene a cuento.
   * Todo botón con `ir` lleva el suyo. Si falta, se usa TEXTOS.avisoAlIr.
   */
  aviso?: string;
  /** Para el CV: en vez de navegar, lo descarga. */
  descarga?: boolean;
  /** Abrir el formulario dentro del chat. */
  formulario?: boolean;
};

export type Nodo = {
  burbujas: string[];
  /**
   * Primera burbuja de repuesto para cuando se llega ESCRIBIENDO, no pulsando.
   *
   * La primera burbuja de algunos nodos contesta a lo que dice su botón: el
   * "Normal." de redes contesta a "no tengo tiempo para las redes". Quien
   * escribe "¿haces vídeos?" no ha dicho eso, y recibir "Normal. Publicar bien
   * no es un rato suelto" suena a que no le han leído.
   * Solo la ponen los nodos cuya primera burbuja reacciona a algo; las demás
   * se aguantan solas y no la necesitan.
   */
  entradaLibre?: string;
  botones?: Boton[];
  /** Si es true, tras las burbujas se abre el formulario directamente. */
  abreFormulario?: boolean;
};

export const INICIO = "inicio";

// La misma acción, el mismo nombre en todos los nodos. Que el botón de
// escribir a Sara se llame "Escribirle" en un sitio y "Que me escriba Sara"
// en otro hace dudar de si hacen lo mismo.
const HABLAR: Boton = { texto: "Que me escriba Sara", formulario: true };
const VER_TRABAJOS: Boton = {
  texto: "Ver trabajos",
  ir: "/trabajos",
  aviso: "Te abro los trabajos. Sigo aquí cuando quieras.",
};
const PRECIO: Boton = { texto: "¿Cuánto cuesta?", nodo: "precio" };

export const GUION: Record<string, Nodo> = {
  inicio: {
    burbujas: [
      "¡Hola! Soy **Nika**, el asistente de Sara.",
      "Dime qué necesitas y te cuento cómo lo haría ella.",
    ],
    // "Qué necesitas" es lo único que abarca las cinco respuestas: dos son una
    // avería, una es un encargo y otra es una oferta de trabajo. Preguntar
    // "qué es lo que no te funciona" dejaba fuera a la mitad de los botones.
    botones: [
      { texto: "Mi web no me trae nada", nodo: "web" },
      { texto: "No tengo tiempo para las redes", nodo: "redes" },
      { texto: "Quiero un chatbot para mi negocio", nodo: "chatbot" },
      // Antes ponía "Represento a una empresa", que es justo lo que pulsaría
      // una empresa que busca quien le haga la web: se llevaba al cliente
      // bueno a una rama donde se le ofrece el CV de Sara.
      { texto: "Busco a alguien para mi equipo", nodo: "empresa" },
      { texto: "Otra cosa", nodo: "otra" },
    ],
  },

  web: {
    // "Suele ser" contesta a "mi web no me trae nada". Escrito a mano no hay
    // avería que explicar, así que se dice lo mismo sin dar por hecha la queja.
    entradaLibre: "Lo que suele fallar: el móvil, o que **no se entiende qué vendes**.",
    burbujas: [
      "Suele ser el móvil, o que **no se entiende qué vendes** en tres segundos.",
      "Las dos tienen arreglo. Sara las hace a medida, y **ha entregado varias**.",
      "Y **la web es tuya**: sin cuotas y sin depender de nadie.",
    ],
    // "Ver esas webs" no valía por dos motivos: ninguna burbuja hablaba de
    // unas webs concretas, así que "esas" no señalaba a nada, y en /trabajos
    // no hay solo webs. La burbuja de arriba ya dice que ha entregado varias.
    botones: [VER_TRABAJOS, PRECIO, HABLAR],
  },

  redes: {
    // Igual que en web: fuera el "Normal.", que contesta a una queja que quien
    // ha escrito no ha hecho. El resto de la burbuja vale igual.
    entradaLibre: "Publicar bien **no es un rato suelto, es un trabajo**.",
    burbujas: [
      "Normal. Publicar bien **no es un rato suelto, es un trabajo**.",
      "Sara lo lleva entero: estrategia, textos, diseño y vídeo. Tú, nada.",
      "En YouTube: **de cero a 12.500 suscriptores en 17 meses**, y 128 vídeos.",
    ],
    botones: [VER_TRABAJOS, PRECIO, HABLAR],
  },

  chatbot: {
    burbujas: [
      "El que estás usando ahora es una **muestra sencilla**, para que veas la idea.",
      "Los de cliente son otra liga: **IA de verdad**, conectada a tu información.",
      "Atienden siempre y **te dicen qué pregunta la gente** que entra.",
    ],
    // Aquí NO va "Ver trabajos": en la galería no hay ni un chatbot, y mandar
    // allí a quien pregunta por chatbots es enseñarle carteles. La muestra ya
    // la está usando: es esta ventana.
    botones: [PRECIO, HABLAR],
  },

  empresa: {
    burbujas: [
      "Sara está **abierta a incorporarse a un equipo**. Remoto o híbrido en Cataluña.",
      "Marca y contenido, y **viene del desarrollo web**: monta lo que diseña.",
      "Llevó sola la marca y la web de una startup B2B, desde cero.",
    ],
    botones: [
      {
        texto: "Ver su perfil",
        ir: "/perfil",
        aviso: "Te abro su perfil. Sigo aquí cuando quieras.",
      },
      {
        texto: "Descargar su CV",
        ir: "/CV_Sara_Cordoba_ES.pdf",
        descarga: true,
        aviso: "Te descargo el CV. Sigo aquí cuando quieras.",
      },
      HABLAR,
    ],
  },

  otra: {
    burbujas: [
      "Cuéntamelo y se lo paso. Te responde por correo, normalmente el mismo día.",
    ],
    abreFormulario: true,
  },

  precio: {
    burbujas: [
      "Depende del alcance, así que Sara te lo dice **después de ver qué necesitas**.",
      "**El precio y la fecha, por escrito antes de empezar.** Sin sorpresas.",
      // Sin "página extra gratis": ese premio es de webs, y aquí se llega
      // también desde redes y desde chatbot. El 10 % sí vale para todo.
      "Y se abarata: **vienes recomendado**, o **recomiendas tú** → 10 %.",
    ],
    botones: [{ texto: "¿Cómo se empieza?", nodo: "empezar" }, HABLAR],
  },

  empezar: {
    burbujas: [
      "Con una charla de veinte minutos para ver qué necesitas de verdad.",
      "De ahí sale una propuesta con el alcance, el precio y la fecha.",
      "Si encaja, empezamos. Si no, **te quedas con la propuesta** y tan amigos.",
    ],
    // Aquí se acaba el embudo: lo único que queda por hacer es hablar con
    // ella. Mandar de vuelta a los trabajos sería dar un paso atrás.
    botones: [HABLAR],
  },

  // Cuando alguien escribe algo por su cuenta y no se le reconoce el tema.
  // Nika no se lo inventa: reconoce que no es quien debe responder.
  libre: {
    burbujas: [
      "Eso mejor te lo cuenta Sara, que te va a responder mejor que yo.",
      "¿Te paso con ella?",
    ],
    abreFormulario: true,
  },
};

// ---------------------------------------------------------------------------
// Lo que se escribe a mano.
//
// Antes, escribieras lo que escribieras, contestaba lo mismo: "eso mejor te lo
// cuenta Sara". Preguntar "¿cuánto cuesta una web?" a un asistente que tiene
// escrita la respuesta al precio y que te mande al formulario es de las cosas
// que peor sientan.
//
// Esto NO es inteligencia artificial y NO se inventa nada: solo reconoce de
// qué tema va y lleva a una respuesta que ya está escrita arriba. Si no
// reconoce el tema, no fuerza ninguna: pasa el mensaje a Sara, como antes.
//
// El orden importa: el precio va el primero para que "cuánto cuesta una web"
// caiga en el precio y no en la web.
// ---------------------------------------------------------------------------

const TEMAS: { nodo: string; palabras: string[] }[] = [
  {
    nodo: "precio",
    palabras: [
      "cuanto cuesta", "cuanto vale", "cuanto seria", "cuanto me costaria",
      "precio", "precios", "presupuesto", "tarifa", "tarifas", "cobras", "cobra",
    ],
  },
  {
    nodo: "empresa",
    palabras: [
      "contratar", "contratarte", "contratarla", "plantilla", "vacante",
      "curriculum", "empleo", "puesto", "seleccion", "recursos humanos",
      "media jornada", "jornada completa", "incorporarse",
    ],
  },
  {
    nodo: "chatbot",
    palabras: ["chatbot", "chat bot", "asistente virtual", "inteligencia artificial"],
  },
  {
    nodo: "redes",
    palabras: [
      "redes", "red social", "instagram", "tiktok", "linkedin", "youtube",
      "publicar", "publicaciones", "reel", "reels", "community",
      // La edición de vídeo entra aquí: es parte de lo que cuenta este nodo.
      "video", "videos", "edicion de video", "editar videos", "montaje",
    ],
  },
  {
    nodo: "web",
    palabras: [
      "web", "webs", "pagina", "paginas", "landing", "tienda online",
      "ecommerce", "wordpress",
    ],
  },
  // Sin "plazo" ni "cuanto tarda": el nodo cuenta cómo se arranca, no cuánto
  // dura el trabajo. Mandarlos aquí sería contestar a otra pregunta.
  {
    nodo: "empezar",
    palabras: ["como empiezo", "como se empieza", "como funciona", "por donde empiezo"],
  },
];

/**
 * Las burbujas con las que se entra a un nodo ESCRIBIENDO. Devuelve undefined
 * si el nodo no necesita entrada aparte, y entonces valen las de siempre.
 */
export function burbujasEscritas(clave: string): string[] | undefined {
  const nodo = GUION[clave];
  if (!nodo?.entradaLibre) return undefined;
  return [nodo.entradaLibre, ...nodo.burbujas.slice(1)];
}

/**
 * A qué punto del guion lleva un mensaje escrito a mano.
 * Devuelve null si no reconoce el tema, y entonces se pasa a Sara.
 */
export function temaDeTexto(texto: string): string | null {
  // Sin acentos, sin mayúsculas y sin signos: "¿Cuánto cuesta?" y
  // "cuanto cuesta" tienen que caer en el mismo sitio.
  const t = ` ${texto
    .toLowerCase()
    .normalize("NFD")
    // Los acentos van escritos con su código, no con el carácter: en el
    // archivo no se ven y cualquiera los borra sin querer.
    .replace(/[\u0300-\u036f]/g, "")
    // La eñe ya ha quedado en "n" al quitarle la virgulilla en la línea de
    // arriba, así que aquí no hace falta nombrarla.
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;
  for (const { nodo, palabras } of TEMAS) {
    // Con espacios alrededor, para que "bot" no salte dentro de "botella" ni
    // "web" dentro de una palabra más larga.
    if (palabras.some((p) => t.includes(` ${p} `))) return nodo;
  }
  return null;
}

// ---------------------------------------------------------------------------
// El formulario que va dentro del chat.
// No se pide teléfono a propósito: en un chat cuesta más darlo y no hace falta.
// ---------------------------------------------------------------------------

export const FORMULARIO = {
  intro: "Cuatro cosas y ya está. Sara te escribe por correo.",
  campos: {
    nombre: { etiqueta: "Tu nombre", marcador: "Cómo te llamas" },
    correo: { etiqueta: "Tu correo", marcador: "donde te escribe Sara" },
    mensaje: { etiqueta: "Qué necesitas", marcador: "Cuéntamelo en dos líneas" },
    recomendado: {
      etiqueta: "¿Te ha recomendado alguien?",
      marcador: "Su nombre, si es el caso",
    },
  },
  consentimiento: "Acepto que Sara guarde estos datos para responderme.",
  enviar: "Enviar",
  enviando: "Enviando…",
  /** {nombre} se sustituye por lo que haya escrito. */
  exito:
    "Recibido, {nombre}. Sara te escribe por correo, normalmente el mismo día.",
  fallo:
    "No he podido enviarlo desde aquí. Escríbele directamente y te lee igual.",
};

export const TEXTOS = {
  abrir: "Hablar con Nika",
  cerrar: "Cerrar el chat",
  titulo: "Nika",
  subtitulo: "Asistente de Sara",
  marcadorEntrada: "Pregúntame lo que quieras…",
  enviarEntrada: "Enviar mensaje",

  // ---- salidas de emergencia ----
  // Van en todas las respuestas y también con el formulario abierto: son las
  // dos formas de salir de donde estés sin cerrar el chat y perderlo todo.
  /** Deshace el último botón. Sale en todo menos en el saludo. */
  atras: "← Volver",
  /** Borra la conversación y vuelve al saludo. */
  reiniciar: "Empezar de nuevo",
  /** Lo que dice Nika al volver atrás, antes de repetir las opciones. */
  alVolver: "¿Por dónde seguimos?",
  /** Aviso de repuesto para un botón con `ir` al que se le olvidó el suyo. */
  avisoAlIr: "Te lo abro. Sigo aquí cuando quieras.",
};

/** El nombre del formulario de Netlify declarado en public/__forms.html */
export const FORMULARIO_NETLIFY = "chatbot";
