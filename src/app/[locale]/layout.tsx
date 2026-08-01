import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Sora } from "next/font/google";

import "@/app/globals.css";
import {
  HTML_LANG,
  LOCALE_PADRAO,
  LOCALES,
  ehLocale,
  type Locale,
} from "@/lib/routes";
import { schemaLocalBusiness, schemaOrganization } from "@/lib/schema";

/*
 * Tipografia do §4 (§11: display swap + subset latin).
 * Sora e Instrument Sans são fontes variáveis — passar `weight` aqui as
 * congelaria num peso só e mataria os 600/800 usados nos títulos.
 * IBM Plex Mono não é variável no Google Fonts: `weight` é obrigatório.
 */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://syntaxsistemas.com.br"),
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  /*
   * O gate de publicação (§18) fica na page, não aqui: este é o layout raiz —
   * é ele que emite <html>/<body>. Chamar notFound() daqui deixaria a página
   * de 404 sem layout onde renderizar, e o resultado é 500 em vez de 404.
   */
  const atual: Locale = ehLocale(locale) ? locale : LOCALE_PADRAO;

  const jsonLd = [schemaOrganization(), schemaLocalBusiness()];

  return (
    <html lang={HTML_LANG[atual]} data-theme="dark" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} fundo-pagina text-foreground-base min-h-screen font-sans antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
