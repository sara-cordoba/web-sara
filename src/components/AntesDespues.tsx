"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CARPETA_ANTES_DESPUES,
  type Comparacion,
} from "@/data/antes-despues";

/* El deslizador es un <input type="range"> de verdad, puesto encima y sin
   pintar. Así funciona con el dedo, con el ratón y con las flechas del
   teclado sin tener que programar nada de eso a mano. */
export default function AntesDespues({ caso }: { caso: Comparacion }) {
  const [posicion, setPosicion] = useState(50);

  const ruta = (archivo: string) => `${CARPETA_ANTES_DESPUES}/${archivo}`;

  return (
    <figure className="m-0">
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[14px] border border-border bg-surface select-none">
        {/* La web nueva, entera, al fondo */}
        <Image
          src={ruta(caso.despues)}
          alt={`${caso.titulo}, la web nueva`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 900px"
          className="object-cover"
        />

        {/* La vieja encima, recortada hasta donde esté el deslizador */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - posicion}% 0 0)` }}
        >
          <Image
            src={ruta(caso.antes)}
            alt={`${caso.titulo}, la web anterior`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 900px"
            className="object-cover"
          />
        </div>

        <Etiqueta lado="izquierda" visible={posicion > 12}>
          Antes
        </Etiqueta>
        <Etiqueta lado="derecha" visible={posicion < 88}>
          Después
        </Etiqueta>

        {/* La línea y el tirador: solo decoración, no reciben clics */}
        <div
          className="absolute inset-y-0 w-[2px] bg-lime pointer-events-none"
          style={{ left: `${posicion}%`, transform: "translateX(-1px)" }}
          aria-hidden
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-lime grid place-items-center text-green font-semibold text-[13px]"
            style={{ boxShadow: "0 0 20px rgba(163,217,119,0.5)" }}
          >
            ←→
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={posicion}
          onChange={(e) => setPosicion(Number(e.target.value))}
          aria-label={`Comparar la web anterior y la nueva de ${caso.titulo}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>

      <figcaption className="mt-3">
        <span className="text-text text-[15px] font-semibold">
          {caso.titulo}
        </span>
        {caso.nota && (
          <span className="block text-text-soft/75 text-[14px] leading-relaxed mt-1">
            {caso.nota}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function Etiqueta({
  lado,
  visible,
  children,
}: {
  lado: "izquierda" | "derecha";
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={
        "absolute top-3 font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-black/70 border border-border-strong text-text pointer-events-none transition-opacity duration-200 " +
        (lado === "izquierda" ? "left-3" : "right-3") +
        (visible ? " opacity-100" : " opacity-0")
      }
      aria-hidden
    >
      {children}
    </span>
  );
}
