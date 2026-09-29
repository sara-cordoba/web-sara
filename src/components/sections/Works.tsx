import Image from "next/image";
import { Section, Eyebrow, H2 } from "../ui";
import { WORKS, type Work } from "@/data/v3";
import { textos, type Diccionario } from "@/i18n";
import type { Idioma } from "@/i18n/config";
import { trabajoEn } from "@/i18n/contenido-en";
import CasoDesplegable from "@/components/CasoDesplegable";
import { galeriaDe } from "@/data/imagenes";

type Props = {
  idioma?: Idioma;
  eyebrow?: string;
  heading?: React.ReactNode;
};

export default function Works({ idioma = "es", eyebrow, heading }: Props) {
  const t = textos(idioma);
  // Siempre por la lista española: una ficha sin traducir sale en español,
  // que es mejor que no salir.
  const trabajos = idioma === "en" ? WORKS.map(trabajoEn) : WORKS;

  return (
    <Section>
      <Eyebrow>{eyebrow ?? t.works.eyebrow}</Eyebrow>
      <H2 className="whitespace-nowrap !max-w-none">
        {heading ?? (
          <>
            {t.works.h2.antes}
            <span className="text-lime">{t.works.h2.destacado}</span>
            {t.works.h2.despues}
          </>
        )}
      </H2>
      {/* Filas de la misma altura. Mientras hay un caso abierto, la rejilla
          alinea arriba: así solo crece esa tarjeta y la de al lado no se
          estira. Como cerradas miden todas lo mismo (ver Ficha), el cambio
          no mueve nada más. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-[60px] has-[[aria-expanded=true]]:items-start">
        {trabajos.map((w) => (
          <Ficha key={w.title} work={w} t={t} />
        ))}
      </div>
    </Section>
  );
}

// Los efectos de pasar el ratón solo donde hay ratón, con el prefijo
// [@media(hover:hover)]: en el móvil el "hover" se queda pegado al tocar y la
// tarjeta se ve movida. Las clases van escritas enteras, sin montarlas con
// variables: Tailwind solo genera las que encuentra tal cual en el código.

/* Todas las fichas miden lo mismo cerradas, tengan el texto que tengan:
   imagen 16:9, nombre en una línea, dos líneas reservadas para fecha y
   etiquetas, la frase de resultado cortada a dos líneas (y con dos
   reservadas), y el hueco de "Ver la web" aunque el proyecto no tenga web. */
function Ficha({ work: w, t }: { work: Work; t: Diccionario }) {
  // La galería del caso vive en public/img/proyectos/<carpeta>/galeria, y la
  // carpeta se llama como la imagen de la tarjeta: cronos.webp -> cronos/.
  const carpeta = w.imagen?.split("/").pop()?.replace(/\.[^.]+$/, "");
  const galeria = carpeta ? galeriaDe(carpeta) : [];

  return (
    <article className="flex flex-col rounded-[16px] border border-border bg-[#0c0c0c] p-5 sm:p-6 transition-all duration-[350ms] ease-smooth shadow-[0_0_50px_-15px_rgba(163,217,119,0.10)] [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:border-lime/40 [@media(hover:hover)]:hover:shadow-[0_0_60px_-12px_rgba(163,217,119,0.25)]">
      {w.imagen && <Captura work={w} />}

      <header className={`flex items-center gap-4 ${w.imagen ? "mt-5" : ""}`}>
        <Logo work={w} />
        <div className="min-w-0">
          <h3 className="text-text text-[17px] font-semibold tracking-[-0.01em] m-0 leading-tight truncate">
            {w.title}
          </h3>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted mt-1.5 leading-[1.5] min-h-[3em]">
            {w.year} · {w.type}
          </div>
        </div>
      </header>

      <p className="m-0 mt-4 text-text-soft/85 text-[14px] leading-relaxed line-clamp-2 min-h-[3.25em]">
        {w.resultado}
      </p>

      {/* Abajo del todo, en todas a la misma altura. */}
      <div className="mt-auto">
        <CasoDesplegable
          etiqueta={t.works.verCaso}
          galeria={galeria}
          titulo={w.title}
          textosGaleria={{ ampliar: t.galeria.ampliar, cerrar: t.galeria.cerrar }}
        >
          <dl className="m-0 mt-3 flex flex-col gap-3">
            <Linea etiqueta={t.works.necesitaba}>{w.necesitaba}</Linea>
            <Linea etiqueta={t.works.hice}>{w.hice}</Linea>
            <Linea etiqueta={t.works.resultado}>{w.resultado}</Linea>
          </dl>
        </CasoDesplegable>

        {/* El hueco del enlace existe siempre: sin web, se queda vacío y la
            ficha mide lo mismo que las demás. */}
        <div className="mt-4 h-6 flex items-center">
          {w.url && (
            <a
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/enlace inline-flex items-center gap-2 text-lime font-medium text-[14px] border-b border-lime/30 pb-0.5 hover:border-lime transition-colors"
            >
              {t.works.verWeb}
              <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover/enlace:translate-x-[3px]">
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* La imagen grande de la ficha, dentro de un marco de navegador con un hueco
   16:9 igual para todas.
   En la barra va el dominio SOLO si la ficha tiene url aprobada; si no, el
   nombre del proyecto: no se publica la dirección de ningún cliente que no
   la haya autorizado. Ajedrez Sistémico no tiene url a propósito y así debe
   seguir: en su barra solo sale "Ajedrez Sistémico".

   Capturas de web: llenan el hueco y se alinean arriba, sin ampliar.
   Piezas cuadradas o verticales: enteras, sobre ellas mismas difuminadas y
   oscurecidas para que no queden franjas negras a los lados. */
function Captura({ work: w }: { work: Work }) {
  const barra = w.url
    ? new URL(w.url).hostname.replace(/^www\./, "")
    : w.title;
  const sizes = "(max-width: 1024px) 100vw, 560px";

  return (
    <div className="rounded-[12px] overflow-hidden border border-border bg-black shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-1.5 h-7 px-3 bg-[#141414] border-b border-border">
        <span className="w-2 h-2 rounded-full bg-text-dim/70" aria-hidden />
        <span className="w-2 h-2 rounded-full bg-text-dim/70" aria-hidden />
        <span className="w-2 h-2 rounded-full bg-text-dim/70" aria-hidden />
        <span className="ml-2 min-w-0 truncate font-mono text-[10px] tracking-[0.04em] text-text-muted">
          {barra}
        </span>
      </div>
      <div className="relative aspect-video overflow-hidden">
        {w.encaje === "pieza" ? (
          <>
            {/* Se sale un poco del hueco para que el difuminado no deje un
                borde claro en los lados; así no hace falta ampliarla. */}
            <div className="absolute -inset-6" aria-hidden>
              <Image
                src={w.imagen!}
                alt=""
                fill
                sizes={sizes}
                quality={40}
                className="object-cover blur-xl brightness-[0.45]"
              />
            </div>
            <Image
              src={w.imagen!}
              alt={w.title}
              fill
              sizes={sizes}
              className="object-contain"
            />
          </>
        ) : (
          <Image
            src={w.imagen!}
            alt={w.title}
            fill
            sizes={sizes}
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

/* Algunos proyectos no tienen logo en public/img. En vez de dejar un hueco,
   la ficha enseña la inicial sobre el fondo de marca. */
function Logo({ work: w }: { work: Work }) {
  const base =
    "relative w-[54px] h-[54px] flex-shrink-0 rounded-[12px] overflow-hidden border border-border";

  if (!w.logo) {
    return (
      <div
        className={`${base} grid place-items-center`}
        style={{ background: "linear-gradient(135deg, #0d3b2e, #1a5d45)" }}
        aria-hidden
      >
        <span className="font-display font-semibold text-lime text-[20px]">
          {w.title.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className={base} style={{ backgroundColor: w.logoBg || "#000" }}>
      <Image
        src={w.logo}
        alt={w.title}
        fill
        sizes="54px"
        quality={90}
        className={w.logoFill ? "object-cover" : "object-contain p-2"}
      />
    </div>
  );
}

function Linea({
  etiqueta,
  children,
}: {
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[92px_1fr] gap-0.5 sm:gap-4 border-t border-border pt-3">
      <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted sm:pt-[3px]">
        {etiqueta}
      </dt>
      <dd className="m-0 text-text-soft/85 text-[14px] leading-relaxed">
        {children}
      </dd>
    </div>
  );
}
