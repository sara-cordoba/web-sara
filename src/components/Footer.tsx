import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-[64px] md:mt-[100px] border-t border-border px-6 md:px-8 max-w-page mx-auto text-[13px] text-text-muted">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 pt-10 pb-8">
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.08em] uppercase text-text mb-[14px] font-medium">
            Sara Córdoba
          </h5>
          <p className="m-0 text-text-soft max-w-[360px]">
            Diseño con propósito para marcas que tienen algo verdadero que decir.
          </p>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.08em] uppercase text-text mb-[14px] font-medium">
            Navegación
          </h5>
          <ul className="p-0 m-0 list-none flex flex-col gap-2">
            <li>
              <Link href="/" className="text-text-soft hover:text-lime">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-text-soft hover:text-lime">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.08em] uppercase text-text mb-[14px] font-medium">
            Contacto
          </h5>
          <ul className="p-0 m-0 list-none flex flex-col gap-2 text-text-soft">
            <li>scordobalazaro@gmail.com</li>
            <li>España · Remoto</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-[12px] text-text-dim">© 2026 · España</div>
        <nav
          aria-label="Enlaces legales"
          className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted"
        >
          <Link
            href="/aviso-legal"
            className="hover:text-lime transition-colors"
          >
            Aviso Legal
          </Link>
          <Link
            href="/privacidad"
            className="hover:text-lime transition-colors"
          >
            Privacidad
          </Link>
          <Link href="/cookies" className="hover:text-lime transition-colors">
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
