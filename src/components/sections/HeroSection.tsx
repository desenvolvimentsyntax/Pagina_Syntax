import { CtaLink } from "@/components/ui/CtaLink";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { hero } from "@/content/pt-BR/home";

/** Hero da home. Server Component — o único cliente aqui é o ParticleCanvas. */
export function HeroSection() {
  return (
    <section id="topo" className="relative">
      <ParticleCanvas />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-16 pb-16 md:pt-24 md:pb-24 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-14">
        <div className="animate-rise">
          <p className="border-accent-soft-foreground/25 bg-accent/10 text-accent-soft-foreground inline-flex items-center gap-2 rounded-full border py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium">
            <span
              aria-hidden
              className="bg-accent-soft-foreground size-1.5 rounded-full"
            />
            {hero.badge}
          </p>

          <h1 className="font-display text-foreground mt-6 text-[clamp(2.375rem,6vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
            {hero.tituloInicio}
            <span className="texto-gradiente">{hero.tituloDestaque}</span>
            {hero.tituloFim}
          </h1>

          <p className="text-foreground-base/70 mt-6 max-w-lg text-lg leading-relaxed text-pretty">
            {hero.subtitulo}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CtaLink href={hero.ctaPrimario.href} comSeta>
              {hero.ctaPrimario.rotulo}
            </CtaLink>
            <CtaLink href={hero.ctaSecundario.href} variante="secundario">
              {hero.ctaSecundario.rotulo}
            </CtaLink>
          </div>

          {/* Um <dl> só aceita dt/dd/div como filho DIRETO: o par vai dentro de
              um único div, sem nível extra, e a divisória é border, não span.
              flex-col-reverse porque o valor vem grande em cima e o rótulo
              embaixo, mas <dt> tem que preceder <dd> no DOM. */}
          <dl className="border-border mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t pt-6">
            {hero.indicadores.map((item, i) => (
              <div
                key={item.rotulo}
                className={`flex flex-col-reverse ${
                  i > 0 ? "border-border pl-6 sm:border-l" : ""
                }`}
              >
                <dt className="text-muted mt-0.5 text-[13px] whitespace-nowrap">
                  {item.rotulo}
                </dt>
                <dd className="font-display text-foreground text-2xl font-semibold tracking-tight">
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
