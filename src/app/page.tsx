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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Solution />
      <Process />
      <Works />
      <AntesDespuesSeccion />
      <Testimonios />
      <About />
      <Banner />
      <Footer mostrarPerfil />
    </>
  );
}
