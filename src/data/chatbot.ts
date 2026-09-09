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
//
// ═══ CÓMO SE ESCRIBEN LAS BURBUJAS ═══
//  · Frases cortas. Es una ventana de chat en un móvil, no un folleto.
//  · Cada respuesta va partida en varias burbujas, no en un ladrillo.
//  · Lo que va entre **asteriscos** sale en negrita.
//  · Un salto de línea dentro de una burbuja se escribe con \n.

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
      "Si has llegado hasta aquí es porque algo de tu presencia digital no acaba de funcionar. Dime qué es y te cuento cómo lo resolvería ella.",
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
      "Suele ser una de tres: **no se entiende en tres segundos qué vendes**, **no se ve bien en el móvil**, o **no hay forma fácil de contactar**.",
      "Las tres tienen arreglo.",
      "Sara hace webs a medida, nada de plantillas. La estructura, los textos y el móvil, pensados para lo que vendes tú. Y algo que suele gustar: **la web es tuya**, sin cuotas y sin depender de nadie para cambiar una coma.",
      "Ha entregado ya varias, y puedes ver algunas funcionando ahora mismo.",
    ],
    botones: [
      { texto: "Ver esas webs", ir: "/trabajos" },
      { texto: "¿Cuánto costaría la mía?", nodo: "precio" },
      { texto: "Que me escriba Sara", formulario: true },
    ],
  },

  redes: {
    burbujas: [
      "Normal. Publicar bien **no es un rato suelto, es un trabajo**.",
      "Sara lleva la parte entera: estrategia, calendario, textos, diseño de las piezas y edición de vídeo. Tú no tienes que acordarte de nada.",
      "Para que te hagas idea: llevó un canal de YouTube **de cero a 12.500 suscriptores en 17 meses**, con 128 vídeos editados por ella.",
      "Y si hay que tocar la web para que el contenido funcione, **la toca ella misma**. Sin esperar a nadie.",
    ],
    botones: [
      { texto: "Ver trabajos", ir: "/trabajos" },
      { texto: "¿Cómo se empieza?", nodo: "empezar" },
      { texto: "Que me escriba Sara", formulario: true },
    ],
  },

  chatbot: {
    burbujas: [
      "El que estás usando ahora es una **muestra sencilla**, para que veas la idea.",
      "Los que montamos para clientes son otra liga: **llevan IA de verdad** y se conectan a tu información. Entienden lo que les preguntan aunque no esté previsto, y responden con criterio.",
      "Atienden a cualquier hora, filtran lo que no interesa, y **te enteras de qué pregunta de verdad la gente** que entra en tu web.",
      "Se monta sobre la web que ya tienes. No hay que rehacer nada.",
    ],
    botones: [
      { texto: "Que me escriba Sara", formulario: true },
      { texto: "Ver trabajos", ir: "/trabajos" },
    ],
  },

  empresa: {
    burbujas: [
      "Sara está **abierta a incorporarse a un equipo**.",
      "Su perfil es marca y contenido digital, con algo que no suele venir en el mismo pack: **viene del desarrollo web**. Cuando diseña una landing sabe lo que cuesta montarla, y en equipos pequeños la monta ella.",
      "Ha llevado sola la presencia digital completa de una startup B2B desde cero: identidad de marca, web bilingüe, contenido y automatización con IA.",
      "Remoto, o híbrido en Cataluña. Castellano y catalán nativos.",
    ],
    botones: [
      { texto: "Ver su perfil", ir: "/perfil" },
      { texto: "Descargar su CV", ir: "/CV_Sara_Cordoba_ES.pdf", descarga: true },
      { texto: "Escribirle", formulario: true },
    ],
  },

  otra: {
    burbujas: [
      "Cuéntamelo y se lo paso a Sara. Te responde por correo, normalmente el mismo día.",
    ],
    abreFormulario: true,
  },

  precio: {
    burbujas: [
      "Depende del alcance, y por eso Sara te lo dice **después de ver qué necesitas**. No cuesta lo mismo una web sencilla que una con reservas y en dos idiomas. Según el proyecto sale mejor a precio cerrado, y otras veces por horas.",
      "Lo que sí es fijo: **el precio y la fecha, por escrito antes de empezar**. Mitad al empezar, mitad al entregar. Sin sorpresas a media obra.",
      "Y hay dos formas de que te salga más barato:\n· **Vienes recomendado** → entras con una página extra gratis.\n· **Recomiendas tú a alguien** → te llevas el 10 % de su proyecto, con un mínimo de 75 €.",
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
      { texto: "Ver trabajos", ir: "/trabajos" },
    ],
  },

  // Cuando alguien escribe algo por su cuenta. Nika no se lo inventa:
  // reconoce que no es quien debe responder y ofrece pasar el mensaje.
  libre: {
    burbujas: [
      "Eso mejor te lo cuenta Sara directamente, que te va a responder mejor que yo.",
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
  volver: "Volver al principio",
};

/** El nombre del formulario de Netlify declarado en public/__forms.html */
export const FORMULARIO_NETLIFY = "chatbot";
