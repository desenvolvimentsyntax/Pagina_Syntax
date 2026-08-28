import { Card, Chip } from "@heroui/react";
import { Check } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { MarcaProdutoLockup } from "@/components/ui/MarcaProduto";
import { conteudoDe } from "@/content";
import type { Plano } from "@/content/tipos";
import { caminhoDe, type Locale } from "@/lib/routes";

/**
 * Card de plano — a peça que carrega o preço. Aparece duas vezes no site com
 * o mesmo desenho: `compacto` na primeira dobra da home (três lado a lado,
 * ainda acima da linha do scroll) e `completo` em /planos, onde a lista
 * inteira de recursos cabe.
 *
 * Hierarquia: `Card.Title` renderiza um `h3`, então quem usa este componente
 * precisa ter um `h2` acima na seção — na home é o "Planos publicados" do
 * hero, em /planos é o título da seção (§8, sem pular nível).
 *
 * Os realces vêm do catálogo (§13): "escolhido" (PRO) é o único com pílula
 * azul E CTA primário — num comparativo, o botão forte é o que o olho segue.
 * "completo" (Premium) é a borda dourada com pílula âmbar: chama a atenção
 * para a completude sem disputar o clique com o plano do meio.
 */

interface CartaoPlanoProps {
  plano: Plano;
  locale: Locale;
  variante?: "compacto" | "completo";
}

export function CartaoPlano({
  plano,
  locale,
  variante = "compacto",
}: CartaoPlanoProps) {
  const { MOEDA, condicoes, rotulos, whatsappDoPlano } = conteudoDe(locale).planos;
  const REALCES = {
    escolhido: {
      borda: "border-marca shadow-cartao ring-marca/25 ring-1",
      pilula: "bg-marca text-accent-foreground",
      rotulo: rotulos.realceEscolhido,
    },
    completo: {
      borda: "border-produto-premium ring-produto-premium/25 ring-1",
      pilula: "bg-produto-premium-forte text-white",
      rotulo: rotulos.realceCompleto,
    },
  } as const;

  const realce = plano.realce ? REALCES[plano.realce] : null;
  const itens = variante === "completo" ? plano.recursos : plano.destaques;
  const hrefDetalhes = `${caminhoDe("planos", locale)}#${plano.chave}`;

  return (
    <Card
      id={variante === "completo" ? plano.chave : undefined}
      /* scroll-mt igual ao de `section[id]` no globals.css: sem ele o link
         /planos#pro para com o card debaixo do header sticky. */
      className={`bg-surface relative flex h-full scroll-mt-23 flex-col gap-5 rounded-2xl border p-6 sm:scroll-mt-28 sm:p-7 ${
        realce ? realce.borda : "border-border"
      }`}
    >
      {realce ? (
        /* -top-3 tira a pílula para fora da borda: é o realce do comparativo,
           não mais um chip dentro do conteúdo. */
        <Chip
          variant="tertiary"
          className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[12px] font-bold ${realce.pilula}`}
        >
          <Chip.Label>{realce.rotulo}</Chip.Label>
        </Chip>
      ) : null}

      <Card.Header className="gap-3">
        <MarcaProdutoLockup produto={plano.chave} tamanho="sm" />

        <Card.Title className="font-display text-foreground text-[22px] leading-tight font-extrabold">
          {plano.plano}
        </Card.Title>

        <Card.Description className="text-muted text-[14.5px] leading-snug">
          {plano.resumo}
        </Card.Description>
      </Card.Header>

      {/* Preço: o guarani tem seis dígitos, então o número manda e a moeda vem
          menor ao lado — do contrário "Gs." compete com o valor. */}
      <div className="border-border border-t pt-5">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-muted font-mono text-[15px] font-semibold">
            {MOEDA}
          </span>
          <span className="font-display text-foreground text-[38px] leading-none font-extrabold tracking-tight">
            {plano.mensal}
          </span>
          <span className="text-muted text-[15px]">{condicoes.rotuloMensal}</span>
        </p>

        <p className="text-muted mt-2 text-[13.5px] leading-snug">
          {`+ ${MOEDA} ${plano.instalacao} ${condicoes.rotuloInstalacao}`}
        </p>
      </div>

      {/* content-start nos dois: com cards de mesma altura e listas de 6 a 12
          itens, um grid que sobra altura distribui a folga ENTRE as linhas e o
          Básico sai com o dobro do espaçamento do Premium. A folga tem que
          ficar toda no fim, antes do CTA. */}
      <Card.Content className="grid content-start gap-2.5">
        <p className="text-foreground text-[14px] font-semibold">{plano.ganho}</p>

        <ul className="text-foreground-base grid content-start gap-2 text-[14.5px]">
          {itens.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check
                aria-hidden
                strokeWidth={2.4}
                className="text-marca mt-0.5 size-[17px] shrink-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card.Content>

      <Card.Footer className="mt-auto grid gap-2.5 pt-1">
        <CtaLink
          href={whatsappDoPlano(plano)}
          variante={plano.realce === "escolhido" ? "primario" : "secundario"}
          externo
          larguraTotal
        >
          {`${rotulos.ctaContratar} ${plano.plano}`}
        </CtaLink>

        {variante === "compacto" ? (
          <a
            href={hrefDetalhes}
            className="text-marca hover:text-marca-hover flex min-h-11 items-center justify-center text-[14.5px] font-semibold transition-colors"
          >
            <span className="link-deslizante">{rotulos.ctaDetalhes}</span>
          </a>
        ) : null}
      </Card.Footer>
    </Card>
  );
}
