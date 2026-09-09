import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Background from "@/components/Background";
import DotGrid from "@/components/DotGrid";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Nika from "@/components/Nika";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// La monoespaciada solo se usa en etiquetas pequeñas, así que se queda fuera
// del camino crítico: no se precarga y no compite con el titular al abrir.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Sara Córdoba · Desarrollo web y branding",
  description:
    "Desarrollo web y branding en remoto desde España. Diseño, dirección creativa y sistemas visuales para marcas con algo verdadero que decir.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-bg">
        <Cursor />
        <Background />
        <DotGrid />
        <Navbar />
        <div className="relative z-[5] pt-[90px] animate-page-fade">
          {children}
        </div>
        {/* Fuera de la capa z-[5] a propósito: si no, el chat no puede
            ponerse por encima de la barra superior. */}
        <Nika />
      </body>
    </html>
  );
}
