import { Chip, Tabs } from "@heroui/react";
import { ArrowUpRight, Check } from "lucide-react";

import { PainelFiscal } from "@/components/ui/PainelFiscal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { produtos } from "@/content/pt-BR/home";

/**
 * Produtos em duas gerações — abas do HeroUI (§3, mapa de uso).
 * Nova geração web (E-Syntax em destaque + Dex + PDV) e linha consolidada
 * (ERP, Store, Mobile e Eventos, do site atual).
 */
export function ProdutosSection() {
  return (
    <section id="produtos" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            overline={produtos.overline}
            titulo={produtos.titulo}
            subtitulo={produtos.subtitulo}
          />
        </Reveal>

        <Tabs
          className="mt-10"
          defaultSelectedKey={produtos.abas.novaGeracao.id}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Gerações de produto">
              <Tabs.Tab id={produtos.abas.novaGeracao.id}>
                {produtos.abas.novaGeracao.rotulo}
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id={produtos.abas.consolidada.id}>
                {produtos.abas.consolidada.rotulo}
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <Tabs.Panel id={produtos.abas.novaGeracao.id} className="pt-8">
            <NovaGeracao />
          </Tabs.Panel>

          <Tabs.Panel id={produtos.abas.consolidada.id} className="pt-8">
            <LinhaConsolidada />
          </Tabs.Panel>
        </Tabs>
      </div>
    </section>
  );
}

function NovaGeracao() {
  const { esyntax, novaGeracao } = produtos;

  return (
    <div className="flex flex-col gap-6">
      {/* Destaque: E-Syntax com painel ilustrativo escuro */}
      <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <Chip color="accent" variant="soft">
            {esyntax.selo}
          </Chip>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            {esyntax.nome}
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-foreground/70">
            {esyntax.descricao}
          </p>

          <ul className="mt-5 flex flex-col gap-2.5">
            {esyntax.pontos.map((ponto) => (
              <li key={ponto} className="flex items-start gap-2.5 text-[15px] text-foreground/80">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                {ponto}
              </li>
            ))}
          </ul>

          <a
            href={esyntax.cta.href}
            className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent hover:underline"
          >
            {esyntax.cta.rotulo}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>

        <PainelFiscal />
      </div>

      {/* Dex e PDV */}
      <ul className="grid gap-5 md:grid-cols-2">
        {novaGeracao.map((produto) => (
          <li key={produto.nome}>
            <a
              href={produto.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-[border-color,box-shadow] hover:border-accent/35 hover:shadow-[0_16px_32px_-20px_rgb(15_23_42_/_0.25)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-sm font-medium text-accent"
                  >
                    {produto.sigla}
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold tracking-tight whitespace-nowrap text-foreground">
                      {produto.nome}
                    </h4>
                    <p className="mt-0.5 font-mono text-[10.5px] text-foreground/50">
                      {produto.dominio}
                    </p>
                  </div>
                </div>

                <Chip
                  size="sm"
                  variant="soft"
                  color={produto.tomSelo === "ok" ? "success" : "accent"}
                  className="shrink-0"
                >
                  {produto.selo}
                </Chip>
              </div>

              <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/70">
                {produto.descricao}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 pt-1">
                {produto.tags.map((tag) => (
                  <Chip key={tag} size="sm" variant="secondary">
                    {tag}
                  </Chip>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinhaConsolidada() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {produtos.consolidada.map((produto) => (
        <li
          key={produto.nome}
          className="flex h-full flex-col rounded-2xl border border-border bg-background p-6"
        >
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-lg bg-surface font-mono text-sm font-medium text-foreground/70"
          >
            {produto.sigla}
          </span>

          <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
            {produto.nome}
          </h3>
          <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-foreground/70">
            {produto.descricao}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {produto.tags.map((tag) => (
              <Chip key={tag} size="sm" variant="secondary">
                {tag}
              </Chip>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
