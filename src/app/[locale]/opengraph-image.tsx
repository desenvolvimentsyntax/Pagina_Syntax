import { ImageResponse } from "next/og";

import { hero, meta } from "@/content/pt-BR/home";
import { empresa } from "@/content/pt-BR/site";
import { SITE_URL } from "@/lib/routes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = meta.ogAlt;

/*
 * Mosaico da marca (components/ui/MarcaSyntax.tsx) reproduzido em divs
 * absolutos: o Satori não resolve CSS vars nem o SVG gerado, então a
 * geometria (ângulo/raio no viewBox 64) é recalculada aqui com as cores
 * resolvidas do tema (§4 / @theme do globals.css).
 */
const MOSAICO = [
  { angulo: 48, raio: 23, lado: 7.5, cor: "#3b82f6" },
  { angulo: 76, raio: 23, lado: 8.5, cor: "#60a5fa" },
  { angulo: 104, raio: 23, lado: 7.5, cor: "#8fa0b5" },
  { angulo: 132, raio: 23, lado: 8.5, cor: "#3b82f6" },
  { angulo: 160, raio: 23, lado: 7.5, cor: "#8fa0b5" },
  { angulo: 188, raio: 23, lado: 8.5, cor: "#60a5fa" },
  { angulo: 216, raio: 23, lado: 7.5, cor: "#8fa0b5" },
  { angulo: 244, raio: 23, lado: 8.5, cor: "#3b82f6" },
  { angulo: 272, raio: 23, lado: 7.5, cor: "#8fa0b5" },
  { angulo: 300, raio: 23, lado: 6.5, cor: "#60a5fa" },
  { angulo: 62, raio: 13, lado: 5.5, cor: "#8fa0b5" },
  { angulo: 98, raio: 13, lado: 6.5, cor: "#3b82f6" },
  { angulo: 134, raio: 13, lado: 5.5, cor: "#60a5fa" },
  { angulo: 170, raio: 13, lado: 6.5, cor: "#8fa0b5" },
  { angulo: 206, raio: 13, lado: 5.5, cor: "#3b82f6" },
  { angulo: 242, raio: 13, lado: 6.5, cor: "#60a5fa" },
  { angulo: 278, raio: 13, lado: 5.5, cor: "#8fa0b5" },
] as const;

/** Fator sobre o viewBox 64 da marca. */
const ESCALA = 2.1;

/**
 * Sora 600 buscada no build. Sem User-Agent de navegador o Google Fonts
 * devolve TTF, que o Satori aceita. Build sem rede não quebra: sem a fonte,
 * a ImageResponse cai na fonte padrão embutida (Noto Sans).
 */
async function fonteSora(): Promise<ArrayBuffer | undefined> {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Sora:wght@600&display=swap")
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return undefined;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return undefined;
  }
}

export default async function OpengraphImage() {
  const sora = await fonteSora();
  const headline = `${hero.tituloInicio}${hero.tituloDestaque}${hero.tituloFim}`;
  const rodape = `${SITE_URL.replace("https://", "")} · desde ${empresa.fundacao} · Brasil e Paraguai`;

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
          backgroundImage: "linear-gradient(160deg, #12141f 8%, #0b1018 72%)",
          color: "#ffffff",
          fontFamily: '"Sora"',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              position: "relative",
              width: 64 * ESCALA,
              height: 64 * ESCALA,
              display: "flex",
            }}
          >
            {MOSAICO.map(({ angulo, raio, lado, cor }) => {
              const radianos = (angulo * Math.PI) / 180;
              const x = (32 + raio * Math.cos(radianos) - lado / 2) * ESCALA;
              const y = (32 - raio * Math.sin(radianos) - lado / 2) * ESCALA;

              return (
                <div
                  key={`${angulo}-${raio}`}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: lado * ESCALA,
                    height: lado * ESCALA,
                    borderRadius: lado * ESCALA * 0.22,
                    backgroundColor: cor,
                  }}
                />
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 46, fontWeight: 600, letterSpacing: -1 }}>
              {empresa.nome}
            </div>
            <div
              style={{
                fontSize: 17,
                letterSpacing: 9,
                color: "#7d8aa0",
                marginTop: 8,
                textTransform: "uppercase",
              }}
            >
              {empresa.sobrenome}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: 940,
            fontSize: 58,
            fontWeight: 600,
            letterSpacing: -1.8,
            lineHeight: 1.16,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            color: "#7d8aa0",
            textTransform: "uppercase",
          }}
        >
          {rodape}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: sora
        ? [{ name: "Sora", data: sora, weight: 600, style: "normal" }]
        : undefined,
    },
  );
}
