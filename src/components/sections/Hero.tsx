"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Eyebrow, H1, CtaButton, GhostButton } from "@/components/ui";

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
    <section
      aria-label="Inicio"
      className="relative w-full -mt-[90px] min-h-[100svh] min-h-[640px] overflow-hidden bg-bg"
    >
      {reducedMotion ? (
        <div
          className="absolute inset-0 w-full h-full z-0"
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
          className="absolute inset-0 w-full h-full object-cover z-0"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      <div className="absolute left-6 right-6 lg:left-16 lg:right-16 bottom-10 lg:bottom-16 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-end"
        >
          <div>
            <motion.div variants={itemVariants} className="mb-5">
              <Eyebrow>Freelance · Barcelona</Eyebrow>
            </motion.div>
            <motion.div variants={itemVariants}>
              <H1>
                No es <span className="v3-strike">solo</span> contenido. Es
                contenido que <span className="text-lime">conecta</span>.
              </H1>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mt-7"
            >
              <CtaButton href="/contacto">¡Hablemos!</CtaButton>
              <GhostButton href="/trabajos">Ver trabajos</GhostButton>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="lg:pb-1 max-w-md">
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
