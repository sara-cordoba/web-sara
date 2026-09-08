import AntesDespues from "@/components/AntesDespues";
import { Section, Eyebrow, H2, Lede } from "../ui";
import { COMPARACIONES } from "@/data/antes-despues";

/* Mientras no haya capturas, esta sección no existe para el visitante. */
export default function AntesDespuesSeccion() {
  if (COMPARACIONES.length === 0) return null;

  return (
    <Section>
      <Eyebrow>Antes y después</Eyebrow>
      <H2>
        Cómo estaba y <span className="text-lime">cómo quedó</span>.
      </H2>
      <Lede>Arrastra la línea de en medio para comparar.</Lede>
      <div
        className={
          "grid gap-8 mt-12 " +
          (COMPARACIONES.length > 1 ? "lg:grid-cols-2" : "max-w-[900px]")
        }
      >
        {COMPARACIONES.map((c) => (
          <AntesDespues key={c.titulo} caso={c} />
        ))}
      </div>
    </Section>
  );
}
