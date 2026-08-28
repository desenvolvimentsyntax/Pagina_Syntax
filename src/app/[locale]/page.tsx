import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Cabecalho } from "@/components/layout/Cabecalho";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ComoFuncionaSection } from "@/components/sections/ComoFuncionaSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { ComparacaoSection } from "@/components/sections/ComparacaoSection";
import { ContatoSection } from "@/components/sections/ContatoSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { DuvidasSection } from "@/components/sections/DuvidasSection";
import { ErpSection } from "@/components/sections/ErpSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SegmentosSection } from "@/components/sections/SegmentosSection";
import { SobreSection } from "@/components/sections/SobreSection";
import { Ripple } from "@/components/ui/Ripple";
import { VoltarAoTopo } from "@/components/ui/VoltarAoTopo";
import { conteudoDe } from "@/content";
import { schemaFaq } from "@/lib/schema";
import {
  OG_LOCALE,
  alternatesDe,
  ehLocale,
  localePublicado,
  LOCALE_PADRAO,
} from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const atual = ehLocale(locale) ? locale : LOCALE_PADRAO;

  const { title, description } = conteudoDe(atual).home.meta;
  const alternates = alternatesDe("home", atual);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: "website",
      locale: OG_LOCALE[atual],
      url: alternates.canonical,
      siteName: "Syntax Sistemas",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // §18: idioma sem revisão humana não é publicado — 404 até liberar.
  if (!localePublicado(locale)) notFound();

  const { ui } = conteudoDe(locale).ui;

  return (
    <>
      <Cabecalho locale={locale} rota="home" />

      {/*
        A ordem é o funil, não o gosto: preço na primeira dobra, prova logo em
        seguida, e cada seção depois responde à objeção que sobra daquele
        ponto. Cada uma pinta o próprio fundo (radial / #f4f6fa / branco /
        #0f172a), então o <main> não tem wrapper.

        01 hero .......... produto e preço, acima da dobra
        02 comparação .... "qual dos três é o meu?"
        03 demonstração .. "isso existe mesmo?"
        04 como funciona . "dá trabalho começar?"
        05 segmentos ..... o laço "esse sou eu" (respiro escuro)
        06 ERP ........... o carro-chefe, para quem não é loja de balcão
        07 cases ......... a prova do ERP: quem já opera com ele
        08 sobre ......... "posso confiar nessa empresa?"
        09 dúvidas ....... as objeções que travam a assinatura
        10 contato ....... captação
      */}
      <main>
        <HeroSection locale={locale} />
        <ComparacaoSection locale={locale} />
        <DemoSection locale={locale} />
        <ComoFuncionaSection locale={locale} />
        <SegmentosSection locale={locale} />
        <ErpSection locale={locale} />
        <CasesSection locale={locale} />
        <SobreSection locale={locale} />
        <DuvidasSection locale={locale} />
        <ContatoSection locale={locale} />
      </main>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
      <VoltarAoTopo rotulo={ui.voltarAoTopo.aria} />

      {/* Um único listener de pointerdown para todos os [data-ripple] da página. */}
      <Ripple />

      {/* FAQPage do §8: as mesmas seis objeções da dobra 08, para o Google
          poder mostrar a resposta direto no resultado de busca. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq(locale)) }}
      />
    </>
  );
}
