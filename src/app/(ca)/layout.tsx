import type { Metadata, Viewport } from "next";
import Marco from "@/components/Marco";
import { DOMINIO } from "@/i18n/config";
import { ca } from "@/i18n/ca";
import { CLASES_FUENTES } from "../fuentes";
import "../globals.css";

/* Layout raíz del catalán. Todo lo que cuelga de /ca pasa por aquí.
   Es hermano de los layouts de (es) y (en): mismo cuerpo, distinto <html lang>. */

export const metadata: Metadata = {
  metadataBase: new URL(DOMINIO),
  title: ca.meta.titulo,
  description: ca.meta.descripcion,
  // Verificación del dominio en Google Search Console.
  verification: { google: "xO9C4dIyZHfEuQaA_kzh1-kdUSNaKOcRQmDS9f6SFSs" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LayoutCatalan({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca" className={CLASES_FUENTES}>
      <body className="antialiased bg-bg">
        <Marco idioma="ca">{children}</Marco>
      </body>
    </html>
  );
}
