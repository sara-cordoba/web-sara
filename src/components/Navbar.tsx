"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SelectorIdioma from "@/components/SelectorIdioma";
import SugerenciaIdioma from "@/components/SugerenciaIdioma";
import { GALERIA } from "@/data/galeria";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

/* Los enlaces del menú, por idioma.
   En inglés no sale el CV: /perfil solo existe en español, con el PDF en
   español, y un enlace del menú inglés que lleva a una página española es
   un callejón sin salida. */
function paginas(idioma: Idioma) {
  const t = textos(idioma);

  if (idioma === "en") {
    return [
      { href: "/en", label: t.navbar.inicio },
      ...(GALERIA.length > 0
        ? [{ href: "/en/work", label: t.navbar.trabajos }]
        : []),
      { href: "/en/contact", label: t.navbar.contacto },
    ];
  }

  return [
    { href: "/", label: t.navbar.inicio },
    // El enlace a la galería solo aparece cuando hay piezas que enseñar.
    ...(GALERIA.length > 0
      ? [{ href: "/trabajos", label: t.navbar.trabajos }]
      : []),
    // A /perfil se llegaba solo con el enlace directo: quien entra por su
    // cuenta a ver quién es Sara no lo encontraba por ningún sitio.
    { href: "/perfil", label: t.navbar.cv },
    { href: "/contacto", label: t.navbar.contacto },
  ];
}

export default function Navbar({ idioma }: { idioma: Idioma }) {
  const pathname = usePathname();
  const t = textos(idioma);
  const PAGES = paginas(idioma);
  const inicio = idioma === "en" ? "/en" : "/";
  const contacto = idioma === "en" ? "/en/contact" : "/contacto";

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
      <Link href={inicio} className="flex items-center gap-3 cursor-pointer">
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
            {t.navbar.subtitulo}
          </span>
        </div>
      </Link>

      {/* Centrado respecto a la BARRA ENTERA, no respecto al hueco que sobra.
          Sale del reparto del flex y se ancla al 50 % de la barra, así su
          punto medio coincide con el de la cabecera y no se mueve aunque
          cambien de ancho el logo o los botones de los lados. */}
      <nav className="hidden md:flex gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
        {/* El md:mr-3 se suma al gap-2 del grupo: 20 px hasta el botón, para
            que se lean como dos cosas distintas y no como un apéndice del
            botón. Entre el botón y las tres rayas se quedan los 8 px de
            siempre, que eso en móvil no se toca.
            En la barra solo desde tablet: en móvil no cabe y se va al
            desplegable, más abajo. */}
        <SelectorIdioma idioma={idioma} className="hidden md:flex md:mr-3" />

        <Link
          href={contacto}
          className="group inline-flex items-center gap-2 bg-lime text-green font-semibold text-[13px] px-[18px] py-[10px] rounded-[10px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px"
        >
          {/* En el perfil profesional lo lee quien contrata, no quien compra:
              ahí el botón no puede decir "¡Hablemos!". */}
          {pathname === "/perfil" ? t.navbar.ctaPerfil : t.navbar.cta}
          <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
            →
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-label={menuAbierto ? t.navbar.cerrarMenu : t.navbar.abrirMenu}
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
        aria-label={t.navbar.menuPrincipal}
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

        {/* El selector, para móvil. Va al final y separado por una raya:
            es un ajuste de la página, no un sitio al que ir. */}
        <div className="flex items-center gap-3 mt-1 px-3 py-3 border-t border-border">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
            {t.idioma.etiqueta}
          </span>
          <SelectorIdioma idioma={idioma} />
        </div>
      </nav>

      {/* Se cuelga del header, que es fijo, para caer justo debajo de la barra
          sin tener que saber cuánto mide. Si el menú de móvil está abierto no
          sale: los dos ocupan el mismo sitio. */}
      {!menuAbierto && <SugerenciaIdioma idioma={idioma} />}
    </header>
  );
}
