// Galería de trabajos.
//
// CÓMO AÑADIR UNA PIEZA (dos pasos):
//
//   1. Deja el archivo en  public/img/galeria/
//      - Imágenes: .webp (o .jpg / .png, se sirven en webp igualmente).
//        Con 1600 px por el lado largo va sobrado.
//      - Vídeos: .mp4 de 864x864. Junto a cada vídeo debe ir una imagen con
//        EL MISMO NOMBRE y extensión .webp: es lo que se ve antes de que
//        arranque. Por ejemplo: mockup-triptico.mp4 + mockup-triptico.webp
//
//   2. Añade una línea a la lista GALERIA de abajo.
//
// Para preparar archivos nuevos hay un ayudante que comprime, convierte y saca
// la portada de los vídeos:   node scripts/preparar-galeria.mjs
//
// La etiqueta de cada pieza es SOLO el tipo de trabajo, sin cliente: muchas
// piezas no dicen para quién son y eso no se inventa.

export const CATEGORIAS = [
  "Identidad visual",
  "Redes sociales",
  "Cartelería",
  "Reels",
  "Web",
  "Presentaciones",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Pieza = {
  /** Nombre del archivo dentro de public/img/galeria/ (.webp o .mp4) */
  archivo: string;
  /** Qué es la pieza. Sale debajo, en la rejilla. */
  titulo: string;
  /** Tipo de trabajo. Es la única etiqueta que se enseña. */
  tipo: Categoria;
  /** Opcional: la pone al doble de tamaño en la rejilla. Para las mejores. */
  destacada?: boolean;
  /**
   * Cómo encaja en la casilla cuadrada de la rejilla.
   * "recortar" (por defecto) llena la casilla y recorta por los lados.
   * "completa" enseña la pieza entera, sin recortar nada. Para las que no son
   * cuadradas y perderían texto al recortarlas.
   */
  encaje?: "recortar" | "completa";
  /** Opcional: descripción para quien navega con lector de pantalla. */
  alt?: string;
};

export const CARPETA_GALERIA = "/img/galeria";

/** Los vídeos se reconocen por la extensión: no hay que marcarlos a mano. */
export function esVideo(archivo: string) {
  return archivo.toLowerCase().endsWith(".mp4");
}

/** Imagen que se ve antes de que arranque el vídeo: mismo nombre, .webp */
export function portadaDe(archivo: string) {
  return archivo.replace(/\.mp4$/i, ".webp");
}

export const GALERIA: Pieza[] = [
  {
    archivo: "diseno-evento.mp4",
    titulo: "Diseño de evento",
    tipo: "Cartelería",
    destacada: true,
  },
  {
    archivo: "post-redes.webp",
    titulo: "Post para redes",
    tipo: "Redes sociales",
  },
  {
    // Es horizontal: recortada a cuadrado se comía el texto de la derecha.
    archivo: "post-redes-2.webp",
    titulo: "Post para redes",
    tipo: "Redes sociales",
    encaje: "completa",
  },
  {
    archivo: "mockup-triptico.mp4",
    titulo: "Tríptico",
    tipo: "Cartelería",
  },
  {
    archivo: "folleto-campana-publicidad.mp4",
    titulo: "Folleto de campaña",
    tipo: "Cartelería",
  },
  {
    archivo: "diseno-curso.mp4",
    titulo: "Diseño de curso",
    tipo: "Redes sociales",
  },
  {
    archivo: "portada-triptico.mp4",
    titulo: "Portada de tríptico",
    tipo: "Cartelería",
  },
];
