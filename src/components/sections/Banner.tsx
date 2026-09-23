import { Section, CtaButton } from "../ui";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

export default function Banner({ idioma = "es" }: { idioma?: Idioma }) {
  const t = textos(idioma);

  return (
    <Section>
      <div className="relative bg-[#0a0a0a] border-2 border-lime/40 rounded-3xl px-6 lg:px-16 py-12 lg:py-20 overflow-hidden mt-12 text-center animate-banner-pulse">
        <div
          className="absolute inset-0 bg-gradient-to-br from-lime/[0.06] via-transparent to-lime/[0.02] pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10">
          <h2
            className="font-display font-semibold m-0 mb-4 text-text"
            style={{
              fontSize: "clamp(30px, 3.4vw, 46px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            {t.banner.h2.antes}
            <br />
            <span className="text-lime">{t.banner.h2.destacado}</span>
            {t.banner.h2.despues}
          </h2>
          <p className="text-text-soft text-[15px] mx-auto mb-7 max-w-[520px]">
            {t.banner.parrafo.antes}{" "}
            <strong className="text-text font-semibold">
              {t.banner.parrafo.fuerte}
            </strong>
            {t.banner.parrafo.despues}
          </p>
          <div className="inline-flex">
            <CtaButton href={idioma === "en" ? "/en/contact" : "/contacto"}>
              {t.banner.cta}
            </CtaButton>
          </div>
          <div className="mt-6 font-mono text-[12px] text-text-muted">
            {t.banner.nota}
          </div>
        </div>
      </div>
    </Section>
  );
}
