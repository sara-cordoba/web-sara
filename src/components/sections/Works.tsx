import Image from "next/image";
import { Section, Eyebrow, H2 } from "../ui";
import { WORKS, type Work } from "@/data/v3";
import { textos, type Diccionario } from "@/i18n";
import type { Idioma } from "@/i18n/config";
import { trabajoEn } from "@/i18n/contenido-en";
import PaseImagenes, { type Diapositiva } from "@/components/PaseImagenes";
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
      {/* Filas de la misma altura: la rejilla estira cada ficha a la más alta
          de su fila, y dentro de la ficha "Ver la web" se pega abajo. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-[60px]">
        {trabajos.map((w, i) => (
          // 0,7 s más de retraso por ficha: así no cambian todas a la vez.
          <Ficha key={w.title} work={w} t={t} retraso={i * 700} />
        ))}
      </div>
    </Section>
  );
}

// Los efectos de pasar el ratón solo donde hay ratón, con el prefijo
// [@media(hover:hover)]: en el móvil el "hover" se queda pegado al tocar y la
// tarjeta se ve movida. Las clases van escritas enteras, sin montarlas con
// variables: Tailwind solo genera las que encuentra tal cual en el código.

/* Imagen, nombre, Necesitaba / Hice / Resultado siempre a la vista y, abajo
   del todo, "Ver la web". Ese hueco existe aunque el proyecto no tenga web,
   para que todas las fichas de una fila acaben igual. */
function Ficha({
  work: w,
  t,
  retraso,
}: {
  work: Work;
  t: Diccionario;
  retraso: number;
}) {
  return (
    <article className="flex flex-col rounded-[16px] border border-border bg-[#0c0c0c] p-5 sm:p-6 transition-all duration-[350ms] ease-smooth shadow-[0_0_50px_-15px_rgba(163,217,119,0.10)] [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:border-lime/40 [@media(hover:hover)]:hover:shadow-[0_0_60px_-12px_rgba(163,217,119,0.25)]">
      {w.imagen && <Captura work={w} retraso={retraso} />}

      <header className={`flex items-center gap-4 ${w.imagen ? "mt-5" : ""}`}>
        <Logo work={w} />
        <div className="min-w-0">
          <h3 className="text-text text-[17px] font-semibold tracking-[-0.01em] m-0 leading-tight truncate">
            {w.title}
          </h3>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted mt-1.5 leading-[1.5]">
            {w.year} · {w.type}
          </div>
        </div>
      </header>

      <dl className="m-0 mt-5 flex flex-col gap-3">
        <Linea etiqueta={t.works.necesitaba}>{w.necesitaba}</Linea>
        <Linea etiqueta={t.works.hice}>{w.hice}</Linea>
        <Linea etiqueta={t.works.resultado}>{w.resultado}</Linea>
      </dl>

      <div className="mt-auto pt-5 h-11 flex items-end">
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
    </article>
  );
}

/* La portada de la ficha: marco de navegador con un hueco 16:9 igual para
   todas y, dentro, el pase de imágenes (la principal y las de su galería).
   En la barra va el dominio SOLO si la ficha tiene url aprobada; si no, el
   nombre del proyecto: no se publica la dirección de ningún cliente que no
   la haya autorizado. Ajedrez Sistémico no tiene url a propósito y así debe
   seguir: en su barra solo sale "Ajedrez Sistémico". */
function Captura({ work: w, retraso }: { work: Work; retraso: number }) {
  const barra = w.url
    ? new URL(w.url).hostname.replace(/^www\./, "")
    : w.title;

  // La galería vive en public/img/proyectos/<carpeta>/galeria, y la carpeta
  // se llama como la imagen de la ficha: cronos.webp -> cronos/. Cada imagen
  // de la galería se trata según su forma: apaisada llena el marco; cuadrada
  // o vertical, entera sobre su versión difuminada.
  const carpeta = w.imagen!.split("/").pop()!.replace(/\.[^.]+$/, "");
  const fotos: Diapositiva[] = [
    { src: w.imagen!, alt: w.title, encaje: w.encaje ?? "captura" },
    ...galeriaDe(carpeta).map((g, i) => ({
      src: g.src,
      alt: `${w.title} · ${i + 2}`,
      encaje: (g.ancho / g.alto >= 1.2 ? "captura" : "pieza") as Diapositiva["encaje"],
    })),
  ];

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
        <PaseImagenes
          fotos={fotos}
          retraso={retraso}
          sizes="(max-width: 1024px) 100vw, 560px"
        />
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
