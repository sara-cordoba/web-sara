// Las fuentes, en un solo sitio.
//
// Están fuera de los layouts porque ahora hay dos (uno por idioma) y las dos
// versiones tienen que cargar exactamente las mismas: si cada layout las
// declarase por su cuenta, next/font las serviría dos veces.

import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// La monoespaciada solo se usa en etiquetas pequeñas, así que se queda fuera
// del camino crítico: no se precarga y no compite con el titular al abrir.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

/** Lo que va en el className del <html>. Igual en los dos idiomas. */
export const CLASES_FUENTES = `${spaceGrotesk.variable} ${jetbrainsMono.variable}`;
