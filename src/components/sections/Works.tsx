import Image from "next/image";
import { Section, Eyebrow, H2 } from "../ui";
import { WORKS } from "@/data/v3";

type Props = {
  eyebrow?: string;
  heading?: React.ReactNode;
};

export default function Works({
  eyebrow = "Trabajos seleccionados",
  heading,
}: Props) {
  return (
    <Section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2 className="whitespace-nowrap !max-w-none">
        {heading ?? (
          <>
            Proyectos <span className="text-lime">recientes</span>.
          </>
        )}
      </H2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[60px]">
        {WORKS.map((w, i) => (
          <div
            key={i}
            className="group relative aspect-square rounded-[14px] overflow-hidden border border-border bg-surface cursor-pointer transition-all duration-[350ms] ease-smooth hover:-translate-y-1 hover:border-border-strong hover:shadow-glow-edge"
          >
            {w.placeholder ? (
              <div
                className="absolute inset-0 grid place-items-center"
                style={{
                  background:
                    "linear-gradient(135deg, #0d3b2e, #1a5d45)",
                }}
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-lime">
                  COMING SOON
                </span>
              </div>
            ) : (
              <div
                className="absolute inset-0 transition-all duration-[800ms] ease-smooth group-hover:scale-[1.04] group-hover:brightness-[0.85]"
                style={{ backgroundColor: w.logoBg || "#000" }}
              >
                <Image
                  src={w.logo!}
                  alt={w.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  quality={95}
                  className={w.logoFill ? "object-cover" : "object-contain p-12"}
                />
              </div>
            )}
            <div
              className="absolute left-0 right-0 bottom-0 p-[18px] opacity-0 translate-y-2 transition-all duration-[350ms] group-hover:opacity-100 group-hover:translate-y-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,0,0,0.85))",
              }}
            >
              <div className="font-mono text-[10px] tracking-[0.12em] text-lime uppercase mb-1">
                {String(i + 1).padStart(2, "0")} — {w.year}
              </div>
              <div className="text-text text-[16px] font-semibold tracking-[-0.01em]">
                {w.title}
              </div>
              <div className="text-text-muted text-[12px] mt-[2px]">
                {w.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
