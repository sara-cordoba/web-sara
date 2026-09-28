"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { textos } from "@/i18n";
import type { Idioma } from "@/i18n/config";

// Ajuste visual del vídeo dentro de su tile.
// scale = zoom (1 = sin zoom). translateX positivo mueve el contenido visible hacia la IZQUIERDA del vídeo
// (porque desplaza el frame del vídeo hacia la derecha dentro del tile).
// Modificar este valor para encuadrar mejor el contenido sin re-editar el reel.
const VIDEO_TRANSFORM = "scale(1)";

type VideoTileProps = {
  webmSrc?: string;
  mp4Src: string;
  mobileMp4Src?: string;
  posterSrc?: string;
  isMobile: boolean;
  reducedMotion: boolean;
  ariaLabel: string;
  className?: string;
  videoTransform?: string;
};

function VideoTile({
  webmSrc,
  mp4Src,
  mobileMp4Src,
  posterSrc,
  isMobile,
  reducedMotion,
  ariaLabel,
  className = "",
  videoTransform,
}: VideoTileProps) {
  const tileClasses = `relative aspect-video w-full overflow-hidden rounded-[10px] bg-black ${className}`;
  const activeMp4 = isMobile && mobileMp4Src ? mobileMp4Src : mp4Src;

  if (reducedMotion && posterSrc) {
    return (
      <div
        className={tileClasses}
        style={{
          backgroundImage: `url(${posterSrc})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          transform: videoTransform,
        }}
        role="img"
        aria-label={ariaLabel}
      />
    );
  }

  return (
    <motion.video
      key={isMobile ? `${ariaLabel}-mobile` : `${ariaLabel}-desktop`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={posterSrc}
      aria-label={ariaLabel}
      className={`${tileClasses} object-cover`}
      style={{ transform: videoTransform }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={activeMp4} type="video/mp4" />
    </motion.video>
  );
}

export interface HeroProps {
  idioma?: Idioma;
  videoWebmSrc?: string;
  videoMp4Src?: string;
  videoMobileMp4Src?: string;
  videoPosterSrc?: string;
}

export default function Hero({
  idioma = "es",
  // Un solo reel 16:9 con los títulos ya montados encima de los diseños
  videoWebmSrc = "/img/reel-disenos.webm",
  videoMp4Src = "/img/reel-disenos-720.mp4",
  videoMobileMp4Src = "/img/reel-disenos-mobile.mp4",
  videoPosterSrc = "/img/reel-disenos-poster.jpg",
}: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const seccionRef = useRef<HTMLElement | null>(null);
  const t = textos(idioma);

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

  // Baja a la sección que va justo después de la portada, dejando sitio a la
  // cabecera fija para que no la tape.
  const bajar = () => {
    const siguiente = seccionRef.current?.nextElementSibling;
    if (!siguiente) return;
    const cabecera = document.querySelector("header")?.offsetHeight ?? 0;
    window.scrollTo({
      top: siguiente.getBoundingClientRect().top + window.scrollY - cabecera,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section ref={seccionRef} aria-label={t.hero.aria} className="relative w-full bg-black -mt-[90px] pt-[90px]">
      {/* 1. Bloque vídeo — un tile 16:9 centrado */}
      <div className="relative w-full bg-black overflow-hidden">
        <div
          className="
            flex flex-col items-center justify-center gap-4 px-6 py-6
            md:flex-row md:gap-6 md:px-[60px] md:py-[30px]
            md:h-[min(75vh,720px)] md:min-h-[460px]
          "
        >
          <VideoTile
            webmSrc={videoWebmSrc}
            mp4Src={videoMp4Src}
            mobileMp4Src={videoMobileMp4Src}
            posterSrc={videoPosterSrc}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            ariaLabel={t.hero.reelDisenos}
            className="md:h-full md:w-auto md:max-w-full"
            videoTransform={VIDEO_TRANSFORM}
          />
        </div>

        {/* Flecha para invitar a bajar: rebota suave, salvo con movimiento reducido.
            En móvil lleva aire debajo para no pisar el rótulo de disciplinas. */}
        <div className="relative z-20 flex justify-center pb-12 md:pb-5">
          <button
            type="button"
            onClick={bajar}
            aria-label={t.hero.verMas}
            className="grid place-items-center w-11 h-11 rounded-full text-lime transition-colors hover:text-lime-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              animate={reducedMotion ? { y: 0 } : { y: [0, 6, 0] }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 1.8, ease: "easeInOut", repeat: Infinity }
              }
            >
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </motion.svg>
          </button>
        </div>

        {/* Overlays editoriales — sobre el contenedor exterior, no sobre los tiles */}
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
            LOOP · 00:24
          </div>
          <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 font-mono text-[10px] tracking-wider text-right text-text-soft/60 leading-relaxed z-10 pointer-events-none">
            <div>SC</div>
            <div className="text-lime/60 mt-0.5">
              {t.hero.disciplinas}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
