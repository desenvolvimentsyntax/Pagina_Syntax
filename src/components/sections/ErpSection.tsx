import { Chip } from "@heroui/react";
import {
  ClipboardList,
  Package,
  Receipt,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { MarcaProdutoLockup } from "@/components/ui/MarcaProduto";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { IconeCobertura } from "@/content/tipos";
import type { Locale } from "@/lib/routes";

/**
 * Dobra 06 — o Syntax ERP, em dobra própria.
 *
 * Até a fatia 3.11 ele vivia dentro de uma seção chamada "Outras linhas", ou
 * seja: o carro-chefe da Syntax rotulado como sobra, empilhando oito blocos
 * de informação num card só (lockup, label, descrição, chips, bullets, prova,
 * preço e CTA) sem nada vencer. A fatia 3.12 desfez isso — a hierarquia aqui
 * é UMA promessa à esquerda e UMA prova à direita.
 *
 * A dobra seguinte (Cases) é a continuação desta: todas as empresas daquele
 * carrossel operam com este ERP. Esta seção apresenta o produto e as logos
 * logo abaixo o comprovam — separar as duas quebra o argumento.
 *
 * O card de projetos sob medida fecha a seção deliberadamente mais leve: é
 * rodapé da dobra, não um terceiro protagonista.
 */

const ICONES: Record<IconeCobertura, LucideIcon> = {
  pedidos: ClipboardList,
  estoque: Package,
  financeiro: Wallet,
  fiscal: Receipt,
};

export function ErpSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { erpSecao } = conteudo.home;
  const { contato } = conteudo.site;

  const hrefWhatsApp = (texto: string) =>
    `${contato.whatsappHref}?text=${encodeURIComponent(texto)}`;

  return (
    <section
      id="erp"
      className="border-border bg-surface-secondary border-t py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <span className="inline-flex">
              <MarcaProdutoLockup produto="erp" />
            </span>

            <div className="mt-6">
              <SectionHeading
                etapa="06"
                overline={erpSecao.overline}
                titulo={erpSecao.titulo}
                subtitulo={erpSecao.texto}
              />
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {erpSecao.segmentos.map((segmento) => (
                <li key={segmento}>
                  <Chip className="bg-surface border-border text-foreground-base rounded-full border px-3 py-1 text-[13px] font-medium">
                    <Chip.Label>{segmento}</Chip.Label>
                  </Chip>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col items-start gap-3">
              <CtaLink href={hrefWhatsApp(erpSecao.whatsappTexto)} larguraTotal externo>
                {erpSecao.cta}
              </CtaLink>
              {/* O que substituiu o "preço sob consulta": compromisso no lugar
                  de "ligue para saber" (§13 — a página vende preço na tela). */}
              <p className="text-muted text-[14px]">{erpSecao.compromisso}</p>
            </div>
          </Reveal>

          <Reveal efeito="lado-inverso">
            {/* Painel de prova. Quatro áreas da operação em vez de bullets em
                prosa: o olho conta quatro e entende o alcance sem ler. */}
            <div className="border-border bg-surface rounded-2xl border p-6 sm:p-8">
              <h3 className="font-display text-foreground text-[17px] leading-snug font-bold">
                {erpSecao.coberturaTitulo}
              </h3>

              <ul className="mt-5 grid grid-cols-2 gap-3">
                {erpSecao.cobertura.map((area) => {
                  const Icone = ICONES[area.icone];

                  return (
                    /* Hover decorativo: o tile sobe, ganha borda e sombra, e
                       o disco do ícone inverte para o azul da marca (branco em
                       cima dá 8,66:1). SEM cursor-pointer de propósito — ele
                       não leva a lugar nenhum, e o cursor é o que separa "vivo"
                       de "clicável". A borda já nasce transparente para a
                       chegada dela no hover não empurrar o layout. */
                    <li
                      key={area.rotulo}
                      className="group bg-surface-secondary hover:bg-surface hover:border-border hover:shadow-cartao flex flex-col gap-2.5 rounded-[14px] border border-transparent p-4 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5"
                    >
                      <span
                        aria-hidden
                        className="bg-surface-tertiary group-hover:bg-marca flex size-10 items-center justify-center rounded-full transition-colors duration-200"
                      >
                        <Icone
                          className="text-marca size-5 transition-[color,transform] duration-200 group-hover:scale-110 group-hover:text-white"
                          strokeWidth={1.9}
                        />
                      </span>
                      <span className="text-foreground text-[15px] font-semibold">
                        {area.rotulo}
                      </span>
                    </li>
                  );
                })}
              </ul>

            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <div className="border-border bg-surface flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
            <div>
              <h3 className="font-display text-foreground text-[17px] leading-snug font-bold">
                {erpSecao.projetos.titulo}
              </h3>
              <p className="text-foreground-base mt-1.5 max-w-2xl text-[15px] leading-[1.6]">
                {erpSecao.projetos.texto}
              </p>
            </div>

            <a
              href={hrefWhatsApp(erpSecao.projetos.whatsappTexto)}
              target="_blank"
              rel="noreferrer noopener"
              className="text-marca hover:text-marca-hover flex min-h-11 shrink-0 items-center text-[14.5px] font-semibold transition-colors"
            >
              <span className="link-deslizante">{erpSecao.projetos.cta}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
