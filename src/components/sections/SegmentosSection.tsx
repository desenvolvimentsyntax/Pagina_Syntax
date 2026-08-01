import { Chip } from "@heroui/react";

import { segmentos } from "@/content/pt-BR/home";

/**
 * Faixa de segmentos atendidos, logo abaixo do hero. Dados do site atual.
 * No mobile é UMA linha deslizante (.faixa-scroll, com fade nas bordas e sem
 * animação, §10) — chips em wrap virariam um bloco de 3 linhas logo depois do
 * hero. Em md+ volta a quebrar linha normalmente.
 */
export function SegmentosSection() {
  return (
    <section aria-label={segmentos.rotulo} className="border-border border-y py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 md:flex-row md:items-center md:gap-10 md:px-6">
        <h2 className="text-micro font-mono text-xs font-medium tracking-[0.1em] whitespace-nowrap uppercase">
          {segmentos.rotulo}
        </h2>

        {/* tabIndex 0: região rolável precisa ser alcançável por teclado
            (axe scrollable-region-focusable) — setas rolam a faixa. */}
        <ul
          tabIndex={0}
          aria-label={segmentos.rotulo}
          className="faixa-scroll -mx-5 flex items-center gap-2.5 px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none]"
        >
          {segmentos.itens.map((item) => (
            <li key={item} className="shrink-0 md:shrink">
              <Chip variant="secondary">{item}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
