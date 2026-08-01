/**
 * Mapa de locales e slugs traduzidos (CLAUDE.md §18).
 *
 * pt-BR não tem prefixo na URL (preserva o SEO do domínio); es-PY usa /es.
 * O segmento dinâmico do App Router é o locale; o middleware faz a ponte
 * entre a URL pública e o segmento interno.
 */

export const LOCALES = ["pt-BR", "es-PY"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_PADRAO: Locale = "pt-BR";

/** Prefixo público de cada locale. pt-BR é a raiz, sem prefixo. */
export const PREFIXO_LOCALE: Record<Locale, string> = {
  "pt-BR": "",
  "es-PY": "/es",
};

/** `lang` do <html> e `openGraph.locale` (§8). */
export const HTML_LANG: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  "es-PY": "es-PY",
};

export const OG_LOCALE: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  "es-PY": "es_PY",
};

/**
 * Locales já revisados por humano e liberados para publicação.
 * §18: tradução automática não revisada não vai ao ar. Enquanto o conteúdo
 * es-PY não passar por revisão, a rota responde 404 em vez de publicar
 * conteúdo ruim e queimar credibilidade comercial.
 */
export const LOCALES_PUBLICADOS: readonly Locale[] = ["pt-BR"];

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

export const SITE_URL = "https://syntaxsistemas.com.br";

/** URL absoluta e canônica de uma rota num locale. */
export function urlDe(chave: ChaveRota, locale: Locale): string {
  const slug = SLUGS[chave][locale];
  // PREFIXO_LOCALE já vem com "/" inicial; remover aqui evita "//es" na URL.
  const prefixo = PREFIXO_LOCALE[locale].replace(/^\//, "");
  const caminho = [prefixo, slug].filter(Boolean).join("/");
  return caminho ? `${SITE_URL}/${caminho}` : SITE_URL;
}

/**
 * `alternates.languages` do §18 — hreflang recíproco.
 * Sem reciprocidade o Google ignora as duas versões.
 *
 * Só entram locales publicados: hreflang apontando para rota que responde 404
 * (o gate do §18) é pior que não ter hreflang. Quando es-PY for liberado em
 * LOCALES_PUBLICADOS, a alternativa volta a ser emitida automaticamente.
 */
export function alternatesDe(chave: ChaveRota) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES_PUBLICADOS) {
    languages[locale] = urlDe(chave, locale);
  }
  languages["x-default"] = urlDe(chave, LOCALE_PADRAO);

  return {
    canonical: urlDe(chave, LOCALE_PADRAO),
    languages,
  };
}
