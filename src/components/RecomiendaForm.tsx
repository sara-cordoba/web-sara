"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, enviarFormulario } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

export default function RecomiendaForm() {
  const [nombre, setNombre] = useState("");
  const [tuContacto, setTuContacto] = useState("");
  const [recomendado, setRecomendado] = useState("");
  const [contacto, setContacto] = useState("");
  const [permiso, setPermiso] = useState(false);
  const [trampa, setTrampa] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const mailtoHref =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent("Te recomiendo a alguien")}` +
    `&body=${encodeURIComponent(
      [
        `Mi nombre: ${nombre}`,
        `Mi contacto: ${tuContacto}`,
        `Recomiendo a: ${recomendado}`,
        `Su contacto: ${contacto}`,
      ].join("\n"),
    )}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (trampa) {
      setStatus("success");
      return;
    }
    setStatus("submitting");
    // Los nombres de los campos tienen que coincidir con public/__forms.html
    const enviado = await enviarFormulario("recomienda", {
      nombre,
      contacto: tuContacto,
      recomendado,
      "contacto-recomendado": contacto,
    });
    setStatus(enviado ? "success" : "error");
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
          Recibido{nombre ? `, ${nombre}` : ""}.
        </h3>
        <p className="text-text-soft max-w-sm mx-auto text-[15px]">
          Hablo con {recomendado || "esa persona"} estos días. Te cuento cómo
          va, salga o no salga.
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
      <Campo label="Tu nombre">
        <input
          type="text"
          required
          autoComplete="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Cómo te llamas"
          className="v3-input"
        />
      </Campo>

      <Campo label="Tu correo o teléfono">
        <input
          type="text"
          required
          value={tuContacto}
          onChange={(e) => setTuContacto(e.target.value)}
          placeholder="Para poder abonarte lo tuyo"
          className="v3-input"
        />
      </Campo>

      <Campo label="A quién recomiendas">
        <input
          type="text"
          required
          value={recomendado}
          onChange={(e) => setRecomendado(e.target.value)}
          placeholder="Nombre de la persona o del negocio"
          className="v3-input"
        />
      </Campo>

      <Campo label="Cómo llego a esa persona">
        <input
          type="text"
          required
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          placeholder="Su teléfono, su correo o su Instagram"
          className="v3-input"
        />
      </Campo>

      <div className="hidden" aria-hidden>
        <label>
          No rellenar
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={trampa}
            onChange={(e) => setTrampa(e.target.value)}
          />
        </label>
      </div>

      {/* Aquí se pasan los datos de OTRA persona, así que hace falta decir que
          esa persona lo sabe. */}
      <label className="flex items-start gap-3 text-[13px] text-text-soft cursor-pointer">
        <input
          type="checkbox"
          required
          checked={permiso}
          onChange={(e) => setPermiso(e.target.checked)}
          className="mt-[3px] w-4 h-4 accent-lime cursor-pointer flex-shrink-0"
        />
        <span>
          Esa persona sabe que me vas a pasar su contacto y le parece bien.{" "}
          <Link
            href="/privacidad"
            target="_blank"
            className="text-lime underline underline-offset-2"
          >
            Cómo se tratan los datos
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="text-danger text-[13px] leading-relaxed">
          No he podido enviarlo desde aquí.{" "}
          <a href={mailtoHref} className="underline underline-offset-2">
            Mándamelo por correo con un clic
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2 bg-lime text-green font-semibold text-[15px] px-6 py-[14px] rounded-[12px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer w-full sm:w-auto sm:self-start"
      >
        {status === "submitting" ? "Enviando…" : "Enviar recomendación"}
        {status !== "submitting" && (
          <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
            →
          </span>
        )}
      </button>
    </form>
  );
}

function Campo({
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
