import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ContatoSection } from "@/components/sections/ContatoSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProdutosSection } from "@/components/sections/ProdutosSection";
import { SloganSection } from "@/components/sections/SloganSection";
import { SobreSection } from "@/components/sections/SobreSection";
import { SolucoesSection } from "@/components/sections/SolucoesSection";
import { Ripple } from "@/components/ui/Ripple";
import { meta } from "@/content/pt-BR/home";
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

  const { title, description } = meta;

  return {
    title,
    description,
    alternates: alternatesDe("home"),
    openGraph: {
      title,
      description,
      type: "website",
      locale: OG_LOCALE[atual],
      url: alternatesDe("home").canonical,
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

  return (
    <>
      <Header />

      {/* Ordem = as seis dobras do handoff de design: hero, faixa do slogan,
          soluções, produtos, sobre e captação. Cada seção pinta o próprio
          fundo (branco / #f4f6fa / #0f172a), então o <main> não tem wrapper. */}
      <main>
        <HeroSection />
        <SloganSection />
        <SolucoesSection />
        <ProdutosSection />
        <SobreSection />
        <ContatoSection />
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Um único listener de pointerdown para todos os [data-ripple] da página. */}
      <Ripple />
    </>
  );
}
