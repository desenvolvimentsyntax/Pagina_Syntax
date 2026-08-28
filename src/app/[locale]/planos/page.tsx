import { Breadcrumbs } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Cabecalho } from "@/components/layout/Cabecalho";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ContatoSection } from "@/components/sections/ContatoSection";
import { CartaoPlano } from "@/components/ui/CartaoPlano";
import { IDENTIDADE } from "@/components/ui/MarcaProduto";
import { Reveal } from "@/components/ui/Reveal";
import { Ripple } from "@/components/ui/Ripple";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TabelaPlanos } from "@/components/ui/TabelaPlanos";
import { VoltarAoTopo } from "@/components/ui/VoltarAoTopo";
import { conteudoDe } from "@/content";
import {
  OG_LOCALE,
  alternatesDe,
  caminhoDe,
  ehLocale,
  localePublicado,
  LOCALE_PADRAO,
  urlDe,
} from "@/lib/routes";
import { schemaBreadcrumb, schemaPlanos } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const atual = ehLocale(locale) ? locale : LOCALE_PADRAO;

  const { meta } = conteudoDe(atual).planos.paginaPlanos;
  const alternates = alternatesDe("planos", atual);

  return {
    title: meta.title,
    description: meta.description,
    alternates,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[atual],
      url: alternates.canonical,
      siteName: "Syntax Sistemas",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

/**
 * /planos — a página de DECISÃO, não uma segunda home.
 *
 * O que ela tem que a home não tem: o guia "qual plano é o meu?" (situação →
 * plano), os cards com a lista COMPLETA de recursos, a tabela recurso por
 * recurso e as condições de cobrança explicadas. A home ficou com o pitch e o
 * seletor enxuto; a Dúvidas duplicada saiu daqui na fatia 3.9. O formulário
 * de contato fica — quem chegou até aqui não pode precisar de mais um clique
 * para conversar.
 *
 * A hierarquia é h1 da página → h2 de cada seção → h3 dos cards, sem pular
 * nível (§8).
 */
export default async function PlanosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // §18: idioma sem revisão humana não é publicado — 404 até liberar.
  if (!localePublicado(locale)) notFound();

  const conteudo = conteudoDe(locale);
  const { condicoesPagina, guiaDecisao, listaPlanos, paginaPlanos, planos } =
    conteudo.planos;
  const { ui } = conteudo.ui;

  const jsonLd = [
    schemaPlanos(locale),
    schemaBreadcrumb([
      { nome: paginaPlanos.trilha.home, url: urlDe("home", locale) },
      { nome: paginaPlanos.trilha.atual, url: urlDe("planos", locale) },
    ]),
  ];

  return (
    <>
      <Cabecalho locale={locale} rota="planos" />

      <main>
        {/* A trilha fica numa faixa branca, fora do radial: o Breadcrumbs do
            HeroUI pinta o item inativo com --muted, que sobre o miolo #dbeafe
            do gradiente dá 4,34:1 e reprova o AA (§9). Sobre branco ele passa
            e o componente segue intocado. */}
        <div className="bg-background border-border border-b">
          <div className="mx-auto max-w-7xl px-5 py-3 md:px-8 lg:px-12">
            <Breadcrumbs>
              <Breadcrumbs.Item href={caminhoDe("home", locale)}>
                {paginaPlanos.trilha.home}
              </Breadcrumbs.Item>
              <Breadcrumbs.Item>{paginaPlanos.trilha.atual}</Breadcrumbs.Item>
            </Breadcrumbs>
          </div>
        </div>

        <section id="topo" className="fundo-hero pt-10 pb-14 md:pt-12 md:pb-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <p className="text-marca font-mono text-[13px] font-semibold tracking-[0.1em] uppercase">
              {paginaPlanos.eyebrow}
            </p>

            {/* Montserrat 800 — o mesmo H1 do hero da home desde a fatia 3.9. */}
            <h1 className="font-display text-foreground mt-3.5 max-w-3xl text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.1] font-extrabold tracking-tight text-pretty">
              {paginaPlanos.titulo}
            </h1>

            <p className="text-foreground-base mt-4 max-w-2xl text-[18px] leading-[1.55] text-pretty">
              {paginaPlanos.intro}
            </p>

            {/* Guia de decisão — a razão de esta página existir além da home:
                a pessoa se reconhece numa situação e pula direto pro card. */}
            <div className="mt-9">
              <h2 className="text-marca font-mono text-[13px] font-semibold tracking-[0.1em] uppercase">
                {guiaDecisao.overline}
              </h2>
              <p className="font-display text-foreground mt-2 text-[19px] font-bold">
                {guiaDecisao.titulo}
              </p>

              {/* Sem lockup de propósito: os cards logo abaixo já carregam a
                  marca completa de cada produto, e repetir os seis carimbos na
                  mesma dobra era redundância. Aqui a identidade é só o ponto
                  na cor do produto + o nome comercial do plano. */}
              <ul className="mt-4 grid gap-3 lg:grid-cols-3">
                {guiaDecisao.itens.map((item) => {
                  const plano = listaPlanos.find((p) => p.chave === item.chave);
                  if (!plano) return null;

                  return (
                    <li key={item.chave}>
                      <a
                        href={`#${item.chave}`}
                        className="group border-border bg-surface hover:border-marca hover:shadow-cartao flex h-full min-h-11 flex-col gap-3 rounded-[14px] border p-4 transition-[border-color,box-shadow] duration-200"
                      >
                        <span className="text-foreground-base text-[14.5px] leading-snug">
                          {item.situacao}
                        </span>
                        <span className="mt-auto flex items-center gap-2.5">
                          {/* bg-current herda a cor de catálogo via a classe de
                              texto da identidade — preenchimento, nunca texto (§4). */}
                          <span
                            aria-hidden
                            className={`size-2.5 shrink-0 rounded-full bg-current ${IDENTIDADE[item.chave].pontos}`}
                          />
                          <span className="text-marca group-hover:text-marca-hover text-[14px] font-semibold transition-colors">
                            {`${guiaDecisao.cta} ${plano.plano}`}
                          </span>
                          <ArrowRight
                            aria-hidden
                            className="text-marca ml-auto size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* mt-9: a pílula do realce sai 12px acima da borda do card. */}
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {planos.map((plano) => (
                <CartaoPlano
                  key={plano.chave}
                  plano={plano}
                  locale={locale}
                  variante="completo"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="comparacao"
          className="border-border bg-surface-secondary border-t py-14 md:py-16"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <Reveal>
              <SectionHeading
                overline={paginaPlanos.comparacao.overline}
                titulo={paginaPlanos.comparacao.titulo}
                subtitulo={paginaPlanos.comparacao.intro}
              />
            </Reveal>

            <Reveal className="mt-8 md:mt-10">
              <TabelaPlanos locale={locale} />
            </Reveal>
          </div>
        </section>

        {/* Condições de cobrança explicadas — o que a home resume numa linha,
            aqui vira dl: é a última objeção prática antes do formulário. */}
        <section
          id="condicoes"
          className="bg-background border-border border-t py-14 md:py-16"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <Reveal>
              <SectionHeading
                overline={condicoesPagina.overline}
                titulo={condicoesPagina.titulo}
              />
            </Reveal>

            <Reveal className="mt-8">
              <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {condicoesPagina.itens.map((item) => (
                  <div
                    key={item.termo}
                    className="border-border bg-surface-secondary rounded-[14px] border p-5"
                  >
                    <dt className="font-display text-foreground text-[15.5px] font-bold">
                      {item.termo}
                    </dt>
                    <dd className="text-foreground-base mt-2 text-[14.5px] leading-[1.6]">
                      {item.texto}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6">
                <a
                  href={condicoesPagina.ponteErp.href}
                  className="text-marca hover:text-marca-hover inline-flex min-h-11 items-center text-[15px] font-semibold transition-colors"
                >
                  <span className="link-deslizante">
                    {condicoesPagina.ponteErp.rotulo}
                  </span>
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        <ContatoSection locale={locale} />
      </main>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
      <VoltarAoTopo rotulo={ui.voltarAoTopo.aria} />
      <Ripple />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
