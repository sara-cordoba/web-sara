import type { Idioma } from "./config";
import { en } from "./en";
import { es, type Diccionario } from "./es";

export type { Diccionario };

/** Los textos del idioma que toque. Es la única puerta de entrada. */
export function textos(idioma: Idioma): Diccionario {
  return idioma === "en" ? en : es;
}
