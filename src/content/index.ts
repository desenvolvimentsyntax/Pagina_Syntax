/**
 * Resolvedor de conteúdo por locale (CLAUDE.md §18).
 *
 * Quem renderiza chama `conteudoDe(locale)` e recebe o pacote inteiro daquele
 * idioma. Nenhum componente importa `content/pt-BR/...` direto — foi assim até
 * a fatia 5, e era o que impedia o site de ter um segundo idioma.
 *
 * TRAVA DE PARIDADE: a constante `_paridade` abaixo existe só para o
 * compilador. Ela obriga o pacote es-PY a ter todas as chaves do pt-BR — se
 * uma tradução ficar faltando, o `npm run typecheck` falha em vez de a página
 * renderizar `undefined` em produção. É o que o §18 pede ("chave que existe num
 * e não no outro é erro de build").
 *
 * `Espelho` alarga os literais: em pt-BR `titulo` tem o tipo do próprio texto
 * português, que o texto espanhol nunca satisfaria. O que interessa comparar é
 * a FORMA, não o conteúdo.
 *
 * As chaves de identidade (`chave`, `icone`, `realce`, `slug`) são iguais nos
 * dois idiomas de propósito: são identificadores, não copy. Por isso o tipo de
 * retorno de `conteudoDe` — que é a união dos dois pacotes — mantém os
 * literais precisos e continua servindo para indexar mapas como o `IDENTIDADE`
 * do MarcaProduto.
 */

import * as esCases from "@/content/es-PY/cases";
import * as esHome from "@/content/es-PY/home";
import * as esPlanos from "@/content/es-PY/planos";
import * as esSite from "@/content/es-PY/site";
import * as esUi from "@/content/es-PY/ui";
import * as ptCases from "@/content/pt-BR/cases";
import * as ptHome from "@/content/pt-BR/home";
import * as ptPlanos from "@/content/pt-BR/planos";
import * as ptSite from "@/content/pt-BR/site";
import * as ptUi from "@/content/pt-BR/ui";
import type { Locale } from "@/lib/routes";

const PACOTES = {
  "es-PY": {
    home: esHome,
    site: esSite,
    ui: esUi,
    planos: esPlanos,
    cases: esCases,
  },
  "pt-BR": {
    home: ptHome,
    site: ptSite,
    ui: ptUi,
    planos: ptPlanos,
    cases: ptCases,
  },
} as const;

/** Mesma forma, com os literais de texto alargados para `string`. */
type Espelho<T> = T extends string
  ? string
  : T extends number | boolean | null | undefined
    ? T
    : T extends readonly (infer U)[]
      ? readonly Espelho<U>[]
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        T extends (...args: any[]) => infer R
        ? (...args: never[]) => R
        : { [K in keyof T]: Espelho<T[K]> };

/* Só para o compilador: se faltar uma chave em qualquer locale, quebra aqui. */
const _paridade: Record<Locale, Espelho<(typeof PACOTES)["pt-BR"]>> = PACOTES;
void _paridade;

export type Conteudo = (typeof PACOTES)[Locale];

export function conteudoDe(locale: Locale): Conteudo {
  return PACOTES[locale];
}
