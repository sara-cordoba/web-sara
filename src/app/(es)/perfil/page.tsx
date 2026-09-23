import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import {
  CABECERA,
  CV_PDF,
  EXPERIENCIA,
  FORMACION,
  FORMACION_OTRA,
  HERRAMIENTAS,
  IDIOMAS,
  PERFIL_PROFESIONAL,
} from "@/data/perfil";

export const metadata: Metadata = {
  title: "Sara Córdoba · Perfil profesional",
  description:
    "Responsable de marketing y contenido digital: estrategia y calendario de contenido, redes, diseño y desarrollo web. Experiencia, herramientas y CV.",
  openGraph: {
    title: "Sara Córdoba · Perfil profesional",
    description:
      "Marketing digital, contenido, redes y desarrollo web. Experiencia, herramientas y CV en PDF.",
    type: "profile",
    locale: "es_ES",
  },
};

/* El botón de descarga solo aparece si el PDF está de verdad en public/.
   Un enlace roto es lo último que quieres enseñarle a quien te va a contratar. */
const hayCv = fs.existsSync(path.join(process.cwd(), "public", CV_PDF));

const WRAP = "max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12";

export default function PerfilPage() {
  return (
    <>
      {/* ---------- Quién ---------- */}
      <section className={`${WRAP} pt-10 pb-12 sm:pt-16 sm:pb-16`}>
        <Eyebrow>Perfil profesional</Eyebrow>
        <h1
          className="font-display font-semibold text-text m-0 mt-4 mb-3"
          style={{
            fontSize: "clamp(34px, 4vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
          }}
        >
          {CABECERA.nombre}
        </h1>
        <p className="text-lime text-[15px] sm:text-[17px] font-medium leading-snug m-0 mb-6">
          {CABECERA.titular}
        </p>
        <p className="text-text-soft text-[15px] sm:text-[16px] leading-relaxed m-0 max-w-[640px] border-l-2 border-lime/40 pl-4">
          {CABECERA.busqueda}
        </p>

        {hayCv && (
          <div className="mt-8">
            <a
              href={CV_PDF}
              download
              className="group inline-flex items-center gap-2 bg-lime text-green font-semibold text-[15px] px-6 py-[14px] rounded-[12px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px"
            >
              Descargar CV en PDF
              <span
                className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-y-[2px]"
                aria-hidden
              >
                ↓
              </span>
            </a>
          </div>
        )}
      </section>

      {/* ---------- Perfil ---------- */}
      <Bloque titulo="Perfil">
        <p className="text-text-soft text-[15px] sm:text-[16px] leading-relaxed m-0">
          {PERFIL_PROFESIONAL}
        </p>
      </Bloque>

      {/* ---------- Experiencia ---------- */}
      <Bloque titulo="Experiencia">
        <ol className="list-none p-0 m-0 flex flex-col">
          {EXPERIENCIA.map((e) => (
            <li
              key={`${e.empresa}-${e.fechas}`}
              className="border-t border-border py-6 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                <h3 className="text-text text-[16px] sm:text-[17px] font-semibold m-0 leading-snug">
                  {e.puesto}
                  <span className="text-lime font-medium"> · {e.empresa}</span>
                </h3>
                <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-text-muted whitespace-nowrap flex-shrink-0">
                  {e.fechas}
                </span>
              </div>
              {e.contexto && (
                <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-dim mt-1.5">
                  {e.contexto}
                </div>
              )}
              {e.descripcion && (
                <p className="text-text-soft/80 text-[14px] sm:text-[15px] leading-relaxed mt-3 mb-0 max-w-[700px]">
                  {e.descripcion}
                </p>
              )}
            </li>
          ))}
        </ol>
      </Bloque>

      {/* ---------- Herramientas ---------- */}
      <Bloque titulo="Herramientas">
        <dl className="m-0 flex flex-col gap-5">
          {HERRAMIENTAS.map((h) => (
            <div
              key={h.grupo}
              className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-1 sm:gap-6"
            >
              <dt className="font-mono text-[11px] tracking-[0.08em] uppercase text-lime/80 sm:pt-[3px]">
                {h.grupo}
              </dt>
              <dd className="m-0 text-text-soft text-[14px] sm:text-[15px] leading-relaxed">
                {h.items}
              </dd>
            </div>
          ))}
        </dl>
      </Bloque>

      {/* ---------- Formación e idiomas ---------- */}
      <Bloque titulo={FORMACION.length ? "Formación e idiomas" : "Idiomas"}>
        {FORMACION.length > 0 && (
          <div className="mb-9">
            {/* Son cursos y se dicen como tales: plataforma y año a la vista. */}
            <h3 className="text-text text-[14px] font-semibold m-0 mb-4">
              Cursos
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col">
              {FORMACION.map((f) => (
                <li
                  key={f.titulo}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-6 py-2.5 border-t border-border first:border-t-0 first:pt-0"
                >
                  <span className="text-text-soft text-[14px] sm:text-[15px] leading-snug">
                    {f.titulo}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-text-muted whitespace-nowrap flex-shrink-0">
                    {f.centro} · {f.anios}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-text-dim text-[12px] leading-relaxed mt-5 mb-0 max-w-[700px]">
              {FORMACION_OTRA}
            </p>
          </div>
        )}

        <h3 className="text-text text-[14px] font-semibold m-0 mb-4">
          Idiomas
        </h3>
        <ul className="list-none p-0 m-0 flex flex-wrap gap-x-8 gap-y-3">
          {IDIOMAS.map((i) => (
            <li key={i.idioma} className="text-[15px] text-text-soft">
              <span className="text-text font-medium">{i.idioma}</span>
              <span className="text-text-dim"> · {i.nivel}</span>
            </li>
          ))}
        </ul>
      </Bloque>

      {/* ---------- Cierre ---------- */}
      <section className={`${WRAP} py-12 sm:py-16 border-t border-border`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {hayCv && (
            <a
              href={CV_PDF}
              download
              className="group inline-flex items-center justify-center gap-2 bg-lime text-green font-semibold text-[15px] px-6 py-[14px] rounded-[12px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px"
            >
              Descargar CV en PDF
              <span aria-hidden>↓</span>
            </a>
          )}
          <Link
            href="/trabajos"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-text border border-border-strong px-6 py-[14px] rounded-[12px] font-medium text-[15px] transition-colors duration-[250ms] hover:border-lime hover:bg-[rgba(163,217,119,0.06)]"
          >
            Ver trabajos
            <span aria-hidden>→</span>
          </Link>
        </div>
        {!hayCv && process.env.NODE_ENV === "development" && (
          <p className="mt-6 font-mono text-[12px] text-danger leading-relaxed">
            Falta el PDF. Déjalo en public/CV_Sara_Cordoba_ES.pdf y el botón de
            descarga aparece solo. (Este aviso solo se ve en local.)
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}

function Bloque({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${WRAP} py-10 sm:py-12 border-t border-border`}>
      <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-text-muted m-0 mb-6">
        {titulo}
      </h2>
      {children}
    </section>
  );
}
