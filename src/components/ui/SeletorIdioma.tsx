"use client";

import { LOCALES, caminhoDe, type ChaveRota, type Locale } from "@/lib/routes";

/**
 * Seletor de idioma — as duas bandeiras, lado a lado, sempre visíveis.
 *
 * DESVIO AUTORIZADO do §18, que manda "mostrar idioma, não bandeira — bandeira
 * representa país, não língua". A regra existe porque Espanha, Argentina e
 * Paraguai compartilham o espanhol e uma bandeira escolheria um deles. Aqui o
 * caso é outro: são dois PAÍSES com produto, preço e canal de atendimento
 * diferentes (planos em guaranis no PY, ERP orçado no BR), então a bandeira é
 * mais informativa que "ES/PT". Decisão do Roger em 28/08/2026.
 *
 * As duas ficam à mostra em vez de esconder a inativa num menu: com dois
 * idiomas, um dropdown custa dois cliques para dizer o que cabe num.
 *
 * São `<a>` de verdade, não botões: trocar idioma é navegar. O clique só
 * intercepta para gravar a escolha antes de sair — o proxy lê esse cookie e
 * mantém o visitante no idioma escolhido inclusive quando ele voltar à raiz.
 * Sem JavaScript, o link continua funcionando (só não memoriza).
 *
 * As bandeiras são SVG inline porque o §3 proíbe emoji em produção. São
 * desenhos simplificados de propósito: em 20×14 o brasão do Paraguai e a
 * esfera celeste do Brasil viram borrão — o que identifica nesse tamanho é o
 * arranjo de cores.
 */

const COOKIE_LOCALE = "syntax_locale";
const UM_ANO = 60 * 60 * 24 * 365;

interface SeletorIdiomaProps {
  /** Locale da página atual — define qual bandeira aparece ativa. */
  atual: Locale;
  /** Rota em que o visitante está, para trocar de idioma sem sair dela. */
  rota: ChaveRota;
  /** Rótulos vindos do content (§18: nada de texto solto no JSX). */
  rotulos: Record<Locale, string>;
}

function BandeiraParaguai() {
  return (
    <svg viewBox="0 0 20 14" aria-hidden className="size-full">
      <rect width="20" height="14" fill="#ffffff" />
      <rect width="20" height="4.67" fill="#d52b1e" />
      <rect y="9.33" width="20" height="4.67" fill="#0038a8" />
      <circle cx="10" cy="7" r="2.1" fill="#ffffff" stroke="#0038a8" strokeWidth="0.4" />
      <circle cx="10" cy="7" r="1" fill="#009b3a" />
    </svg>
  );
}

function BandeiraBrasil() {
  return (
    <svg viewBox="0 0 20 14" aria-hidden className="size-full">
      <rect width="20" height="14" fill="#009b3a" />
      <path d="M10 1.6 18.4 7 10 12.4 1.6 7Z" fill="#fedf00" />
      <circle cx="10" cy="7" r="2.6" fill="#002776" />
      <path
        d="M7.5 6.2a6 6 0 0 1 5 1.1"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.7"
      />
    </svg>
  );
}

const BANDEIRAS: Record<Locale, () => React.JSX.Element> = {
  "es-PY": BandeiraParaguai,
  "pt-BR": BandeiraBrasil,
};

/* Fora do componente de propósito: escrever em `document.cookie` é efeito
   colateral de navegador, e o compilador do React (regra `react-hooks/immutability`) não permite mexer em valor externo dentro do
   corpo de um componente. */
function lembrarIdioma(locale: Locale) {
  document.cookie = `${COOKIE_LOCALE}=${locale}; path=/; max-age=${UM_ANO}; samesite=lax`;
}

export function SeletorIdioma({ atual, rota, rotulos }: SeletorIdiomaProps) {
  return (
    <div className="flex items-center gap-0.5">
      {LOCALES.map((locale) => {
        const Bandeira = BANDEIRAS[locale];
        const ativo = locale === atual;

        return (
          <a
            key={locale}
            href={caminhoDe(rota, locale)}
            hrefLang={locale}
            aria-label={rotulos[locale]}
            aria-current={ativo ? "true" : undefined}
            onClick={() => lembrarIdioma(locale)}
            /* size-11 é o alvo de toque de 44px do §9; a bandeira mesma tem
               20×14 e vive centrada dentro dele. */
            className="flex size-11 items-center justify-center rounded-lg transition-colors"
          >
            <span
              className={`block h-[14px] w-5 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgb(15_23_42/0.12)] transition-[opacity,transform] duration-200 ${
                ativo
                  ? "opacity-100 ring-marca ring-2 ring-offset-1"
                  : "opacity-45 hover:scale-110 hover:opacity-100"
              }`}
            >
              <Bandeira />
            </span>
          </a>
        );
      })}
    </div>
  );
}
