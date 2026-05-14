"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const SARA_EMAIL = "scordobalazaro@gmail.com";

const NEEDS_OPTIONS = [
  "Diseño & producto",
  "Contenido & comunicación",
  "Vídeo & motion",
  "Dirección creativa",
];

const STAGE_OPTIONS = [
  "Marca nueva, parto de cero",
  "Tengo marca pero necesita un refresh",
  "Marca consolidada, busco acompañamiento",
  "Solo exploro opciones",
];

const TIMING_OPTIONS = [
  "Ya, urgente",
  "Próximos 1-2 meses",
  "Próximos 3-6 meses",
  "Aún explorando",
];

const BUDGET_OPTIONS = [
  "Menos de 3.000 €",
  "3.000 € — 8.000 €",
  "8.000 € — 20.000 €",
  "Más de 20.000 €",
  "Prefiero hablarlo",
];

export default function ContactForm() {
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

  const toggleNeed = (value: string) => {
    setNeeds((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const body = `Hola Sara,

Te escribo desde tu web con los detalles de mi proyecto.

· Nombre: ${name}
· Email: ${email}
· Empresa o marca: ${company || "—"}
· Web o Instagram: ${url || "—"}

¿Qué necesito?
${needs.length ? needs.map((n) => `· ${n}`).join("\n") : "—"}

¿En qué punto estoy?
${stage || "—"}

¿Cuándo me gustaría empezar?
${timing || "—"}

Presupuesto orientativo:
${budget || "Prefiero hablarlo"}

Sobre el proyecto:
${message}

—
Enviado desde saracordoba.com`;

    const subject = `Proyecto — ${name}${company ? ` (${company})` : ""}`;
    const mailto = `mailto:${SARA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldText
          label="Nombre"
          required
          value={name}
          onChange={setName}
          placeholder="Tu nombre"
        />
        <FieldText
          label="Email"
          type="email"
          required
          value={email}
          onChange={setEmail}
          placeholder="tu@email.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldText
          label="Empresa o marca"
          value={company}
          onChange={setCompany}
          placeholder="Opcional"
        />
        <FieldText
          label="Web o Instagram"
          value={url}
          onChange={setUrl}
          placeholder="Opcional"
        />
      </div>

      <div>
        <FieldLabel>¿Qué necesitas? <Required /></FieldLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          {NEEDS_OPTIONS.map((opt) => (
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
        label={<>¿En qué punto estás? <Required /></>}
        required
        value={stage}
        onChange={setStage}
        options={STAGE_OPTIONS}
        placeholder="Selecciona una opción"
      />

      <FieldSelect
        label={<>¿Cuándo te gustaría empezar? <Required /></>}
        required
        value={timing}
        onChange={setTiming}
        options={TIMING_OPTIONS}
        placeholder="Selecciona una opción"
      />

      <FieldSelect
        label="Presupuesto orientativo"
        value={budget}
        onChange={setBudget}
        options={BUDGET_OPTIONS}
        placeholder="Opcional · puedes elegir 'Prefiero hablarlo'"
      />

      <div>
        <FieldLabel>Cuéntame más sobre tu proyecto <Required /></FieldLabel>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Contexto, objetivos, lo que ya has intentado, lo que esperas conseguir…"
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
          He leído y acepto la{" "}
          <Link
            href="/privacidad"
            className="text-lime hover:underline underline-offset-2"
            target="_blank"
          >
            Política de Privacidad
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!consent}
        className="self-start mt-2 px-7 py-3 bg-lime text-bg font-semibold rounded-full hover:bg-lime-bright transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lime"
      >
        Enviar
        <span aria-hidden>→</span>
      </button>

      <p className="text-text-muted text-xs mt-1">
        Al enviar se abre tu cliente de email con tu mensaje prellenado para mandarlo a {SARA_EMAIL}. Sara lee y responde cada mensaje personalmente.
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
  placeholder?: string;
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
          {placeholder || "Selecciona…"}
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
