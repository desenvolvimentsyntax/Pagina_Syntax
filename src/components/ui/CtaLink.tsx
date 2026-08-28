import { buttonVariants } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * CTA em forma de âncora.
 *
 * Não é desvio do §3: `buttonVariants` não carrega "use client" e devolve as
 * mesmas classes que o Button monta ("button button--primary"), então a
 * âncora fica idêntica ao componente sem arrastar a seção para o cliente — o
 * Button só viraria <a> via `render`, que é função e não atravessa a fronteira
 * RSC.
 *
 * `data-ripple` + `relative overflow-hidden` já saem daqui: é o par que o
 * componente Ripple procura para injetar a onda.
 */

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  /** `vivo` é o CTA da demonstração aberta; `whatsapp` é o envio do formulário. */
  variante?: "primario" | "secundario" | "vivo" | "whatsapp";
  tamanho?: "md" | "lg";
  externo?: boolean;
  /** Full-width no mobile, largura própria em sm+ (alvo de toque, §9). */
  larguraTotal?: boolean;
  comSeta?: boolean;
}

const VARIANTES = {
  primario: { variant: "primary", class: undefined },
  secundario: { variant: "secondary", class: undefined },
  vivo: { variant: "primary", class: "button--vivo" },
  whatsapp: { variant: "primary", class: "button--whatsapp" },
} as const;

export function CtaLink({
  href,
  children,
  variante = "primario",
  tamanho = "lg",
  externo = false,
  larguraTotal = false,
  comSeta = false,
}: CtaLinkProps) {
  const { variant, class: modificador } = VARIANTES[variante];

  /* `min-h-11` no mobile: o tamanho `md` do HeroUI é h-10 (40px) e o `lg`
     desktop cai para h-10 — abaixo dos 44px de alvo de toque (§7/§9). Acima de
     md o pointer é fino e a altura volta à do tema, que é a que o `Button` do
     formulário também usa. */
  /* `group`: a seta desliza no hover do botão inteiro, não só do ícone. */
  const classes = [
    "group relative min-h-11 overflow-hidden md:min-h-0",
    modificador,
    larguraTotal ? "w-full sm:w-auto" : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const conteudo = (
    <>
      {children}
      {comSeta ? (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  const className = buttonVariants({ variant, size: tamanho, class: classes });

  /* Rota interna do site (/planos) vai por next/link: com <a> nu o clique
     recarrega a aplicação inteira e joga fora o prefetch. Âncora da mesma
     página ("/#planos") continua em <a>, que é o que dá a rolagem nativa. */
  if (!externo && href.startsWith("/") && !href.startsWith("/#")) {
    return (
      <Link href={href} data-ripple="" className={className}>
        {conteudo}
      </Link>
    );
  }

  return (
    <a
      href={href}
      data-ripple=""
      className={className}
      {...(externo ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {conteudo}
    </a>
  );
}
