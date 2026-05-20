"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MarqueeClients from "@/components/MarqueeClients";

// Ajuste visual de cada vídeo dentro de su tile.
// scale = zoom (1 = sin zoom). translateX positivo mueve el contenido visible hacia la IZQUIERDA del vídeo
// (porque desplaza el frame del vídeo hacia la derecha dentro del tile).
// Modificar estos valores para encuadrar mejor el contenido sin re-editar el reel.
const VIDEO_1_TRANSFORM = "scale(2) translateX(0%)";  // capa de títulos — zoom + encuadre izquierdo
const VIDEO_2_TRANSFORM = "scale(1)";                 // capa de diseños — zoom centrado

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
  const tileClasses = `relative aspect-square w-full max-h-[40vh] md:max-h-none md:w-auto overflow-hidden rounded-[10px] bg-black ${className}`;
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
  video1WebmSrc?: string;
  video1Mp4Src?: string;
  video1MobileMp4Src?: string;
  video1PosterSrc?: string;
  video2WebmSrc?: string;
  video2Mp4Src?: string;
  video2MobileMp4Src?: string;
  video2PosterSrc?: string;
}

export default function Hero({
  video1WebmSrc = "/img/reel-titulos.webm",
  video1Mp4Src = "/img/reel-titulos-720.mp4",
  video1MobileMp4Src = "/img/reel-titulos-mobile.mp4",
  video1PosterSrc = "/img/reel-titulos-poster.jpg",
  video2WebmSrc = "/img/reel-disenos.webm",
  video2Mp4Src = "/img/reel-disenos-720.mp4",
  video2MobileMp4Src = "/img/reel-disenos-mobile.mp4",
  video2PosterSrc = "/img/reel-disenos-poster.jpg",
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
    <section aria-label="Inicio" className="relative w-full bg-black -mt-[90px] pt-[90px]">
      {/* 1. Bloque vídeo — dos tiles 16:9 flotantes lado a lado */}
      <div className="relative w-full bg-black overflow-hidden">
        <div
          className="
            flex flex-col items-center justify-center gap-4 px-6 py-6
            md:flex-row md:gap-6 md:px-[60px] md:py-[30px]
            md:h-[min(75vh,720px)] md:min-h-[460px]
          "
        >
          <VideoTile
            webmSrc={video1WebmSrc}
            mp4Src={video1Mp4Src}
            mobileMp4Src={video1MobileMp4Src}
            posterSrc={video1PosterSrc}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            ariaLabel="Reel — capa de títulos"
            className="md:h-full md:aspect-auto md:flex-[2]"
            videoTransform={VIDEO_1_TRANSFORM}
          />
          <VideoTile
            webmSrc={video2WebmSrc}
            mp4Src={video2Mp4Src}
            mobileMp4Src={video2MobileMp4Src}
            posterSrc={video2PosterSrc}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            ariaLabel="Reel — capa de diseños"
            className="md:h-full md:aspect-auto md:flex-[3]"
            videoTransform={VIDEO_2_TRANSFORM}
          />
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
            LOOP · 01:10
          </div>
          <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 font-mono text-[10px] tracking-wider text-right text-text-soft/60 leading-relaxed z-10 pointer-events-none">
            <div>SC</div>
            <div className="text-lime/60 mt-0.5">
              DISEÑO · CONTENIDO · DESARROLLO
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. MarqueeClients */}
      <MarqueeClients />
    </section>
  );
}
