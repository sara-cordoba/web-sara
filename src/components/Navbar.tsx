"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { GALERIA } from "@/data/galeria";

const PAGES = [
  { href: "/", label: "Inicio" },
  // El enlace a la galería solo aparece cuando hay piezas que enseñar.
  ...(GALERIA.length > 0 ? [{ href: "/trabajos", label: "Trabajos" }] : []),
  // A /perfil se llegaba solo con el enlace directo: quien entra por su
  // cuenta a ver quién es Sara no lo encontraba por ningún sitio.
  { href: "/perfil", label: "CV" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();

  /* En móvil los cuatro enlaces no caben en la barra al lado del logo y del
     botón, así que van detrás de un desplegable. La barra no cambia de alto:
     el contenido de todas las páginas empieza a una altura fija. */
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Al cambiar de página el menú se cierra solo, que si no se queda abierto
  // tapando la página a la que acabas de entrar.
  useEffect(() => setMenuAbierto(false), [pathname]);

  useEffect(() => {
    if (!menuAbierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAbierto(false);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [menuAbierto]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-5 py-[14px] border-b border-border md:px-5 md:py-[14px]"
      style={{
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        background: "rgba(6, 6, 7, 0.72)",
      }}
    >
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <div
          className="w-9 h-9 rounded-[10px] grid place-items-center text-green font-bold text-[14px] tracking-[-0.02em] shadow-glow-lime"
          style={{
            background: "linear-gradient(135deg, #a3d977, #6fa44a)",
          }}
        >
          SC
        </div>
        <div className="flex flex-col leading-[1.1]">
          <b className="font-semibold text-text text-[14px] tracking-[-0.01em]">
            Sara Córdoba
          </b>
          <span className="text-[11px] text-text-muted tracking-[0.02em] mt-[2px] hidden md:inline">
            Webs, marca y contenido
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex gap-1">
        {PAGES.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.href}
              href={p.href}
              className={clsx(
                "text-[13px] font-medium px-[14px] py-2 rounded-lg transition-colors duration-[250ms]",
                active
                  ? "text-lime bg-[rgba(163,217,119,0.08)]"
                  : "text-text-soft hover:text-text hover:bg-[rgba(163,217,119,0.05)]"
              )}
            >
              {p.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href="/contacto"
          className="group inline-flex items-center gap-2 bg-lime text-green font-semibold text-[13px] px-[18px] py-[10px] rounded-[10px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px"
        >
          {/* En el perfil profesional lo lee quien contrata, no quien compra:
              ahí el botón no puede decir "¡Hablemos!". */}
          {pathname === "/perfil" ? "Contacto" : "¡Hablemos!"}
          <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
            →
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-label={menuAbierto ? "Cerrar el menú" : "Abrir el menú"}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
          className="md:hidden w-10 h-10 -mr-1 grid place-items-center rounded-[10px] text-text-soft hover:text-lime hover:bg-[rgba(163,217,119,0.08)] transition-colors cursor-pointer bg-transparent border-0"
        >
          {/* Tres rayas que se cruzan al abrir. En SVG y no con texto para
              que no baile de tamaño según la fuente que cargue. */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden
          >
            {menuAbierto ? (
              <>
                <path d="M4 4l12 12" />
                <path d="M16 4L4 16" />
              </>
            ) : (
              <>
                <path d="M3 6h14" />
                <path d="M3 10h14" />
                <path d="M3 14h14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* El mismo menú de escritorio, desplegado bajo la barra. Va dentro del
          header, que es fijo, así que se coloca solo justo debajo. */}
      <nav
        id="menu-movil"
        aria-label="Menú principal"
        /* Se abre y se cierra con la clase, NO con el atributo hidden: el
           display:flex de la clase le gana al display:none que el navegador
           le da a [hidden], y el menú se quedaba desplegado siempre tapando
           media página. */
        className={clsx(
          "md:hidden absolute top-full left-0 right-0 flex-col border-b border-border px-3 py-2 animate-page-fade",
          menuAbierto ? "flex" : "hidden"
        )}
        style={{
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          /* Casi opaco, al revés que la barra: el desplegable cae encima del
             contenido y con 0.72 se leía la página por debajo de los enlaces. */
          background: "rgba(6, 6, 7, 0.985)",
        }}
      >
        {PAGES.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.href}
              href={p.href}
              onClick={() => setMenuAbierto(false)}
              className={clsx(
                "text-[15px] font-medium px-3 py-3 rounded-lg transition-colors duration-[250ms]",
                active
                  ? "text-lime bg-[rgba(163,217,119,0.08)]"
                  : "text-text-soft hover:text-text hover:bg-[rgba(163,217,119,0.05)]"
              )}
            >
              {p.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
