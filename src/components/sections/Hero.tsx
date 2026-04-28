import Image from "next/image";
import { Section, Eyebrow, H1, Lede, CtaButton, GhostButton } from "../ui";

export default function Hero() {
  return (
    <Section className="!pt-20 !pb-[60px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-[60px] items-center">
        <div>
          <Eyebrow>Estudio independiente · Barcelona</Eyebrow>
          <H1>
            No es <span className="v3-strike">solo</span> contenido.
            <br />
            Es contenido que <span className="text-lime not-italic">conecta</span>.
          </H1>
          <Lede>
            No solo diseño webs ni edito vídeos. Antes de tocar nada, quiero{" "}
            <strong className="font-semibold text-text">conocerte</strong> y
            entender el{" "}
            <strong className="font-semibold text-text">
              propósito real de tu proyecto
            </strong>{" "}
            — para plasmarlo con{" "}
            <strong className="font-semibold text-text">honestidad</strong> y
            transmitirlo al máximo.
          </Lede>
          <div className="flex gap-[14px] mt-9 flex-wrap">
            <CtaButton href="/contacto">Empezar conversación</CtaButton>
            <GhostButton href="/trabajos">Ver trabajos</GhostButton>
          </div>
        </div>

        <div
          className="v3-hero-card relative w-full max-w-[380px] aspect-[4/5] rounded-[24px] overflow-hidden border border-border-strong shadow-card-glow mx-auto lg:ml-auto lg:mr-0"
          style={{
            background: "linear-gradient(160deg, #18342a, #0d3b2e)",
          }}
        >
          <Image
            src="/img/sara.png"
            alt="Sara Córdoba"
            fill
            sizes="(max-width: 1000px) 100vw, 380px"
            quality={95}
            className="object-cover"
            priority
          />
          <div
            className="absolute left-4 right-4 bottom-4 z-[3] py-[14px] px-4 rounded-[12px] border border-border"
            style={{
              background: "rgba(10, 22, 18, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <b className="block font-semibold text-text text-[14px] tracking-[-0.01em]">
              Sara Córdoba
            </b>
            <span className="text-[12px] text-text-muted">
              Diseño & dirección · Barcelona
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
