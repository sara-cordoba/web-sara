"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { textos } from "@/i18n";
import { IDIOMAS, otraVersion, type Idioma } from "@/i18n/config";
import { recordarIdioma } from "@/i18n/preferencia";

const ETIQUETA: Record<Idioma, string> = { es: "ES", en: "EN" };

/**
 * El selector de idioma de la cabecera. Sale en las dos versiones y en todas
 * las páginas.
 *
 * Va con <a> y no con <Link> a propósito: cada idioma tiene su propio layout
 * raíz, con su <html lang>, y eso no se puede cambiar sin recargar la página
 * entera. Un <Link> aquí prometería una navegación instantánea que no existe.
 *
 * En la barra de móvil no cabe: con el logo, el botón de contacto y las tres
 * rayas, la barra se desbordaba y "Sara Córdoba" se partía en dos líneas por
 * debajo de 414 px. Así que de 768 px para abajo el selector se va al
 * desplegable, que es donde ya están los enlaces del menú en móvil. Lo coloca
 * Navbar; aquí solo se recibe la clase que lo esconde o lo enseña.
 */
export default function SelectorIdioma({
  idioma,
  className,
}: {
  idioma: Idioma;
  className?: string;
}) {
  const ruta = usePathname();
  const t = textos(idioma);

  return (
    <div
      role="group"
      aria-label={t.idioma.etiqueta}
      className={clsx(
        "flex items-center rounded-[10px] border border-border-strong overflow-hidden",
        className,
      )}
    >
      {IDIOMAS.map((codigo) => {
        const esElActual = codigo === idioma;
        const clases = clsx(
          "font-mono text-[11px] font-medium px-[7px] py-[6px] leading-none transition-colors duration-[250ms]",
          esElActual
            ? "text-lime bg-[rgba(163,217,119,0.10)]"
            : "text-text-muted hover:text-text hover:bg-[rgba(163,217,119,0.05)]",
        );

        if (esElActual) {
          return (
            <span key={codigo} aria-current="true" className={clases}>
              {ETIQUETA[codigo]}
            </span>
          );
        }

        return (
          <a
            key={codigo}
            href={otraVersion(ruta, codigo)}
            onClick={() => recordarIdioma(codigo)}
            aria-label={
              codigo === "en" ? t.idioma.verEnIngles : t.idioma.verEnEspanol
            }
            className={clases}
          >
            {ETIQUETA[codigo]}
          </a>
        );
      })}
    </div>
  );
}
