import { ImageResponse } from "next/og";

import { conteudoDe } from "@/content";
import { LOCALE_PADRAO, SITE_URL, ehLocale } from "@/lib/routes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = conteudoDe(LOCALE_PADRAO).home.meta.ogAlt;

/*
 * O Satori não resolve CSS vars, não lê arquivo local por caminho relativo e
 * não rasteriza o SVG do mosaico — então a marca aqui é só o lettering, e as
 * cores do tema (@theme do globals.css) vêm resolvidas em hex neste arquivo.
 */
const AZUL = "#1f4e79";
const TINTA = "#1f2937";
const APOIO = "#646c7a";

/**
 * Fonte buscada no build. Sem User-Agent de navegador o Google Fonts devolve
 * TTF, que o Satori aceita. Build sem rede não quebra: sem a fonte, a
 * ImageResponse cai na fonte padrão embutida (Noto Sans).
 *
 * Uma família só: headline, marca e pílula em Montserrat 800 — a mesma
 * hierarquia da página desde a fatia 3.9. O Satori não sintetiza peso, então
 * ela entra no peso real.
 */
async function buscaFonte(
  familia: string,
  peso: number,
): Promise<ArrayBuffer | undefined> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${familia.replace(/ /g, "+")}:wght@${peso}&display=swap`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return undefined;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return undefined;
  }
}

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  /* A arte acompanha o idioma da página: card social em espanhol na raiz, em
     português no /pt. O segmento [locale] é quem informa qual é. */
  const atual = ehLocale(params.locale) ? params.locale : LOCALE_PADRAO;
  const conteudo = conteudoDe(atual);
  const { hero } = conteudo.home;
  const { empresa } = conteudo.site;
  const { MOEDA, planoDeEntrada, planos } = conteudo.planos;

  // Uma família só desde a fatia 3.9: a headline acompanha o H1 da página,
  // que agora é Montserrat 800 (a Tenor Sans saiu do site).
  const montserrat = await buscaFonte("Montserrat", 800);
  // Só o domínio: "desde 2006 · BR & PY" já está no eyebrow, e conector
  // escrito aqui seria texto visível fora do content (regra 1 do handoff).
  const rodape = SITE_URL.replace("https://", "");

  /* O preço entra na arte porque este link circula em grupo de WhatsApp: no
     feed a pessoa lê o card antes de decidir se abre a página. O menor valor
     é o `planoDeEntrada` do catálogo — muda em planos.ts e muda aqui. */
  const chamadaPreco = `A partir de ${MOEDA} ${planoDeEntrada.mensal}/mês · ${planos.length} planos publicados`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          // Aproximação do radial do hero (.fundo-hero): o Satori resolve
          // linear-gradient com muito mais fidelidade que radial em imagem
          // estática. As três paradas são as mesmas do gradiente do design.
          backgroundImage: "linear-gradient(135deg, #dbeafe 0%, #f4f7fc 42%, #e8eef7 100%)",
          color: TINTA,
          fontFamily: '"Montserrat"',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1, color: AZUL }}>
              {empresa.nome}
            </div>
            <div
              style={{
                fontSize: 17,
                letterSpacing: 9,
                color: APOIO,
                textTransform: "uppercase",
              }}
            >
              {empresa.sobrenome}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 20,
              letterSpacing: 2.4,
              color: AZUL,
              textTransform: "uppercase",
            }}
          >
            {hero.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 950,
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1,
              color: TINTA,
            }}
          >
            {hero.titulo}
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "12px 22px",
              borderRadius: 999,
              backgroundColor: AZUL,
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            {chamadaPreco}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 3.5,
            color: APOIO,
            textTransform: "uppercase",
          }}
        >
          {rodape}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: montserrat
        ? [
            {
              name: "Montserrat",
              data: montserrat,
              weight: 800 as const,
              style: "normal" as const,
            },
          ]
        : [],
    },
  );
}
