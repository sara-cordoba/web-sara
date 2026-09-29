"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Diapositiva = {
  src: string;
  alt: string;
  /** "captura": web apaisada, llena el marco alineada arriba.
   *  "pieza": cuadrada o vertical, entera sobre ella misma difuminada. */
  encaje: "captura" | "pieza";
};

/** Cuánto se ve cada imagen y cuánto dura el fundido entre dos. */
const VISIBLE_MS = 4000;

/* El pase de imágenes de la portada de cada ficha de proyecto.

   - Fundido de opacidad y nada más: sin deslizar ni ampliar.
   - La primera imagen carga como cualquier otra de la página. Las demás no
     se montan (ni se descargan) hasta que la ficha entra en pantalla.
   - Se para cuando la ficha no se ve y cuando la pestaña no está activa.
   - Solo pasa a una imagen que ya ha cargado: nunca funde a un hueco negro.
   - Con "reducir movimiento" activado no hay pase: se queda la primera.
   - `retraso` escalona las fichas para que no cambien todas a la vez. */
export default function PaseImagenes({
  fotos,
  retraso = 0,
  sizes,
}: {
  fotos: Diapositiva[];
  retraso?: number;
  sizes: string;
}) {
  const [actual, setActual] = useState(0);
  // Hasta saber si el sistema pide menos movimiento, se asume que sí: así el
  // HTML del servidor y el primer pintado nunca arrancan el pase.
  const [reducido, setReducido] = useState(true);
  const [vista, setVista] = useState(false); // ha entrado en pantalla alguna vez
  const [enPantalla, setEnPantalla] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState(true);
  // La primera cuenta como cargada: es la que ya se está viendo, y así el
  // pase siempre puede volver a ella al dar la vuelta.
  const cargadas = useRef<Set<number>>(new Set([0]));
  const caja = useRef<HTMLDivElement | null>(null);

  const hayPase = fotos.length > 1 && !reducido;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const alCambiar = () => setReducido(mq.matches);
    alCambiar();
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, []);

  useEffect(() => {
    const alCambiar = () => setPestanaActiva(!document.hidden);
    alCambiar();
    document.addEventListener("visibilitychange", alCambiar);
    return () => document.removeEventListener("visibilitychange", alCambiar);
  }, []);

  useEffect(() => {
    if (!hayPase || !caja.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setEnPantalla(e.isIntersecting);
        if (e.isIntersecting) setVista(true);
      },
      // Un poco antes de que asome, para que la segunda ya esté lista.
      { rootMargin: "200px 0px" },
    );
    obs.observe(caja.current);
    return () => obs.disconnect();
  }, [hayPase]);

  useEffect(() => {
    if (!hayPase || !enPantalla || !pestanaActiva) return;
    let t: ReturnType<typeof setTimeout>;
    const pasar = () => {
      setActual((a) => {
        const n = (a + 1) % fotos.length;
        return cargadas.current.has(n) ? n : a;
      });
      t = setTimeout(pasar, VISIBLE_MS);
    };
    t = setTimeout(pasar, VISIBLE_MS + retraso);
    return () => clearTimeout(t);
  }, [hayPase, enPantalla, pestanaActiva, fotos.length, retraso]);

  return (
    <div ref={caja} className="absolute inset-0">
      {fotos.map((f, i) => {
        // La primera siempre; el resto, solo con pase y una vez vista la ficha.
        if (i > 0 && !(hayPase && vista)) return null;
        const visible = i === actual;
        return (
          <div
            key={f.src}
            aria-hidden={!visible}
            className={
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out " +
              (visible ? "opacity-100" : "opacity-0")
            }
          >
            <Capa
              foto={f}
              sizes={sizes}
              // Las que se montan al ver la ficha se piden ya, sin esperar.
              eager={i > 0}
              alCargar={() => cargadas.current.add(i)}
            />
          </div>
        );
      })}
    </div>
  );
}

function Capa({
  foto,
  sizes,
  eager,
  alCargar,
}: {
  foto: Diapositiva;
  sizes: string;
  eager: boolean;
  alCargar: () => void;
}) {
  const carga = eager ? "eager" : undefined;

  if (foto.encaje === "captura") {
    return (
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes={sizes}
        loading={carga}
        onLoad={alCargar}
        className="object-cover object-top"
      />
    );
  }

  return (
    <>
      {/* Detrás, la misma imagen difuminada y oscura para que no queden
          franjas negras. Se sale un poco del hueco para que el difuminado no
          deje un borde claro; así no hace falta ampliarla. */}
      <div className="absolute -inset-6" aria-hidden>
        <Image
          src={foto.src}
          alt=""
          fill
          sizes={sizes}
          quality={40}
          loading={carga}
          className="object-cover blur-xl brightness-[0.45]"
        />
      </div>
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes={sizes}
        loading={carga}
        onLoad={alCargar}
        className="object-contain"
      />
    </>
  );
}
