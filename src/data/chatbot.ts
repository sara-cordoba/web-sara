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
  botones?: Boton[];
  /** Si es true, tras las burbujas se abre el formulario directamente. */
  abreFormulario?: boolean;
};

export const INICIO = "inicio";

export const GUION: Record<string, Nodo> = {
  inicio: {
    burbujas: [
      "¡Hola! Soy **Nika**, el asistente de Sara.",
      "Dime qué es lo que no te funciona y te cuento cómo lo arreglaría ella.",
    ],
    botones: [
      { texto: "Mi web no me trae nada", nodo: "web" },
      { texto: "No tengo tiempo para las redes", nodo: "redes" },
      { texto: "Quiero un chatbot para mi negocio", nodo: "chatbot" },
      { texto: "Represento a una empresa", nodo: "empresa" },
      { texto: "Otra cosa", nodo: "otra" },
    ],
  },

  web: {
    burbujas: [
      "Suele ser el móvil, o que **no se entiende qué vendes** en tres segundos.",
      "Las dos tienen arreglo. Sara las hace a medida, y ha entregado varias.",
      "Y **la web es tuya**: sin cuotas y sin depender de nadie.",
    ],
    botones: [
      {
        texto: "Ver esas webs",
        ir: "/trabajos",
        aviso: "Te abro los trabajos. Sigo aquí cuando quieras.",
      },
      { texto: "¿Cuánto costaría la mía?", nodo: "precio" },
      { texto: "Que me escriba Sara", formulario: true },
    ],
  },

  redes: {
    burbujas: [
      "Normal. Publicar bien **no es un rato suelto, es un trabajo**.",
      "Sara lo lleva entero: estrategia, textos, diseño y vídeo. Tú, nada.",
      "En YouTube: **de cero a 12.500 suscriptores en 17 meses**, y 128 vídeos.",
    ],
    botones: [
      {
        texto: "Ver trabajos",
        ir: "/trabajos",
        aviso: "Te abro los trabajos. Sigo aquí cuando quieras.",
      },
      { texto: "¿Cómo se empieza?", nodo: "empezar" },
      { texto: "Que me escriba Sara", formulario: true },
    ],
  },

  chatbot: {
    burbujas: [
      "El que estás usando ahora es una **muestra sencilla**, para que veas la idea.",
      "Los de cliente son otra liga: **IA de verdad**, conectada a tu información.",
      "Atienden siempre y **te dicen qué pregunta la gente** que entra.",
    ],
    botones: [
      { texto: "Que me escriba Sara", formulario: true },
      {
        texto: "Ver trabajos",
        ir: "/trabajos",
        aviso: "Te abro los trabajos. Sigo aquí cuando quieras.",
      },
    ],
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
      { texto: "Escribirle", formulario: true },
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
      "Se abarata: **vienes recomendado** → página extra. **Recomiendas tú** → 10 %.",
    ],
    botones: [
      { texto: "Que me escriba Sara", formulario: true },
      { texto: "¿Cómo se empieza?", nodo: "empezar" },
    ],
  },

  empezar: {
    burbujas: [
      "Con una charla de veinte minutos para ver qué necesitas de verdad.",
      "De ahí sale una propuesta con el alcance, el precio y la fecha.",
      "Si encaja, empezamos. Si no, **te quedas con la propuesta** y tan amigos.",
    ],
    botones: [
      { texto: "Que me escriba Sara", formulario: true },
      {
        texto: "Ver trabajos",
        ir: "/trabajos",
        aviso: "Te abro los trabajos. Sigo aquí cuando quieras.",
      },
    ],
  },

  // Cuando alguien escribe algo por su cuenta. Nika no se lo inventa:
  // reconoce que no es quien debe responder y ofrece pasar el mensaje.
  libre: {
    burbujas: [
      "Eso mejor te lo cuenta Sara, que te va a responder mejor que yo.",
      "¿Te paso con ella?",
    ],
    abreFormulario: true,
  },
};

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
  marcadorEntrada: "Escribe lo que quieras…",
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
