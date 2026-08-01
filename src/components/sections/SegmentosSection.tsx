import { Chip } from "@heroui/react";

import { segmentos } from "@/content/pt-BR/home";

/** Faixa de segmentos atendidos, logo abaixo do hero. Dados do site atual. */
export function SegmentosSection() {
  return (
    <section aria-label={segmentos.rotulo} className="border-border border-y">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-9 lg:flex-row lg:items-center lg:gap-10">
        <h2 className="text-micro font-mono text-xs font-medium tracking-[0.1em] whitespace-nowrap uppercase">
          {segmentos.rotulo}
        </h2>

        <ul className="flex flex-wrap items-center gap-2.5">
          {segmentos.itens.map((item) => (
            <li key={item}>
              <Chip variant="tertiary">{item}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
