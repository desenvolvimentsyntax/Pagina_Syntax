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

        <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {metodo.etapas.map((etapa, i) => {
            const Icone = ICONES[etapa.icone];

            return (
              <li key={etapa.titulo} className="relative">
                <Reveal atraso={i * 60}>
                  {/* Linha conectora: só entre etapas, e só onde há colunas. */}
                  {i < metodo.etapas.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute top-[22px] left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-[linear-gradient(90deg,var(--accent),var(--accent-soft-foreground)_55%,var(--color-hairline))] md:block"
                    />
                  ) : null}

                  <div className="flex items-center gap-4 md:flex-col md:items-center md:text-center">
                    <span
                      aria-hidden
                      className="bg-surface-secondary text-accent-soft-foreground ring-sheet relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full ring-8"
                    >
                      {Icone ? <Icone className="size-5" /> : null}
                    </span>

                    <span className="text-micro font-mono text-xs tracking-[0.08em] md:mt-4">
                      Etapa {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-foreground mt-4 text-lg font-semibold tracking-tight md:text-center">
                    {etapa.titulo}
                  </h3>
                  <p className="text-foreground-base/70 mt-2 text-[15px] leading-relaxed md:text-center">
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
