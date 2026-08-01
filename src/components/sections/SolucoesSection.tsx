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

import { cartaoSyntax } from "@/components/ui/CartaoSyntax";
import { PointerGlow } from "@/components/ui/PointerGlow";
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
 * Ato 03 — Soluções em bento (peso 4): duas capas (as frentes-mãe) + seis
 * regulares, todos CartaoSyntax dentro de PointerGlow — o spotlight que segue
 * o mouse vive SÓ aqui (§10). No mobile as capas viram cards cheios e o resto
 * continua índice numerado — formato exclusivo desta dobra (§7).
 */
export function SolucoesSection() {
  const capas = solucoes.itens.filter((item) => item.destaque);
  const regulares = solucoes.itens.filter((item) => !item.destaque);

  return (
    <section id="solucoes" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            indice="03"
            overline={solucoes.overline}
            titulo={solucoes.titulo}
            subtitulo={solucoes.subtitulo}
          />
        </Reveal>

        {/* Mobile: capas cheias + índice numerado — só < sm */}
        <div className="sm:hidden">
          <div className="reveal-stagger mt-10 flex flex-col gap-4">
            {capas.map((item) => {
              const Icone = ICONES[item.icone];

              return (
                <Reveal key={item.titulo}>
                  <div className={cartaoSyntax({ peso: "capa" }).base()}>
                    <TileIcone Icone={Icone} tamanho="md" />
                    <h3 className="text-foreground mt-4 text-lg font-semibold tracking-tight">
                      {item.titulo}
                    </h3>
                    <p className="text-foreground-base/70 mt-1.5 text-[13.5px] leading-relaxed">
                      {item.texto}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <ol className="divide-border border-border mt-6 divide-y border-y">
              {regulares.map((item, i) => {
                const Icone = ICONES[item.icone];

                return (
                  <li key={item.titulo} className="flex items-start gap-4 py-4">
                    <TileIcone Icone={Icone} tamanho="sm" />

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
        </div>

        {/* Bento — sm+ */}
        <PointerGlow className="hidden sm:block">
          <ul className="reveal-stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {capas.map((item) => {
              const Icone = ICONES[item.icone];

              return (
                <li key={item.titulo} className="h-full lg:col-span-3">
                  <Reveal efeito="escala" className="h-full">
                    <Card
                      data-spotlight
                      className={cartaoSyntax({ peso: "capa", interativo: true }).base({
                        className: "h-full lg:min-h-52",
                      })}
                    >
                      <Card.Header>
                        <TileIcone Icone={Icone} tamanho="md" />
                        <Card.Title className="mt-4 text-xl">{item.titulo}</Card.Title>
                        <Card.Description className="mt-1.5 max-w-md text-[15px]">
                          {item.texto}
                        </Card.Description>
                      </Card.Header>
                    </Card>
                  </Reveal>
                </li>
              );
            })}

            {regulares.map((item) => {
              const Icone = ICONES[item.icone];

              return (
                <li key={item.titulo} className="h-full lg:col-span-2">
                  <Reveal className="h-full">
                    <Card
                      data-spotlight
                      className={cartaoSyntax({ peso: "padrao", interativo: true }).base({
                        className: "h-full",
                      })}
                    >
                      <Card.Header>
                        <TileIcone Icone={Icone} tamanho="sm" />
                        <Card.Title className="mt-3">{item.titulo}</Card.Title>
                        <Card.Description className="mt-1">
                          {item.texto}
                        </Card.Description>
                      </Card.Header>
                    </Card>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </PointerGlow>
      </div>
    </section>
  );
}

function TileIcone({
  Icone,
  tamanho,
}: {
  Icone: LucideIcon | undefined;
  tamanho: "sm" | "md";
}) {
  return (
    <span
      aria-hidden
      className={`borda-gradiente text-accent-soft-foreground flex shrink-0 items-center justify-center rounded-lg ${
        tamanho === "md" ? "size-12" : "mt-0.5 size-10"
      }`}
    >
      {Icone ? (
        <Icone className={tamanho === "md" ? "size-5.5" : "size-4.5"} strokeWidth={1.75} />
      ) : null}
    </span>
  );
}
