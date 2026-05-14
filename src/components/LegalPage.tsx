import { ReactNode } from "react";
import { Eyebrow, H1 } from "@/components/ui";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lastUpdate: string;
  children: ReactNode;
}

export default function LegalPage({
  eyebrow,
  title,
  lastUpdate,
  children,
}: LegalPageProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-[80px] lg:py-[120px]">
        <div className="mb-12 lg:mb-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <H1 className="mt-4">{title}</H1>
          <p className="mt-6 font-mono text-xs text-text-muted tracking-[0.12em]">
            ÚLTIMA ACTUALIZACIÓN · {lastUpdate.toUpperCase()}
          </p>
        </div>
        <article className="legal-content space-y-6 text-text-soft leading-relaxed">
          {children}
        </article>
      </div>
    </section>
  );
}
