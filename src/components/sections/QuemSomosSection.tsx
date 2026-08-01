import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quemSomos } from "@/content/pt-BR/home";

/** História real da Syntax: fundada em 2006, do setor de bebidas ao Mercosul. */
export function QuemSomosSection() {
  return (
    <section id="quem-somos" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1.25fr)_1fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            overline={quemSomos.overline}
            titulo={quemSomos.titulo}
            subtitulo={quemSomos.subtitulo}
          />

          <div className="mt-8 flex max-w-xl flex-col gap-4 text-base leading-relaxed text-foreground-base/70">
            {quemSomos.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col justify-center gap-4">
          {quemSomos.fatos.map((fato, i) => (
            <Reveal key={fato.rotulo} atraso={i * 60}>
              <div className="rounded-2xl border-border bg-surface-secondary border p-6">
                <p className="text-3xl font-semibold tracking-tight text-foreground">
                  {fato.valor}
                </p>
                <p className="mt-1 text-sm text-muted">{fato.rotulo}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
