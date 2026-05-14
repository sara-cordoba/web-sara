"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eyebrow, H1, CtaButton } from "@/components/ui";

const TYPED_TEXT = "No es solo contenido.";
const STRIKE_START = 6;
const STRIKE_END = 10;

interface TypewriterTitleProps {
  trigger: boolean;
  onComplete?: () => void;
  speed?: number;
  delay?: number;
}

function TypewriterTitle({
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
    if (progress < TYPED_TEXT.length) {
      const t = setTimeout(() => setProgress((p) => p + 1), speed);
      return () => clearTimeout(t);
    }
    if (progress === TYPED_TEXT.length) {
      onComplete?.();
    }
  }, [started, progress, speed, onComplete]);

  const before = TYPED_TEXT.slice(0, Math.min(progress, STRIKE_START));
  const inStrike =
    progress > STRIKE_START
      ? TYPED_TEXT.slice(STRIKE_START, Math.min(progress, STRIKE_END))
      : "";
  const after =
    progress > STRIKE_END ? TYPED_TEXT.slice(STRIKE_END, progress) : "";

  const isComplete = progress >= TYPED_TEXT.length;

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

export default function Statement() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [line1Done, setLine1Done] = useState(false);
  const [restVisible, setRestVisible] = useState(false);

  useEffect(() => {
    if (!line1Done) return;
    const t = setTimeout(() => setRestVisible(true), 600);
    return () => clearTimeout(t);
  }, [line1Done]);

  return (
    <section
      ref={ref}
      aria-label="Manifiesto"
      className="relative w-full overflow-hidden"
    >
      <div className="relative max-w-page mx-auto px-6 sm:px-10 lg:px-16 py-[80px] lg:py-[120px] z-10">
        <div className="flex flex-col items-center text-center gap-6 lg:gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>Freelance · Barcelona</Eyebrow>
          </motion.div>

          <H1>
            <span
              className="block min-h-[1.15em]"
              aria-label="No es solo contenido."
            >
              <TypewriterTitle
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
              Es contenido que{" "}
              <span
                className={`text-lime ${line1Done ? "animate-pulse-lime" : ""}`}
              >
                conecta
              </span>
              .
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
            Si estás aquí es porque algo en tu marca no termina de encajar. La
            web no convence, el contenido no conecta, o simplemente no sabes
            por dónde empezar.{" "}
            <strong className="text-text font-semibold">
              Yo me encargo de eso.
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
            <CtaButton href="/contacto">¡Hablemos!</CtaButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
