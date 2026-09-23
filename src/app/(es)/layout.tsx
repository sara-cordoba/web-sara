import type { Metadata, Viewport } from "next";
import Marco from "@/components/Marco";
import { DOMINIO } from "@/i18n/config";
import { es } from "@/i18n/es";
import { CLASES_FUENTES } from "../fuentes";
import "../globals.css";

/* Este es el layout raíz del español, que es el idioma por defecto y vive en
   las rutas de siempre, sin prefijo. El inglés tiene el suyo en (en), con su
   propio <html lang>. Los dos son hermanos: no hay un layout por encima. */

export const metadata: Metadata = {
  metadataBase: new URL(DOMINIO),
  title: es.meta.titulo,
  description: es.meta.descripcion,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LayoutEspanol({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={CLASES_FUENTES}>
      <body className="antialiased bg-bg">
        <Marco idioma="es">{children}</Marco>
      </body>
    </html>
  );
}
