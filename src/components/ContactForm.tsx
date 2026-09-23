"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, enviarFormulario } from "@/data/site";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

/* Las opciones de los desplegables están en src/i18n: lo que se envía a
   Netlify va en el idioma en el que ha rellenado el formulario el visitante,
   que es la única forma de que se entienda lo que ha contestado. */

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  idioma = "es",
}: {
  idioma?: Idioma;
}) {
  const t = textos(idioma).formulario;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const [timing, setTiming] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const toggleNeed = (value: string) => {
    setNeeds((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent || status === "submitting") return;

    setStatus("submitting");
    // Los nombres de los campos tienen que coincidir con public/__forms.html
    const enviado = await enviarFormulario("contacto", {
      nombre: name,
      email,
      empresa: company || "—",
      "web-o-instagram": url || "—",
      "que-necesita": needs.length ? needs.join(", ") : "—",
      "punto-de-partida": stage || "—",
      "cuando-empezar": timing || "—",
      presupuesto: budget || t.prefieroHablarlo,
      mensaje: message,
    });
    setStatus(enviado ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="mx-auto mb-6 w-14 h-14 rounded-full grid place-items-center bg-lime/15 border border-lime/30 text-lime text-2xl">
          ✓
        </div>
        <h3 className="text-text text-2xl font-semibold mb-3">
          {t.exitoTitulo}
        </h3>
        <p className="text-text-soft max-w-md mx-auto">
          {t.exitoGracias}
          {name ? `, ${name}` : ""}
          {t.exitoResto}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldText
          label={t.nombre}
          required
          value={name}
          onChange={setName}
          placeholder={t.nombrePlaceholder}
        />
        <FieldText
          label={t.email}
          type="email"
          required
          value={email}
          onChange={setEmail}
          placeholder={t.emailPlaceholder}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldText
          label={t.empresa}
          value={company}
          onChange={setCompany}
          placeholder={t.opcional}
        />
        <FieldText
          label={t.webInstagram}
          value={url}
          onChange={setUrl}
          placeholder={t.opcional}
        />
      </div>

      <div>
        <FieldLabel>{t.queNecesitas} <Required /></FieldLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          {t.necesidades.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-lime/15 rounded-lg cursor-pointer hover:border-lime/40 transition-colors"
            >
              <input
                type="checkbox"
                checked={needs.includes(opt)}
                onChange={() => toggleNeed(opt)}
                className="w-4 h-4 accent-lime"
              />
              <span className="text-text text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <FieldSelect
        label={<>{t.enQuePunto} <Required /></>}
        required
        value={stage}
        onChange={setStage}
        options={t.puntos}
        placeholder={t.selecciona}
      />

      <FieldSelect
        label={<>{t.cuandoEmpezar} <Required /></>}
        required
        value={timing}
        onChange={setTiming}
        options={t.cuando}
        placeholder={t.selecciona}
      />

      <FieldSelect
        label={t.presupuesto}
        value={budget}
        onChange={setBudget}
        options={t.presupuestos}
        placeholder={t.presupuestoPlaceholder}
      />

      <div>
        <FieldLabel>{t.cuentame} <Required /></FieldLabel>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder={t.cuentamePlaceholder}
          className="mt-2 w-full px-4 py-3 bg-[#0a0a0a] border border-lime/15 rounded-lg text-text placeholder:text-text-muted focus:border-lime/40 focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all resize-y"
        />
      </div>

      <label className="flex items-start gap-3 mt-2 text-sm text-text-soft cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 accent-lime cursor-pointer flex-shrink-0"
        />
        <span>
          {t.consentimientoAntes}{" "}
          <Link
            href="/privacidad"
            className="text-lime hover:underline underline-offset-2"
            target="_blank"
          >
            {t.consentimientoEnlace}
          </Link>
          {t.consentimientoDespues}
        </span>
      </label>

      {status === "error" && (
        <p className="text-danger text-sm">
          {t.errorAntes}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          {t.errorDespues}
        </p>
      )}

      <button
        type="submit"
        disabled={!consent || status === "submitting"}
        className="self-start mt-2 px-7 py-3 bg-lime text-bg font-semibold rounded-full hover:bg-lime-bright transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lime"
      >
        {status === "submitting" ? t.enviando : t.enviar}
        {status !== "submitting" && <span aria-hidden>→</span>}
      </button>

      <p className="text-text-muted text-xs mt-1">
        {t.aviso}
      </p>
    </form>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-lime/80 uppercase tracking-[0.12em]">
      {children}
    </span>
  );
}

function Required() {
  return <span className="text-danger ml-0.5">*</span>;
}

function FieldText({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>
        {label}
        {required && <Required />}
      </FieldLabel>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full px-4 py-3 bg-[#0a0a0a] border border-lime/15 rounded-lg text-text placeholder:text-text-muted focus:border-lime/40 focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all"
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
  required,
  placeholder,
}: {
  label: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
  /** Obligatorio: es lo que se lee en la opción vacía del desplegable. */
  placeholder: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-4 py-3 bg-[#0a0a0a] border border-lime/15 rounded-lg text-text focus:border-lime/40 focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all"
      >
        <option value="" style={{ color: "#8a9189", backgroundColor: "#0a0a0a" }}>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: "#f5f0e6", backgroundColor: "#0a0a0a" }}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
