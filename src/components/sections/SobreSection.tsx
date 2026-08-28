import { LinhaDoTempo } from "@/components/ui/LinhaDoTempo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Sobre a Syntax: história à esquerda, trajetória à direita. A faixa de
 * números fecha a coluna de texto sem caixa — só a hairline a separa dos
 * parágrafos, para não competir com o card da timeline ao lado.
 */
export function SobreSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { sobre } = conteudo.home;

  return (
    <section
      id="sobre"
      className="bg-background border-border border-t py-16 md:py-18"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-2 lg:px-12">
        <Reveal>
          <SectionHeading etapa="08" overline={sobre.overline} titulo={sobre.titulo} />

          <div className="mt-5 space-y-4">
            {sobre.paragrafos.map((paragrafo) => (
              <p
                key={paragrafo}
                className="text-foreground-base text-[17px] leading-[1.7]"
              >
                {paragrafo}
              </p>
            ))}
          </div>

          <dl className="border-border mt-7 flex flex-wrap gap-x-9 gap-y-7 border-t pt-6">
            {sobre.numeros.map((numero) => (
              <div key={numero.legenda}>
                <dt className="text-marca font-display text-[32px] font-bold">
                  {numero.valor}
                </dt>
                <dd className="text-muted text-sm">{numero.legenda}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal efeito="lado">
          <LinhaDoTempo locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
