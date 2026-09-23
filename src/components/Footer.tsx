import Link from "next/link";
import { GALERIA } from "@/data/galeria";
import { CONTACT_EMAIL } from "@/data/site";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

export default function Footer({
  // El perfil profesional se enlaza solo desde el pie de la home: es para
  // quien viene del CV o de LinkedIn, no para quien busca un servicio.
  mostrarPerfil = false,
  // Por defecto español, que es el idioma de la mayoría de las páginas y así
  // las que solo existen en español no tienen que decir nada.
  idioma = "es",
}: {
  mostrarPerfil?: boolean;
  idioma?: Idioma;
}) {
  const t = textos(idioma);
  const enIngles = idioma === "en";
  const inicio = enIngles ? "/en" : "/";
  const trabajos = enIngles ? "/en/work" : "/trabajos";
  const contacto = enIngles ? "/en/contact" : "/contacto";

  return (
    <footer className="mt-[64px] md:mt-[100px] border-t border-border px-6 md:px-8 max-w-page mx-auto text-[13px] text-text-muted">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 pt-10 pb-8">
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.08em] uppercase text-text mb-[14px] font-medium">
            Sara Córdoba
          </h5>
          <p className="m-0 text-text-soft max-w-[360px]">{t.footer.lema}</p>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.08em] uppercase text-text mb-[14px] font-medium">
            {t.footer.navegacion}
          </h5>
          <ul className="p-0 m-0 list-none flex flex-col gap-2">
            <li>
              <Link href={inicio} className="text-text-soft hover:text-lime">
                {t.footer.inicio}
              </Link>
            </li>
            {GALERIA.length > 0 && (
              <li>
                <Link
                  href={trabajos}
                  className="text-text-soft hover:text-lime"
                >
                  {t.footer.trabajos}
                </Link>
              </li>
            )}
            <li>
              <Link href={contacto} className="text-text-soft hover:text-lime">
                {t.footer.contacto}
              </Link>
            </li>
            {/* El perfil profesional solo existe en español. */}
            {mostrarPerfil && !enIngles && (
              <li>
                <Link href="/perfil" className="text-text-soft hover:text-lime">
                  {t.footer.perfil}
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.08em] uppercase text-text mb-[14px] font-medium">
            {t.footer.contactoTitulo}
          </h5>
          <ul className="p-0 m-0 list-none flex flex-col gap-2 text-text-soft">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-lime transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>{t.footer.ubicacion}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-[12px] text-text-dim">{t.footer.copyright}</div>
        <nav
          aria-label={t.footer.enlacesLegales}
          className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted"
        >
          {/* Discreto y en el pie, no en el menú. Solo en español: el programa
              de recomendaciones va con precios en euros y clientes de aquí. */}
          {!enIngles && (
            <Link
              href="/recomienda"
              className="hover:text-lime transition-colors"
            >
              {t.footer.recomienda}
            </Link>
          )}
          {/* Las tres legales solo existen en español, pero tienen que estar
              al alcance desde cualquier página, así que desde el inglés se
              enlazan igual, con el nombre en inglés. */}
          <Link
            href="/aviso-legal"
            className="hover:text-lime transition-colors"
          >
            {t.footer.avisoLegal}
          </Link>
          <Link
            href="/privacidad"
            className="hover:text-lime transition-colors"
          >
            {t.footer.privacidad}
          </Link>
          <Link href="/cookies" className="hover:text-lime transition-colors">
            {t.footer.cookies}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
