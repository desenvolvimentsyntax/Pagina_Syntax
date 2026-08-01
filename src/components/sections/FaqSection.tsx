import { Accordion } from "@heroui/react";
import { ChevronDown } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/pt-BR/home";
import { schemaFAQPage } from "@/lib/schema";

/**
 * Ato 07 — Perguntas frequentes (peso 2): absorve as objeções na porta do
 * formulário — preço, migração, fiscal, suporte.
 *
 * Acordeão também existe no ato 02 (variante mobile de Segmentos) — não são
 * vizinhos (§7), e o desenho aqui é outro de propósito: sem ícones, nada
 * expandido por padrão, hairlines simples. Heading em coluna à esquerda
 * (precedente: Quem somos), acordeão à direita.
 */
export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              indice="07"
              overline={faq.overline}
              titulo={faq.titulo}
              subtitulo={faq.subtitulo}
            />

            <div className="mt-8 hidden lg:block">
              <CtaLink href={faq.cta.href} variante="secundario" comSeta>
                {faq.cta.rotulo}
              </CtaLink>
            </div>
          </Reveal>

          <Reveal atraso={80}>
            <Accordion className="w-full">
              {faq.itens.map((item) => (
                <Accordion.Item key={item.id} id={item.id}>
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      {item.pergunta}
                      <Accordion.Indicator>
                        <ChevronDown />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>
                      <p className="text-foreground-base/70 leading-relaxed text-pretty">
                        {item.resposta}
                      </p>
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>

            <div className="mt-8 lg:hidden">
              <CtaLink href={faq.cta.href} variante="secundario" larguraTotal>
                {faq.cta.rotulo}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQPage()) }}
      />
    </section>
  );
}
