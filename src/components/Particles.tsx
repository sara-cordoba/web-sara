"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  phaseSpeed: number;
  baseAlpha: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  if (m.length === 3) {
    const [r, g, b] = m.split("").map((c) => parseInt(c + c, 16));
    return [r, g, b];
  }
  return [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16),
  ];
}

type Props = {
  density?: number;
  speed?: number;
  color?: string;
};

export default function Particles({
  density = 60,
  speed = 1,
  color = "#a3d977",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const [cr, cg, cb] = hexToRgb(color);

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function init() {
      particles = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25 - 0.05,
          r: Math.random() * 1.6 + 0.4,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.01,
          baseAlpha: 0.18 + Math.random() * 0.4,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        p.phase += p.phaseSpeed * speed;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 14400) {
          const f = (1 - dist2 / 14400) * 0.8;
          p.x += (dx / Math.sqrt(dist2 + 1)) * f;
          p.y += (dy / Math.sqrt(dist2 + 1)) * f;
        }

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const flicker = 0.65 + Math.sin(p.phase) * 0.35;
        const alpha = p.baseAlpha * flicker;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 0.5;
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const t = 1 - Math.sqrt(d2) / maxDist;
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${t * 0.1})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }
    function onResize() {
      resize();
      init();
    }

    resize();
    init();
    draw();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed top-0 left-0 w-screen h-screen z-[1] pointer-events-none will-change-transform"
    />
  );
}
