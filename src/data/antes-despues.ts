// Comparaciones antes / después: la web vieja frente a la nueva.
//
// ESTADO: montado y sin usar a propósito. No borrar.
//
// De los proyectos que hay, casi ninguno tiene un "antes":
//   · Ser Annora y Ajedrez Sistémico eran webs nuevas, no rediseños.
//     No existe una versión anterior que enseñar.
//   · Cronos AI Consulting sí: hubo dos versiones anteriores hechas en
//     Odoo v17 antes de la web actual. Es el único caso real, y solo se
//     puede montar si aparecen capturas de aquellas.
//
// Donde esto vale de verdad es en la campaña de clientes: ahí el "antes" es
// la web del propio cliente, y el "después" la que se le entrega. Por eso se
// queda hecho y esperando, aunque hoy no se vea en ninguna página.
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

// Vacío a propósito: ver la nota de arriba. Mientras esté así, la sección
// no se enseña en ninguna página.
export const COMPARACIONES: Comparacion[] = [];
