import { Section, CtaButton } from "../ui";

export default function Banner() {
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
            ¿Listo para que tu marca
            <br />
            <span className="text-lime">cuente lo que vale</span>?
          </h2>
          <p className="text-text-soft text-[15px] mx-auto mb-7 max-w-[520px]">
            Cuéntame qué tienes y qué necesitas. Te respondo con una{" "}
            <strong className="text-text font-semibold">
              propuesta personalizada
            </strong>
            .
          </p>
          <div className="inline-flex">
            <CtaButton href="/contacto">¡Hablemos!</CtaButton>
          </div>
          <div className="mt-6 font-mono text-[12px] text-text-muted">
            Sin compromiso · Cada mensaje lo respondo personalmente
          </div>
        </div>
      </div>
    </Section>
  );
}
