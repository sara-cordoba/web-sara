import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Solution from "@/components/sections/Solution";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import AntesDespuesSeccion from "@/components/sections/AntesDespuesSeccion";
import Testimonios from "@/components/sections/Testimonios";
import Banner from "@/components/sections/Banner";
import Footer from "@/components/Footer";
import type { Idioma } from "@/i18n/config";

/* Las secciones de la home, en el orden en el que se leen. Es el mismo en
   los dos idiomas: al añadir o mover una sección, se toca solo aquí. */
export default function PaginaHome({ idioma = "es" }: { idioma?: Idioma }) {
  return (
    <>
      <Hero idioma={idioma} />
      <Statement idioma={idioma} />
      <Solution idioma={idioma} />
      <Process idioma={idioma} />
      <Works idioma={idioma} />
      <AntesDespuesSeccion idioma={idioma} />
      <Testimonios idioma={idioma} />
      <About idioma={idioma} />
      <Banner idioma={idioma} />
      <Footer mostrarPerfil idioma={idioma} />
    </>
  );
}
