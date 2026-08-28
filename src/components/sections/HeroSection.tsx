import { Check } from "lucide-react";

import { CartaoPlano } from "@/components/ui/CartaoPlano";
import { CtaLink } from "@/components/ui/CtaLink";
import { conteudoDe } from "@/content";
import { caminhoDe, type Locale } from "@/lib/routes";

/**
 * Primeira dobra — é a página inteira em miniatura: promessa, preço e caminho.
 *
 * O painel ilustrativo que ficava aqui saiu. Quem chega precisa ver O QUE se
 * vende e QUANTO custa antes de rolar: num 1440×900 a headline ocupa ~190px e
 * os três cards de plano começam por volta de 430px, então o CTA de cada plano
 * ainda cabe na tela. Em telas menores eles empilham logo abaixo da promessa.
 *
 * Nada aqui usa `Reveal`: acima da dobra, começar em opacidade zero atrasa o
 * LCP e faz a página piscar. O scroll reveal vale das próximas seções em
 * diante (§10).
 *
 * Hierarquia: `h1` da promessa, `h2` da faixa de planos, `h3` de cada card
 * (vem do `Card.Title`) — sem pular nível (§8).
 */
export function HeroSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { demo, hero } = conteudo.home;
  const { MOEDA, condicoes, planoDeEntrada, planos } = conteudo.planos;

  return (
    <section id="topo" className="fundo-hero pt-10 pb-14 md:pt-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        {/* Promessa e ação lado a lado a partir de lg: empilhados, os CTAs
            empurrariam os cards de plano para fora da primeira tela. */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-end lg:gap-12">
          <div>
            <p className="text-marca font-mono text-[13px] font-semibold tracking-[0.1em] uppercase">
              {hero.eyebrow}
            </p>

            {/* Montserrat 800, a mesma família dos títulos de card e selos:
                num funil o H1 precisa gritar, e a Tenor Sans (400 apenas) não
                tinha peso para isso — saiu na fatia 3.9, junto com a quarta
                requisição de fonte. */}
            <h1 className="font-display text-foreground mt-3.5 text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.1] font-extrabold tracking-tight text-pretty">
              {hero.titulo}
            </h1>

            {/* --foreground-base, não --muted: no miolo claro do radial do hero
                o muted cai para 4,34:1, abaixo do AA (§9). */}
            <p className="text-foreground-base mt-4 max-w-2xl text-[18px] leading-[1.55] text-pretty">
              {hero.subtitulo}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-foreground-base text-[15px]">
                {hero.ancora.prefixo}
              </span>
              <span className="font-display text-marca text-[26px] leading-none font-extrabold tracking-tight">
                {`${MOEDA} ${planoDeEntrada.mensal}`}
              </span>
              <span className="text-foreground-base text-[15px]">
                {hero.ancora.sufixo}
              </span>
            </p>

            <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <CtaLink href={caminhoDe("planos", locale)} larguraTotal>
                {hero.ctaPrimario}
              </CtaLink>
              <CtaLink href={demo.href} variante="secundario" larguraTotal externo>
                {hero.ctaSecundario}
              </CtaLink>
            </div>

            <ul className="text-foreground-base flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
              {hero.provas.map((prova) => (
                <li key={prova} className="flex items-center gap-1.5">
                  <Check
                    aria-hidden
                    strokeWidth={2.6}
                    className="text-marca size-4 shrink-0"
                  />
                  {prova}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            {/* "01" abre o tour numerado das seções (§7) — o mesmo desenho do
                `etapa` do SectionHeading, que o hero não usa. */}
            <h2 className="text-marca font-mono text-[13px] font-semibold tracking-[0.1em] uppercase">
              <span className="text-foreground-base">01</span>
              <span aria-hidden className="mx-2">
                ·
              </span>
              {hero.planosTitulo}
            </h2>
            {/* --foreground-base e não --muted: sobre o miolo #dbeafe do
                radial o muted cai para 4,34:1, abaixo do AA (§9). */}
            <p className="text-foreground-base font-mono text-[12.5px] tracking-[0.06em] uppercase">
              {hero.planosNota}
            </p>
          </div>

          {/* mt-7 e não mt-5: a pílula "Mais escolhido" do card destacado sai
              12px acima da borda e precisa do espaço para não encostar no h2. */}
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {planos.map((plano) => (
              <CartaoPlano key={plano.chave} plano={plano} locale={locale} />
            ))}
          </div>

          <p className="text-foreground-base mt-5 max-w-3xl text-[13.5px] leading-relaxed">
            {condicoes.nota}
          </p>
        </div>
      </div>
    </section>
  );
}
