"use client";

import { useState } from "react";
import { Section, Eyebrow, H2, Lede } from "../ui";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section>
      <Eyebrow>Hablemos</Eyebrow>
      <H2>
        ¿Empezamos
        <br />
        con un <span className="text-lime">chocolate</span>?
      </H2>
      <Lede>
        Cuéntame en qué estás trabajando. Respondo en menos de 48 horas — sin
        formularios automáticos, sin plantillas.
      </Lede>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-[60px] items-center">
        <div className="flex flex-col">
          <div className="grid grid-cols-[120px_1fr] items-center py-[18px] border-t border-border text-[14px]">
            <span className="text-text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
              Email
            </span>
            <span className="text-text">
              <span className="text-lime">scordobalazaro</span>@gmail.com
            </span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center py-[18px] border-t border-border text-[14px]">
            <span className="text-text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
              Base
            </span>
            <span className="text-text">Barcelona, ES</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center py-[18px] border-t border-border text-[14px]">
            <span className="text-text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
              Disponibilidad
            </span>
            <span className="text-text">
              <span className="text-lime">Q3</span> 2026
            </span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center py-[18px] border-t border-b border-border text-[14px]">
            <span className="text-text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
              Estado
            </span>
            <span className="text-text inline-flex items-center gap-2">
              <span
                className="inline-block w-[6px] h-[6px] rounded-full bg-lime animate-pulse-dot"
                style={{ boxShadow: "0 0 8px #a3d977" }}
              />
              Aceptando proyectos
            </span>
          </div>
        </div>

        <form
          className="rounded-[20px] border border-border p-8 flex flex-col gap-[18px]"
          style={{ background: "linear-gradient(180deg, #122821, #0f1f1a)" }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Field label="Nombre">
            <input
              type="text"
              placeholder="Cómo te llamas"
              required
              className="v3-input"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              placeholder="hola@..."
              required
              className="v3-input"
            />
          </Field>
          <Field label="Tipo de proyecto">
            <select className="v3-input" defaultValue="">
              <option value="" disabled hidden>
                Elige una opción
              </option>
              <option>Diseño & Producto (Web · UI/UX · Branding)</option>
              <option>Contenido & Comunicación</option>
              <option>Vídeo & Motion</option>
              <option>Dirección creativa</option>
              <option>No estoy seguro/a — ayúdame</option>
            </select>
          </Field>
          <Field label="Cuéntame">
            <textarea
              placeholder="Qué quieres construir, para quién, y por qué ahora."
              rows={3}
              className="v3-input resize-y min-h-[80px]"
            />
          </Field>
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 bg-lime text-green font-semibold text-[13px] px-[18px] py-[10px] rounded-[10px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px border-0 cursor-pointer"
          >
            <span>{sent ? "Recibido — gracias" : "Enviar mensaje"}</span>
            <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
              →
            </span>
          </button>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] tracking-[0.06em] uppercase text-text-muted font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
