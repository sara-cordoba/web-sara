import Background from "@/components/Background";
import Cursor from "@/components/Cursor";
import DotGrid from "@/components/DotGrid";
import Navbar from "@/components/Navbar";
import Nika from "@/components/Nika";
import type { Idioma } from "@/i18n/config";

/**
 * Todo lo que va dentro del <body> y es igual en los tres idiomas.
 *
 * Existe porque hay un layout raíz por idioma, y esto tenía que quedarse
 * escrito una sola vez: así ninguna versión se puede desalinear de las otras
 * por tocar solo una.
 */
export default function Marco({
  idioma,
  children,
}: {
  idioma: Idioma;
  children: React.ReactNode;
}) {
  return (
    <>
      <Cursor />
      <Background />
      <DotGrid />
      <Navbar idioma={idioma} />
      <div className="relative z-[5] pt-[90px] animate-page-fade">
        {children}
      </div>
      {/* Fuera de la capa z-[5] a propósito: si no, el chat no puede
          ponerse por encima de la barra superior. */}
      <Nika />
    </>
  );
}
