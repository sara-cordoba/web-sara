import { Section, Eyebrow, H2, Lede } from "../ui";
import { SOLUTIONS } from "@/data/v3";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";
import { servicioEn } from "@/i18n/contenido-en";

type Props = {
  idioma?: Idioma;
  eyebrow?: string;
  heading?: React.ReactNode;
  lede?: string;
};

export default function Solution({
  idioma = "es",
  eyebrow,
  heading,
  lede,
}: Props) {
  const t = textos(idioma);
  // Se recorre siempre la lista española: si un servicio no está traducido,
  // sale en español en vez de desaparecer de la página.
  const servicios = idioma === "en" ? SOLUTIONS.map(servicioEn) : SOLUTIONS;

  return (
    <Section>
      <Eyebrow>{eyebrow ?? t.solution.eyebrow}</Eyebrow>
      <H2>{heading ?? t.solution.h2}</H2>
      <Lede>{lede ?? t.solution.lede}</Lede>
      <div className="bg-[#0c0c0c] border border-lime/15 rounded-2xl p-2 lg:p-4 mt-12">
        {servicios.map((s, i) => (
          <div
            key={i}
            className="group flex items-center gap-5 lg:gap-6 px-4 lg:px-6 py-4 lg:py-5 border-b border-lime/10 last:border-b-0 border-dashed transition-all duration-300 hover:bg-lime/[0.04] hover:px-5 lg:hover:px-7 cursor-default"
          >
            <div className="font-mono text-2xl lg:text-3xl text-lime font-medium min-w-[38px] tabular-nums">
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-text text-lg lg:text-xl font-medium mb-1.5 leading-tight">
                {s.title}
              </h3>
              <div className="font-mono text-[10px] text-text-soft/50 tracking-[0.15em] uppercase mb-3">
                {s.sub}
              </div>
              <p className="text-text-soft/65 text-sm leading-relaxed">
                {s.items.join(" · ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
