import { Chip } from "@heroui/react";
import { ExternalLink } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Dobra 3 — a prova. O fundo escuro fica de propósito: entre duas dobras
 * claras e densas, esta é a banda de descanso visual da página — por isso a
 * composição é centrada, baixa e sem enfeite (a barra de navegador falsa que
 * ficava aqui saiu na fatia 3.9).
 *
 * A faixa de acesso é uma só: domínio real como link, selo pulsando e o CTA
 * azul vivo. Os chips mono dizem o que dá para fazer lá dentro — texto, não
 * telinha inventada (§11).
 *
 * `sobre-escuro` troca o anel de foco: o `--focus` institucional some sobre
 * #0f172a (§4/§9).
 */
export function DemoSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { demo } = conteudo.home;

  return (
    <section id="demonstracao" className="sobre-escuro bg-escuro py-14 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center md:px-8">
        <Reveal className="flex flex-col items-center">
          {/* O SectionHeading alinha à esquerda; aqui a banda é centrada, então
              o cabeçalho entra num wrapper que centraliza os blocos filhos. */}
          <div className="[&_h2]:text-balance flex flex-col items-center text-center [&>div]:flex [&>div]:flex-col [&>div]:items-center">
            <SectionHeading
              tom="escuro"
              etapa="03"
              overline={demo.overline}
              titulo={demo.titulo}
              subtitulo={demo.texto}
            />
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {demo.acoes.map((acao) => (
              <li key={acao}>
                <span className="border-ondark-muted/30 text-ondark-soft rounded-full border px-3.5 py-1.5 font-mono text-[12.5px] tracking-[0.04em]">
                  {acao}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal efeito="escala" className="mt-8 w-full">
          <div className="bg-escuro-raised border-ondark-muted/20 flex flex-col items-stretch gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div className="flex min-w-0 items-center justify-center gap-3 sm:justify-start">
              <a
                href={demo.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-azul-claro hover:text-ondark flex min-h-11 items-center gap-2 font-mono text-[13.5px] font-semibold tracking-[0.04em] transition-colors"
              >
                <ExternalLink aria-hidden className="size-4 shrink-0" />
                {demo.dominio}
              </a>

              <Chip
                variant="tertiary"
                className="bg-verde/12 border-verde/35 text-verde shrink-0 gap-[7px] rounded-full border px-3 py-1.5 text-[12px] font-bold"
              >
                <span
                  aria-hidden
                  className="bg-verde animate-pulso size-[7px] shrink-0 rounded-full"
                />
                <Chip.Label>{demo.selo}</Chip.Label>
              </Chip>
            </div>

            <div className="shrink-0">
              <CtaLink href={demo.href} variante="vivo" tamanho="md" larguraTotal externo>
                {demo.cta}
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
