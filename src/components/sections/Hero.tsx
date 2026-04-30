import Image from "next/image";
import { Section, Eyebrow, H1, CtaButton, GhostButton } from "../ui";

export default function Hero() {
  return (
    <Section className="!pt-20 !pb-[60px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start">
        <div>
          <Eyebrow>Estudio independiente · Barcelona</Eyebrow>
          <H1>
            No es <span className="v3-strike">solo</span> contenido.
            <br />
            Es contenido que <span className="text-lime not-italic">conecta</span>.
          </H1>
          <div
            className="text-text-soft max-w-[640px] flex flex-col gap-4 font-normal"
            style={{ fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.6 }}
          >
            <p className="m-0">
              Si estás aquí es porque algo en tu marca no termina de encajar. La
              web no convence, el contenido no conecta, o simplemente no sabes
              por dónde empezar.
            </p>
            <p className="m-0 font-semibold text-text">
              Yo me encargo de eso.
            </p>
            <p className="m-0">
              Diseño webs, creo identidad visual, produzco contenido y lo
              cuento todo de forma que tenga sentido para ti y tu público
              objetivo.
            </p>
            <p className="m-0">
              Llevo un año dentro de una startup de IA viendo cómo se construye
              una marca desde cero mientras todo cambia a tu alrededor, eso te
              da una{" "}
              <strong className="font-semibold text-text">
                visión que no se aprende en ningún curso
              </strong>
              .
            </p>
            <p className="m-0">
              No trabajo con todo el mundo. Me interesa{" "}
              <strong className="font-semibold text-text">
                entender tu proyecto de verdad
              </strong>{" "}
              antes de meterme en él.
            </p>
            <p className="m-0">
              Si crees que encajamos, ¡escríbeme!
            </p>
          </div>
          <div className="flex gap-[14px] mt-9 flex-wrap">
            <CtaButton href="/contacto">Empezar conversación</CtaButton>
            <GhostButton href="/trabajos">Ver trabajos</GhostButton>
          </div>
        </div>

        <div
          className="v3-hero-card relative w-full max-w-[340px] aspect-[4/5] rounded-[24px] overflow-hidden border border-border-strong shadow-card-glow mx-auto lg:ml-auto lg:mr-0 lg:sticky lg:top-[110px]"
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
