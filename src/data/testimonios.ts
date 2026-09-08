// Testimonios de clientes reales.
//
// CÓMO AÑADIR UNO: copia el bloque de abajo, pega la cita tal cual la dijo el
// cliente y pon qué trabajo se le hizo. Nada más. El carrusel se ajusta solo
// al número que haya, y si la lista se queda vacía la sección no se enseña.
//
//   {
//     cita: "Lo que dijo el cliente, entre comillas y sin retocar.",
//     trabajo: "Cliente de diseño web",
//   },
//
// REGLA: ninguno de estos clientes quiere que salga su nombre. No se pone
// nombre, ni empresa, ni localidad, ni nada que permita identificarlos.
// La atribución es el tipo de trabajo y punto.

export type Testimonio = {
  /** La cita, tal cual la dijo el cliente. Sin retocar. */
  cita: string;
  /** Qué trabajo se le hizo. Es la única atribución que se enseña. */
  trabajo: string;
};

export const TESTIMONIOS: Testimonio[] = [
  {
    cita: "Muy confiable y profesional. Teníamos muchas dudas en cómo transmitir en nuestra web el concepto de nuestro negocio y no sabíamos por dónde empezar. Sara nos ayudó mucho y, después de una reunión, entendió lo que queríamos hacer desde el principio. Muy recomendable.",
    trabajo: "Cliente de diseño web",
  },
  {
    cita: "Sara me ayudó a reconstruir mi marca. Estaba muy perdida, deambulando entre varias ideas, y eso hacía que no terminase de arrancar mi proyecto. Gracias a ella creamos el branding completo para mis redes sociales, e incluso hizo un calendario de publicaciones con plantillas reutilizables: ya no tengo que crear mi contenido desde cero.",
    trabajo: "Cliente de marca y contenido",
  },
  {
    cita: "Es mi persona de confianza total. Delego mis redes sociales en ella y sabe bien lo que quiero comunicar y expresar. Es puntual y muy responsable.",
    trabajo: "Cliente de gestión de redes sociales",
  },
  {
    cita: "Nos ha editado todos los cursos de nuestra web y desde el inicio nos presentó la propuesta y los plazos. Me he sentido en confianza en todo momento porque nos ha estado informando de cada avance. Es una persona cercana y muy comprometida con su trabajo.",
    trabajo: "Cliente de edición de vídeo",
  },
];
