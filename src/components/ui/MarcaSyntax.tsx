import Image from "next/image";

import { ui } from "@/content/pt-BR/ui";

/**
 * Marca da Syntax — o PNG oficial, agora que o site é claro.
 *
 * O mosaico em SVG que ficava aqui era contorno do tema escuro: o lettering
 * oficial é escuro e sumia sobre a folha #0B1018. Sobre branco o arquivo
 * original é o certo, então voltamos a ele (§11, "não alterar o logo").
 *
 * As duas medidas saem da proporção real do arquivo (1019×656): 112×72 no
 * header e 87×56 no rodapé. Ir por width/height explícitos em vez de altura
 * por CSS é o que mantém o espaço reservado antes do download (§10).
 *
 * No header a marca encolhe para 81×52 abaixo de md: 72px de logo mais o py-4
 * da barra dariam um header sticky de 104px, que come 15% da viewport de um
 * celular. A classe muda LARGURA E ALTURA juntas de propósito — alterar só uma
 * dispara o aviso de dimensão modificada do next/image e reabre layout shift.
 */

interface MarcaSyntaxProps {
  /** `header` (72px de altura) ou `rodape` (56px). */
  tamanho?: "header" | "rodape";
}

const TAMANHOS = {
  header: {
    largura: 112,
    altura: 72,
    classe: "block h-[52px] w-[81px] md:h-[72px] md:w-[112px]",
  },
  rodape: { largura: 87, altura: 56, classe: "block" },
} as const;

export function MarcaSyntax({ tamanho = "header" }: MarcaSyntaxProps) {
  const { largura, altura, classe } = TAMANHOS[tamanho];

  return (
    <Image
      src="/images/syntax-logo.png"
      alt={ui.marca.alt}
      width={largura}
      height={altura}
      priority={tamanho === "header"}
      className={classe}
    />
  );
}
