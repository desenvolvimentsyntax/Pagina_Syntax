import { Chip } from "@heroui/react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tecnologias } from "@/content/pt-BR/home";

/**
 * Faixa de tecnologia — curta de propósito: o público não é técnico (§1).
 * Serve de credibilidade, não de vitrine de jargão.
 */
export function TecnologiasSection() {
  return (
    <section aria-label={tecnologias.titulo} className="bg-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal>
          <SectionHeading overline={tecnologias.overline} titulo={tecnologias.titulo} />
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70">
            {tecnologias.texto}
          </p>
        </Reveal>

        <Reveal atraso={80}>
          <ul className="flex flex-wrap gap-2.5 lg:justify-end">
            {tecnologias.chips.map((chip) => (
              <li key={chip}>
                <Chip variant="secondary" className="bg-background">
                  {chip}
                </Chip>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
