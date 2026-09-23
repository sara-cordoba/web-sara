// El idioma que ha elegido el visitante, recordado entre visitas.
//
// Se guarda en localStorage del propio navegador y NO en una cookie: nadie
// lo lee en el servidor, no sale de ahí y así no hay que tocar la política
// de cookies. Tampoco se usa para nada más que para saber si hay que
// ofrecerle la versión inglesa.
//
// NUNCA redirige. Lo elegido solo cambia lo que ofrece la barra de arriba;
// quien entra por un enlace concreto se queda en la página a la que ha
// entrado, esté en el idioma que esté.

import { IDIOMAS, type Idioma } from "./config";

const CLAVE = "idioma";

function esIdioma(valor: string | null): valor is Idioma {
  return valor !== null && (IDIOMAS as readonly string[]).includes(valor);
}

/** Se llama al pulsar el selector de la cabecera. */
export function recordarIdioma(idioma: Idioma) {
  try {
    window.localStorage.setItem(CLAVE, idioma);
  } catch {
    // Navegación privada o almacenamiento bloqueado: no pasa nada, el
    // selector sigue funcionando, solo que no se acuerda para la próxima.
  }
}

/** null si todavía no ha elegido nunca. */
export function idiomaRecordado(): Idioma | null {
  try {
    const guardado = window.localStorage.getItem(CLAVE);
    return esIdioma(guardado) ? guardado : null;
  } catch {
    return null;
  }
}

/**
 * Si el navegador está puesto en inglés.
 * Se mira SOLO el idioma principal, no la lista entera: mucha gente en
 * España tiene el inglés de segundo y no por eso quiere leer en inglés.
 */
export function navegadorEnIngles(): boolean {
  try {
    return (window.navigator.language || "").toLowerCase().startsWith("en");
  } catch {
    return false;
  }
}
