import { Chip, ScrollShadow } from "@heroui/react";

/**
 * Lista horizontal de chips de tecnologia (faixa do Ecossistema). O
 * ScrollShadow do HeroUI resolve o fade nas bordas por máscara — substitui a
 * antiga `.faixa-scroll` manual, com a vantagem de esconder o fade quando o
 * scroll chega ao fim. tabIndex 0: região rolável precisa ser alcançável por
 * teclado (axe scrollable-region-focusable).
 */

interface FaixaTecnologiasProps {
  rotulo: string;
  chips: readonly string[];
  className?: string;
}

export function FaixaTecnologias({ rotulo, chips, className }: FaixaTecnologiasProps) {
  return (
    <ScrollShadow
      orientation="horizontal"
      tabIndex={0}
      aria-label={rotulo}
      className={`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className ?? ""}`}
    >
      <ul className="flex w-max items-center gap-2.5">
        {chips.map((chip) => (
          <li key={chip} className="shrink-0">
            <Chip variant="secondary">{chip}</Chip>
          </li>
        ))}
      </ul>
    </ScrollShadow>
  );
}
