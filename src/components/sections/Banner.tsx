import { Section, CtaButton } from "../ui";

export default function Banner() {
  return (
    <Section>
      <div
        className="v3-banner relative overflow-hidden mt-[60px] rounded-[28px] border border-border-strong shadow-glow-edge px-12 py-[60px] text-center"
        style={{
          background:
            "radial-gradient(80% 80% at 0% 0%, rgba(163, 217, 119, 0.18), transparent 60%), radial-gradient(60% 60% at 100% 100%, rgba(212, 184, 148, 0.12), transparent 60%), linear-gradient(180deg, #18342a, #0d3b2e)",
        }}
      >
        <h2
          className="font-display font-semibold m-0 mb-4 text-text relative z-[1]"
          style={{
            fontSize: "clamp(32px, 4.5vw, 56px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          ¿Listo para que tu marca
          <br />
          <span className="text-lime">cuente lo que vale</span>?
        </h2>
        <p className="text-text-soft text-[16px] mx-auto mb-8 max-w-[560px] relative z-[1]">
          Cuéntame en qué estás trabajando. Una conversación de 30 minutos, sin
          compromiso, para ver si encajamos.
        </p>
        <div className="relative z-[1] inline-flex">
          <CtaButton href="/contacto">Empezar conversación</CtaButton>
        </div>
        <div className="mt-6 font-mono text-[12px] text-text-muted relative z-[1]">
          Sin compromiso · Respuesta en menos de 48h
        </div>
      </div>
    </Section>
  );
}
