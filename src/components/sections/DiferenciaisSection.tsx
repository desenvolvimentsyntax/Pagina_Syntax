import { Award, Globe2, Headset, Puzzle, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { diferenciais } from "@/content/pt-BR/home";

const ICONES: Record<string, LucideIcon> = {
  suporte: Headset,
  experiencia: Award,
  mercosul: Globe2,
  "sob-medida": Puzzle,
};

/**
 * Diferenciais verificáveis: suporte próprio, 2006, BR+PY e sob medida.
 *
 * Banda numerada, SEM cards — de propósito: Diferenciais e Projetos são
 * vizinhos e dois grids de card seguidos matavam o ritmo da página. Aqui a
 * estrutura é tipográfica: número mono grande + hairline entre colunas.
 */
export function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            overline={diferenciais.overline}
            titulo={diferenciais.titulo}
          />
        </Reveal>

        <ul className="border-border mt-10 grid gap-x-6 gap-y-10 border-t pt-10 min-[360px]:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border">
          {diferenciais.itens.map((item, i) => {
            const Icone = ICONES[item.icone];

            return (
              <li key={item.titulo} className="lg:px-7 lg:first:pl-0 lg:last:pr-0">
                <Reveal atraso={(i % 4) * 60}>
                  <div className="flex items-baseline gap-2.5">
                    <span
                      aria-hidden
                      className="text-accent-soft-foreground font-mono text-2xl font-medium tracking-[0.04em] md:text-3xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="text-micro self-center">
                      {Icone ? <Icone className="size-4" /> : null}
                    </span>
                  </div>

                  <h3 className="font-display text-foreground mt-3 text-[16px] font-semibold tracking-tight md:mt-4 md:text-lg">
                    {item.titulo}
                  </h3>
                  <p className="text-foreground-base/70 mt-1.5 text-[13.5px] leading-relaxed md:mt-2 md:text-[15px]">
                    {item.texto}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
