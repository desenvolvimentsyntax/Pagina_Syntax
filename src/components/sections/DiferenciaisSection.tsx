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
    <section id="diferenciais" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            overline={diferenciais.overline}
            titulo={diferenciais.titulo}
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.itens.map((item, i) => {
            const Icone = ICONES[item.icone];

            return (
              <li key={item.titulo} className="h-full">
                <Reveal atraso={(i % 4) * 60} className="h-full">
                  <div className="border-border bg-surface flex h-full flex-col rounded-2xl border p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        aria-hidden
                        className="bg-accent/15 text-accent-soft-foreground flex size-11 items-center justify-center rounded-lg"
                      >
                        {Icone ? <Icone className="size-5" /> : null}
                      </span>
                      <span
                        aria-hidden
                        className="text-micro font-mono text-sm tracking-[0.08em]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display text-foreground mt-5 text-lg font-semibold tracking-tight">
                      {item.titulo}
                    </h3>
                    <p className="text-foreground-base/70 mt-2 text-[15px] leading-relaxed">
                      {item.texto}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
