"use client";

import { Tabs } from "@heroui/react";
import { Check } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import type { Plano } from "@/content/tipos";

/**
 * Seletor de planos — o "Compare" da home.
 *
 * A tabela comparativa mostrava tudo de uma vez e obrigava o visitante a
 * cruzar linhas e colunas; aqui ele escolhe UM plano e vê só o que aquele
 * plano inclui, agrupado por assunto, com o preço e o CTA ao lado. A tabela
 * completa continua existindo, mas em /planos — que é a página de decisão.
 *
 * Client component pelo estado da aba; a seção que o monta continua server.
 * Por isso ele recebe TUDO por prop e não importa `@/content`: o barril de
 * conteúdo carrega os dois idiomas, e o que um client component importa vai
 * junto para o navegador.
 *
 * `id` explícito em cada Tab e Panel — mesma lição do Table do HeroUI: chave
 * de coleção implícita sai de um contador global e não bate entre servidor e
 * cliente numa página estática (§3.1 do CLAUDE.md).
 */

interface SeletorPlanosProps {
  planos: readonly Plano[];
  /** Grupos da tabela comparativa, para filtrar os recursos de cada plano. */
  grupos: readonly { titulo: string; recursos: readonly string[] }[];
  moeda: string;
  rotuloMensal: string;
  rotuloInstalacao: string;
  ctaContratar: string;
  linkTabela: string;
  seletorAria: string;
  hrefTabela: string;
  /** href de WhatsApp por chave de plano — a função que o monta é do servidor. */
  hrefContratar: Record<string, string>;
}

export function SeletorPlanos({
  planos,
  grupos,
  moeda,
  rotuloMensal,
  rotuloInstalacao,
  ctaContratar,
  linkTabela,
  seletorAria,
  hrefTabela,
  hrefContratar,
}: SeletorPlanosProps) {
  /* Recursos do plano, na ordem e nos grupos da tabela comparativa. */
  const gruposDoPlano = (plano: Plano) =>
    grupos
      .map((grupo) => ({
        titulo: grupo.titulo,
        itens: grupo.recursos.filter((recurso) =>
          (plano.recursos as readonly string[]).includes(recurso),
        ),
      }))
      .filter((grupo) => grupo.itens.length > 0);

  return (
    <Tabs defaultSelectedKey="pro" className="w-full">
      <Tabs.ListContainer>
        <Tabs.List aria-label={seletorAria}>
          {planos.map((plano) => (
            <Tabs.Tab key={plano.chave} id={plano.chave}>
              <span className="flex flex-col items-start gap-0.5 py-1 text-left sm:flex-row sm:items-baseline sm:gap-2">
                <span className="font-display text-[15px] font-bold">
                  {plano.plano}
                </span>
                <span className="font-mono text-[12px] opacity-80">
                  {`${moeda} ${plano.mensal}`}
                </span>
              </span>
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>

      {planos.map((plano) => (
        <Tabs.Panel key={plano.chave} id={plano.chave} className="pt-6">
          <div className="border-border bg-surface grid gap-8 rounded-2xl border p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="text-foreground text-[15.5px] font-semibold">
                {plano.ganho}
              </p>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {gruposDoPlano(plano).map((grupo) => (
                  <div key={grupo.titulo}>
                    {/* <p>, não heading: abaixo do h2 da seção viraria h3 de
                        rótulo — são etiquetas de grupo, não estrutura (§8). */}
                    <p className="text-muted font-mono text-[12px] font-semibold tracking-[0.08em] uppercase">
                      {grupo.titulo}
                    </p>
                    <ul className="text-foreground-base mt-2.5 grid gap-2 text-[14.5px]">
                      {grupo.itens.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Check
                            aria-hidden
                            strokeWidth={2.4}
                            className="text-marca mt-0.5 size-[16px] shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna da decisão: preço grande, condição e o caminho. */}
            <div className="border-border flex flex-col gap-4 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-muted font-mono text-[14px] font-semibold">
                  {moeda}
                </span>
                <span className="font-display text-foreground text-[34px] leading-none font-extrabold tracking-tight">
                  {plano.mensal}
                </span>
                <span className="text-muted text-[14px]">
                  {rotuloMensal}
                </span>
              </p>

              <p className="text-muted text-[13.5px] leading-snug">
                {`+ ${moeda} ${plano.instalacao} ${rotuloInstalacao}`}
              </p>

              <div className="mt-auto grid gap-2.5 pt-2">
                <CtaLink
                  href={hrefContratar[plano.chave]}
                  variante={plano.realce === "escolhido" ? "primario" : "secundario"}
                  tamanho="md"
                  externo
                  larguraTotal
                >
                  {`${ctaContratar} ${plano.plano}`}
                </CtaLink>

                <a
                  href={hrefTabela}
                  className="text-marca hover:text-marca-hover flex min-h-11 items-center justify-center text-[14px] font-semibold transition-colors"
                >
                  <span className="link-deslizante">{linkTabela}</span>
                </a>
              </div>
            </div>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
