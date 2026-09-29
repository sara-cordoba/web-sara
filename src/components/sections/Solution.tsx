import { Section, Eyebrow, H2, Lede } from "../ui";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";
import { serviciosPara } from "@/i18n/contenido";

/* Un icono por servicio. La clave es el `icon` de SOLUTIONS ("01", "02"...),
   que también sirve para buscar su traducción: por eso no se cambia allí. */
const TRAZOS_SERVICIO: Record<string, React.ReactNode> = {
  // Diseño & Producto: una ventana de navegador con su maqueta
  "01": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18" />
      <path d="M7 12h6" />
      <path d="M7 16h10" />
    </>
  ),
  // Contenido & Comunicación: un bocadillo de conversación
  "02": (
    <>
      <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M8 10h8" />
      <path d="M8 13h5" />
    </>
  ),
  // Edición de vídeos: una claqueta
  "03": (
    <>
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="m3 9 17-5 1 3.5" />
      <path d="m8 7.5 2 3" />
      <path d="m13 6 2 3" />
      <path d="m10.5 12.5 4 2.5-4 2.5z" />
    </>
  ),
  // Dirección creativa: una brújula
  "04": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
};

function IconoServicio({ id }: { id: string }) {
  const trazos = TRAZOS_SERVICIO[id];
  if (!trazos) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-7 h-7 lg:w-8 lg:h-8"
    >
      {trazos}
    </svg>
  );
}

type Props = {
  idioma?: Idioma;
  eyebrow?: string;
  heading?: React.ReactNode;
  lede?: string;
};

export default function Solution({
  idioma = "es",
  eyebrow,
  heading,
  lede,
}: Props) {
  const t = textos(idioma);
  // Se recorre siempre la lista española: si un servicio no está traducido,
  // sale en español en vez de desaparecer de la página.
  const servicios = serviciosPara(idioma);

  return (
    <Section>
      <Eyebrow>{eyebrow ?? t.solution.eyebrow}</Eyebrow>
      <H2>{heading ?? t.solution.h2}</H2>
      <Lede>{lede ?? t.solution.lede}</Lede>
      <div className="bg-[#0c0c0c] border border-lime/15 rounded-2xl p-2 lg:p-4 mt-12">
        {servicios.map((s, i) => (
          <div
            key={i}
            className="group flex items-center gap-5 lg:gap-6 px-4 lg:px-6 py-4 lg:py-5 border-b border-lime/10 last:border-b-0 border-dashed transition-all duration-300 hover:bg-lime/[0.04] hover:px-5 lg:hover:px-7 cursor-default"
          >
            <div className="text-lime min-w-[38px] flex items-center">
              <IconoServicio id={s.icon} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-text text-lg lg:text-xl font-medium mb-1.5 leading-tight">
                {s.title}
              </h3>
              <div className="font-mono text-[10px] text-text-soft/70 tracking-[0.15em] uppercase mb-3">
                {s.sub}
              </div>
              <p className="text-text-soft/65 text-sm leading-relaxed">
                {s.items.join(" · ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
