import Hero from "@/components/sections/Hero";
import Solution from "@/components/sections/Solution";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import AntesDespuesSeccion from "@/components/sections/AntesDespuesSeccion";
import Testimonios from "@/components/sections/Testimonios";
import Banner from "@/components/sections/Banner";
import Footer from "@/components/Footer";
import MarqueeClients from "@/components/MarqueeClients";
import type { Idioma } from "@/i18n/config";

/* Las secciones de la home, en el orden en el que se leen. Es el mismo en
   los dos idiomas: al añadir o mover una sección, se toca solo aquí.
   La presentación de Sara va justo debajo de los vídeos, antes de la banda
   de clientes; la flecha del Hero baja a lo que venga después de él. */
export default function PaginaHome({ idioma = "es" }: { idioma?: Idioma }) {
  return (
    <>
      <Hero idioma={idioma} />
      <About idioma={idioma} />
      <MarqueeClients idioma={idioma} />
      <Solution idioma={idioma} />
      <Works idioma={idioma} />
      <AntesDespuesSeccion idioma={idioma} />
      <Testimonios idioma={idioma} />
      <Banner idioma={idioma} />
      <Footer mostrarPerfil idioma={idioma} />
    </>
  );
}
