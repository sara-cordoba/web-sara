// Medidas y galerías de las imágenes de proyectos, leídas del disco al
// construir la web. Solo se usa en el servidor (componentes sin "use client").
//
// Las medidas hacen falta para que next/image pinte cada imagen con su
// proporción real, sin recortarla y sin que la página salte al cargar.

import fs from "node:fs";
import path from "node:path";

export type Foto = { src: string; ancho: number; alto: number };

const PUBLIC = path.join(process.cwd(), "public");
const EXTENSIONES = [".webp", ".jpg", ".jpeg", ".png"];

/** Ancho y alto leyendo solo la cabecera del archivo (PNG, JPEG o WebP). */
export function medidas(rutaPublica: string): { ancho: number; alto: number } | null {
  let b: Buffer;
  try {
    b = fs.readFileSync(path.join(PUBLIC, rutaPublica));
  } catch {
    return null;
  }

  // PNG: la cabecera IHDR lleva ancho y alto en los bytes 16 a 23.
  if (b.readUInt32BE(0) === 0x89504e47) {
    return { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20) };
  }

  // WebP: "RIFF....WEBP" y después uno de sus tres formatos.
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const tipo = b.toString("ascii", 12, 16);
    if (tipo === "VP8 ") {
      return { ancho: b.readUInt16LE(26) & 0x3fff, alto: b.readUInt16LE(28) & 0x3fff };
    }
    if (tipo === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { ancho: (bits & 0x3fff) + 1, alto: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (tipo === "VP8X") {
      return { ancho: b.readUIntLE(24, 3) + 1, alto: b.readUIntLE(27, 3) + 1 };
    }
    return null;
  }

  // JPEG: se recorren los bloques hasta el SOF, que lleva alto y ancho.
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) return null;
      const marca = b[i + 1];
      const largo = b.readUInt16BE(i + 2);
      if (marca >= 0xc0 && marca <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marca)) {
        return { ancho: b.readUInt16BE(i + 7), alto: b.readUInt16BE(i + 5) };
      }
      i += 2 + largo;
    }
  }

  return null;
}

/** Las imágenes de public/img/proyectos/<carpeta>/galeria, por orden de
 *  nombre. Si la carpeta no existe o está vacía, lista vacía. */
export function galeriaDe(carpeta: string): Foto[] {
  const dir = path.join(PUBLIC, "img", "proyectos", carpeta, "galeria");
  let archivos: string[];
  try {
    archivos = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return archivos
    .filter((a) => EXTENSIONES.includes(path.extname(a).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
    .flatMap((a) => {
      const src = `/img/proyectos/${carpeta}/galeria/${a}`;
      const m = medidas(src);
      return m ? [{ src, ...m }] : [];
    });
}
