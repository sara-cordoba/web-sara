import Image from "next/image";
import { Section, Eyebrow, H1, CtaButton, GhostButton } from "../ui";

export default function Hero() {
  return (
    <Section className="!pt-20 !pb-[60px]">
      <div className="max-w-[760px] mx-auto">
        <Eyebrow>Estudio independiente · Barcelona</Eyebrow>
        <H1>
          No es <span className="v3-strike">solo</span> contenido.
          <br />
          Es contenido que{" "}
          <span className="text-lime not-italic">conecta</span>.
        </H1>

        <p
          className="text-text-soft mt-2"
          style={{ fontSize: "clamp(17px, 1.3vw, 19px)", lineHeight: 1.65 }}
        >
          Si estás aquí es porque algo en tu marca no termina de encajar. La
          web no convence, el contenido no conecta, o simplemente no sabes por
          dónde empezar.
        </p>

        <div className="flex items-center gap-4 my-7">
          <div className="relative w-14 h-14 rounded-[12px] overflow-hidden border border-border-strong shadow-glow-soft flex-shrink-0">
            <Image
              src="/img/sara.png"
              alt="Sara Córdoba"
              fill
              sizes="56px"
              quality={95}
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-[1.2]">
            <b className="block text-text text-[14px] font-semibold tracking-[-0.01em]">
              Sara Córdoba
            </b>
            <span className="text-[12px] text-text-muted">
              Diseño & dirección · Barcelona
            </span>
          </div>
        </div>

        <p
          className="text-text font-semibold mb-6"
          style={{
            fontSize: "clamp(22px, 2.2vw, 28px)",
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
          }}
        >
          Yo me encargo de eso.
        </p>

        <div
          className="text-text-soft flex flex-col gap-4"
          style={{ fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.7 }}
        >
          <p className="m-0">
            Diseño webs, creo identidad visual, produzco contenido y lo cuento
            todo de forma que tenga sentido para ti y tu público objetivo.
          </p>
          <p className="m-0">
            Llevo un año dentro de una startup de IA viendo cómo se construye
            una marca desde cero mientras todo cambia a tu alrededor, eso te da
            una{" "}
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
          <p className="m-0">Si crees que encajamos, ¡escríbeme!</p>
        </div>

        <div className="flex gap-[14px] mt-9 flex-wrap">
          <CtaButton href="/contacto">Empezar conversación</CtaButton>
          <GhostButton href="/trabajos">Ver trabajos</GhostButton>
        </div>
      </div>
    </Section>
  );
}
