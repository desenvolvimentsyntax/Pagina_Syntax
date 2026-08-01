import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * CTA em forma de âncora para navegação entre seções.
 *
 * Desvio consciente da regra 2 do §3 (usar Button do HeroUI): os CTAs das
 * seções são navegação (`<a href>`), e o Button da v3 só vira âncora via
 * `render`, que é uma função — o que obrigaria a seção inteira a virar client
 * component e violaria a regra 9 do §3. O visual usa os tokens do tema.
 */

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario";
  comSeta?: boolean;
  tamanho?: "md" | "lg";
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg text-[15px] font-medium tracking-tight transition-colors";

const TAMANHOS = {
  md: "h-11 px-5",
  lg: "h-12 px-6",
} as const;

const VARIANTES = {
  primario:
    "bg-accent text-accent-foreground shadow-[0_10px_24px_-10px_rgb(37_99_235_/_0.55)] hover:bg-accent/90",
  secundario:
    "border border-border bg-background text-foreground hover:border-slate-300 hover:bg-surface",
} as const;

export function CtaLink({
  href,
  children,
  variante = "primario",
  comSeta = false,
  tamanho = "lg",
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={`${BASE} ${TAMANHOS[tamanho]} ${VARIANTES[variante]}`}
    >
      {children}
      {comSeta ? <ArrowRight aria-hidden className="size-4" /> : null}
    </a>
  );
}
