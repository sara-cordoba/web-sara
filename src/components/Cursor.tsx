"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, input, textarea, select, [data-cursor]";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const hovered = !!t?.closest(INTERACTIVE);
      if (svgRef.current) {
        svgRef.current.style.transform = hovered ? "scale(1.25)" : "scale(1)";
      }
    };
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null && ref.current) {
        ref.current.style.opacity = "0";
      }
    };
    const onEnter = () => {
      if (ref.current) ref.current.style.opacity = "1";
    };
    const onBlur = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };
    const onFocus = () => {
      if (ref.current) ref.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mouseover", onEnter);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseover", onEnter);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        opacity: 1,
        transition: "opacity 0.15s ease-out",
      }}
    >
      <svg
        ref={svgRef}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{
          transition: "transform 0.18s ease-out",
          filter:
            "drop-shadow(0 0 6px rgba(255,255,255,0.55)) drop-shadow(0 0 14px rgba(163,217,119,0.35))",
        }}
      >
        <path
          d="M5 3 L23 13 L14 15 L11 24 Z"
          fill="#ffffff"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
