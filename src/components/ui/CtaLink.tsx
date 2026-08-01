import { buttonVariants } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * CTA em forma de âncora para navegação entre seções.
 *
 * Não é desvio do §3: `buttonVariants` vem de @heroui/styles sem "use client"
 * e devolve as mesmas classes que o Button monta ("button button--primary"),
 * então a âncora fica idêntica ao componente sem arrastar a seção para o
 * cliente. O Button só vira <a> via `render`, que é função e não atravessa a
 * fronteira RSC (§3.9).
 */

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario";
  comSeta?: boolean;
  tamanho?: "md" | "lg";
  externo?: boolean;
}

const VARIANTES = {
  primario: "primary",
  secundario: "secondary",
} as const;

export function CtaLink({
  href,
  children,
  variante = "primario",
  comSeta = false,
  tamanho = "lg",
  externo = false,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={buttonVariants({ variant: VARIANTES[variante], size: tamanho })}
      {...(externo ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
      {comSeta ? <ArrowRight aria-hidden className="size-4" /> : null}
    </a>
  );
}
