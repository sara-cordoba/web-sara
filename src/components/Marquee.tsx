export default function Marquee() {
  return (
    <div className="relative z-[5] mt-12 h-[2px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-[rgba(163,217,119,0.18)]"
        style={{ boxShadow: "0 0 6px rgba(163,217,119,0.20)" }}
      />
      <div
        className="absolute inset-y-0 left-0 w-[28%] animate-neon-sweep"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196,240,143,1), transparent)",
          boxShadow: "0 0 16px 3px rgba(163,217,119,0.65)",
        }}
      />
    </div>
  );
}
