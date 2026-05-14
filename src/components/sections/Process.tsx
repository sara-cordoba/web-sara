import { Section, Eyebrow, H2 } from "../ui";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    body: (
      <>
        Hablamos sin compromiso. Te escucho, entiendo qué quieres conseguir y
        por qué ahora.{" "}
        <strong className="text-text font-semibold">
          No vendo nada que no necesites.
        </strong>
      </>
    ),
  },
  {
    n: "02",
    title: "Propuesta",
    body: (
      <>
        Te mando una propuesta clara:{" "}
        <strong className="text-text font-semibold">
          qué hago, cuándo lo entrego, cuánto cuesta y qué vas a conseguir
        </strong>
        . Sin sorpresas.
      </>
    ),
  },
  {
    n: "03",
    title: "Ejecución",
    body: (
      <>
        Me pongo manos a la obra. Tú revisas en puntos clave, yo me ocupo del
        resto.{" "}
        <strong className="text-text font-semibold">
          Sin emails de relleno, sin retrasos por mi parte.
        </strong>
      </>
    ),
  },
];

export default function Process() {
  return (
    <Section>
      <Eyebrow>Cómo funciono</Eyebrow>
      <H2>Cómo trabajo contigo.</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className="group relative bg-[#0c0c0c] border-l-2 border-l-lime border-y border-r border-y-lime/10 border-r-lime/10 rounded-r-xl px-6 py-7 transition-all duration-300 hover:border-l-[3px] hover:bg-[#141414] hover:pl-[25px]"
          >
            <div className="font-mono text-xs text-lime/80 tracking-[0.15em] mb-4">
              {s.n}
            </div>
            <h3 className="text-text text-lg font-medium mb-2 leading-tight">
              {s.title}
            </h3>
            <p className="text-text-soft text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
