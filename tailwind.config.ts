import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a1612",
        "bg-deep": "#050b09",
        "bg-soft": "#0f1f1a",
        surface: "#122821",
        "surface-2": "#18342a",
        "surface-3": "#1f3d31",
        green: "#0d3b2e",
        "green-mid": "#1a5d45",
        lime: "#a3d977",
        "lime-bright": "#c4f08f",
        "lime-deep": "#6fa44a",
        cream: "#f5f0e6",
        warm: "#d4b894",
        "warm-glow": "#e8cea8",
        text: "#f5f0e6",
        "text-soft": "#c8c3b8",
        "text-muted": "#8a9189",
        "text-dim": "#5a615e",
        danger: "#e06b5a",
        border: "rgba(163, 217, 119, 0.10)",
        "border-strong": "rgba(163, 217, 119, 0.22)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        page: "1280px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -20px rgba(0,0,0,0.5)",
        "glow-lime": "0 0 40px rgba(163, 217, 119, 0.35)",
        "glow-edge":
          "0 0 12px 0 rgba(163, 217, 119, 0.30), 0 0 28px 2px rgba(163, 217, 119, 0.15), inset 0 0 18px rgba(163, 217, 119, 0.10)",
        "glow-soft":
          "0 0 8px 0 rgba(163, 217, 119, 0.15), 0 0 18px 1px rgba(163, 217, 119, 0.08), inset 0 0 12px rgba(163, 217, 119, 0.05)",
        "card-glow":
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -20px rgba(0,0,0,0.5), 0 0 12px 0 rgba(163, 217, 119, 0.30), 0 0 28px 2px rgba(163, 217, 119, 0.15), inset 0 0 18px rgba(163, 217, 119, 0.10)",
        cta: "0 8px 24px -8px rgba(163, 217, 119, 0.5)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "page-fade": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%,100%": {
            opacity: "1",
            boxShadow: "0 0 8px #a3d977",
          },
          "50%": {
            opacity: "0.55",
            boxShadow: "0 0 14px #a3d977",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "page-fade": "page-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-dot": "pulse-dot 2s infinite",
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
