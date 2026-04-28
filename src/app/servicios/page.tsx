import Solution from "@/components/sections/Solution";
import Footer from "@/components/Footer";

export default function ServiciosPage() {
  return (
    <>
      <Solution
        eyebrow="Servicios"
        heading={
          <>
            Tu sistema visual,
            <br />
            en <span className="text-lime">cuatro disciplinas</span>.
          </>
        }
      />
      <Footer />
    </>
  );
}
