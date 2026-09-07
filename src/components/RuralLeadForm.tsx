"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, FORM_ENABLED, FORM_ENDPOINT } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

export default function RuralLeadForm() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [current, setCurrent] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Si el envío falla o aún no está configurado, no se pierde nada:
  // el visitante puede mandar lo que ha escrito por correo con un clic.
  const mailtoHref =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(
      `Web para ${place || "nuestro alojamiento"}`
    )}` +
    `&body=${encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Alojamiento: ${place}`,
        `Teléfono: ${phone}`,
        `Qué tenemos ahora: ${current}`,
      ].join("\n")
    )}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Trampa antispam: los robots rellenan todos los campos, las personas no
    // ven este. Si viene relleno, se descarta sin avisar.
    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!FORM_ENABLED) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nombre: name,
          Alojamiento: place,
          "Teléfono": phone,
          "Qué tienen ahora": current,
          Origen: "Página casas rurales",
          _subject: `Casa rural — ${place || name}`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-[20px] border border-lime/30 p-8 sm:p-10 text-center"
        style={{ background: "linear-gradient(180deg, #122821, #0f1f1a)" }}
      >
        <div className="mx-auto mb-5 w-12 h-12 rounded-full grid place-items-center bg-lime/15 border border-lime/30 text-lime text-xl">
          ✓
        </div>
        <h3 className="text-text text-xl sm:text-2xl font-semibold mb-3">
          Recibido{name ? `, ${name}` : ""}.
        </h3>
        <p className="text-text-soft max-w-sm mx-auto text-[15px]">
          Os llamo yo en menos de 24 horas. Sin compromiso y sin coste.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] border border-border p-6 sm:p-8 flex flex-col gap-5"
      style={{ background: "linear-gradient(180deg, #122821, #0f1f1a)" }}
    >
      <Field label="Vuestro nombre">
        <input
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cómo os llamáis"
          className="v3-input"
        />
      </Field>

      <Field label="Nombre del alojamiento">
        <input
          type="text"
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Casa rural El Molino"
          className="v3-input"
        />
      </Field>

      <Field label="Teléfono">
        <input
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="600 00 00 00"
          className="v3-input"
        />
      </Field>

      <Field label="Qué tenéis ahora">
        <textarea
          required
          rows={3}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="Solo estamos en Booking · Tenemos una web vieja que en el móvil no se ve · No tenemos nada"
          className="v3-input resize-y min-h-[90px]"
        />
      </Field>

      {/* Campo trampa para robots. No se ve y no se puede seleccionar con el tabulador. */}
      <div className="hidden" aria-hidden>
        <label>
          No rellenar
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-[13px] text-text-soft cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-[3px] w-4 h-4 accent-lime cursor-pointer flex-shrink-0"
        />
        <span>
          Acepto que Sara guarde estos datos para responderme.{" "}
          <Link
            href="/privacidad"
            target="_blank"
            className="text-lime underline underline-offset-2"
          >
            Cómo se tratan
          </Link>
          .
        </span>
      </label>

      {(status === "error" || status === "unconfigured") && (
        <p className="text-danger text-[13px] leading-relaxed">
          No he podido enviarlo desde aquí.{" "}
          <a href={mailtoHref} className="underline underline-offset-2">
            Mandádmelo por correo con un clic
          </a>{" "}
          y os llamo igual.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2 bg-lime text-green font-semibold text-[15px] px-6 py-[14px] rounded-[12px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer w-full sm:w-auto sm:self-start"
      >
        {status === "submitting" ? "Enviando…" : "Enviádmelo"}
        {status !== "submitting" && (
          <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
            →
          </span>
        )}
      </button>

      <p className="text-text-muted text-[12px] leading-relaxed">
        Os llamo yo en menos de 24 horas. Sin compromiso y sin coste. Vuestros
        datos se usan solo para responderos.
      </p>
    </form>
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
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-text-muted font-medium">
        {label}
      </span>
      {children}
    </label>
  );
}
