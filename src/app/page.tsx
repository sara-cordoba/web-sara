import Hero from "@/components/sections/Hero";
import Marquee from "@/components/Marquee";
import Solution from "@/components/sections/Solution";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Banner from "@/components/sections/Banner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Solution />
      <Process />
      <About />
      <Works />
      <Banner />
      <Footer />
    </>
  );
}
