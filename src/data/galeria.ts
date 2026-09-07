// Galería de trabajos.
//
// CÓMO AÑADIR UNA PIEZA (dos pasos):
//
//   1. Deja la imagen en  public/img/galeria/
//      Lo ideal: 1600 px por el lado largo y menos de 500 kB.
//      Puede ser .webp, .jpg o .png: la web las sirve en webp igualmente.
//
//   2. Añade una línea a la lista GALERIA de abajo con el nombre del archivo.
//
// Nada más. La rejilla, la ampliación al hacer clic y la carga diferida
// ya están hechas. Mientras la lista esté vacía, la galería no se enseña
// y el enlace del menú tampoco aparece: no queda una página vacía colgando.

export type Pieza = {
  /** Nombre del archivo dentro de public/img/galeria/ — p. ej. "cartel-aje.webp" */
  archivo: string;
  /** Lo que es la pieza. Sale debajo de la imagen. */
  titulo: string;
  /** Para quién se hizo. Si no fue para nadie, PROYECTO_PROPIO. */
  cliente: string;
  /** Qué tipo de pieza es: "Cartel", "Identidad", "Redes", "Web", "Vídeo"… */
  tipo: string;
  /** Opcional: la pone al doble de tamaño en la rejilla. Para las mejores. */
  destacada?: boolean;
  /** Opcional: descripción para quien navega con lector de pantalla. */
  alt?: string;
};

export const PROYECTO_PROPIO = "Proyecto propio";

export const CARPETA_GALERIA = "/img/galeria";

// ---------------------------------------------------------------------------
// Las piezas. Ejemplo de cómo queda una línea (borrar el comentario al usarla):
//
//   {
//     archivo: "cartel-aje-madrid.webp",
//     titulo: "Cartel del encuentro anual",
//     cliente: "AJE Madrid",
//     tipo: "Cartel",
//     destacada: true,
//   },
//
// ---------------------------------------------------------------------------
export const GALERIA: Pieza[] = [];

export const hayGaleria = GALERIA.length > 0;
