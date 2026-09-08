// Testimonios de clientes reales.
//
// CÓMO AÑADIR UNO: copia este bloque, pega el texto tal cual lo dijo el
// cliente, y pon qué trabajo se le hizo y de qué provincia es.
//
//   {
//     texto: "Lo que dijo el cliente, sin retocar.",
//     trabajo: "Cliente de diseño web",
//     provincia: "Barcelona",
//   },
//
// El carrusel se ajusta solo al número que haya. Si la lista se queda vacía,
// la sección entera no se enseña.
//
// REGLA: ninguno de estos clientes quiere que salga su nombre. No se pone ni
// nombre de persona, ni nombre de empresa, ni ciudad concreta. La provincia
// sí, porque enseña que se trabaja en toda España y no identifica a nadie.

export type Testimonio = {
  /** Lo que dijo el cliente, tal cual. Sin retocar. */
  texto: string;
  /** Qué trabajo se le hizo. */
  trabajo: string;
  /** Provincia. Nada más fino que eso. */
  provincia: string;
};

export const TESTIMONIOS: Testimonio[] = [
  {
    texto:
      "Muy confiable y profesional. Teníamos muchas dudas en cómo transmitir en nuestra web el concepto de nuestro negocio y no sabíamos por dónde empezar. Sara nos ayudó mucho y, después de una reunión, entendió lo que queríamos hacer desde el principio. Muy recomendable.",
    trabajo: "Cliente de diseño web",
    provincia: "Barcelona",
  },
  {
    texto:
      "Sara me ayudó a reconstruir mi marca. Estaba muy perdida, deambulando entre varias ideas, y eso hacía que no terminase de arrancar mi proyecto. Gracias a ella creamos el branding completo para mis redes sociales, e incluso hizo un calendario de publicaciones con plantillas reutilizables: ya no tengo que crear mi contenido desde cero.",
    trabajo: "Cliente de marca y contenido",
    provincia: "Madrid",
  },
  {
    texto:
      "Es mi persona de confianza total. Delego mis redes sociales en ella y sabe bien lo que quiero comunicar y expresar. Es puntual y muy responsable.",
    trabajo: "Cliente de gestión de redes sociales",
    provincia: "Sevilla",
  },
  {
    texto:
      "Nos ha editado todos los cursos de nuestra web y desde el inicio nos presentó la propuesta y los plazos. Me he sentido en confianza en todo momento porque nos ha estado informando de cada avance. Es una persona cercana y muy comprometida con su trabajo.",
    trabajo: "Cliente de edición de vídeo",
    provincia: "Madrid",
  },
];

/** Va encima del carrusel. Da sentido a que cada testimonio lleve provincia. */
export const ALCANCE = "Trabajo en remoto con clientes y empresas de toda España.";
