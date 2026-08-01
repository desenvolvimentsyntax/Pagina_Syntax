import { CtaLink } from "@/components/ui/CtaLink";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { hero } from "@/content/pt-BR/home";

/** Hero da home. Server Component — não há estado nem evento aqui (§3.9). */
export function HeroSection() {
  return (
    <section id="topo" className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-14 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-14">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium text-accent">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {hero.badge}
          </p>

          <h1 className="mt-6 text-[clamp(2.375rem,6vw,3.625rem)] leading-[1.06] font-semibold tracking-tight text-balance text-foreground">
            {hero.tituloInicio}
            <span className="text-accent">{hero.tituloDestaque}</span>
            {hero.tituloFim}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-foreground/70">
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

          <dl className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-6">
            {hero.indicadores.map((item, i) => (
              <div key={item.rotulo} className="flex items-center gap-6">
                {i > 0 ? (
                  <span aria-hidden className="hidden h-9 w-px bg-border sm:block" />
                ) : null}
                <div>
                  <dt className="sr-only">{item.rotulo}</dt>
                  <dd className="text-2xl font-semibold tracking-tight text-foreground">
                    {item.valor}
                  </dd>
                  <p className="mt-0.5 text-[13px] whitespace-nowrap text-foreground/55">
                    {item.rotulo}
                  </p>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-rise-slow">
          <div
            aria-hidden
            className="absolute inset-8 bg-[radial-gradient(ellipse_at_center,rgb(37_99_235_/_0.09),transparent_70%)]"
          />
          <div className="relative flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
