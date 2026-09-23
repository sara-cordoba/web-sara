"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { textos } from "@/i18n";
import { otraVersion, type Idioma } from "@/i18n/config";
import {
  idiomaRecordado,
  navegadorEnIngles,
  recordarIdioma,
} from "@/i18n/preferencia";

/**
 * Le ofrece la versión inglesa a quien llega a una página española con el
 * navegador en inglés, o a quien ya eligió inglés en otra visita.
 *
 * NO REDIRIGE. Ofrece un enlace y se puede cerrar. Quien cierra está diciendo
 * que se queda en español, así que se apunta y no se le vuelve a preguntar.
 *
 * Se decide en el navegador, después de pintar: el HTML que se sirve y que
 * ve Google es exactamente el mismo con barra o sin ella.
 */
export default function SugerenciaIdioma({ idioma }: { idioma: Idioma }) {
  const ruta = usePathname();
  const [visible, setVisible] = useState(false);
  const t = textos(idioma);

  useEffect(() => {
    // Solo se ofrece el inglés a quien está leyendo en español.
    if (idioma !== "es") return;

    const recordado = idiomaRecordado();
    if (recordado === "es") return;

    if (recordado === "en" || navegadorEnIngles()) setVisible(true);
  }, [idioma]);

  if (!visible) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-12 py-[10px] border-b border-border text-[12px] animate-page-fade"
      style={{
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        /* Casi opaco, igual que el menú de móvil: cae encima del contenido. */
        background: "rgba(6, 6, 7, 0.985)",
      }}
    >
      <span className="text-text-soft">{t.sugerencia.texto}</span>
      <a
        href={otraVersion(ruta, "en")}
        onClick={() => recordarIdioma("en")}
        className="group inline-flex items-center gap-1.5 text-lime font-medium border-b border-lime/30 pb-px hover:border-lime transition-colors"
      >
        {t.sugerencia.enlace}
        <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
          →
        </span>
      </a>
      <button
        type="button"
        onClick={() => {
          // Cerrar es elegir español: así no vuelve a salir nunca más.
          recordarIdioma("es");
          setVisible(false);
        }}
        aria-label={t.sugerencia.cerrar}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 grid place-items-center rounded-lg text-text-muted hover:text-lime hover:bg-[rgba(163,217,119,0.08)] transition-colors cursor-pointer bg-transparent border-0"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M4 4l12 12" />
          <path d="M16 4L4 16" />
        </svg>
      </button>
    </div>
  );
}
