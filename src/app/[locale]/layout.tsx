import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";

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
 * As três são fontes variáveis no Google Fonts — passar `weight` aqui as
 * congelaria num peso só e mataria os 700/800 dos títulos e os 500/600 das
 * labels técnicas.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://syntaxsistemas.com.br"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
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
    <html lang={HTML_LANG[atual]} data-theme="light" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground-base min-h-screen font-sans antialiased`}
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
