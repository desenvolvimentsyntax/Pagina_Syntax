import { CtaLink } from "@/components/ui/CtaLink";
import { IDENTIDADE, MarcaProdutoLockup } from "@/components/ui/MarcaProduto";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SeletorPlanos } from "@/components/ui/SeletorPlanos";
import { conteudoDe } from "@/content";
import { caminhoDe, type Locale } from "@/lib/routes";

/**
 * Dobra 2 — responde à única pergunta que sobra depois de ver três preços:
 * "qual deles é o meu?". O formato é o seletor por plano (Tabs): o visitante
 * escolhe um e vê só o que ele inclui — a tabela completa, que compara os
 * três de uma vez, vive em /planos (§7).
 *
 * A faixa do Syntax MOBILE fecha a seção porque é o que os três planos têm em
 * comum — depois das diferenças, o comum tranquiliza.
 */
export function ComparacaoSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { comparacao } = conteudo.home;
  const {
    MOEDA,
    condicoes,
    gruposComparacao,
    listaPlanos,
    rotulos,
    whatsappDoPlano,
  } = conteudo.planos;

  /* O SeletorPlanos é client: função não atravessa a fronteira RSC, então os
     href de WhatsApp são montados aqui e passam prontos, por chave de plano. */
  const hrefContratar = Object.fromEntries(
    listaPlanos.map((plano) => [plano.chave, whatsappDoPlano(plano)]),
  );

  return (
    <section
      id="planos"
      className="border-border bg-surface-secondary border-t py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            etapa="02"
            overline={comparacao.overline}
            titulo={comparacao.titulo}
            subtitulo={comparacao.intro}
          />
        </Reveal>

        <Reveal className="mt-8 md:mt-10">
          <SeletorPlanos
            planos={listaPlanos}
            grupos={gruposComparacao}
            moeda={MOEDA}
            rotuloMensal={condicoes.rotuloMensal}
            rotuloInstalacao={condicoes.rotuloInstalacao}
            ctaContratar={rotulos.ctaContratar}
            linkTabela={comparacao.linkTabela}
            seletorAria={comparacao.seletorAria}
            hrefTabela={`${caminhoDe("planos", locale)}#comparacao`}
            hrefContratar={hrefContratar}
          />
        </Reveal>

        <div className="reveal-stagger mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <Reveal>
            {/* Tinta do próprio produto no painel: depois de uma tabela toda
                em azul institucional, é o que faz o MOBILE ler como coisa à
                parte e não como mais uma linha da comparação. */}
            <div
              className={`border-border flex h-full flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7 ${IDENTIDADE.mobile.tint}`}
            >
              <span className="shrink-0">
                <MarcaProdutoLockup produto="mobile" />
              </span>

              <div>
                <h3 className="font-display text-foreground text-[17px] leading-snug font-bold">
                  {comparacao.mobile.titulo}
                </h3>
                <p className="text-foreground-base mt-1.5 text-[15px] leading-[1.6]">
                  {comparacao.mobile.texto}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <CtaLink
                href={caminhoDe("planos", locale)}
                variante="secundario"
                larguraTotal
                comSeta
              >
                {comparacao.cta}
              </CtaLink>
              <p className="text-muted text-[13.5px] lg:text-right">
                {comparacao.ctaApoio}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
