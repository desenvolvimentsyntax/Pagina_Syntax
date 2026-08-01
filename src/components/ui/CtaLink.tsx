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
  /** `inverso` é para CTA sobre painel colorido, onde as outras somem. */
  variante?: "primario" | "secundario" | "inverso";
  comSeta?: boolean;
  tamanho?: "md" | "lg";
  externo?: boolean;
}

const VARIANTES = {
  primario: { variant: "primary", class: undefined },
  secundario: { variant: "secondary", class: undefined },
  inverso: { variant: "secondary", class: "button--inverso" },
} as const;

export function CtaLink({
  href,
  children,
  variante = "primario",
  comSeta = false,
  tamanho = "lg",
  externo = false,
}: CtaLinkProps) {
  const { variant, class: modificador } = VARIANTES[variante];

  return (
    <a
      href={href}
      className={buttonVariants({ variant, size: tamanho, class: modificador })}
      {...(externo ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
      {comSeta ? <ArrowRight aria-hidden className="size-4" /> : null}
    </a>
  );
}
