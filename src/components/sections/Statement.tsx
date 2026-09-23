"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eyebrow, H1, CtaButton } from "@/components/ui";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

interface TypewriterTitleProps {
  texto: string;
  /** Dónde empieza y acaba el trozo tachado, en letras. */
  inicioTachado: number;
  finTachado: number;
  trigger: boolean;
  onComplete?: () => void;
  speed?: number;
  delay?: number;
}

function TypewriterTitle({
  texto,
  inicioTachado,
  finTachado,
  trigger,
  onComplete,
  speed = 55,
  delay = 0,
}: TypewriterTitleProps) {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [trigger, delay]);

  useEffect(() => {
    if (!started) return;
    if (progress < texto.length) {
      const t = setTimeout(() => setProgress((p) => p + 1), speed);
      return () => clearTimeout(t);
    }
    if (progress === texto.length) {
      onComplete?.();
    }
  }, [started, progress, speed, onComplete, texto.length]);

  const before = texto.slice(0, Math.min(progress, inicioTachado));
  const inStrike =
    progress > inicioTachado
      ? texto.slice(inicioTachado, Math.min(progress, finTachado))
      : "";
  const after = progress > finTachado ? texto.slice(finTachado, progress) : "";

  const isComplete = progress >= texto.length;

  return (
    <>
      {before}
      {inStrike && <span className="v3-strike">{inStrike}</span>}
      {after}
      {!isComplete && started && (
        <span className="typewriter-caret" aria-hidden>
          |
        </span>
      )}
    </>
  );
}

export default function Statement({ idioma = "es" }: { idioma?: Idioma }) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [line1Done, setLine1Done] = useState(false);
  const [restVisible, setRestVisible] = useState(false);

  const t = textos(idioma);

  /* La frase que se escribe sola y su trozo tachado salen del diccionario:
     el tachado se mide sobre el texto de cada idioma, no con un número de
     letra fijo, que al traducir la frase tachaba lo que no era. */
  const { antes, tachado, despues } = t.statement.linea1;
  const frase = `${antes}${tachado}${despues}`;
  const inicioTachado = antes.length;
  const finTachado = inicioTachado + tachado.length;

  useEffect(() => {
    if (!line1Done) return;
    const t = setTimeout(() => setRestVisible(true), 600);
    return () => clearTimeout(t);
  }, [line1Done]);

  return (
    <section
      ref={ref}
      aria-label={t.statement.aria}
      className="relative w-full overflow-hidden"
    >
      <div className="relative max-w-page mx-auto px-6 sm:px-10 lg:px-16 py-[80px] lg:py-[120px] z-10">
        <div className="flex flex-col items-center text-center gap-6 lg:gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>{t.statement.eyebrow}</Eyebrow>
          </motion.div>

          <H1>
            <span className="block min-h-[1.15em]" aria-label={frase}>
              <TypewriterTitle
                texto={frase}
                inicioTachado={inicioTachado}
                finTachado={finTachado}
                trigger={inView}
                delay={400}
                onComplete={() => setLine1Done(true)}
              />
            </span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 14 }}
              animate={
                line1Done ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.statement.linea2.antes}
              <span
                className={`text-lime ${line1Done ? "animate-pulse-lime" : ""}`}
              >
                {t.statement.linea2.destacado}
              </span>
              {t.statement.linea2.despues}
            </motion.span>
          </H1>

          <motion.p
            className="text-text-soft leading-relaxed max-w-2xl"
            style={{ fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 18 }}
            animate={
              restVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.statement.parrafo.antes}{" "}
            <strong className="text-text font-semibold">
              {t.statement.parrafo.fuerte}
            </strong>
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 18 }}
            animate={
              restVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CtaButton href={idioma === "en" ? "/en/contact" : "/contacto"}>
              {t.statement.cta}
            </CtaButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
