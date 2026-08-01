import { Chip } from "@heroui/react";
import { ArrowUpRight, Check } from "lucide-react";

import { cartaoSyntax } from "@/components/ui/CartaoSyntax";
import { PainelFiscal } from "@/components/ui/PainelFiscal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prova } from "@/content/pt-BR/home";

const COR_SELO = {
  ok: "success",
  info: "accent",
} as const;

/**
 * Ato 04 — Prova (peso 5, o clímax): fusão de Produtos + Projetos. A seção
 * inteira entra no fio violeta da "nova geração" (§4) — capa E-Syntax com o
 * PainelFiscal como peça central, demos ao vivo como cards-link (padrão
 * canônico cardVariants em <a>) e a linha consolidada como catálogo técnico
 * em lista, não em cards (§7: nenhum formato repete o vizinho).
 */
export function ProvaSection() {
  return (
    <section
      id="produtos"
      className="relative overflow-x-clip py-16 md:py-24 [--glow-color:var(--color-accent-indigo)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(ellipse_55%_65%_at_72%_0%,color-mix(in_oklab,var(--glow-color)_13%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            indice="04"
            overline={prova.overline}
            titulo={prova.titulo}
            subtitulo={prova.subtitulo}
          />
        </Reveal>

        {/* Capa: E-Syntax com o painel fiscal como peça central */}
        <Reveal efeito="escala" className="mt-10 md:mt-14">
          <CapaEsyntax />
        </Reveal>

        {/* Demos ao vivo */}
        <ul className="reveal-stagger mt-4 grid gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
          {prova.demos.map((demo) => (
            <li key={demo.nome} className="h-full">
              <Reveal className="h-full">
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cartaoSyntax({ peso: "padrao", interativo: true }).base({
                    className: "group flex h-full flex-col",
                  })}
                >
                  <span className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        aria-hidden
                        className="borda-gradiente text-accent-soft-foreground flex size-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-medium"
                      >
                        {demo.sigla}
                      </span>
                      <span className="block">
                        <span className="text-foreground block text-lg font-semibold tracking-tight">
                          {demo.nome}
                        </span>
                        <span className="text-muted mt-0.5 block font-mono text-[10.5px]">
                          {demo.dominio}
                        </span>
                      </span>
                    </span>

                    <Chip
                      size="sm"
                      variant="soft"
                      color={COR_SELO[demo.tomSelo as keyof typeof COR_SELO]}
                      className="shrink-0"
                    >
                      {demo.selo}
                    </Chip>
                  </span>

                  <span className="text-foreground-base/70 mt-4 block text-[14.5px] leading-relaxed">
                    {demo.descricao}
                  </span>

                  <span className="mt-4 flex flex-1 flex-wrap content-start gap-2 pt-1">
                    {demo.tags.map((tag) => (
                      <Chip key={tag} size="sm" variant="secondary">
                        {tag}
                      </Chip>
                    ))}
                  </span>

                  <span className="text-accent-soft-foreground mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-medium group-hover:underline">
                    {demo.cta}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Linha consolidada — catálogo técnico */}
        <Reveal className="mt-12 md:mt-16">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div>
              <p className="text-accent-soft-foreground font-mono text-xs font-medium tracking-[0.1em] uppercase">
                {prova.catalogo.rotulo}
              </p>
              <p className="text-foreground-base/70 mt-1.5 text-sm">
                {prova.catalogo.nota}
              </p>
            </div>

            <a
              href={prova.catalogo.cta.href}
              className="text-accent-soft-foreground inline-flex min-h-11 items-center gap-1.5 font-mono text-xs font-medium tracking-[0.1em] uppercase hover:underline"
            >
              {prova.catalogo.cta.rotulo}
              <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          </div>

          <ul className="divide-border border-border mt-5 divide-y border-y">
            {prova.catalogo.itens.map((item) => (
              <li
                key={item.sigla}
                className="grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-[48px_200px_minmax(0,1fr)_auto] sm:items-center sm:gap-x-6"
              >
                <span aria-hidden className="text-micro font-mono text-sm">
                  {item.sigla}
                </span>
                <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
                  {item.nome}
                </h3>
                <p className="text-foreground-base/70 col-start-2 text-[13.5px] leading-relaxed sm:col-start-3 sm:text-sm">
                  {item.descricao}
                </p>
                <span className="hidden shrink-0 gap-2 lg:flex">
                  {item.tags.map((tag) => (
                    <Chip key={tag} size="sm" variant="secondary">
                      {tag}
                    </Chip>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CapaEsyntax() {
  const { esyntax } = prova;

  return (
    <div
      className={cartaoSyntax({ peso: "capa" }).base({
        className:
          "grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]",
      })}
    >
      <div>
        <Chip color="accent" variant="soft">
          {esyntax.selo}
        </Chip>

        <h3 className="text-foreground mt-4 text-2xl font-semibold tracking-tight">
          {esyntax.nome}
        </h3>
        <p className="text-foreground-base/70 mt-3 max-w-md text-base leading-relaxed">
          {esyntax.descricao}
        </p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {esyntax.pontos.map((ponto) => (
            <li
              key={ponto}
              className="text-foreground-base/80 flex items-start gap-2.5 text-[15px]"
            >
              <Check
                aria-hidden
                className="text-accent-soft-foreground mt-0.5 size-4 shrink-0"
              />
              {ponto}
            </li>
          ))}
        </ul>

        <a
          href={esyntax.cta.href}
          className="text-accent-soft-foreground mt-4 inline-flex items-center gap-1.5 py-3 text-[15px] font-medium hover:underline"
        >
          {esyntax.cta.rotulo}
          <ArrowUpRight aria-hidden className="size-4" />
        </a>
      </div>

      <div className="order-first lg:order-none">
        <PainelFiscal />
      </div>
    </div>
  );
}
