"use client";

import { useEffect, useRef } from "react";

export default function WaveBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let w = 0;
    let h = 0;
    const t0 = performance.now();

    function sync() {
      if (!canvas || !ctx || !parent) return;
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function tick(now: number) {
      if (!ctx) return;
      const t = (now - t0) * 0.001;
      ctx.clearRect(0, 0, w, h);

      const numLines = 60;
      const step = 4;
      const amp = Math.min(h * 0.22, 70);

      for (let i = 0; i < numLines; i++) {
        const lineProgress = i / (numLines - 1);
        const yBase = lineProgress * h;
        const phase = i * 0.045;

        // gradient lime -> lime-bright
        const r = Math.round(163 + (196 - 163) * lineProgress);
        const g = Math.round(217 + (240 - 217) * lineProgress);
        const b = Math.round(119 + (143 - 119) * lineProgress);
        const alpha = 0.08 + Math.abs(Math.sin(i * 0.18 + t * 0.12)) * 0.12;

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 0.6;

        ctx.beginPath();
        for (let x = 0; x <= w; x += step) {
          // envelope: wave packets that drift across (slow)
          const envA = Math.sin(x * 0.0045 - t * 0.22 + phase);
          const envB = Math.sin(x * 0.0014 + t * 0.07 - phase * 0.4);
          const envelope = envA * envB;
          // carrier wave (slow)
          const carrier = Math.sin(x * 0.013 + t * 0.18 + phase * 1.2);
          const y = yBase + amp * envelope * carrier;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    }

    const onResize = () => sync();

    sync();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
