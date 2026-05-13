"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Eyebrow, H1, CtaButton, GhostButton } from "@/components/ui";
import MarqueeClients from "@/components/MarqueeClients";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export interface HeroProps {
  videoWebmSrc?: string;
  videoMp4Src?: string;
  videoMobileMp4Src?: string;
  posterSrc?: string;
}

export default function Hero({
  videoWebmSrc = "/img/showreel.webm",
  videoMp4Src = "/img/showreel-1080.mp4",
  videoMobileMp4Src = "/img/showreel-mobile.mp4",
  posterSrc = "/img/showreel-poster.jpg",
}: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMobile = () => setIsMobile(mqMobile.matches);
    const updateReduced = () => setReducedMotion(mqReduced.matches);

    updateMobile();
    updateReduced();

    mqMobile.addEventListener("change", updateMobile);
    mqReduced.addEventListener("change", updateReduced);

    return () => {
      mqMobile.removeEventListener("change", updateMobile);
      mqReduced.removeEventListener("change", updateReduced);
    };
  }, []);

  return (
    <section aria-label="Inicio" className="relative w-full bg-bg">
      {/* 1. Bloque vídeo */}
      <div className="relative w-full h-[60vh] max-h-[680px] min-h-[420px] bg-bg-deep overflow-hidden">
        {reducedMotion ? (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${posterSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
        ) : (
          <motion.video
            key={isMobile ? "mobile" : "desktop"}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <source src={videoWebmSrc} type="video/webm" />
            <source
              src={isMobile ? videoMobileMp4Src : videoMp4Src}
              type="video/mp4"
            />
          </motion.video>
        )}

        {/* Overlays editoriales */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <div className="absolute top-4 left-4 lg:top-6 lg:left-6 font-mono text-[10px] tracking-wider text-lime/85 flex items-center gap-2 z-10 pointer-events-none">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-danger"
              aria-hidden="true"
            />
            <span>REC</span>
          </div>

          <div className="absolute top-4 right-4 lg:top-6 lg:right-6 font-mono text-[10px] tracking-wider text-lime/85 z-10 pointer-events-none">
            LOOP · 01:10
          </div>

          <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 font-mono text-[10px] tracking-wider text-right text-text-soft/60 leading-relaxed z-10 pointer-events-none">
            <div>9 PROYECTOS</div>
            <div className="text-lime/60 mt-0.5">
              DISEÑO · CONTENIDO · DIRECCIÓN
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. MarqueeClients */}
      <MarqueeClients />

      {/* 3. Bloque héroe */}
      <div className="relative max-w-page mx-auto px-6 sm:px-10 lg:px-16 py-[60px] lg:py-[80px]">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-end"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 lg:col-start-1 lg:row-start-1"
          >
            <Eyebrow>Freelance · Barcelona</Eyebrow>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-start-1 lg:row-start-2"
          >
            <H1>
              No es <span className="v3-strike">solo</span> contenido. Es
              contenido que <span className="text-lime">conecta</span>.
            </H1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mt-7 lg:col-start-1 lg:row-start-3"
          >
            <CtaButton href="/contacto">¡Hablemos!</CtaButton>
            <GhostButton href="/trabajos">Ver trabajos</GhostButton>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:pb-1 max-w-md lg:col-start-2 lg:row-start-1 lg:row-span-3"
          >
            <p
              className="text-text-soft leading-relaxed"
              style={{ fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.65 }}
            >
              Si estás aquí es porque algo en tu marca no termina de encajar. La
              web no convence, el contenido no conecta, o simplemente no sabes
              por dónde empezar.{" "}
              <strong className="text-text font-semibold">
                Yo me encargo de eso.
              </strong>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
