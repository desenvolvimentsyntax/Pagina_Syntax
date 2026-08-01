import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageShell } from "@/components/layout/PageShell";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ContatoSection } from "@/components/sections/ContatoSection";
import { DiferenciaisSection } from "@/components/sections/DiferenciaisSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProdutosSection } from "@/components/sections/ProdutosSection";
import { ProjetosSection } from "@/components/sections/ProjetosSection";
import { QuemSomosSection } from "@/components/sections/QuemSomosSection";
import { SegmentosSection } from "@/components/sections/SegmentosSection";
import { SolucoesSection } from "@/components/sections/SolucoesSection";
import { TecnologiasSection } from "@/components/sections/TecnologiasSection";
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

  const title = "Syntax Sistemas — sistemas web e automação para empresas";
  const description =
    "Sistemas web, aplicativos e automação empresarial para varejo, distribuição, indústria e food service. Sorocaba-SP e Pedro Juan Caballero-PY.";

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

      <PageShell>
        <main>
          <HeroSection />
          <SegmentosSection />
          <QuemSomosSection />
          <SolucoesSection />
          <ProdutosSection />
          <TecnologiasSection />
          <DiferenciaisSection />
          <ProjetosSection />
          <ContatoSection />
        </main>
      </PageShell>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
