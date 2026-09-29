// El contenido de src/data/ en el idioma que toque.
//
// Los componentes piden aquí la lista ya traducida y no tienen que saber
// qué idiomas hay. Las traducciones de cada idioma siguen en su archivo:
// contenido-ca.ts y contenido-en.ts. El español es el original y va tal cual.

import { GALERIA } from "@/data/galeria";
import { ALCANCE, TESTIMONIOS } from "@/data/testimonios";
import { SOLUTIONS, WORKS } from "@/data/v3";
import type { Idioma } from "./config";
import {
  ALCANCE_CA,
  piezaCa,
  servicioCa,
  testimonioCa,
  trabajoCa,
} from "./contenido-ca";
import {
  ALCANCE_EN,
  piezaEn,
  servicioEn,
  testimonioEn,
  trabajoEn,
} from "./contenido-en";

/** Traduce cada elemento con la función de su idioma; en español, nada. */
function traducir<T>(
  lista: T[],
  idioma: Idioma,
  por: { ca: (x: T) => T; en: (x: T) => T },
): T[] {
  return idioma === "es" ? lista : lista.map(por[idioma]);
}

export const trabajosPara = (idioma: Idioma) =>
  traducir(WORKS, idioma, { ca: trabajoCa, en: trabajoEn });

export const serviciosPara = (idioma: Idioma) =>
  traducir(SOLUTIONS, idioma, { ca: servicioCa, en: servicioEn });

export const testimoniosPara = (idioma: Idioma) =>
  traducir(TESTIMONIOS, idioma, { ca: testimonioCa, en: testimonioEn });

export const piezasPara = (idioma: Idioma) =>
  traducir(GALERIA, idioma, { ca: piezaCa, en: piezaEn });

export const alcancePara = (idioma: Idioma) =>
  ({ es: ALCANCE, ca: ALCANCE_CA, en: ALCANCE_EN })[idioma];
