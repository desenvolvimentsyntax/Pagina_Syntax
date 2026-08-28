import { Reveal } from "@/components/ui/Reveal";
import { RotorSegmentos } from "@/components/ui/RotorSegmentos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Dobra 5 — o laço. Depois do "como começa", a pergunta "Qual o seu
 * segmento?" faz o visitante se procurar na lista que gira ao lado — e a
 * seção seguinte (Outras linhas) responde para quem não se achou.
 *
 * Substituiu a faixa do slogan na fatia 3.10: mesma banda escura de respiro
 * entre duas dobras claras, mas com função de identificação em vez de frase
 * passiva (o slogan virou assinatura do rodapé). Sem CTA de propósito — o
 * laço aqui é visual; a ação mora nas dobras vizinhas.
 *
 * O painel do rotor usa a tinta violeta do ERP: é a cor que fecha o degradê
 * das palavras, e ecoa o card do ERP logo abaixo.
 */
export function SegmentosSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { segmentosSecao } = conteudo.home;

  return (
    <section id="segmentos" className="sobre-escuro bg-escuro py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12">
        <Reveal>
          <SectionHeading
            tom="escuro"
            etapa="05"
            overline={segmentosSecao.overline}
            titulo={segmentosSecao.titulo}
            subtitulo={segmentosSecao.texto}
          />
        </Reveal>

        <Reveal efeito="lado-inverso">
          <div className="bg-produto-erp-tint rounded-2xl px-8 py-4 sm:px-12">
            <RotorSegmentos
              palavras={segmentosSecao.palavras}
              rotuloAria={segmentosSecao.listaAria}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
