import { Section, Eyebrow, H2, Lede } from "../ui";
import { SOLUTIONS } from "@/data/v3";

type Props = {
  eyebrow?: string;
  heading?: React.ReactNode;
  lede?: string;
};

export default function Solution({
  eyebrow = "Servicios",
  heading,
  lede = "No vendo piezas sueltas. Construyo el sistema completo: marca, web, contenido, vídeo y dirección.",
}: Props) {
  return (
    <Section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2>
        {heading ?? (
          <>
            Tu sistema visual y narrativo,
            <br />
            en <span className="text-lime">un solo equipo</span>.
          </>
        )}
      </H2>
      <Lede>{lede}</Lede>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[60px]">
        {SOLUTIONS.map((s, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-[16px] p-6 border border-border-strong shadow-glow-soft cursor-pointer transition-all duration-[350ms] ease-smooth hover:-translate-y-1 hover:shadow-glow-edge"
            style={{
              background: "linear-gradient(180deg, #122821, #0f1f1a)",
            }}
          >
            <div
              className="grid place-items-center w-10 h-10 rounded-[10px] text-green mb-4 font-bold text-[14px]"
              style={{
                background: "linear-gradient(135deg, #a3d977, #6fa44a)",
              }}
            >
              {s.icon}
            </div>
            <h3 className="font-display font-semibold text-[18px] tracking-[-0.015em] m-0 mb-1 text-text">
              {s.title}
            </h3>
            <div className="text-text-muted text-[11px] mb-4 font-mono tracking-[0.04em]">
              {s.sub}
            </div>
            <ul className="v3-solution-list flex flex-col gap-1 p-0 m-0 list-none">
              {s.items.map((it, j) => (
                <li
                  key={j}
                  className="text-[13px] text-text-soft py-[6px] border-t border-dashed border-border first:border-t-0 first:pt-0 flex items-center gap-[10px]"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
