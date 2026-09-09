import type { Metadata } from "next";
import Footer from "@/components/Footer";
import RuralLeadForm from "@/components/RuralLeadForm";
import { Eyebrow, H1, H2, Lede } from "@/components/ui";
import { CONTACT_EMAIL } from "@/data/site";
import {
  CASE,
  HERO,
  INCLUDES,
  PAINS,
  CONDICIONES,
  CONDICIONES_LETRA_PEQUENA,
} from "@/data/rural";

export const metadata: Metadata = {
  metadataBase: new URL("https://saracordoba.com"),
  title: "Webs para casas rurales y alojamientos pequeños · Sara Córdoba",
  description:
    "Web propia para vuestra casa rural en dos semanas, con precio cerrado y fecha por escrito antes de empezar. Reservas directas sin comisiones, se ve bien en el móvil y sin cuotas mensuales.",
  alternates: { canonical: "/webs-para-casas-rurales" },
  openGraph: {
    title: "Webs para casas rurales y alojamientos pequeños",
    description:
      "Precio cerrado, dos semanas, y la web es vuestra. Sin cuotas.",
    url: "/webs-para-casas-rurales",
    siteName: "Sara Córdoba",
    locale: "es_ES",
    type: "website",
  },
};

/* Ancho propio, más estrecho que el resto de la web:
   una página de venta se lee mejor en una sola columna. */
const WRAP = "max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12";

export default function CasasRuralesPage() {
  return (
    <>
      {/* ---------- Titular ---------- */}
      <section className={`${WRAP} pt-10 pb-14 sm:pt-16 sm:pb-20`}>
        <Eyebrow>{HERO.eyebrow}</Eyebrow>
        <H1 className="mt-4 max-w-[16ch]">{HERO.title}</H1>
        <Lede className="text-[17px] sm:text-[19px] !text-text">
          {HERO.subtitle}
        </Lede>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <a
            href="#hablamos"
            className="group inline-flex items-center justify-center gap-2 bg-lime text-green font-semibold text-[15px] px-6 py-[14px] rounded-[12px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px"
          >
            Contadme qué tenéis
            <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
              →
            </span>
          </a>
          <a
            href="#ejemplo"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-text border border-border-strong px-6 py-[14px] rounded-[12px] font-medium text-[15px] transition-colors duration-[250ms] hover:border-lime hover:bg-[rgba(163,217,119,0.06)]"
          >
            Ver una web hecha
          </a>
        </div>

        <p className="mt-6 font-mono text-[12px] text-text-muted">{HERO.note}</p>
      </section>

      {/* ---------- Los tres dolores ---------- */}
      <section className={`${WRAP} py-14 sm:py-20 border-t border-border`}>
        <H2 className="!mb-10 !text-[clamp(26px,3.2vw,40px)]">
          Seguramente esto os suena.
        </H2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAINS.map((p) => (
            <article
              key={p.n}
              className="v3-problem-card relative overflow-hidden rounded-[16px] border border-lime/15 bg-[#0c0c0c] p-6 sm:p-7"
            >
              <div className="font-mono text-[13px] text-lime mb-4 tabular-nums">
                {p.n}
              </div>
              <h3 className="text-text text-[19px] sm:text-[20px] font-semibold leading-[1.25] mb-3 tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="text-text-soft/75 text-[15px] leading-relaxed m-0">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Qué incluye ---------- */}
      <section className={`${WRAP} py-14 sm:py-20 border-t border-border`}>
        <H2 className="!mb-4 !text-[clamp(26px,3.2vw,40px)]">
          Qué lleva dentro.
        </H2>
        <Lede className="mb-10">
          Todo esto entra en el precio. No hay extras a mitad de camino.
        </Lede>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
          {INCLUDES.map((item) => (
            <div key={item.title} className="flex gap-3">
              <span
                className="text-lime text-[15px] leading-[1.5] flex-shrink-0"
                aria-hidden
              >
                →
              </span>
              <div>
                <h3 className="text-text text-[16px] font-semibold mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-text-soft/70 text-[14px] leading-relaxed m-0">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Cómo se paga ---------- */}
      <section className={`${WRAP} py-14 sm:py-20 border-t border-border`}>
        <H2 className="!mb-4 !text-[clamp(26px,3.2vw,40px)]">
          Sin sorpresas a media obra.
        </H2>
        <p className="text-text text-[17px] sm:text-[19px] leading-relaxed m-0 max-w-[640px] border-l-2 border-lime/40 pl-5">
          {CONDICIONES}
        </p>
        <Lede className="mt-8">
          Lo que cuesta depende de lo que necesitéis, así que os lo digo
          después de verlo, no antes. Una llamada de veinte minutos basta.
        </Lede>
        <ul className="mt-6 flex flex-col gap-2.5 p-0 list-none">
          {CONDICIONES_LETRA_PEQUENA.map((n) => (
            <li
              key={n}
              className="flex gap-3 text-text-soft text-[14px] leading-relaxed"
            >
              <span className="text-lime flex-shrink-0" aria-hidden>
                ·
              </span>
              {n}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Un caso real ---------- */}
      <section
        id="ejemplo"
        className={`${WRAP} py-14 sm:py-20 border-t border-border scroll-mt-[110px]`}
      >
        <H2 className="!mb-10 !text-[clamp(26px,3.2vw,40px)]">
          Una que ya está hecha.
        </H2>
        <div className="rounded-[16px] border border-lime/15 bg-[#0c0c0c] p-6 sm:p-8">
          <h3 className="text-text text-[22px] font-semibold mb-6 tracking-[-0.01em]">
            {CASE.name}
          </h3>
          <dl className="flex flex-col gap-4 m-0">
            <Row label="Qué necesitaban">{CASE.need}</Row>
            <Row label="Qué hice">{CASE.did}</Row>
            <Row label="Cómo quedó">{CASE.result}</Row>
          </dl>
          <a
            href={CASE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 text-lime font-medium text-[15px] border-b border-lime/30 pb-0.5 hover:border-lime transition-colors"
          >
            Verla en marcha · {CASE.urlLabel}
            <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
              →
            </span>
          </a>
        </div>
      </section>

      {/* ---------- Formulario ---------- */}
      <section
        id="hablamos"
        className={`${WRAP} py-14 sm:py-20 border-t border-border scroll-mt-[110px]`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div>
            <H2 className="!mb-4 !text-[clamp(26px,3.2vw,40px)]">
              Contadme qué tenéis ahora.
            </H2>
            <Lede>
              Cuatro datos y ya está. Os llamo yo, os digo qué haría y cuánto
              cuesta, y ahí lo dejamos si no os encaja.
            </Lede>
            <p className="mt-6 text-text-soft/70 text-[14px] leading-relaxed">
              Si preferís escribir, el correo es{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-lime hover:underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
          <RuralLeadForm />
        </div>
      </section>

      <Footer />
    </>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-4 border-t border-border pt-4">
      <dt className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
        {label}
      </dt>
      <dd className="m-0 text-text-soft text-[15px] leading-relaxed">
        {children}
      </dd>
    </div>
  );
}
