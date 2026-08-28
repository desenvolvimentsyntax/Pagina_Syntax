import { ArrowUp } from "lucide-react";

import { hero } from "@/content/pt-BR/home";

/**
 * Painel ilustrativo do hero: mini dashboard desenhado em código (§11).
 *
 * Não é `Card` do HeroUI de propósito — o elemento inteiro é uma ILUSTRAÇÃO
 * (`role="img"`), não um cartão de conteúdo. O Card traria raio e sombra do
 * tema (8px, zerada) que teriam de ser sobrescritos em cima, e a semântica de
 * `role="img"` colidiria com a dele.
 *
 * O leitor de tela ouve `hero.painel.aria` uma vez e nada mais: números soltos
 * fora de contexto ("148", "12%") só poluem a leitura (§9).
 *
 * Alturas fixas em toda parte — o painel não pode empurrar a dobra ao montar.
 */
export function DashboardMockup() {
  const { painel } = hero;

  return (
    <div
      role="img"
      aria-label={painel.aria}
      className="bg-surface border-border shadow-painel w-full rounded-[14px] border p-6"
    >
      <div aria-hidden>
        <p className="text-muted text-[13px]">{painel.legenda}</p>

        <div className="mt-3.5 grid grid-cols-2 gap-3.5">
          {painel.tiles.map((tile) => (
            <div
              key={tile.rotulo}
              className="bg-surface-tertiary rounded-[10px] p-4"
            >
              <p className="text-muted text-[13px] leading-snug">
                {tile.rotulo}
              </p>
              <p className="text-foreground mt-1 text-[30px] leading-tight font-bold">
                {tile.valor}
              </p>
              <p className="text-marca mt-1 flex items-center gap-1 text-[13px] font-semibold">
                <ArrowUp aria-hidden className="size-3.5 shrink-0" />
                {tile.variacao}
              </p>
            </div>
          ))}
        </div>

        {/* 105px = as barras de 90px do design + 14px de respiro + o hairline:
            com box-sizing:border-box a altura declarada inclui os dois, e
            h-[90px] encolheria as barras para 75px. */}
        <div className="border-border mt-4.5 flex h-[105px] items-end gap-2 border-t pt-3.5">
          {painel.barras.map((altura, indice) => (
            <div
              key={`${indice}-${altura}`}
              style={{ height: `${altura}%` }}
              className={
                indice === painel.barras.length - 1
                  ? "bg-azul-barra flex-1 rounded-t-[4px]"
                  : "bg-marca flex-1 rounded-t-[4px]"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
