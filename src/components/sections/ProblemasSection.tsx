import { Accordion, Tabs } from "@heroui/react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Factory,
  Route,
  Store,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problemas } from "@/content/pt-BR/home";

const ICONES: Record<string, LucideIcon> = {
  distribuicao: Truck,
  industria: Factory,
  varejo: Store,
  "food-service": UtensilsCrossed,
  frotas: Route,
  eventos: CalendarDays,
};

/**
 * Ato 02 — Problemas que resolvemos (peso 2). Substitui a antiga faixa de
 * Segmentos: em vez de chips decorativos, a dor concreta de cada segmento e
 * a resposta da Syntax.
 *
 * Desktop: Tabs vertical (único uso de Tabs da página). Mobile: Accordion —
 * formato exclusivo desta dobra (§7). display:none tira a variante inativa
 * da árvore de acessibilidade.
 */
export function ProblemasSection() {
  return (
    <section id="segmentos" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            indice="02"
            overline={problemas.overline}
            titulo={problemas.titulo}
            subtitulo={problemas.subtitulo}
          />
        </Reveal>

        {/* Acordeão — só < lg */}
        <Reveal className="mt-10 lg:hidden">
          <Accordion className="w-full" defaultExpandedKeys={[problemas.segmentos[0].id]}>
            {problemas.segmentos.map((segmento) => {
              const Icone = ICONES[segmento.icone];

              return (
                <Accordion.Item key={segmento.id} id={segmento.id}>
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      {Icone ? (
                        <span
                          aria-hidden
                          className="text-accent-soft-foreground me-3 size-4 shrink-0"
                        >
                          <Icone className="size-4" strokeWidth={1.75} />
                        </span>
                      ) : null}
                      {segmento.rotulo}
                      <Accordion.Indicator>
                        <ChevronDown />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <PainelSegmento
                        dor={segmento.dor}
                        resposta={segmento.resposta}
                        compacto
                      />
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Reveal>

        {/* Tabs vertical — lg+ */}
        <Reveal className="mt-14 hidden lg:block">
          <Tabs
            orientation="vertical"
            variant="secondary"
            defaultSelectedKey={problemas.segmentos[0].id}
            className="gap-12"
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label={problemas.rotuloLista} className="min-w-56">
                {problemas.segmentos.map((segmento) => {
                  const Icone = ICONES[segmento.icone];

                  return (
                    <Tabs.Tab key={segmento.id} id={segmento.id}>
                      {Icone ? (
                        <Icone
                          aria-hidden
                          className="size-4 shrink-0"
                          strokeWidth={1.75}
                        />
                      ) : null}
                      {segmento.rotulo}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>
            </Tabs.ListContainer>

            {problemas.segmentos.map((segmento) => (
              <Tabs.Panel key={segmento.id} id={segmento.id} className="flex-1">
                <PainelSegmento dor={segmento.dor} resposta={segmento.resposta} />
              </Tabs.Panel>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}

interface PainelSegmentoProps {
  dor: string;
  resposta: string;
  compacto?: boolean;
}

function PainelSegmento({ dor, resposta, compacto = false }: PainelSegmentoProps) {
  return (
    <div
      className={
        compacto
          ? "flex flex-col gap-3 pt-1 pb-2"
          : "border-border flex min-h-52 flex-col justify-center gap-4 border-l pl-10"
      }
    >
      <p
        className={`font-display text-foreground font-semibold tracking-[-0.02em] text-balance ${
          compacto ? "text-[17px] leading-snug" : "max-w-xl text-2xl leading-snug xl:text-[28px]"
        }`}
      >
        {dor}
      </p>

      <p
        className={`text-foreground-base/70 leading-relaxed text-pretty ${
          compacto ? "text-[13.5px]" : "max-w-lg text-base"
        }`}
      >
        {resposta}
      </p>

      <p>
        <a
          href={problemas.verSolucao.href}
          className="text-accent-soft-foreground inline-flex min-h-11 items-center gap-1.5 font-mono text-xs font-medium tracking-[0.1em] uppercase hover:underline"
        >
          {problemas.verSolucao.rotulo}
          <ArrowRight aria-hidden className="size-3.5" />
        </a>
      </p>
    </div>
  );
}
