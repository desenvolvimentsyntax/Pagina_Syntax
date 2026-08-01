import { CtaLink } from "@/components/ui/CtaLink";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { hero } from "@/content/pt-BR/home";

/**
 * Hero da home. Server Component — o único cliente aqui é o ParticleCanvas.
 *
 * No mobile a ordem é badge → H1 → subtítulo → CTAs full-width → stat-strip →
 * mockup: quem chega decide com o polegar antes de rolar até o mostruário.
 * A stat-strip (3 colunas com divide-x) existe SÓ no hero e no Quem Somos —
 * é assinatura visual, não componente genérico.
 */
export function HeroSection() {
  return (
    <section id="topo" className="relative">
      <ParticleCanvas />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pt-12 pb-16 md:gap-12 md:px-6 md:pt-24 md:pb-24 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-14">
        <div className="animate-rise">
          <p className="border-accent-soft-foreground/25 bg-accent/10 text-accent-soft-foreground inline-flex max-w-full items-center gap-2 rounded-full border py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium">
            <span
              aria-hidden
              className="bg-accent-soft-foreground size-1.5 shrink-0 rounded-full"
            />
            <span className="truncate sm:hidden">{hero.badgeCurto}</span>
            <span className="hidden sm:inline">{hero.badge}</span>
          </p>

          <h1 className="font-display text-foreground mt-6 text-[clamp(2rem,8.5vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
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

          {/* Stat-strip: <dl> com 3 colunas — um <dl> só aceita dt/dd/div como
              filho DIRETO. flex-col-reverse porque o valor vem grande em cima,
              mas <dt> tem que preceder <dd> no DOM. */}
          <dl className="divide-border border-border bg-surface mt-10 grid grid-cols-3 divide-x rounded-2xl border md:mt-12">
            {hero.indicadores.map((item) => (
              <div
                key={item.rotulo}
                className="flex min-w-0 flex-col-reverse justify-end px-2.5 py-3.5 sm:px-5 sm:py-4"
              >
                <dt className="text-micro mt-1 font-mono text-[10px] leading-snug sm:text-[11px]">
                  {item.rotulo}
                </dt>
                <dd className="font-display text-foreground text-[16px] font-semibold tracking-tight min-[360px]:text-lg sm:text-2xl">
                  {item.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise-slow relative">
          <div
            aria-hidden
            className="absolute inset-4 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_38%,transparent),transparent_70%)] blur-2xl"
          />
          <div className="relative flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
