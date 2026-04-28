import { Section, Eyebrow, H2 } from "../ui";
import { STEPS } from "@/data/v3";

export default function Process() {
  return (
    <Section>
      <Eyebrow>Cómo funciono</Eyebrow>
      <H2>
        De la conversación al impacto
        <br />
        en <span className="text-lime">tres pasos</span>.
      </H2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px] mt-[60px]">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className="relative rounded-[18px] p-7 border border-border transition-all duration-[350ms] ease-smooth hover:-translate-y-[3px] hover:border-border-strong hover:shadow-glow-edge"
            style={{
              background: "linear-gradient(180deg, #122821, #0f1f1a)",
            }}
          >
            <div className="font-mono text-[11px] tracking-[0.08em] text-text-muted mb-[14px] font-medium">
              <span
                className="text-lime font-semibold mr-[6px] px-2 py-1 rounded-md"
                style={{ background: "rgba(163, 217, 119, 0.10)" }}
              >
                {s.n}
              </span>
            </div>
            <h4 className="font-display font-semibold text-[18px] tracking-[-0.01em] text-text m-0 mb-[10px]">
              {s.title}
            </h4>
            <p className="text-[13px] text-text-soft leading-[1.55] m-0">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
