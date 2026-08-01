import { Award, Globe2, Headset, Puzzle, type LucideIcon } from "lucide-react";

import { MapaAtuacao } from "@/components/ui/MapaAtuacao";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { atuacao, diferenciais } from "@/content/pt-BR/home";

const ICONES: Record<string, LucideIcon> = {
  suporte: Headset,
  experiencia: Award,
  mercosul: Globe2,
  "sob-medida": Puzzle,
};

/**
 * Ato 07 — Diferenciais (peso 3): a banda numerada tipográfica ganha hover
 * (numeral acende com --glow-color) e, abaixo, o MapaAtuacao com os números
 * reais de presença — a carga de credibilidade quantitativa da página.
 * Números derivados marcados com ⚠️ no conteúdo (§11).
 */
export function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            indice="06"
            overline={diferenciais.overline}
            titulo={diferenciais.titulo}
          />
        </Reveal>

        <ul className="border-border reveal-stagger mt-10 grid gap-x-6 gap-y-10 border-t pt-10 min-[360px]:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border">
          {diferenciais.itens.map((item, i) => {
            const Icone = ICONES[item.icone];

            return (
              <li
                key={item.titulo}
                className="group lg:px-7 lg:first:pl-0 lg:last:pr-0"
              >
                <Reveal>
                  <div className="flex items-baseline gap-2.5">
                    <span
                      aria-hidden
                      className="text-accent-soft-foreground font-mono text-2xl font-medium tracking-[0.04em] transition-colors duration-300 group-hover:[color:var(--glow-color)] md:text-3xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="text-micro group-hover:text-accent-soft-foreground self-center transition-colors duration-300"
                    >
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

        {/* Mapa de atuação — os números reais da presença Syntax */}
        <Reveal efeito="lado" className="mt-14 md:mt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_1fr] lg:gap-16">
            <MapaAtuacao className="w-full max-w-xl justify-self-center lg:justify-self-start" />

            <div>
              <p className="text-accent-soft-foreground font-mono text-xs font-medium tracking-[0.1em] uppercase">
                {atuacao.rotulo}
              </p>
              <h3 className="font-display text-foreground mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-[28px]">
                {atuacao.titulo}
              </h3>

              <dl className="divide-border border-border mt-6 flex flex-col divide-y border-y">
                {atuacao.numeros.map((numero) => (
                  <div
                    key={numero.rotulo}
                    className="flex flex-row-reverse items-baseline justify-end gap-4 py-4"
                  >
                    <dt className="text-foreground-base/70 text-sm leading-snug">
                      {numero.rotulo}
                    </dt>
                    <dd className="font-display text-foreground w-14 shrink-0 text-3xl font-semibold tracking-tight md:text-4xl">
                      {numero.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
