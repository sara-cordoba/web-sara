import Footer from "@/components/Footer";
import Galeria from "@/components/Galeria";
import { CtaButton, Eyebrow, H1, Lede } from "@/components/ui";
import { GALERIA } from "@/data/galeria";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";
import { piezaEn } from "@/i18n/contenido-en";

/* El cuerpo de /trabajos y de /en/work. Es el mismo en los dos idiomas: la
   página de cada idioma solo pone su metadata y llama aquí. */
export default function PaginaTrabajos({
  idioma = "es",
}: {
  idioma?: Idioma;
}) {
  const t = textos(idioma);
  const vacia = GALERIA.length === 0;
  const piezas = idioma === "en" ? GALERIA.map(piezaEn) : GALERIA;

  return (
    <>
      <section className="max-w-page mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-16 sm:pt-16 sm:pb-20">
        <Eyebrow>{t.trabajosPagina.eyebrow}</Eyebrow>
        <H1 className="mt-4">
          {t.trabajosPagina.h1.antes}
          <span className="text-lime">{t.trabajosPagina.h1.destacado}</span>
          {t.trabajosPagina.h1.despues}
        </H1>
        <Lede>{t.trabajosPagina.lede}</Lede>

        <div className="mt-12">
          {vacia ? (
            <SinPiezas texto={t.trabajosPagina.sinPiezas} />
          ) : (
            <Galeria piezas={piezas} idioma={idioma} />
          )}
        </div>

        {!vacia && (
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-4">
            <CtaButton href={idioma === "en" ? "/en/contact" : "/contacto"}>
              {t.trabajosPagina.cta}
            </CtaButton>
            <span className="text-text-muted text-[13px]">
              {t.trabajosPagina.notaCta}
            </span>
          </div>
        )}
      </section>
      <Footer idioma={idioma} />
    </>
  );
}

/* Mientras no haya imágenes, la galería no se enseña.
   En local sale la chuleta de cómo añadirlas; en la web publicada, una línea
   discreta (aunque a esta página no se llega: el menú la esconde si está vacía).

   La chuleta se queda en español y sin traducir a propósito: la lee quien
   programa, no quien visita la web, y solo aparece en local. */
function SinPiezas({ texto }: { texto: string }) {
  if (process.env.NODE_ENV !== "development") {
    return <p className="text-text-muted text-[15px]">{texto}</p>;
  }
  return (
    <div className="rounded-[16px] border border-dashed border-lime/25 bg-[#0c0c0c] p-6 sm:p-8 max-w-[640px]">
      <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-lime mb-3">
        Galería vacía · esto solo se ve en local
      </div>
      <p className="text-text-soft text-[15px] leading-relaxed m-0 mb-4">
        La galería está montada y esperando imágenes. Para llenarla:
      </p>
      <ol className="text-text-soft text-[14px] leading-relaxed pl-5 m-0 flex flex-col gap-2">
        <li>
          Deja las imágenes en{" "}
          <code className="text-lime font-mono text-[13px]">
            public/img/galeria/
          </code>
        </li>
        <li>
          Añade una línea por pieza en{" "}
          <code className="text-lime font-mono text-[13px]">
            src/data/galeria.ts
          </code>{" "}
          con el nombre del archivo, el título, el cliente y el tipo
        </li>
      </ol>
      <p className="text-text-muted text-[13px] leading-relaxed mt-4 mb-0">
        Al añadir la primera pieza aparecen solos la galería y el enlace del
        menú.
      </p>
    </div>
  );
}
