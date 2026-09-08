// Comparaciones antes / después: la web vieja frente a la nueva.
//
// CÓMO AÑADIR UN CASO:
//
//   1. Deja las dos capturas en  public/img/antes-despues/
//      Las dos DEL MISMO TAMAÑO, o el deslizador enseñará trozos desalineados.
//      Lo suyo: 1600x1000 px, en .webp, y encuadrando lo mismo en las dos.
//      Si la web vieja ya no existe, vale una captura del Internet Archive
//      (web.archive.org) — pero entonces dilo en la nota.
//
//   2. Añade el caso a la lista de abajo.
//
// Mientras la lista esté vacía, la sección no se enseña en ninguna página.

export type Comparacion = {
  /** Nombre del proyecto o del tipo de negocio. */
  titulo: string;
  /** Archivo de la captura vieja, dentro de public/img/antes-despues/ */
  antes: string;
  /** Archivo de la captura nueva. */
  despues: string;
  /** Opcional: una línea de qué cambió. */
  nota?: string;
};

export const CARPETA_ANTES_DESPUES = "/img/antes-despues";

// TODO (Sara): faltan las capturas. Preparado para tres casos.
export const COMPARACIONES: Comparacion[] = [];
