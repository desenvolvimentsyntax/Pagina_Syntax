import { Fragment } from "react";

import { ArcoSyntax } from "@/components/ui/ArcoSyntax";
import { CtaLink } from "@/components/ui/CtaLink";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { hero } from "@/content/pt-BR/home";

/**
 * Hero da home — ato 1, o mostruário em camadas. Server Component; o único
 * cliente aqui é o ParticleCanvas.
 *
 * Desktop: a seção preenche a dobra (min-h em svh, §7) com o ArcoSyntax em
 * parallax atrás do painel e o indicador de rolagem na base. Mobile: badge →
 * H1 → subtítulo → CTAs → painel COMPACTO → linha de fatos — o produto entra
 * na primeira tela de 390×844 em vez de ficar abaixo dela.
 *
 * A linha de fatos aparece duas vezes no DOM (coluna A no desktop, fim da
 * pilha no mobile) — display:none tira a cópia inativa da árvore de
 * acessibilidade, então o leitor de tela só encontra uma.
 */
export function HeroSection() {
  return (
    <section id="topo" className="relative overflow-x-clip">
      <ParticleCanvas />

      {/* 2 colunas só em xl: em 1024–1279 o min-content do mockup (textos
          nowrap) esmagaria a coluna de texto para ~300px. */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pt-12 pb-16 md:gap-12 md:px-6 md:pt-16 md:pb-20 xl:min-h-[calc(100svh-82px)] xl:max-h-[960px] xl:grid-cols-[minmax(0,540px)_1fr] xl:content-center xl:gap-14 xl:pt-8 xl:pb-16">
        <div className="animate-rise">
          <p className="border-accent-soft-foreground/25 bg-accent/10 text-accent-soft-foreground inline-flex max-w-full items-center gap-2 rounded-full border py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium">
            <span
              aria-hidden
              className="bg-accent-soft-foreground size-1.5 shrink-0 rounded-full"
            />
            <span className="truncate sm:hidden">{hero.badgeCurto}</span>
            <span className="hidden sm:inline">{hero.badge}</span>
          </p>

          <h1 className="font-display text-foreground mt-6 text-[2rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance min-[480px]:text-[2.5rem] sm:text-[2.75rem] xl:text-[3.5rem]">
            {hero.tituloInicio}
            <span className="texto-gradiente">{hero.tituloDestaque}</span>
            {hero.tituloFim}
          </h1>

          <p className="text-foreground-base/70 mt-5 max-w-lg text-[17px] leading-relaxed text-pretty md:mt-6 md:text-lg">
            {hero.subtitulo}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-9">
            <CtaLink href={hero.ctaPrimario.href} comSeta larguraTotal>
              {hero.ctaPrimario.rotulo}
            </CtaLink>
            <CtaLink href={hero.ctaSecundario.href} variante="secundario" larguraTotal>
              {hero.ctaSecundario.rotulo}
            </CtaLink>
          </div>

          <LinhaFatos className="mt-10 hidden xl:flex" />
        </div>

        <div className="animate-rise-slow relative">
          <ArcoSyntax className="parallax-suave--lento pointer-events-none absolute top-1/2 -right-14 hidden w-[540px] -translate-y-1/2 xl:block" />

          <div
            aria-hidden
            className="absolute inset-4 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_38%,transparent),transparent_70%)] blur-2xl"
          />

          <div className="relative flex justify-center xl:justify-end">
            <DashboardMockup variante="compacto" className="xl:hidden" />
            <DashboardMockup className="hidden xl:block" />
          </div>
        </div>

        <LinhaFatos className="flex xl:hidden" />
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-4 hidden justify-center xl:flex"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="animate-pulso text-micro font-mono text-[10px] tracking-[0.18em] uppercase">
            {hero.indicadorRolagem}
          </span>
          <span className="bg-hairline-strong h-8 w-px" />
        </div>
      </div>
    </section>
  );
}

function LinhaFatos({ className }: { className?: string }) {
  return (
    <p
      className={`text-micro flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] tracking-[0.06em] uppercase ${className ?? ""}`}
    >
      {hero.linhaFatos.map((fato, i) => (
        <Fragment key={fato}>
          {i > 0 ? (
            <span aria-hidden className="opacity-50">
              ·
            </span>
          ) : null}
          <span>{fato}</span>
        </Fragment>
      ))}
    </p>
  );
}
