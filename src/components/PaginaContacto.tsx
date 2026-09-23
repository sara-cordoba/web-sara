import ContactForm from "@/components/ContactForm";
import { Eyebrow, H1, Lede } from "@/components/ui";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

/* El cuerpo de /contacto y de /en/contact. */
export default function PaginaContacto({
  idioma = "es",
}: {
  idioma?: Idioma;
}) {
  const t = textos(idioma);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative max-w-page mx-auto px-6 sm:px-10 lg:px-16 py-[80px] lg:py-[120px]">
        <div className="max-w-3xl mb-12 lg:mb-16 mx-auto text-center">
          <Eyebrow>{t.contactoPagina.eyebrow}</Eyebrow>
          <H1 className="mt-4">{t.contactoPagina.h1}</H1>
          <Lede className="mt-6 mx-auto">{t.contactoPagina.lede}</Lede>
        </div>
        <ContactForm idioma={idioma} />
      </div>
    </section>
  );
}
