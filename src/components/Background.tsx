export default function Background() {
  return (
    <div
      aria-hidden
      className="v3-bg fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(70% 50% at 50% -10%, rgba(255, 255, 255, 0.03), transparent 60%),
          radial-gradient(60% 60% at 50% 120%, rgba(0, 0, 0, 0.4), transparent 60%)
        `,
      }}
    />
  );
}
