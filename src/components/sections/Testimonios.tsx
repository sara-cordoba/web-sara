"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Section, Eyebrow, H2 } from "../ui";
import { TESTIMONIOS } from "@/data/testimonios";

export default function Testimonios() {
  const pista = useRef<HTMLUListElement | null>(null);
  const [indice, setIndice] = useState(0);

  /* El carrusel es una lista que se desplaza de verdad: se puede arrastrar con
     el dedo, con la rueda o con el teclado. Las flechas solo mueven esa misma
     lista, así que si falla el JavaScript se sigue pudiendo leer todo. */
  const irA = useCallback((i: number) => {
    const lista = pista.current;
    if (!lista) return;
    const tarjeta = lista.children[i] as HTMLElement | undefined;
    if (tarjeta) {
      lista.scrollTo({ left: tarjeta.offsetLeft - lista.offsetLeft, behavior: "smooth" });
    }
  }, []);

  const mover = useCallback(
    (paso: number) => {
      const siguiente = Math.min(
        Math.max(indice + paso, 0),
        TESTIMONIOS.length - 1,
      );
      irA(siguiente);
    },
    [indice, irA],
  );

  // Al desplazar, se marca cuál está delante para los puntos de abajo.
  useEffect(() => {
    const lista = pista.current;
    if (!lista) return;
    let pendiente = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => {
        const hijos = Array.from(lista.children) as HTMLElement[];
        const izquierda = lista.scrollLeft + lista.offsetLeft;
        let mejor = 0;
        let distancia = Infinity;
        hijos.forEach((hijo, i) => {
          const d = Math.abs(hijo.offsetLeft - izquierda);
          if (d < distancia) {
            distancia = d;
            mejor = i;
          }
        });
        setIndice(mejor);
      });
    };
    lista.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      lista.removeEventListener("scroll", alDesplazar);
      cancelAnimationFrame(pendiente);
    };
  }, []);

  if (TESTIMONIOS.length === 0) return null;

  const alPrincipio = indice === 0;
  const alFinal = indice >= TESTIMONIOS.length - 1;

  return (
    <Section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <Eyebrow>Lo que dicen</Eyebrow>
          <H2 className="!mb-0">
            Clientes que ya lo <span className="text-lime">tienen hecho</span>.
          </H2>
        </div>
        <div className="hidden sm:flex gap-2 flex-shrink-0">
          <Flecha
            direccion="anterior"
            onClick={() => mover(-1)}
            desactivada={alPrincipio}
          />
          <Flecha
            direccion="siguiente"
            onClick={() => mover(1)}
            desactivada={alFinal}
          />
        </div>
      </div>

      <ul
        ref={pista}
        aria-label="Testimonios de clientes"
        tabIndex={0}
        className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth list-none p-0 m-0 pb-4 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-lime/40 rounded-[16px]"
      >
        {TESTIMONIOS.map((t) => (
          <li
            key={t.cita}
            className="snap-start flex-shrink-0 w-[86%] sm:w-[47%] lg:w-[31.5%]"
          >
            <figure className="h-full m-0 flex flex-col rounded-[16px] border border-lime/15 bg-[#0c0c0c] p-6 sm:p-7">
              <span
                className="font-display text-lime text-[34px] leading-none mb-3"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="m-0 flex-1">
                <p className="text-text text-[15px] sm:text-[16px] leading-relaxed m-0">
                  {t.cita}
                </p>
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted">
                {t.trabajo}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex gap-1.5">
          {TESTIMONIOS.map((t, i) => (
            <button
              key={t.cita}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              aria-current={i === indice}
              className={
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer border-0 " +
                (i === indice
                  ? "w-6 bg-lime"
                  : "w-1.5 bg-text-dim hover:bg-text-muted")
              }
            />
          ))}
        </div>
        <div className="flex sm:hidden gap-2">
          <Flecha
            direccion="anterior"
            onClick={() => mover(-1)}
            desactivada={alPrincipio}
          />
          <Flecha
            direccion="siguiente"
            onClick={() => mover(1)}
            desactivada={alFinal}
          />
        </div>
      </div>
    </Section>
  );
}

function Flecha({
  direccion,
  onClick,
  desactivada,
}: {
  direccion: "anterior" | "siguiente";
  onClick: () => void;
  desactivada: boolean;
}) {
  const esAnterior = direccion === "anterior";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={desactivada}
      aria-label={esAnterior ? "Testimonio anterior" : "Testimonio siguiente"}
      className="w-10 h-10 grid place-items-center rounded-full border border-border-strong text-text transition-colors hover:border-lime hover:text-lime disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border-strong disabled:hover:text-text cursor-pointer bg-transparent"
    >
      {esAnterior ? "←" : "→"}
    </button>
  );
}
