import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";

import "@/app/globals.css";
import {
  HTML_LANG,
  LOCALE_PADRAO,
  LOCALES,
  SITE_URL,
  ehLocale,
  type Locale,
} from "@/lib/routes";
import { schemaLocalBusiness, schemaOrganization } from "@/lib/schema";

/*
 * Tipografia do §4 (§11: display swap + subset latin).
 * As três são fontes variáveis no Google Fonts — passar `weight` aqui as
 * congelaria num peso só e mataria os 700/800 dos títulos e os 500/600 das
 * labels técnicas. (A Tenor Sans, que foi o H1 do hero até a fatia 3.9, saiu:
 * só existia em 400 e o título de um funil precisa de peso.)
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

/*
 * `metadataBase` resolve as URLs relativas que o Next gera sozinho — hoje o
 * og:image e o twitter:image das rotas de imagem em [locale]. Ele PRECISA ser
 * o SITE_URL: ficou apontando para o syntaxsistemas.com.br depois da fatia 5,
 * e o domínio antigo devolve 403 com certificado revogado, então todo link
 * compartilhado do site saía sem imagem de preview. Canonical e hreflang não
 * passam por aqui (vêm absolutos de `urlDe`), o que fez o bug sobreviver:
 * o head parecia certo e só as imagens apontavam para o domínio morto.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /*
   * Verificação do Search Console pela tag HTML — o caminho que NÃO depende
   * de DNS. O método por TXT cria propriedade de DOMÍNIO (cobre apex, www e
   * os dois protocolos de uma vez) e é o preferido; este aqui cria só a
   * propriedade de prefixo `https://www.syntaxsistemas.com.py/`, que já basta
   * para submeter o sitemap e pedir indexação.
   *
   * ⚠️ o Google emite um token DIFERENTE por método. O valor abaixo é o que
   * veio do método "Provedor do nome de domínio". Se a verificação por tag
   * falhar, copie o token da aba "Tag HTML" do Search Console e troque aqui —
   * é esta linha e mais nada.
   */
  verification: {
    google: "lI1DXjqwvVDkKVElXtt-HTJbHGv2ZluXtcxFLoOFKhc",
  },
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

  const jsonLd = [schemaOrganization(atual), schemaLocalBusiness(atual)];

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
