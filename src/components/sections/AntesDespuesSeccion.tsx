import AntesDespues from "@/components/AntesDespues";
import { Section, Eyebrow, H2, Lede } from "../ui";
import { COMPARACIONES } from "@/data/antes-despues";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

/* Mientras no haya capturas, esta sección no existe para el visitante. */
export default function AntesDespuesSeccion({
  idioma = "es",
}: {
  idioma?: Idioma;
}) {
  const t = textos(idioma);

  if (COMPARACIONES.length === 0) return null;

  return (
    <Section>
      <Eyebrow>{t.antesDespues.eyebrow}</Eyebrow>
      <H2>
        {t.antesDespues.h2.antes}
        <span className="text-lime">{t.antesDespues.h2.destacado}</span>
        {t.antesDespues.h2.despues}
      </H2>
      <Lede>{t.antesDespues.lede}</Lede>
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
