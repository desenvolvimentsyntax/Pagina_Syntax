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

/** Diferenciais verificáveis: suporte próprio, 2006, BR+PY e sob medida. */
export function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            overline={diferenciais.overline}
            titulo={diferenciais.titulo}
          />
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.itens.map((item, i) => {
            const Icone = ICONES[item.icone];

            return (
              <li key={item.titulo}>
                <Reveal atraso={(i % 4) * 60}>
                  <span
                    aria-hidden
                    className="flex size-11 items-center justify-center rounded-lg bg-accent/10 text-accent"
                  >
                    {Icone ? <Icone className="size-5" /> : null}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">
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
