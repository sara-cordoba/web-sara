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

/** Cuánto se ve cada imagen. El fundido entre dos dura 0,9 s (ver la clase
 *  duration-[900ms] de abajo). */
const VISIBLE_MS = 3000;

/** Lo que tarda el PRIMER cambio desde que la ficha aparece con el scroll.
 *  Es más corto que los siguientes a propósito: así se ve enseguida que la
 *  ficha pasa imágenes, en vez de parecer una captura quieta. */
const PRIMERA_MS = 1000;

/** Lo que espera de más la columna de la derecha, para que las dos fichas de
 *  una fila no cambien a la vez. */
const RETRASO_COLUMNA_MS = 400;

/** La rejilla de fichas pasa a dos columnas en `lg`. Si se cambia el
 *  `lg:grid-cols-2` de Works.tsx, hay que cambiar esto con ello. */
const DOS_COLUMNAS = "(min-width: 1024px)";

/* El pase de imágenes de la portada de cada ficha de proyecto.

   - Fundido de opacidad y nada más: sin deslizar ni ampliar.
   - La primera imagen carga como cualquier otra de la página. Las demás no
     se montan (ni se descargan) hasta que la ficha está a punto de asomar.
   - Arranca solo en cuanto se ve un 30 % de la ficha, sin tocar nada: el
     ratón no lo arranca ni lo para. Se para cuando la ficha deja de verse y
     cuando la pestaña no está activa.
   - Solo pasa a una imagen que ya ha cargado: nunca funde a un hueco negro.
   - Con "reducir movimiento" activado no hay pase: se queda la primera.
   - `columna` es la columna que ocupa la ficha en la rejilla. El desfase
     depende SOLO de eso, no de la posición en la lista: con una columna
     (móvil) no espera ninguna, y con dos, la de la derecha espera 0,7 s. Así
     la séptima ficha arranca igual de rápido que la primera. */
export default function PaseImagenes({
  fotos,
  columna = 0,
  sizes,
}: {
  fotos: Diapositiva[];
  columna?: number;
  sizes: string;
}) {
  const [actual, setActual] = useState(0);
  // Hasta saber si el sistema pide menos movimiento, se asume que sí: así el
  // HTML del servidor y el primer pintado nunca arrancan el pase.
  const [reducido, setReducido] = useState(true);
  const [vista, setVista] = useState(false); // ha entrado en pantalla alguna vez
  // Empieza en false a propósito: mientras no se sepa el ancho, nadie espera.
  const [dosColumnas, setDosColumnas] = useState(false);
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

  // Cuántas columnas hay de verdad ahora mismo. En una sola columna no tiene
  // sentido desfasar nada: no hay ninguna ficha al lado con la que chocar.
  useEffect(() => {
    const mq = window.matchMedia(DOS_COLUMNAS);
    const alCambiar = () => setDosColumnas(mq.matches);
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

  // Dos observadores: uno, con margen, solo monta (descarga) las imágenes un
  // poco antes de que la ficha asome, para que la segunda ya esté lista; el
  // otro arranca y para el pase cuando se ve al menos un 30 % de la ficha.
  useEffect(() => {
    const el = caja.current;
    if (!hayPase || !el) return;
    const cerca = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVista(true);
      },
      { rootMargin: "300px 0px" },
    );
    const visible = new IntersectionObserver(
      ([e]) => setEnPantalla(e.isIntersecting && e.intersectionRatio >= 0.3),
      { threshold: [0, 0.3] },
    );
    cerca.observe(el);
    visible.observe(el);
    return () => {
      cerca.disconnect();
      visible.disconnect();
    };
  }, [hayPase]);

  const retraso = dosColumnas ? columna * RETRASO_COLUMNA_MS : 0;

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
    t = setTimeout(pasar, PRIMERA_MS + retraso);
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
              "absolute inset-0 transition-opacity duration-[900ms] ease-in-out " +
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
