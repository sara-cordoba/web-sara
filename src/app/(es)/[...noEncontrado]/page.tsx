import { notFound } from "next/navigation";

/* Cualquier dirección que no sea una página de la web cae aquí.
 *
 * Solo sirve para una cosa: que el 404 se pinte DENTRO del marco español,
 * con su cabecera y su <html lang="es">, como se pintaba cuando había un
 * único layout raíz. Sin esto, Next sirve su 404 pelado.
 *
 * No enseña nada por su cuenta: llama a notFound() y la página que se ve es
 * (es)/not-found.tsx, con su 404 de siempre. */
export default function RutaNoEncontrada() {
  notFound();
}
