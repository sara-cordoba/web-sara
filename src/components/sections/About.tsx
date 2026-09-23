import Image from "next/image";
import { Section, Eyebrow, H2 } from "../ui";
import WaveBg from "@/components/WaveBg";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

const WAVE_MASK =
  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)";

export default function About({ idioma = "es" }: { idioma?: Idioma }) {
  const t = textos(idioma);

  return (
    <Section>
      <Eyebrow>{t.about.eyebrow}</Eyebrow>
      <H2>
        {t.about.h2.antes}
        <span className="text-lime">{t.about.h2.destacado}</span>
        {t.about.h2.despues}
      </H2>
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
                {t.about.p1.antes}{" "}
                <strong className="font-semibold text-text">
                  {t.about.p1.fuerte}
                </strong>
                {t.about.p1.despues}
              </p>
              <p className="m-0">
                {t.about.p2.antes}{" "}
                <strong className="font-semibold text-text">
                  {t.about.p2.fuerte}
                </strong>{" "}
                {t.about.p2.despues}
              </p>
              <p className="m-0">{t.about.p3}</p>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {t.about.bullets.map((b, i) => (
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
                      {b.titulo}
                    </b>
                    <span className="text-text-soft text-[13px] leading-[1.55]">
                      {b.texto}
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
