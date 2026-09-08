import type { Metadata } from "next";
import Footer from "@/components/Footer";
import RecomiendaForm from "@/components/RecomiendaForm";
import { Eyebrow, H1, H2, Lede } from "@/components/ui";
import {
  CABECERA,
  COMO_FUNCIONA,
  LETRA_PEQUENA,
  PARTES,
} from "@/data/recomienda";

export const metadata: Metadata = {
  title: "Recomiéndame · Sara Córdoba",
  description:
    "Si me recomiendas a alguien y acaba trabajando conmigo, te llevas el 10 % del proyecto con un mínimo de 75 €. Y esa persona, una página extra gratis.",
};

const WRAP = "max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12";

export default function RecomiendaPage() {
  return (
    <>
      <section className={`${WRAP} pt-10 pb-12 sm:pt-16 sm:pb-16`}>
        <Eyebrow>{CABECERA.eyebrow}</Eyebrow>
        <H1 className="mt-4 max-w-[15ch]">{CABECERA.titulo}</H1>
        <Lede>{CABECERA.lede}</Lede>
      </section>

      {/* ---------- Qué se lleva cada uno ---------- */}
      <section className={`${WRAP} py-12 sm:py-14 border-t border-border`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARTES.map((p) => (
            <div
              key={p.quien}
              className={
                "rounded-[16px] p-6 sm:p-8 border " +
                (p.destacado
                  ? "border-lime/45 bg-[#0a0a0a] shadow-[0_0_50px_-15px_rgba(163,217,119,0.25)]"
                  : "border-lime/15 bg-[#0c0c0c]")
              }
            >
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-text-muted mb-4">
                {p.quien}
              </div>
              <div
                className="text-text font-semibold tracking-[-0.03em] mb-4"
                style={{ fontSize: "clamp(26px, 3.4vw, 34px)", lineHeight: 1.1 }}
              >
                {p.premio}
              </div>
              <p className="text-text-soft/75 text-[15px] leading-relaxed m-0">
                {p.detalle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Cómo funciona ---------- */}
      <section className={`${WRAP} py-12 sm:py-14 border-t border-border`}>
        <H2 className="!mb-10 !text-[clamp(26px,3.2vw,40px)]">
          Cómo funciona.
        </H2>
        <ol className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMO_FUNCIONA.map((p) => (
            <li
              key={p.n}
              className="rounded-[16px] border border-lime/15 bg-[#0c0c0c] p-6"
            >
              <div className="font-mono text-[13px] text-lime mb-4 tabular-nums">
                {p.n}
              </div>
              <h3 className="text-text text-[17px] font-semibold leading-snug mb-2.5 m-0">
                {p.titulo}
              </h3>
              <p className="text-text-soft/75 text-[14px] leading-relaxed m-0">
                {p.body}
              </p>
            </li>
          ))}
        </ol>

        <ul className="mt-8 flex flex-col gap-2.5 p-0 list-none">
          {LETRA_PEQUENA.map((l) => (
            <li
              key={l}
              className="flex gap-3 text-text-muted text-[13px] leading-relaxed"
            >
              <span className="text-lime flex-shrink-0" aria-hidden>
                ·
              </span>
              {l}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Formulario ---------- */}
      <section className={`${WRAP} py-12 sm:py-16 border-t border-border`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div>
            <H2 className="!mb-4 !text-[clamp(26px,3.2vw,40px)]">
              ¿A quién conoces?
            </H2>
            <Lede>
              Tres datos y yo me encargo del resto. Te cuento cómo va, salga o
              no salga.
            </Lede>
          </div>
          <RecomiendaForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
