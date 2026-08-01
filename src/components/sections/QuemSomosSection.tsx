import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quemSomos } from "@/content/pt-BR/home";

/**
 * História real da Syntax: fundada em 2006, do setor de bebidas ao Mercosul.
 * Editorial: o primeiro parágrafo é lead, os demais texto corrido. Os fatos
 * ficam numa stat-strip única (a mesma família visual do hero — a segunda
 * aparição é o que a torna assinatura da página, não componente genérico):
 * horizontal com divide-x no mobile, vertical com divide-y no desktop.
 */
export function QuemSomosSection() {
  return (
    <section id="quem-somos" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-6 lg:grid-cols-[minmax(0,1.25fr)_1fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            overline={quemSomos.overline}
            titulo={quemSomos.titulo}
            subtitulo={quemSomos.subtitulo}
          />

          <div className="mt-6 flex max-w-xl flex-col gap-4 leading-relaxed md:mt-8">
            {quemSomos.paragrafos.map((paragrafo, i) => (
              <p
                key={paragrafo}
                className={
                  i === 0
                    ? "text-foreground-base/85 text-[17px] text-pretty md:text-lg"
                    : "text-foreground-base/70 text-[15px] text-pretty md:text-base"
                }
              >
                {paragrafo}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal atraso={80} className="flex items-center">
          <dl className="divide-border border-border bg-surface grid w-full grid-cols-3 divide-x rounded-2xl border lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
            {quemSomos.fatos.map((fato) => (
              <div
                key={fato.rotulo}
                className="flex min-w-0 flex-col-reverse justify-end px-2.5 py-3.5 sm:px-5 sm:py-4 lg:px-7 lg:py-6"
              >
                <dt className="text-micro mt-1 font-mono text-[10px] leading-snug sm:text-[11px]">
                  {fato.rotulo}
                </dt>
                <dd className="font-display text-foreground text-[16px] font-semibold tracking-tight min-[360px]:text-lg sm:text-2xl lg:text-3xl">
                  {fato.valor}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
