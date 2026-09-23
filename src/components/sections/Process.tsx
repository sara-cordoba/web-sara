import { Section, Eyebrow, H2 } from "../ui";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

/* Los tres pasos viven en src/i18n: el texto en negrita va en su propio
   trozo para que la frase se pueda traducir sin arrastrar etiquetas. */

export default function Process({ idioma = "es" }: { idioma?: Idioma }) {
  const t = textos(idioma);

  return (
    <Section>
      <Eyebrow>{t.process.eyebrow}</Eyebrow>
      <H2>{t.process.h2}</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {t.process.pasos.map((s, i) => (
          <div
            key={i}
            className="group relative bg-[#0c0c0c] border-l-2 border-l-lime border-y border-r border-y-lime/10 border-r-lime/10 rounded-r-xl px-6 py-7 transition-all duration-300 hover:border-l-[3px] hover:bg-[#141414] hover:pl-[25px]"
          >
            <div className="font-mono text-xs text-lime/80 tracking-[0.15em] mb-4">
              {s.n}
            </div>
            <h3 className="text-text text-lg font-medium mb-2 leading-tight">
              {s.titulo}
            </h3>
            <p className="text-text-soft text-sm leading-relaxed">
              {s.antes}{" "}
              <strong className="text-text font-semibold">{s.fuerte}</strong>
              {s.despues}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
