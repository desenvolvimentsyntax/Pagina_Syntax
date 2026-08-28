import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALES,
  LOCALE_PADRAO,
  PREFIXO_LOCALE,
  ehLocale,
  pastaDoCaminho,
  type Locale,
} from "@/lib/routes";

/**
 * Ponte entre a URL pública e o segmento [locale] interno (CLAUDE.md §18).
 *
 *   /             -> /es-PY
 *   /planes       -> /es-PY/planos   (slug público traduzido, pasta única)
 *   /pt           -> /pt-BR
 *   /pt/planos    -> /pt-BR/planos
 *
 * Usa rewrite, não redirect: a URL que o usuário e o Google veem continua sem
 * o sufixo de região.
 *
 * REGRA DE PRIMEIRA VISITA (fatia 5): quem chega sem escolha registrada vê
 * SEMPRE o espanhol, venha de onde vier. A detecção por `Accept-Language` que
 * existia aqui foi removida de propósito — o site é do Paraguai, e um
 * navegador configurado em português não é motivo para desviar o visitante.
 *
 * A escolha manual (o clique na bandeira do header) grava o cookie e passa a
 * valer para as próximas visitas, inclusive na raiz. É o único jeito de sair
 * do espanhol.
 *
 * O Next 16 renomeou a convenção `middleware` para `proxy` — mesmo
 * comportamento, nome novo.
 */

const COOKIE_LOCALE = "syntax_locale";

/* Caminho que não corresponde a rota nenhuma. Não existe como pasta, então o
   Next responde com o not-found do locale. */
const NAO_ENCONTRADO = "__rota-inexistente";

const UM_ANO = 60 * 60 * 24 * 365;

/** Monta o caminho do segmento [locale] interno a partir da pasta da rota. */
function caminhoInterno(locale: Locale, pasta: string | null): string {
  if (pasta === null) return `/${locale}/${NAO_ENCONTRADO}`;
  return pasta ? `/${locale}/${pasta}` : `/${locale}`;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // As imagens de metadata do Next (og:image/twitter:image) são servidas sob
  // o segmento interno [locale] — ex.: /es-PY/opengraph-image. Sem este guard
  // o rewrite final prefixaria o locale de novo e a rota viraria 404.
  const ehImagemMetadata = LOCALES.some(
    (locale) =>
      pathname === `/${locale}/opengraph-image` ||
      pathname === `/${locale}/twitter-image`,
  );
  if (ehImagemMetadata) return NextResponse.next();

  // 1. Prefixo explícito na URL (hoje só /pt). Visitar o prefixo é escolha
  //    manual, então persiste — quem manda um link /pt para alguém está
  //    escolhendo o português para essa pessoa também.
  for (const locale of LOCALES) {
    const prefixo = PREFIXO_LOCALE[locale];
    if (!prefixo) continue;

    if (pathname === prefixo || pathname.startsWith(`${prefixo}/`)) {
      const resto = pathname.slice(prefixo.length) || "/";
      const url = request.nextUrl.clone();
      url.pathname = caminhoInterno(locale, pastaDoCaminho(resto, locale));

      const resposta = NextResponse.rewrite(url);
      resposta.cookies.set(COOKIE_LOCALE, locale, {
        path: "/",
        maxAge: UM_ANO,
        sameSite: "lax",
      });
      return resposta;
    }
  }

  // 2. Sem prefixo, mas com escolha gravada por um locale prefixado: leva o
  //    visitante de volta para o idioma dele. É o que faz "mudou para o
  //    português, continua em português" valer também na raiz.
  const escolhido = request.cookies.get(COOKIE_LOCALE)?.value;
  if (
    escolhido &&
    ehLocale(escolhido) &&
    escolhido !== LOCALE_PADRAO &&
    PREFIXO_LOCALE[escolhido]
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `${PREFIXO_LOCALE[escolhido]}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // 3. Primeira visita, ou escolha pelo próprio padrão: espanhol.
  const url = request.nextUrl.clone();
  url.pathname = caminhoInterno(
    LOCALE_PADRAO,
    pastaDoCaminho(pathname, LOCALE_PADRAO),
  );
  return NextResponse.rewrite(url);
}

export const config = {
  /*
   * O ponto precisa de barra DUPLA: num literal TypeScript `"\\."` chega na
   * regex como `\.` e escapa o ponto, excluindo só caminhos com extensão de
   * arquivo. Escrito com uma barra, `"\."` vira `"."` — o lookahead passa a
   * excluir qualquer caminho com pelo menos um caractere e o proxy deixa de
   * rodar em tudo, menos na raiz.
   */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
