import Image from "next/image";
import { Section, Eyebrow, H2 } from "../ui";
import { WORKS, type Work } from "@/data/v3";

type Props = {
  eyebrow?: string;
  heading?: React.ReactNode;
};

export default function Works({
  eyebrow = "Trabajos seleccionados",
  heading,
}: Props) {
  return (
    <Section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2 className="whitespace-nowrap !max-w-none">
        {heading ?? (
          <>
            Proyectos <span className="text-lime">recientes</span>.
          </>
        )}
      </H2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-[60px]">
        {WORKS.map((w) => (
          <Ficha key={w.title} work={w} />
        ))}
      </div>
    </Section>
  );
}

function Ficha({ work: w }: { work: Work }) {
  return (
    <article className="flex flex-col rounded-[16px] border border-border bg-[#0c0c0c] p-5 sm:p-6 transition-all duration-[350ms] ease-smooth hover:border-border-strong hover:-translate-y-0.5 shadow-[0_0_50px_-15px_rgba(163,217,119,0.10)]">
      <header className="flex items-center gap-4">
        <Logo work={w} />
        <div className="min-w-0">
          <h3 className="text-text text-[17px] font-semibold tracking-[-0.01em] m-0 leading-tight">
            {w.title}
          </h3>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted mt-1.5">
            {w.year} · {w.type}
          </div>
        </div>
      </header>

      <dl className="m-0 mt-5 flex flex-col gap-3 flex-1">
        <Linea etiqueta="Necesitaba">{w.necesitaba}</Linea>
        <Linea etiqueta="Hice">{w.hice}</Linea>
        <Linea etiqueta="Resultado">{w.resultado}</Linea>
      </dl>

      {w.url && (
        <a
          href={w.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 self-start inline-flex items-center gap-2 text-lime font-medium text-[14px] border-b border-lime/30 pb-0.5 hover:border-lime transition-colors"
        >
          Ver la web
          <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
            →
          </span>
        </a>
      )}
    </article>
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
