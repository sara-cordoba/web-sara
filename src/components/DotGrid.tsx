"use client";

import { useEffect, useRef } from "react";

export default function DotGrid() {
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const spot = spotRef.current;
    if (!spot) return;

    const handleMove = (e: MouseEvent) => {
      spot.style.setProperty("--mx", `${e.clientX}px`);
      spot.style.setProperty("--my", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div
        className="dot-grid-base fixed inset-0 z-[1] pointer-events-none"
        aria-hidden
      />
      <div
        ref={spotRef}
        className="dot-grid-spotlight fixed inset-0 z-[1] pointer-events-none"
        aria-hidden
      />
    </>
  );
}
