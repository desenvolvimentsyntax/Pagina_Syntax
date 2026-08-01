import { Card } from "@heroui/react";
import {
  Braces,
  Globe,
  LayoutDashboard,
  MousePointerClick,
  PanelsTopLeft,
  PencilRuler,
  UtensilsCrossed,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solucoes } from "@/content/pt-BR/home";

const ICONES: Record<string, LucideIcon> = {
  "sistemas-web": Globe,
  administrativo: LayoutDashboard,
  restaurantes: UtensilsCrossed,
  "landing-pages": MousePointerClick,
  sites: PanelsTopLeft,
  "sob-medida": PencilRuler,
  integracoes: Workflow,
  apis: Braces,
};

/**
 * As oito frentes de desenvolvimento.
 *
 * No mobile é um ÍNDICE: lista com divide-y, ícone-tile à esquerda e número
 * `01–08` em mono à direita — oito cards empilhados eram 1.960px de coluna
 * monótona em 320. Em sm+ volta a grade de Card (§3, mapa de uso). É o único
 * índice da página; não replicar o padrão em outra seção.
 */
export function SolucoesSection() {
  return (
    <section id="solucoes" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            overline={solucoes.overline}
            titulo={solucoes.titulo}
            subtitulo={solucoes.subtitulo}
          />
        </Reveal>

        {/* Índice — só < sm */}
        <Reveal className="sm:hidden">
          <ol className="divide-border border-border mt-10 divide-y border-y">
            {solucoes.itens.map((item, i) => {
              const Icone = ICONES[item.icone];

              return (
                <li key={item.titulo} className="flex items-start gap-4 py-4">
                  <span
                    aria-hidden
                    className="bg-accent/15 text-accent-soft-foreground mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg"
                  >
                    {Icone ? <Icone className="size-4.5" /> : null}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
                      {item.titulo}
                    </h3>
                    <p className="text-foreground-base/70 mt-1 text-[13px] leading-relaxed">
                      {item.texto}
                    </p>
                  </div>

                  <span aria-hidden className="text-micro mt-1 font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* Grade de cards — sm+ */}
        <ul className="mt-14 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {solucoes.itens.map((item, i) => {
            const Icone = ICONES[item.icone];

            return (
              <li key={item.titulo} className="h-full">
                <Reveal atraso={(i % 4) * 60} className="h-full">
                  <Card className="h-full border border-border bg-surface transition-[border-color,box-shadow] hover:border-accent-soft-foreground/40 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.75)]">
                    <Card.Header>
                      <span
                        aria-hidden
                        className="mb-3 flex size-11 items-center justify-center rounded-lg bg-accent/15 text-accent-soft-foreground"
                      >
                        {Icone ? <Icone className="size-5" /> : null}
                      </span>
                      <Card.Title>{item.titulo}</Card.Title>
                      <Card.Description>{item.texto}</Card.Description>
                    </Card.Header>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
