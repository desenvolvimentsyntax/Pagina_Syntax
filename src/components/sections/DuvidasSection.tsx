import { Accordion } from "@heroui/react";
import { ChevronDown } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Dobra 8 — a última porta antes do formulário.
 *
 * As seis perguntas não são FAQ de suporte: são as objeções que travam a
 * assinatura, na ordem em que aparecem numa conversa de venda (instalação,
 * internet, custo por caixa, qual plano, moeda, provar antes). Trocar uma
 * pergunta por dúvida operacional ("como emito segunda via?") esvazia a dobra.
 *
 * O mesmo conteúdo alimenta o JSON-LD de FAQPage em `lib/schema.ts` — se uma
 * resposta mudar aqui, muda lá junto, porque a fonte é a mesma.
 */
export function DuvidasSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { duvidas } = conteudo.home;
  const { contato } = conteudo.site;

  const hrefWhatsApp = `${contato.whatsappHref}?text=${encodeURIComponent(
    contato.whatsappTexto,
  )}`;

  return (
    <section
      id="duvidas"
      className="border-border bg-surface-secondary border-t py-14 md:py-16"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-12">
        <Reveal>
          {/* Sticky só em lg: a coluna de perguntas é alta e, sem isso, o CTA
              sai da tela justamente enquanto a pessoa lê a objeção dela. */}
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              etapa="09"
              overline={duvidas.overline}
              titulo={duvidas.titulo}
              subtitulo={duvidas.intro}
            />

            <div className="mt-7">
              <CtaLink href={hrefWhatsApp} tamanho="md" larguraTotal externo>
                {duvidas.cta}
              </CtaLink>
            </div>
          </div>
        </Reveal>

        <Reveal efeito="lado-inverso">
          {/* A primeira já entra aberta: uma pilha de seis títulos fechados
              lê como bloco vazio e ninguém clica. Com uma resposta à mostra o
              visitante entende que ali tem conteúdo. */}
          <Accordion
            variant="surface"
            className="w-full"
            defaultExpandedKeys={[duvidas.itens[0].pergunta]}
          >
            {duvidas.itens.map((item) => (
              <Accordion.Item key={item.pergunta} id={item.pergunta}>
                <Accordion.Heading>
                  <Accordion.Trigger className="font-display text-foreground text-left text-[16px] font-bold">
                    {item.pergunta}
                    <Accordion.Indicator>
                      <ChevronDown aria-hidden className="size-4" />
                    </Accordion.Indicator>
                  </Accordion.Trigger>
                </Accordion.Heading>

                <Accordion.Panel>
                  <Accordion.Body className="text-foreground-base text-[15px] leading-[1.7]">
                    {item.resposta}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
