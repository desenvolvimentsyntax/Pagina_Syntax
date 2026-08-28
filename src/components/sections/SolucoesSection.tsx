import { Card } from "@heroui/react";
import {
  Monitor,
  Share2,
  SlidersVertical,
  Store,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solucoes, type IconeSolucao } from "@/content/pt-BR/home";

/**
 * O content guarda só a chave do ícone (não importa React). O Record é tipado
 * por IconeSolucao para que uma chave nova no content quebre o build aqui, e
 * não silenciosamente vire um card sem ícone.
 */
const ICONES: Record<IconeSolucao, LucideIcon> = {
  navegador: Monitor,
  sobMedida: SlidersVertical,
  caixa: Store,
  integracao: Share2,
};

/**
 * Soluções — grade 2×2 de cards horizontais (ícone + conteúdo), cada um com a
 * linha "Na prática" que traduz o recurso em rotina do cliente (§13).
 */
export function SolucoesSection() {
  return (
    <section id="solucoes" className="bg-background py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            overline={solucoes.overline}
            titulo={solucoes.titulo}
            subtitulo={solucoes.intro}
          />
        </Reveal>

        {/* Os Reveal são filhos DIRETOS do .reveal-stagger — é o seletor que o
            globals.css usa para escalonar os atrasos. */}
        <div className="reveal-stagger mt-8 grid gap-5 md:grid-cols-2">
          {solucoes.cartoes.map((cartao) => {
            const Icone = ICONES[cartao.icone];

            return (
              <Reveal key={cartao.titulo}>
                <Card className="border-border hover:border-marca hover:shadow-cartao h-full flex-row items-start gap-5 rounded-[14px] border p-6 transition-[border-color,box-shadow] duration-200 sm:p-7">
                  <span
                    aria-hidden
                    className="bg-surface-tertiary flex size-[52px] shrink-0 items-center justify-center rounded-full"
                  >
                    <Icone className="text-marca size-[26px]" strokeWidth={1.8} />
                  </span>

                  <Card.Header className="min-w-0 flex-1 gap-2">
                    <Card.Title className="font-display text-foreground text-[18px] leading-snug font-bold">
                      {cartao.titulo}
                    </Card.Title>
                    <Card.Description className="text-foreground-base text-[15.5px] leading-[1.65]">
                      {cartao.descricao}
                    </Card.Description>
                    <p className="bg-marca-chip text-marca rounded-lg px-3 py-2 text-[14px] leading-snug">
                      {cartao.naPratica}
                    </p>
                  </Card.Header>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
