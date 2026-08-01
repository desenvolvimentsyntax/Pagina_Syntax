import {
  ClipboardList,
  Headset,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { metodo } from "@/content/pt-BR/home";

const ICONES: Record<string, LucideIcon> = {
  diagnostico: Search,
  proposta: ClipboardList,
  desenvolvimento: Wrench,
  suporte: Headset,
};

/**
 * O método em quatro etapas. Vem logo depois das soluções: responde "como
 * vocês trabalham?" na sequência de "o que vocês fazem?".
 *
 * É uma <ol> porque a ordem das etapas é a informação — no mobile empilha e a
 * numeração continua fazendo sentido sem a linha conectora.
 */
export function MetodoSection() {
  return (
    <section id="metodo" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            overline={metodo.overline}
            titulo={metodo.titulo}
            subtitulo={metodo.subtitulo}
          />
        </Reveal>

        {/* Abaixo de lg a timeline é VERTICAL: a linha em gradiente corre na
            coluna dos dots (before: no <ol>) e cada etapa se pendura nela.
            Em lg vira horizontal — em 768 quatro colunas quebram os títulos. */}
        <ol className="mt-10 flex flex-col gap-10 md:mt-16 lg:grid lg:grid-cols-4 lg:gap-6">
          {metodo.etapas.map((etapa, i) => {
            const Icone = ICONES[etapa.icone];
            const ultima = i === metodo.etapas.length - 1;

            return (
              <li
                key={etapa.titulo}
                className={`relative pl-16 lg:pl-0 ${
                  ultima
                    ? ""
                    : "after:from-accent after:to-accent-soft-foreground/35 after:absolute after:top-[52px] after:-bottom-8 after:left-[21px] after:w-px after:bg-gradient-to-b lg:after:hidden"
                }`}
              >
                <Reveal atraso={i * 60}>
                  {/* Linha conectora horizontal: só entre etapas, só em lg. */}
                  {i < metodo.etapas.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute top-[22px] left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-[linear-gradient(90deg,var(--accent),var(--accent-soft-foreground)_55%,var(--color-hairline))] lg:block"
                    />
                  ) : null}

                  <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:text-center">
                    <span
                      aria-hidden
                      className="bg-surface-secondary text-accent-soft-foreground ring-sheet absolute top-0 left-0 z-10 flex size-11 shrink-0 items-center justify-center rounded-full ring-8 lg:static"
                    >
                      {Icone ? <Icone className="size-5" /> : null}
                    </span>

                    <span className="text-micro font-mono text-xs tracking-[0.08em] lg:mt-4">
                      Etapa {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-foreground mt-2 text-[17px] font-semibold tracking-tight lg:mt-4 lg:text-center lg:text-lg">
                    {etapa.titulo}
                  </h3>
                  <p className="text-foreground-base/70 mt-1.5 text-[14px] leading-relaxed lg:mt-2 lg:text-center lg:text-[15px]">
                    {etapa.texto}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
