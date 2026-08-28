import { Card, Chip } from "@heroui/react";
import { Check } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { produtos } from "@/content/pt-BR/home";
import { contato } from "@/content/pt-BR/site";

/**
 * Produtos — os dois sistemas lado a lado. O contraste claro/escuro é o
 * argumento: o card claro é a linha consolidada (WhatsApp para apresentação),
 * o escuro é a nova geração, que se prova sozinha na demonstração aberta.
 */
export function ProdutosSection() {
  const hrefApresentacao = `${contato.whatsappHref}?text=${encodeURIComponent(
    produtos.erp.whatsappTexto,
  )}`;

  return (
    <section
      id="produtos"
      className="border-border bg-surface-secondary border-t py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            overline={produtos.overline}
            titulo={produtos.titulo}
            subtitulo={produtos.intro}
          />
        </Reveal>

        <div className="reveal-stagger mt-8 grid gap-6 lg:grid-cols-2">
          {/* Syntax ERP — card claro */}
          <Reveal className="h-full">
            <Card className="bg-surface border-border flex h-full flex-col gap-[18px] rounded-2xl border p-6 sm:p-9">
              <Card.Header className="gap-[18px]">
                <p className="text-marca font-mono text-[12.5px] font-semibold tracking-[0.1em] uppercase">
                  {produtos.erp.label}
                </p>

                <Card.Title className="text-foreground font-display text-[28px] leading-tight font-extrabold">
                  {produtos.erp.titulo}
                </Card.Title>

                <Card.Description className="text-foreground-base text-base leading-[1.65]">
                  {produtos.erp.descricao}
                </Card.Description>
              </Card.Header>

              <Card.Content>
                <ListaBullets
                  itens={produtos.erp.bullets}
                  corTexto="text-foreground"
                  corIcone="text-marca"
                />
              </Card.Content>

              <Card.Footer className="border-border mt-auto flex flex-col items-start gap-4 border-t pt-[18px] sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted text-sm">{produtos.erp.nota}</p>

                <div className="shrink-0">
                  <CtaLink href={hrefApresentacao} tamanho="md" externo>
                    {produtos.erp.cta}
                  </CtaLink>
                </div>
              </Card.Footer>
            </Card>
          </Reveal>

          {/* PDV Web — card escuro. `sobre-escuro` troca o anel de foco, que
              no azul institucional sumiria sobre #0f172a. */}
          <Reveal className="sobre-escuro h-full">
            <Card className="bg-escuro flex h-full flex-col gap-[18px] rounded-2xl p-6 sm:p-9">
              <Card.Header className="gap-[18px]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-azul-claro font-mono text-[12.5px] font-semibold tracking-[0.1em] uppercase">
                    {produtos.pdv.label}
                  </p>

                  <Chip
                    variant="tertiary"
                    className="bg-verde/12 border-verde/35 text-verde shrink-0 gap-[7px] rounded-full border px-3 py-1.5 text-[12.5px] font-bold"
                  >
                    <span
                      aria-hidden
                      className="bg-verde animate-pulso size-[7px] shrink-0 rounded-full"
                    />
                    <Chip.Label>{produtos.pdv.selo}</Chip.Label>
                  </Chip>
                </div>

                <Card.Title className="text-ondark font-display text-[28px] leading-tight font-extrabold">
                  {produtos.pdv.titulo}
                </Card.Title>

                <Card.Description className="text-ondark-muted text-base leading-[1.65]">
                  {produtos.pdv.descricao}
                </Card.Description>
              </Card.Header>

              <Card.Content>
                <ListaBullets
                  itens={produtos.pdv.bullets}
                  corTexto="text-ondark-soft"
                  corIcone="text-verde"
                />
              </Card.Content>

              <Card.Footer className="border-ondark-muted/20 mt-auto grid gap-3 border-t pt-[18px]">
                {/* Barra de navegador: enfeite que dá contexto ao domínio. As
                    bolinhas são decoração (span vazio, fora da árvore de
                    acessibilidade); o domínio continua legível para o leitor de
                    tela, porque é ele que diz onde a demonstração fica. */}
                <div className="bg-escuro-raised border-ondark-muted/25 flex items-center gap-2.5 rounded-[9px] border px-3.5 py-2.5">
                  <span className="bg-semaforo-vermelho size-[9px] shrink-0 rounded-full" />
                  <span className="bg-semaforo-ambar size-[9px] shrink-0 rounded-full" />
                  <span className="bg-verde size-[9px] shrink-0 rounded-full" />
                  <span className="text-ondark-soft ml-1.5 font-mono text-[13.5px]">
                    {produtos.pdv.dominio}
                  </span>
                </div>

                <CtaLink
                  href={produtos.pdv.href}
                  variante="vivo"
                  larguraTotal
                  externo
                >
                  {produtos.pdv.cta}
                </CtaLink>
              </Card.Footer>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface ListaBulletsProps {
  itens: readonly string[];
  corTexto: string;
  corIcone: string;
}

function ListaBullets({ itens, corTexto, corIcone }: ListaBulletsProps) {
  return (
    <ul className={`grid gap-2.5 text-[15.5px] ${corTexto}`}>
      {itens.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check
            aria-hidden
            strokeWidth={2.4}
            className={`mt-0.5 size-[18px] shrink-0 ${corIcone}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
