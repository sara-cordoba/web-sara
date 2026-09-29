"use client";

import { useId, useState } from "react";

/* El botón "Ver caso" de cada ficha de proyecto y lo que despliega
   (Necesitaba / Hice / Resultado). Es lo único de la ficha que necesita
   estado, así que va aparte y el resto de la tarjeta se queda en el servidor.

   Se despliega animando la fila del grid de 0fr a 1fr: así la altura se
   anima sin tener que medirla. */
export default function CasoDesplegable({
  etiqueta,
  children,
}: {
  etiqueta: string;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
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
        aria-hidden={!abierto}
        className={
          "grid transition-[grid-template-rows] duration-300 ease-smooth " +
          (abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
