"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const PAGES = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-8 py-[18px] border-b border-border md:px-5 md:py-[14px]"
      style={{
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        background: "rgba(10, 22, 18, 0.72)",
      }}
    >
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <div
          className="w-9 h-9 rounded-[10px] grid place-items-center text-green font-bold text-[14px] tracking-[-0.02em] shadow-glow-lime"
          style={{
            background: "linear-gradient(135deg, #a3d977, #6fa44a)",
          }}
        >
          SC
        </div>
        <div className="flex flex-col leading-[1.1]">
          <b className="font-semibold text-text text-[14px] tracking-[-0.01em]">
            Sara Córdoba
          </b>
          <span className="text-[11px] text-text-muted tracking-[0.02em] mt-[2px] hidden md:inline">
            Estudio · Barcelona
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex gap-1">
        {PAGES.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.href}
              href={p.href}
              className={clsx(
                "text-[13px] font-medium px-[14px] py-2 rounded-lg transition-colors duration-[250ms]",
                active
                  ? "text-lime bg-[rgba(163,217,119,0.08)]"
                  : "text-text-soft hover:text-text hover:bg-[rgba(163,217,119,0.05)]"
              )}
            >
              {p.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/contacto"
        className="group inline-flex items-center gap-2 bg-lime text-green font-semibold text-[13px] px-[18px] py-[10px] rounded-[10px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px"
      >
        Empezar conversación
        <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
          →
        </span>
      </Link>
    </header>
  );
}
