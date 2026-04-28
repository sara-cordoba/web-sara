import { Fragment } from "react";

const ITEMS: { text: string; accent?: string }[] = [
  { text: "Diseño con", accent: "propósito" },
  { text: "Web · UI/UX · Branding" },
  { text: "Disponible", accent: "Q3 2026" },
  { text: "Vídeo · Motion · Color" },
  { text: "Estudio independiente ·", accent: "Barcelona" },
  { text: "Conversación honesta", accent: "→" },
  { text: "Sistemas que tu equipo puede mantener" },
  { text: "Respuesta en", accent: "< 48h" },
];

function Track() {
  return (
    <>
      {ITEMS.map((it, i) => (
        <Fragment key={i}>
          <span className="inline-flex items-center gap-[14px] font-mono text-[12px] tracking-[0.18em] uppercase text-text font-medium flex-shrink-0">
            {it.text}
            {it.accent && <span className="text-lime"> {it.accent}</span>}
          </span>
          <span
            className="inline-block w-[5px] h-[5px] rounded-full bg-lime flex-shrink-0"
            style={{ boxShadow: "0 0 8px #a3d977" }}
          />
        </Fragment>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative z-[5] mt-10 h-[54px]"
      style={{
        borderTop: "1px solid rgba(163, 217, 119, 0.7)",
        borderBottom: "1px solid rgba(163, 217, 119, 0.7)",
        boxShadow:
          "0 0 12px 0 rgba(163, 217, 119, 0.30), 0 0 28px 2px rgba(163, 217, 119, 0.15), inset 0 0 18px rgba(163, 217, 119, 0.10)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden flex items-center">
        <div
          className="absolute top-0 bottom-0 left-0 w-[100px] z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,22,18,0.85), transparent)",
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-[100px] z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(-90deg, rgba(10,22,18,0.85), transparent)",
          }}
        />
        <div className="flex gap-[56px] whitespace-nowrap pl-[56px] flex-shrink-0 items-center animate-marquee">
          <Track />
          <Track />
        </div>
      </div>
    </div>
  );
}
