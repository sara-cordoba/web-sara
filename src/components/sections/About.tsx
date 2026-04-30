import Image from "next/image";
import { Section, Eyebrow, H2 } from "../ui";

const BULLETS = [
  {
    title: "Soluciones a medida",
    body: "Cada proyecto se diseña a partir de tu operativa real, no de una plantilla.",
  },
  {
    title: "Conversación honesta",
    body: "Si algo no encaja te lo digo. Si no soy la persona indicada, también.",
  },
  {
    title: "Resultados medibles",
    body: "KPIs claros desde el día uno. Sé qué quieres conseguir y por qué.",
  },
];

export default function About() {
  return (
    <Section>
      <Eyebrow>Quién hay detrás</Eyebrow>
      <H2>
        No soy una agencia.
        <br />
        Soy <span className="text-lime">tu equipo</span> creativo.
      </H2>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-[60px] items-start mt-[60px]">
        <div
          className="relative aspect-square rounded-[24px] overflow-hidden border border-border-strong shadow-card-glow"
          style={{
            background: "linear-gradient(135deg, #18342a, #0d3b2e)",
          }}
        >
          <Image
            src="/img/sara-pc.png"
            alt="Sara Córdoba"
            fill
            sizes="(max-width: 900px) 100vw, 600px"
            quality={95}
            className="object-cover"
          />
          <div
            className="absolute left-5 right-5 bottom-5 px-4 py-[14px] rounded-[12px] border border-border flex justify-between items-center"
            style={{
              background: "rgba(10, 22, 18, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <b className="font-semibold text-text text-[15px]">Sara Córdoba</b>
            <span className="text-lime font-mono text-[11px] tracking-[0.06em]">
              FUNDADORA
            </span>
          </div>
        </div>
        <div>
          <div
            className="text-text-soft max-w-[640px] flex flex-col gap-4 font-normal"
            style={{ fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.6 }}
          >
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
            <p className="m-0">Si crees que encajamos, ¡escríbeme!</p>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            {BULLETS.map((b, i) => (
              <div
                key={i}
                className="grid grid-cols-[28px_1fr] gap-[14px] items-start py-[14px] border-t border-border"
              >
                <div
                  className="w-6 h-6 rounded-lg grid place-items-center text-green font-bold text-[14px] mt-[2px]"
                  style={{
                    background: "linear-gradient(135deg, #a3d977, #6fa44a)",
                  }}
                >
                  ✓
                </div>
                <div>
                  <b className="block font-semibold text-[15px] text-text mb-1">
                    {b.title}
                  </b>
                  <span className="text-text-soft text-[13px] leading-[1.55]">
                    {b.body}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
