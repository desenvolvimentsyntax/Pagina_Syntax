import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import {
  HTML_LANG,
  LOCALE_PADRAO,
  LOCALES,
  ehLocale,
  type Locale,
} from "@/lib/routes";
import { schemaLocalBusiness, schemaOrganization } from "@/lib/schema";

/* Tipografia do §4: Inter. §11: display swap + subset latin. */
const inter = Inter({
  variable: "--font-inter",
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
    <html lang={HTML_LANG[atual]} data-theme="light" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-background font-sans text-foreground antialiased`}
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
