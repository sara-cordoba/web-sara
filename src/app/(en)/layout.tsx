import type { Metadata, Viewport } from "next";
import Marco from "@/components/Marco";
import { DOMINIO } from "@/i18n/config";
import { en } from "@/i18n/en";
import { CLASES_FUENTES } from "../fuentes";
import "../globals.css";

/* Layout raíz del inglés. Todo lo que cuelga de /en pasa por aquí.
   Es hermano del layout español de (es): mismo cuerpo, distinto <html lang>. */

export const metadata: Metadata = {
  metadataBase: new URL(DOMINIO),
  title: en.meta.titulo,
  description: en.meta.descripcion,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LayoutIngles({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={CLASES_FUENTES}>
      <body className="antialiased bg-bg">
        <Marco idioma="en">{children}</Marco>
      </body>
    </html>
  );
}
