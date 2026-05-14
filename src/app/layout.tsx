import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Background from "@/components/Background";
import DotGrid from "@/components/DotGrid";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freelance",
  description:
    "Freelance en Barcelona. Diseño, dirección creativa y sistemas visuales para marcas con algo verdadero que decir.",
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
      </body>
    </html>
  );
}
