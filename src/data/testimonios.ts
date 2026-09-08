// Testimonios de clientes.
//
// Para cambiar uno, se edita aquí y ya está: el carrusel se ajusta solo al
// número que haya. Si la lista se queda vacía, la sección no se enseña.
//
// Se identifican por sector y comarca, no por nombre propio.

export type Testimonio = {
  /** Lo que dijo el cliente, tal cual. */
  cita: string;
  /** Qué tipo de negocio es. */
  negocio: string;
  /** Dónde está. */
  zona: string;
};

export const TESTIMONIOS: Testimonio[] = [
  {
    cita: "No tenía web, solo el perfil de Booking. Ahora la mitad de las reservas entran directas.",
    negocio: "Casa rural",
    zona: "Berguedà",
  },
  {
    cita: "La gente nos encontraba y llamaba para pedir cita. Ahora la piden solas desde la web.",
    negocio: "Clínica dental",
    zona: "Osona",
  },
  {
    cita: "Llevábamos el Instagram a ratos y se notaba. Ahora hay calendario y no depende de que alguien se acuerde.",
    negocio: "Academia de idiomas",
    zona: "Bages",
  },
  {
    cita: "Nuestra web tenía diez años. Para una asesoría eso es una carta de presentación mala.",
    negocio: "Asesoría",
    zona: "Girona",
  },
  {
    cita: "Lo que más valoro es que los textos los escribió ella. Yo no sé venderme por escrito.",
    negocio: "Obrador artesano",
    zona: "Cerdanya",
  },
  {
    cita: "Marca, web y redes con la misma persona. No he tenido que explicar lo mismo tres veces.",
    negocio: "Centro de estética",
    zona: "Vallès",
  },
];
