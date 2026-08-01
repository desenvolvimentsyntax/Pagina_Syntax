import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_PADRAO,
  LOCALES,
  LOCALES_PUBLICADOS,
  PREFIXO_LOCALE,
  ehLocale,
  type Locale,
} from "@/lib/routes";

const COOKIE_LOCALE = "syntax_locale";

/**
 * Ponte entre a URL pública e o segmento [locale] interno (CLAUDE.md §18).
 *
 *   /            -> /pt-BR
 *   /contato     -> /pt-BR/contato
 *   /es          -> /es-PY
 *   /es/contacto -> /es-PY/contacto
 *
 * Usa rewrite, não redirect: a URL que o usuário e o Google veem continua sem
 * o sufixo de região.
 *
 * O Next 16 renomeou a convenção `middleware` para `proxy` — mesmo
 * comportamento, nome novo.
 */

/** Locale preferido do visitante: cookie (escolha manual) vence Accept-Language. */
function detectarLocale(request: NextRequest): Locale {
  const escolhido = request.cookies.get(COOKIE_LOCALE)?.value;
  if (escolhido && ehLocale(escolhido)) return escolhido;

  const aceita = request.headers.get("accept-language");
  if (!aceita) return LOCALE_PADRAO;

  // "es-PY,es;q=0.9,pt-BR;q=0.8" -> ["es-py", "es", "pt-br"]
  const preferidos = aceita
    .split(",")
    .map((parte) => parte.split(";")[0]?.trim().toLowerCase())
    .filter((v): v is string => Boolean(v));

  for (const pref of preferidos) {
    const achado = LOCALES.find(
      (l) => l.toLowerCase() === pref || l.split("-")[0].toLowerCase() === pref,
    );
    if (achado) return achado;
  }

  return LOCALE_PADRAO;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // As imagens de metadata do Next (og:image/twitter:image) são servidas sob
  // o segmento interno [locale] — ex.: /pt-BR/opengraph-image. Sem este guard
  // o rewrite final prefixaria o locale de novo e a rota viraria 404.
  const ehImagemMetadata = LOCALES.some(
    (locale) =>
      pathname === `/${locale}/opengraph-image` ||
      pathname === `/${locale}/twitter-image`,
  );
  if (ehImagemMetadata) return NextResponse.next();

  // Prefixo de locale explícito na URL (hoje só /es).
  for (const locale of LOCALES) {
    const prefixo = PREFIXO_LOCALE[locale];
    if (!prefixo) continue;

    if (pathname === prefixo || pathname.startsWith(`${prefixo}/`)) {
      const resto = pathname.slice(prefixo.length) || "/";
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${resto === "/" ? "" : resto}`;

      const resposta = NextResponse.rewrite(url);
      // A visita explícita ao prefixo é escolha manual — persiste (§18).
      resposta.cookies.set(COOKIE_LOCALE, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
      return resposta;
    }
  }

  // Sem prefixo: é o locale padrão. Só sugerimos outro idioma se ele já
  // estiver publicado — §18 proíbe mandar o visitante para rota não revisada.
  const preferido = detectarLocale(request);
  if (
    preferido !== LOCALE_PADRAO &&
    LOCALES_PUBLICADOS.includes(preferido) &&
    !request.cookies.has(COOKIE_LOCALE)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `${PREFIXO_LOCALE[preferido]}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${LOCALE_PADRAO}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
