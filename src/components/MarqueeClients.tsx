import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

// Nombres propios: no se traducen en ningún idioma.
const CLIENTS = [
  "GPAthletes",
  "Ajedrez Sistémico",
  "Develand",
  "AJE Madrid",
  "Cronos AI Consulting",
] as const;

export default function MarqueeClients({
  idioma = "es",
}: {
  idioma?: Idioma;
}) {
  // Repetimos lo suficiente para cubrir viewports anchos sin huecos cuando la animación llega a -50%
  const items = Array.from({ length: 6 }, () => CLIENTS).flat();
  const t = textos(idioma);

  return (
    <div
      className="relative w-full bg-bg border-t border-b border-border overflow-hidden py-3"
      aria-label={t.hero.clientes}
    >
      <div className="flex gap-10 whitespace-nowrap animate-marquee will-change-transform">
        {items.map((client, index) => (
          <span
            key={`${client}-${index}`}
            className="flex items-center gap-3 font-mono text-[12px] tracking-wider text-text-muted"
          >
            <span
              className="inline-block w-[5px] h-[5px] rounded-full bg-lime"
              aria-hidden="true"
            />
            {client}
          </span>
        ))}
      </div>
    </div>
  );
}
