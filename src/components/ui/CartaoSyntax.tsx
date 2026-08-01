import { cardVariants } from "@heroui/react";
import { tv, type VariantProps } from "tailwind-variants";

/**
 * A pele de cartão da Syntax — substitui a caixa `rounded-2xl border-border
 * bg-surface` que se repetia igual pela página inteira.
 *
 * É função de variantes, não componente: aplica-se ao `Card` do HeroUI, a um
 * `<a>` (padrão canônico de card-link da doc) ou a uma caixa de layout, sem
 * arrastar seção nenhuma para o cliente. Estende `cardVariants`, então as
 * classes base `.card .card--default` vêm junto e o Card continua sendo quem
 * estrutura (§3).
 *
 * Pesos:
 * - `capa`     — destaque de bento/mostruário: borda-gradiente + superfície um
 *                degrau acima; usa os tokens até então mortos do tema
 *                (--surface-secondary de fundo, hover em --surface-tertiary).
 * - `padrao`   — o cartão comum de grade.
 * - `linha`    — sem chrome: para listas divide-y e composições próprias.
 *
 * `interativo` liga hover de glow (shadow-glow-sm segue --glow-color da cena)
 * e o alvo do spotlight (`data-spotlight` deve ser aplicado pelo consumidor
 * quando o grupo estiver dentro de <PointerGlow>).
 */

export const cartaoSyntax = tv({
  extend: cardVariants,
  slots: {
    base: "rounded-2xl overflow-hidden",
  },
  variants: {
    peso: {
      capa: {
        base: "borda-gradiente bg-surface-secondary border-0 p-6 sm:p-8",
      },
      padrao: {
        base: "border-border bg-surface border p-4 sm:p-6",
      },
      linha: {
        base: "border-0 bg-transparent p-0 shadow-none",
      },
    },
    interativo: {
      true: {
        base: "transition-[background-color,border-color,box-shadow,transform] duration-300 hover:bg-surface-tertiary hover:shadow-glow-sm data-[hovered=true]:bg-surface-tertiary data-[hovered=true]:shadow-glow-sm",
      },
    },
  },
  defaultVariants: {
    peso: "padrao",
  },
});

export type CartaoSyntaxVariants = VariantProps<typeof cartaoSyntax>;
