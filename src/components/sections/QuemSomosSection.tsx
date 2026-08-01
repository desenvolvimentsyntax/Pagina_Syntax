import { LinhaDoTempo } from "@/components/ui/LinhaDoTempo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quemSomos } from "@/content/pt-BR/home";

/**
 * Ato 01 — editorial + linha do tempo (peso 3). História real da Syntax:
 * fundada em 2006, do setor de bebidas ao Mercosul. O primeiro parágrafo é
 * lead; a credibilidade que era stat-strip virou a LinhaDoTempo — a carga de
 * prova numérica completa vive no ato Diferenciais (MapaAtuacao).
 */
export function QuemSomosSection() {
  return (
    <section id="quem-somos" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-6 lg:grid-cols-[minmax(0,1.25fr)_1fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            indice="01"
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

        <Reveal atraso={80} efeito="lado-inverso" className="lg:pt-3">
          <LinhaDoTempo marcos={quemSomos.marcos} />
        </Reveal>
      </div>
    </section>
  );
}
