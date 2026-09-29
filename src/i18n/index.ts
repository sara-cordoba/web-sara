import type { Idioma } from "./config";
import { ca } from "./ca";
import { en } from "./en";
import { es, type Diccionario } from "./es";

export type { Diccionario };

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, ca, en };

/** Los textos del idioma que toque. Es la única puerta de entrada. */
export function textos(idioma: Idioma): Diccionario {
  return DICCIONARIOS[idioma];
}
