import { ImageResponse } from "next/og";

import { hero, meta } from "@/content/pt-BR/home";
import { empresa } from "@/content/pt-BR/site";
import { SITE_URL } from "@/lib/routes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = meta.ogAlt;

/*
 * O Satori não resolve CSS vars, não lê arquivo local por caminho relativo e
 * não rasteriza o SVG do mosaico — então a marca aqui é só o lettering, e as
 * cores do tema (@theme do globals.css) vêm resolvidas em hex neste arquivo.
 */
const AZUL = "#1f4e79";
const TINTA = "#1f2937";
const APOIO = "#646c7a";

/**
 * Montserrat 800 buscada no build. Sem User-Agent de navegador o Google Fonts
 * devolve TTF, que o Satori aceita. Build sem rede não quebra: sem a fonte,
 * a ImageResponse cai na fonte padrão embutida (Noto Sans).
 */
async function fonteMontserrat(): Promise<ArrayBuffer | undefined> {
  try {
    const css = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap",
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return undefined;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return undefined;
  }
}

export default async function OpengraphImage() {
  const montserrat = await fonteMontserrat();
  // Só o domínio: "desde 2006 · BR & PY" já está no eyebrow, e conector
  // escrito aqui seria texto visível fora do content (regra 1 do handoff).
  const rodape = SITE_URL.replace("https://", "");

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

        <div
          style={{
            display: "flex",
            maxWidth: 950,
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.15,
            color: TINTA,
          }}
        >
          {hero.titulo}
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
        ? [{ name: "Montserrat", data: montserrat, weight: 800, style: "normal" }]
        : undefined,
    },
  );
}
