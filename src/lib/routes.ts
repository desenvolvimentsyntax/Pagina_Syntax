/**
 * Mapa de locales e slugs traduzidos (CLAUDE.md §18).
 *
 * O PADRÃO É O ESPANHOL. O produto que este site vende (PDV em guaranis,
 * integrado ao SIFEN) e todos os clientes do carrossel são do Paraguai, então
 * es-PY fica na raiz e pt-BR em /pt. Até a fatia 5 era o contrário — se
 * encontrar código ou doc dizendo que pt-BR é a raiz, está desatualizado.
 *
 * O segmento dinâmico do App Router é o locale; o proxy faz a ponte entre a
 * URL pública e o segmento interno.
 */

/* es-PY primeiro: a ordem desta lista é a ordem em que os locales aparecem no
   seletor de idioma do header. */
export const LOCALES = ["es-PY", "pt-BR"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_PADRAO: Locale = "es-PY";

/** Prefixo público de cada locale. es-PY é a raiz, sem prefixo. */
export const PREFIXO_LOCALE: Record<Locale, string> = {
  "es-PY": "",
  "pt-BR": "/pt",
};

/** `lang` do <html> e `openGraph.locale` (§8). */
export const HTML_LANG: Record<Locale, string> = {
  "es-PY": "es-PY",
  "pt-BR": "pt-BR",
};

export const OG_LOCALE: Record<Locale, string> = {
  "es-PY": "es_PY",
  "pt-BR": "pt_BR",
};

/**
 * Locales revisados por humano e liberados para publicação (§18).
 *
 * Os dois estão liberados desde a fatia 5: o Roger assumiu a revisão do
 * espanhol em 28/08/2026. O gate continua existindo para um locale futuro —
 * mas cuidado: hoje ele NÃO pode excluir o LOCALE_PADRAO, porque a página
 * gateada responde 404 e o padrão é a raiz do site.
 */
export const LOCALES_PUBLICADOS: readonly Locale[] = ["es-PY", "pt-BR"];

export function localePublicado(locale: string): locale is Locale {
  return (LOCALES_PUBLICADOS as readonly string[]).includes(locale);
}

export function ehLocale(valor: string): valor is Locale {
  return (LOCALES as readonly string[]).includes(valor);
}

/**
 * Slugs por locale. Chave = identificador estável da rota.
 * URL traduzida ranqueia; URL em português com conteúdo em espanhol, não.
 */
export const SLUGS = {
  home: { "pt-BR": "", "es-PY": "" },
  planos: { "pt-BR": "planos", "es-PY": "planes" },
  solucoes: { "pt-BR": "solucoes", "es-PY": "soluciones" },
  restaurantes: {
    "pt-BR": "solucoes/sistema-restaurantes",
    "es-PY": "soluciones/sistema-restaurantes",
  },
  administrativo: {
    "pt-BR": "solucoes/sistema-administrativo",
    "es-PY": "soluciones/sistema-administrativo",
  },
  sobMedida: {
    "pt-BR": "solucoes/desenvolvimento-sob-medida",
    "es-PY": "soluciones/desarrollo-a-medida",
  },
  landingPages: {
    "pt-BR": "solucoes/landing-pages",
    "es-PY": "soluciones/landing-pages",
  },
  sobre: { "pt-BR": "sobre", "es-PY": "nosotros" },
  contato: { "pt-BR": "contato", "es-PY": "contacto" },
} as const satisfies Record<string, Record<Locale, string>>;

export type ChaveRota = keyof typeof SLUGS;

/**
 * Pasta real de cada rota no App Router.
 *
 * O slug é traduzido por idioma (§18) mas a PASTA é uma só: existe
 * `app/[locale]/planos`, e é para lá que tanto `/planes` quanto `/pt/planos`
 * precisam apontar. Sem este mapa o visitante espanhol pede `/planes`, o proxy
 * reescreve para `/es-PY/planes` e o Next devolve 404 — a pasta chama outra
 * coisa.
 *
 * Rota nova entra aqui E em SLUGS: o `satisfies` faz faltar uma quebrar o build.
 */
export const PASTA = {
  home: "",
  planos: "planos",
  solucoes: "solucoes",
  restaurantes: "solucoes/sistema-restaurantes",
  administrativo: "solucoes/sistema-administrativo",
  sobMedida: "solucoes/desenvolvimento-sob-medida",
  landingPages: "solucoes/landing-pages",
  sobre: "sobre",
  contato: "contato",
} as const satisfies Record<ChaveRota, string>;

/**
 * Traduz o caminho público (já sem o prefixo de idioma) para a pasta interna.
 *
 * Devolve `null` quando o caminho não é rota NESTE idioma — e é aí que mora a
 * sutileza: `/planos` é rota válida em português e lixo em espanhol. Se o
 * desconhecido seguisse como veio, `/planos` cairia por acidente na pasta
 * homônima e o site serviria a home espanhola em duas URLs (`/planes` e
 * `/planos`), que o Google lê como conteúdo duplicado. Quem recebe `null`
 * manda para o 404.
 */
export function pastaDoCaminho(caminho: string, locale: Locale): string | null {
  const limpo = caminho.replace(/^\/+|\/+$/g, "");

  for (const chave of Object.keys(SLUGS) as ChaveRota[]) {
    if (SLUGS[chave][locale] === limpo) return PASTA[chave];
  }

  return null;
}

/**
 * Domínio único do site (fatia 5). Alimenta canonical, hreflang, sitemap,
 * JSON-LD e o metadataBase do layout — trocar aqui muda tudo junto.
 *
 * COM `www`: é o host canônico configurado na Vercel — o apex responde 308
 * para o www. Sem o `www` aqui, todo canonical e hreflang apontaria para uma
 * URL que redireciona, e o Google descarta canonical que não é o destino
 * final.
 *
 * ⚠️ o syntaxsistemas.com.br, que este site substitui, precisa de 301 rota a
 * rota para cá. Sem isso o SEO acumulado desde 2006 se perde. É configuração
 * de DNS/hospedagem, fora deste repositório.
 */
export const SITE_URL = "https://www.syntaxsistemas.com.py";

/** URL absoluta e canônica de uma rota num locale. */
export function urlDe(chave: ChaveRota, locale: Locale): string {
  const slug = SLUGS[chave][locale];
  // PREFIXO_LOCALE já vem com "/" inicial; remover aqui evita "//es" na URL.
  const prefixo = PREFIXO_LOCALE[locale].replace(/^\//, "");
  const caminho = [prefixo, slug].filter(Boolean).join("/");
  return caminho ? `${SITE_URL}/${caminho}` : SITE_URL;
}

/**
 * Caminho relativo da mesma rota — é o que vai no href de link interno.
 * `urlDe` devolve absoluta (canonical, hreflang, JSON-LD); usar a absoluta
 * em href de navegação força reload de página inteira e perde o roteamento
 * do Next.
 */
export function caminhoDe(chave: ChaveRota, locale: Locale): string {
  const slug = SLUGS[chave][locale];
  const caminho = [PREFIXO_LOCALE[locale], slug].filter(Boolean).join("/");
  return caminho ? (caminho.startsWith("/") ? caminho : `/${caminho}`) : "/";
}

/**
 * `alternates.languages` do §18 — hreflang recíproco.
 * Sem reciprocidade o Google ignora as duas versões.
 *
 * Só entram locales publicados: hreflang apontando para rota que responde 404
 * (o gate do §18) é pior que não ter hreflang. Quando es-PY for liberado em
 * LOCALES_PUBLICADOS, a alternativa volta a ser emitida automaticamente.
 */
export function alternatesDe(chave: ChaveRota, locale: Locale = LOCALE_PADRAO) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES_PUBLICADOS) {
    languages[locale] = urlDe(chave, locale);
  }
  languages["x-default"] = urlDe(chave, LOCALE_PADRAO);

  return {
    /* O canonical é o do PRÓPRIO idioma da página: a versão /pt não pode
       apontar para a espanhola como canônica, senão o Google descarta a
       portuguesa e as duas somem do índice em português. */
    canonical: urlDe(chave, locale),
    languages,
  };
}
