import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        "relative max-w-page mx-auto px-6 sm:px-10 lg:px-16 py-[100px] md:py-[70px]",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-lime mb-6 px-3 py-[6px] border border-border-strong rounded-full bg-[rgba(163,217,119,0.05)] font-medium">
      <span
        className="w-[6px] h-[6px] rounded-full bg-lime"
        style={{ boxShadow: "0 0 8px #a3d977" }}
      />
      {children}
    </div>
  );
}

export function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={clsx(
        "font-display font-semibold text-text m-0 mb-6",
        className
      )}
      style={{
        fontSize: "clamp(34px, 3.8vw, 52px)",
        lineHeight: 1.08,
        letterSpacing: "-0.035em",
      }}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={clsx(
        "font-display font-semibold text-text m-0 mb-5 max-w-[900px]",
        className
      )}
      style={{
        fontSize: "clamp(32px, 4.5vw, 56px)",
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
      }}
    >
      {children}
    </h2>
  );
}

export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "text-text-soft max-w-[640px] m-0 font-normal",
        className
      )}
      style={{
        fontSize: "clamp(16px, 1.3vw, 19px)",
        lineHeight: 1.6,
      }}
    >
      {children}
    </p>
  );
}

export function CtaButton({
  children,
  href,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const cls =
    "group inline-flex items-center gap-2 bg-lime text-green font-semibold text-[13px] px-[18px] py-[10px] rounded-[10px] shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px border-0 cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
        <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
          →
        </span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
      <span className="inline-block transition-transform duration-[250ms] ease-smooth group-hover:translate-x-[3px]">
        →
      </span>
    </button>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const cls =
    "inline-flex items-center gap-2 bg-transparent text-text border border-border-strong px-[18px] py-[10px] rounded-[10px] font-medium text-[13px] transition-colors duration-[250ms] hover:border-lime hover:bg-[rgba(163,217,119,0.06)] cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
