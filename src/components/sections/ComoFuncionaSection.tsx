import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Dobra 4 — desarma o "deve dar um trabalho enorme trocar de sistema".
 *
 * É uma `<ol>` de verdade porque a ordem é o conteúdo: passo 3 depois do 2 não
 * é decoração. O `Reveal` renderiza uma `div`, então ele vai DENTRO do `<li>`
 * — e, como aí ele deixa de ser filho direto do contêiner, o escalonamento
 * vem do `atraso` (60ms por passo, teto de 300ms, os mesmos números do
 * `.reveal-stagger`) em vez da classe (§10).
 */
export function ComoFuncionaSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { comoFunciona } = conteudo.home;

  return (
    <section
      id="como-funciona"
      className="bg-background border-border border-t py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            etapa="04"
            overline={comoFunciona.overline}
            titulo={comoFunciona.titulo}
            subtitulo={comoFunciona.intro}
          />
        </Reveal>

        <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 sm:gap-x-10 lg:mt-12 lg:grid-cols-4">
          {/* Fio que liga os quatro números em lg. Recuado em meia coluna de
              cada lado para começar e terminar no centro dos círculos, e não
              na borda da grade. */}
          <span
            aria-hidden
            className="bg-linha absolute top-[23px] right-[12.5%] left-[12.5%] hidden h-px lg:block"
          />

          {comoFunciona.passos.map((passo, indice) => (
            <li key={passo.titulo} className="relative">
              <Reveal atraso={Math.min(indice * 60, 300)}>
                {/* bg-background no círculo: é ele que "corta" o fio atrás. */}
                <span
                  aria-hidden
                  className="bg-marca-suave text-marca font-mono ring-background relative flex size-[46px] items-center justify-center rounded-full text-[17px] font-semibold ring-8"
                >
                  {indice + 1}
                </span>

                <h3 className="font-display text-foreground mt-5 text-[17px] leading-snug font-bold">
                  {passo.titulo}
                </h3>

                <p className="text-foreground-base mt-2 text-[15px] leading-[1.65]">
                  {passo.texto}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
