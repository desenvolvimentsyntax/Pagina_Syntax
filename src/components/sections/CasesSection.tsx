import { CarrosselCases } from "@/components/ui/CarrosselCases";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Dobra 08 — a prova que fecha o argumento de autoridade.
 *
 * Vem logo depois do "Sobre": a seção anterior conta a história (2006,
 * Sorocaba, o Paraguai) e esta mostra quem confiou. Sem parágrafo de apoio de
 * propósito — a fileira de marcas é o argumento inteiro; texto ao lado dela
 * só diluiria.
 *
 * O carrossel é `aria-hidden` (a lista aparece duplicada, para o loop fechar
 * sem emenda). A lista de verdade vai no `sr-only` aqui, uma vez só.
 */
export function CasesSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { cases } = conteudo.cases;

  return (
    <section
      id="cases"
      className="bg-background border-border border-t py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            etapa="07"
            overline={cases.overline}
            titulo={cases.titulo}
          />
        </Reveal>
      </div>

      {/* Fora do container: a faixa sangra de ponta a ponta da tela, que é o
          que faz ela ler como fluxo e não como uma caixa com logos dentro. */}
      <Reveal className="mt-9 md:mt-10">
        <p className="sr-only">
          {`${cases.listaAria}: ${cases.clientes.map((c) => c.nome).join(", ")}.`}
        </p>

        <CarrosselCases locale={locale} />
      </Reveal>
    </section>
  );
}
