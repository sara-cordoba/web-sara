import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Galeria from "@/components/Galeria";
import { CtaButton, Eyebrow, H1, Lede } from "@/components/ui";
import { GALERIA } from "@/data/galeria";

export const metadata: Metadata = {
  title: "Trabajos · Sara Córdoba",
  description:
    "Galería de diseños: carteles, identidades, piezas para redes y webs. Trabajo hecho para clientes y proyectos propios.",
};

export default function TrabajosPage() {
  const vacia = GALERIA.length === 0;

  return (
    <>
      <section className="max-w-page mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-16 sm:pt-16 sm:pb-20">
        <Eyebrow>Trabajos</Eyebrow>
        <H1 className="mt-4">
          Lo que sale de <span className="text-lime">aquí</span>.
        </H1>
        <Lede>
          Cartelería y piezas para redes. Haz clic en cualquiera para verla
          en grande.
        </Lede>

        <div className="mt-12">
          {vacia ? <SinPiezas /> : <Galeria piezas={GALERIA} />}
        </div>

        {!vacia && (
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-4">
            <CtaButton href="/contacto">¿Quieres algo así?</CtaButton>
            <span className="text-text-muted text-[13px]">
              Cuéntame qué necesitas y te digo cómo lo haría.
            </span>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

/* Mientras no haya imágenes, la galería no se enseña.
   En local sale la chuleta de cómo añadirlas; en la web publicada, una línea
   discreta (aunque a esta página no se llega: el menú la esconde si está vacía). */
function SinPiezas() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <p className="text-text-muted text-[15px]">
        Estoy preparando esta sección.
      </p>
    );
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
