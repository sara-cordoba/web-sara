"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Foto } from "@/data/imagenes";

/* El botón "Ver caso" de cada ficha de proyecto y lo que despliega
   (Necesitaba / Hice / Resultado y, si la hay, la galería). Es lo único de la
   ficha que necesita estado, así que va aparte y el resto de la tarjeta se
   queda en el servidor.

   Se despliega animando la fila del grid de 0fr a 1fr: así la altura se
   anima sin tener que medirla. Cerrado, el contenido queda "inert" para que
   el tabulador no se meta en lo que no se ve. */
export default function CasoDesplegable({
  etiqueta,
  galeria = [],
  titulo,
  textosGaleria,
  children,
}: {
  etiqueta: string;
  galeria?: Foto[];
  /** Nombre del proyecto, para el texto alternativo de la galería. */
  titulo: string;
  textosGaleria: { ampliar: string; cerrar: string };
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  // La galería se monta la primera vez que se abre y ya no se desmonta:
  // así sus imágenes no se descargan hasta que alguien quiere verlas.
  const [visto, setVisto] = useState(false);
  const id = useId();
  const panel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (panel.current) panel.current.inert = !abierto;
  }, [abierto]);

  const alternar = () => {
    setAbierto((a) => !a);
    setVisto(true);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={alternar}
        aria-expanded={abierto}
        aria-controls={id}
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted hover:text-lime transition-colors cursor-pointer bg-transparent border-0 p-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime/60 rounded-sm"
      >
        {etiqueta}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={
            "transition-transform duration-300 " + (abierto ? "rotate-180" : "")
          }
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        id={id}
        ref={panel}
        className={
          "grid transition-[grid-template-rows] duration-300 ease-smooth " +
          (abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">
          {children}
          {visto && galeria.length > 0 && (
            <GaleriaCaso
              fotos={galeria}
              titulo={titulo}
              textos={textosGaleria}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* Cuadrícula de 2 columnas (1 en móvil). Cada imagen se ve entera, con su
   proporción. Al pulsarla se amplía; se cierra con Esc, con el botón o
   pulsando fuera de la imagen. */
function GaleriaCaso({
  fotos,
  titulo,
  textos,
}: {
  fotos: Foto[];
  titulo: string;
  textos: { ampliar: string; cerrar: string };
}) {
  const [abierta, setAbierta] = useState<number | null>(null);
  const cerrarBoton = useRef<HTMLButtonElement | null>(null);
  const origen = useRef<HTMLElement | null>(null);

  const cerrar = useCallback(() => setAbierta(null), []);

  useEffect(() => {
    if (abierta === null) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", alPulsar);
    // Mientras está ampliada, la página de detrás no se mueve.
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cerrarBoton.current?.focus();
    return () => {
      window.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = overflowPrevio;
      // Al cerrar, el foco vuelve a la miniatura que la abrió.
      origen.current?.focus();
    };
  }, [abierta, cerrar]);

  const foto = abierta === null ? null : fotos[abierta];
  const alt = (i: number) => `${titulo} · ${i + 1}`;

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 items-start gap-3 list-none p-0 m-0 mt-4 pt-4 border-t border-border">
        {fotos.map((f, i) => (
          <li key={f.src}>
            <button
              type="button"
              onClick={(e) => {
                origen.current = e.currentTarget;
                setAbierta(i);
              }}
              aria-label={`${textos.ampliar}: ${alt(i)}`}
              className="block w-full p-0 bg-transparent border border-border rounded-[10px] overflow-hidden cursor-zoom-in transition-colors hover:border-border-strong focus-visible:outline focus-visible:outline-1 focus-visible:outline-lime"
            >
              <Image
                src={f.src}
                alt={alt(i)}
                width={f.ancho}
                height={f.alto}
                sizes="(max-width: 640px) 90vw, 280px"
                loading="lazy"
                className="block w-full h-auto"
              />
            </button>
          </li>
        ))}
      </ul>

      {foto &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt(abierta ?? 0)}
            onClick={cerrar}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/92 animate-page-fade"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <button
              ref={cerrarBoton}
              type="button"
              onClick={cerrar}
              aria-label={textos.cerrar}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 grid place-items-center rounded-full border border-border-strong text-text text-xl bg-black/60 hover:border-lime hover:text-lime transition-colors cursor-pointer z-10"
            >
              ✕
            </button>
            <Image
              src={foto.src}
              alt={alt(abierta ?? 0)}
              width={foto.ancho}
              height={foto.alto}
              sizes="(max-width: 640px) 92vw, 1100px"
              quality={92}
              onClick={(e) => e.stopPropagation()}
              className="block w-auto h-auto max-w-full max-h-[86vh] rounded-[8px]"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
