import { Check, Minus } from "lucide-react";

import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Tabela comparativa dos três planos.
 *
 * A verdade da tabela sai de `plano.recursos` — ninguém marca ✓ à mão. Se um
 * recurso entrar num plano no `planos.ts`, a coluna acende sozinha; se sair,
 * apaga. É o que impede a tabela de mentir depois de uma edição de preço.
 *
 * DESVIO AUTORIZADO da regra 2 do §3 (usar o componente do HeroUI quando ele
 * existe): aqui a tabela é `<table>` nativa, não o `Table` da v3.
 *
 * O `Table` é o data grid do React Aria — grade de foco, seleção, ordenação —
 * e monta a coleção com chaves de um contador global. Numa página gerada
 * estaticamente as chaves do servidor não batem com as do cliente e a
 * hidratação quebra ("Cell count must match column count"), com a tabela
 * inteira remontada no navegador. Passar `id` em coluna, linha e célula
 * estabiliza as chaves mas não o resto do ciclo.
 *
 * Esta tabela é conteúdo, não widget: ninguém ordena, seleciona ou navega
 * célula a célula nela — ela é lida, e é a peça de SEO da página de preço.
 * Em `<table>` nativa ela renderiza no HTML, custa zero JavaScript, tem
 * `scope`/`colSpan` de verdade (a linha de grupo deixa de ser três células
 * vazias) e o leitor de tela a percorre como tabela de dados.
 *
 * Se um dia a comparação precisar ordenar ou selecionar, o `Table` do HeroUI
 * volta — aí o data grid é o componente certo.
 */
export function TabelaPlanos({ locale }: { locale: Locale }) {
  const { MOEDA, condicoes, gruposComparacao, listaPlanos, rotulos } =
    conteudoDe(locale).planos;
  return (
    <div className="border-border bg-surface overflow-hidden rounded-2xl border">
      {/* §7: conteúdo largo rola dentro da própria caixa, nunca na página —
          em 360px quatro colunas não cabem. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">{rotulos.tabelaAria}</caption>

          <thead>
            <tr className="border-border border-b">
              <th
                scope="col"
                className="text-muted w-[38%] px-5 py-4 font-mono text-[12px] font-semibold tracking-[0.08em] uppercase"
              >
                {rotulos.colunaRecurso}
              </th>

              {listaPlanos.map((plano) => (
                <th
                  key={plano.chave}
                  scope="col"
                  className={`px-5 py-4 ${plano.realce === "escolhido" ? "bg-surface-tertiary/60" : ""}`}
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="font-display text-foreground text-[15px] font-extrabold">
                      {plano.plano}
                    </span>
                    <span className="text-muted font-mono text-[12px] font-medium">
                      {`${MOEDA} ${plano.mensal}/mês`}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {gruposComparacao.flatMap((grupo) => [
              <tr key={`grupo-${grupo.titulo}`} className="bg-surface-secondary">
                <th
                  scope="colgroup"
                  colSpan={listaPlanos.length + 1}
                  className="font-display text-foreground border-border border-y px-5 py-2.5 text-[12.5px] font-bold tracking-[0.08em] uppercase"
                >
                  {grupo.titulo}
                </th>
              </tr>,

              ...grupo.recursos.map((recurso) => (
                <tr key={recurso} className="border-border border-b last:border-b-0">
                  <th
                    scope="row"
                    className="text-foreground-base px-5 py-3 text-[14.5px] font-normal"
                  >
                    {recurso}
                  </th>

                  {listaPlanos.map((plano) => {
                    const tem = (plano.recursos as readonly string[]).includes(
                      recurso,
                    );

                    return (
                      <td
                        key={plano.chave}
                        className={`px-5 py-3 ${plano.realce === "escolhido" ? "bg-surface-tertiary/60" : ""}`}
                      >
                        {tem ? (
                          <Check
                            aria-label={rotulos.temAria}
                            strokeWidth={2.6}
                            className="text-marca size-[18px]"
                          />
                        ) : (
                          <Minus
                            aria-label={rotulos.naoTemAria}
                            strokeWidth={2.2}
                            className="text-muted/70 size-[18px]"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>

      <p className="text-muted border-border border-t px-5 py-4 text-[13.5px] leading-relaxed">
        {condicoes.nota}
      </p>
    </div>
  );
}
