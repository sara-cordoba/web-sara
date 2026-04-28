import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-[100px] border-t border-border pt-10 pb-8 px-8 max-w-page mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 text-[13px] text-text-muted">
      <div>
        <h5 className="font-mono text-[11px] tracking-[0.08em] uppercase text-text mb-[14px] font-medium">
          Sara Córdoba · Estudio
        </h5>
        <p className="m-0 text-text-soft max-w-[360px]">
          Diseño con propósito para marcas que tienen algo verdadero que decir.
        </p>
        <div className="mt-8 text-[12px] text-text-dim">© 2026 · Barcelona</div>
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
            <Link href="/servicios" className="text-text-soft hover:text-lime">
              Servicios
            </Link>
          </li>
          <li>
            <Link href="/trabajos" className="text-text-soft hover:text-lime">
              Trabajos
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
          <li>Barcelona, ES</li>
          <li>Disponible Q3 2026</li>
        </ul>
      </div>
    </footer>
  );
}
