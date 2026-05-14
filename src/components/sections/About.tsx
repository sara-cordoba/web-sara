import Image from "next/image";
import type { ReactNode } from "react";
import { Section, Eyebrow, H2 } from "../ui";
import WaveBg from "@/components/WaveBg";

type Bullet = {
  title: string;
  body: ReactNode;
};

const BULLETS: Bullet[] = [
  {
    title: "Soluciones a medida",
    body: "Cada proyecto se diseña a partir de tu operativa real, no de una plantilla.",
  },
  {
    title: "Conversación honesta",
    body: "Si algo no encaja te lo digo. Si no soy la persona indicada, también.",
  },
];

const WAVE_MASK =
  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)";

export default function About() {
  return (
    <Section>
      <Eyebrow>Quién hay detrás</Eyebrow>
      <H2>¡Hola! Soy <span className="text-lime">Sara</span>.</H2>
      <div className="relative mt-[60px]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[240px] overflow-hidden pointer-events-none"
          style={{ maskImage: WAVE_MASK, WebkitMaskImage: WAVE_MASK }}
        >
          <WaveBg />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-[60px]">
          <div className="flex justify-center items-center">
            <div
              className="relative w-full max-w-[340px] aspect-square rounded-[24px] overflow-hidden border border-border-strong shadow-card-glow"
              style={{
                background: "linear-gradient(135deg, #18342a, #0d3b2e)",
              }}
            >
              <Image
                src="/img/sara.png"
                alt="Sara Córdoba"
                fill
                sizes="(max-width: 900px) 80vw, 340px"
                quality={95}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <div
              className="text-text-soft max-w-[640px] flex flex-col gap-4 font-normal"
              style={{ fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.6 }}
            >
              <p className="m-0">
                Llevo un año dentro de una startup de IA viendo cómo se
                construye una marca desde cero mientras todo cambia a tu
                alrededor, eso te da una{" "}
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
      </div>
    </Section>
  );
}
