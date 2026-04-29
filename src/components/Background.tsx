export default function Background() {
  return (
    <div
      aria-hidden
      className="v3-bg fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(80% 60% at 50% -10%, rgba(163, 217, 119, 0.04), transparent 60%),
          radial-gradient(60% 50% at 100% 100%, rgba(212, 184, 148, 0.03), transparent 60%),
          radial-gradient(50% 40% at 0% 80%, rgba(26, 93, 69, 0.08), transparent 60%)
        `,
      }}
    />
  );
}
