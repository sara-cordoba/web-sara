// Prepara piezas para la galería: comprime, convierte y saca la portada
// de los vídeos. Necesita ffmpeg instalado.
//
//   node scripts/preparar-galeria.mjs "C:\ruta\a\la\carpeta\con\los\originales"
//
// Deja los archivos listos en public/img/galeria/ :
//   - las imágenes, en .webp de 1600 px como mucho
//   - los vídeos, en .mp4 de 864x864 y bien comprimidos
//   - de cada vídeo, además, un .webp con el mismo nombre: es la imagen que
//     se ve en la rejilla hasta que el vídeo arranca
//
// Después hay que añadir cada pieza a mano en src/data/galeria.ts, que es
// donde se decide el título y el tipo de trabajo.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ORIGEN = process.argv[2];
const DESTINO = path.join(process.cwd(), "public", "img", "galeria");

if (!ORIGEN || !fs.existsSync(ORIGEN)) {
  console.error("Uso: node scripts/preparar-galeria.mjs <carpeta con los originales>");
  process.exit(1);
}

function buscarFfmpeg() {
  const candidatos = ["ffmpeg", "ffmpeg.exe"];
  for (const c of candidatos) {
    try {
      execFileSync(c, ["-version"], { stdio: "ignore" });
      return c;
    } catch {}
  }
  console.error("No encuentro ffmpeg. Instálalo con:  winget install Gyan.FFmpeg");
  process.exit(1);
}

const FFMPEG = buscarFfmpeg();
const correr = (args) => execFileSync(FFMPEG, ["-v", "error", ...args], { stdio: "inherit" });

// nombres sin acentos, sin ñ y sin espacios: viajan mejor por una URL
const limpiar = (nombre) =>
  nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/gi, "n")
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");

fs.mkdirSync(DESTINO, { recursive: true });

const kb = (f) => Math.round(fs.statSync(f).size / 1024);
let antes = 0;
let despues = 0;

for (const archivo of fs.readdirSync(ORIGEN)) {
  const entrada = path.join(ORIGEN, archivo);
  if (!fs.statSync(entrada).isFile()) continue;

  const ext = path.extname(archivo).toLowerCase();
  const base = limpiar(path.basename(archivo, ext));
  antes += kb(entrada);

  if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    const salida = path.join(DESTINO, `${base}.webp`);
    correr(["-i", entrada, "-vf", "scale='min(1600,iw)':-1", "-quality", "82", "-y", salida]);
    despues += kb(salida);
    console.log(`  imagen  ${archivo}  ->  ${base}.webp  (${kb(salida)} kB)`);
  } else if ([".mp4", ".mov", ".webm", ".m4v"].includes(ext)) {
    const video = path.join(DESTINO, `${base}.mp4`);
    const portada = path.join(DESTINO, `${base}.webp`);
    correr(["-i", entrada, "-an", "-vf", "scale=864:864", "-c:v", "libx264",
      "-crf", "30", "-preset", "slow", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", "-y", video]);
    // la portada se saca del segundo 2, que suele ser mas representativo que el 0
    // la portada va a 640 px: en la rejilla se ve a 180, no hace falta más
    correr(["-ss", "2", "-i", entrada, "-frames:v", "1", "-vf", "scale=640:640",
      "-quality", "78", "-y", portada]);
    despues += kb(video) + kb(portada);
    console.log(`  vídeo   ${archivo}  ->  ${base}.mp4 + ${base}.webp  (${kb(video)} + ${kb(portada)} kB)`);
  } else {
    console.log(`  (salto ${archivo}: no sé qué hacer con un ${ext})`);
  }
}

console.log(`\n  ${antes} kB de originales  ->  ${despues} kB listos para la web`);
console.log("  Ahora añade cada pieza en src/data/galeria.ts con su título y su tipo.");
