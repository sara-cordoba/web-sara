"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CARPETA_GALERIA,
  esVideo,
  portadaDe,
  type Pieza,
} from "@/data/galeria";

/* Las cuatro primeras se cargan enseguida porque son las que se ven al entrar.
   El resto se carga sola según se baja, para no penalizar la velocidad. */
const CARGA_INMEDIATA = 4;

const ruta = (archivo: string) => `${CARPETA_GALERIA}/${archivo}`;

/* Por defecto la pieza llena la casilla y se recorta por los lados. Las que
   se marcan como "completa" se ven enteras, con aire alrededor. */
const encajeDe = (p: Pieza) =>
  p.encaje === "completa" ? "object-contain" : "object-cover";

export default function Galeria({ piezas }: { piezas: Pieza[] }) {
  const [abierta, setAbierta] = useState<number | null>(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (paso: number) =>
      setAbierta((i) =>
        i === null ? null : (i + paso + piezas.length) % piezas.length,
      ),
    [piezas.length],
  );

  // Teclado: Esc cierra, flechas pasan de una a otra.
  useEffect(() => {
    if (abierta === null) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", alPulsar);
    // Mientras está ampliada, la página de detrás no se mueve.
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = overflowPrevio;
    };
  }, [abierta, cerrar, mover]);

  if (piezas.length === 0) return null;

  const pieza = abierta === null ? null : piezas[abierta];

  return (
    <>
      <ul className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-0 m-0 list-none">
        {piezas.map((p, i) => (
          <li
            key={p.archivo}
            className={p.destacada ? "col-span-2 row-span-2" : undefined}
          >
            <button
              type="button"
              onClick={() => setAbierta(i)}
              aria-label={`Ampliar: ${p.titulo}`}
              className="group block w-full text-left cursor-pointer bg-transparent border-0 p-0"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[12px] border border-border bg-surface transition-all duration-[350ms] ease-smooth group-hover:border-border-strong group-hover:-translate-y-0.5 group-focus-visible:border-lime">
                {esVideo(p.archivo) ? (
                  <VideoEnRejilla pieza={p} inmediata={i === 0} />
                ) : (
                  <Image
                    src={ruta(p.archivo)}
                    alt={p.alt || p.titulo}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={i < CARGA_INMEDIATA}
                    loading={i < CARGA_INMEDIATA ? undefined : "lazy"}
                    className={`${encajeDe(p)} transition-transform duration-[600ms] ease-smooth group-hover:scale-[1.04]`}
                  />
                )}
                <span
                  className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45"
                  aria-hidden
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-lime border border-lime/40 rounded-full px-3 py-1.5 bg-black/60">
                    Ampliar
                  </span>
                </span>
              </div>
              <div className="mt-2.5 px-0.5">
                <div className="text-text text-[13px] font-medium leading-snug">
                  {p.titulo}
                </div>
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted mt-1">
                  {p.tipo}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {pieza &&
        montado &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={pieza.titulo}
            onClick={cerrar}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 sm:p-8 bg-black/92 animate-page-fade"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 grid place-items-center rounded-full border border-border-strong text-text text-xl bg-black/60 hover:border-lime hover:text-lime transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            {piezas.length > 1 && (
              <>
                <FlechaAmpliada
                  lado="izquierda"
                  onClick={(e) => {
                    e.stopPropagation();
                    mover(-1);
                  }}
                />
                <FlechaAmpliada
                  lado="derecha"
                  onClick={(e) => {
                    e.stopPropagation();
                    mover(1);
                  }}
                />
              </>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1100px] h-[64vh] sm:h-[72vh]"
            >
              {esVideo(pieza.archivo) ? (
                <VideoAmpliado pieza={pieza} />
              ) : (
                <Image
                  src={ruta(pieza.archivo)}
                  alt={pieza.alt || pieza.titulo}
                  fill
                  sizes="(max-width: 640px) 92vw, 1100px"
                  quality={92}
                  className="object-contain"
                />
              )}
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-5 text-center max-w-[600px]"
            >
              <div className="text-text text-[17px] font-semibold">
                {pieza.titulo}
              </div>
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted mt-1.5">
                {pieza.tipo}
              </div>
              {piezas.length > 1 && (
                <div className="font-mono text-[11px] text-text-dim mt-3 tabular-nums">
                  {(abierta ?? 0) + 1} / {piezas.length}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

/* En la rejilla los vídeos van mudos y en bucle, y solo se reproducen mientras
   se ven en pantalla: así no se descargan todos a la vez ni se calienta el
   móvil con los que están fuera de cuadro. Hasta que arrancan se ve la imagen
   de portada. */
function VideoEnRejilla({
  pieza,
  inmediata,
}: {
  pieza: Pieza;
  inmediata: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  /* La portada de un vídeo NO se carga sola de forma diferida: el navegador se
     la descarga aunque el vídeo esté fuera de pantalla. Por eso solo se le pone
     la portada a la primera pieza y a las que se acercan al borde de la
     pantalla; si no, se descargan las cinco nada más entrar. */
  const [cerca, setCerca] = useState(inmediata);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Quien pide menos animación recibe la portada, pero quieta.
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Dos vigilantes distintos, porque no cuestan lo mismo:
    // la portada pesa 35 kB y conviene tenerla lista antes de que la pieza
    // asome; el vídeo pesa 250 kB y no se descarga hasta que se ve de verdad.
    const vigilaPortada = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) setCerca(true);
      },
      { threshold: 0.01, rootMargin: "300px 0px" },
    );
    const vigilaReproduccion = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          if (!sinMovimiento) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    vigilaPortada.observe(video);
    vigilaReproduccion.observe(video);
    return () => {
      vigilaPortada.disconnect();
      vigilaReproduccion.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={cerca ? ruta(portadaDe(pieza.archivo)) : undefined}
      aria-label={pieza.alt || pieza.titulo}
      className={`absolute inset-0 w-full h-full ${encajeDe(pieza)} transition-transform duration-[600ms] ease-smooth group-hover:scale-[1.04]`}
    >
      <source src={ruta(pieza.archivo)} type="video/mp4" />
    </video>
  );
}

/* Ampliado sí lleva sonido y controles. Si el navegador no deja arrancar con
   sonido, se reintenta en silencio para que al menos se vea. */
function VideoAmpliado({ pieza }: { pieza: Pieza }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  return (
    <video
      key={pieza.archivo}
      ref={ref}
      controls
      loop
      playsInline
      preload="auto"
      poster={ruta(portadaDe(pieza.archivo))}
      aria-label={pieza.alt || pieza.titulo}
      className="absolute inset-0 w-full h-full object-contain"
    >
      <source src={ruta(pieza.archivo)} type="video/mp4" />
    </video>
  );
}

function FlechaAmpliada({
  lado,
  onClick,
}: {
  lado: "izquierda" | "derecha";
  onClick: (e: React.MouseEvent) => void;
}) {
  const esIzquierda = lado === "izquierda";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={esIzquierda ? "Anterior" : "Siguiente"}
      className={
        "absolute top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full border border-border-strong text-text text-lg bg-black/60 hover:border-lime hover:text-lime transition-colors cursor-pointer z-10 " +
        (esIzquierda ? "left-3 sm:left-6" : "right-3 sm:right-6")
      }
    >
      {esIzquierda ? "←" : "→"}
    </button>
  );
}
