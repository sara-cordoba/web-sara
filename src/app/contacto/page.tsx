import ContactForm from "@/components/ContactForm";
import { Eyebrow, H1, Lede } from "@/components/ui";

export default function ContactoPage() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative max-w-page mx-auto px-6 sm:px-10 lg:px-16 py-[80px] lg:py-[120px]">
        <div className="max-w-3xl mb-12 lg:mb-16 mx-auto text-center">
          <Eyebrow>Contacto</Eyebrow>
          <H1 className="mt-4">Cuéntame tu proyecto.</H1>
          <Lede className="mt-6 mx-auto">
            Cuéntame los detalles de tu proyecto. Te respondo con una propuesta
            personalizada, sin compromiso.
          </Lede>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
