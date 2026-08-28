import type { ChaveProduto } from "@/content/tipos";

/**
 * Marca dos produtos da família E-Syntax (FACT, PRO, PREMIUM, ERP, MOBILE).
 *
 * O arquivo oficial de cada um é o mesmo "S" sobre o quadrado azul; o que muda
 * entre eles é a cor dos três quadradinhos e o rótulo da pílula. Em vez de
 * cinco PNGs de ~930 KB (ou cinco SVGs com os mesmos `<linearGradient id="bg">`
 * repetidos, que colidem quando dois produtos aparecem na mesma página), o
 * ícone é reconstruído aqui: o quadrado é gradiente CSS, o "S" traz a geometria
 * exata do arquivo e os pontos herdam `currentColor`. Um componente, zero id no
 * DOM, poucos bytes e nítido em qualquer tamanho.
 *
 * Desvio consciente do arquivo: as três faces da fita são cor sólida, não
 * gradiente — são as cores médias dos gradientes originais. Nos tamanhos em
 * que a marca aparece (36–56px) a diferença não é perceptível e evita os
 * `<defs>` duplicados. Se um dia a marca precisar aparecer grande, é aqui que
 * o gradiente volta.
 *
 * A pílula do lockup é branca sobre a cor do produto. A cor de catálogo
 * reprova o AA como fundo de texto branco em três dos cinco casos, então ela é
 * preenchida com a variante `-forte` (mesmo matiz, pior caso 7,09:1) — §9.
 */

interface IdentidadeProduto {
  /** Rótulo dentro da pílula, como no lockup. */
  selo: string;
  /** Tagline do arquivo oficial, traduzida (o lockup é em espanhol). */
  tagline: string;
  /** Cor dos três quadradinhos do ícone — só preenchimento, nunca texto. */
  pontos: string;
  /** Fundo da pílula do lockup, com rótulo branco. */
  pilula: string;
  /** Tinta de apoio, para o painel que apresenta o produto. */
  tint: string;
}

export const IDENTIDADE: Record<ChaveProduto, IdentidadeProduto> = {
  fact: {
    selo: "FACT",
    tagline: "Faturamento na hora",
    pontos: "text-produto-fact",
    pilula: "bg-produto-fact-forte",
    tint: "bg-produto-fact-tint",
  },
  pro: {
    selo: "PRO",
    tagline: "Gestão completa",
    pontos: "text-produto-pro",
    pilula: "bg-produto-pro-forte",
    tint: "bg-produto-pro-tint",
  },
  premium: {
    selo: "PREMIUM",
    tagline: "Tudo sem limites",
    pontos: "text-produto-premium",
    pilula: "bg-produto-premium-forte",
    tint: "bg-produto-premium-tint",
  },
  erp: {
    selo: "ERP",
    tagline: "Gestão empresarial",
    pontos: "text-produto-erp",
    pilula: "bg-produto-erp-forte",
    tint: "bg-produto-erp-tint",
  },
  mobile: {
    selo: "MOBILE",
    tagline: "Seu negócio na palma da mão",
    pontos: "text-produto-mobile",
    pilula: "bg-produto-mobile-forte",
    tint: "bg-produto-mobile-tint",
  },
};

/* Geometria do arquivo oficial (canvas 1024, `S` em translate(154.5,184.1)
   scale(2.645)). Não mexer sem o .svg da marca ao lado. */
const FITA = [
  { d: "M60,77 L165,22 A19,19 0 0 1 165,60 L60,115 A19,19 0 0 1 60,77 Z", cor: "#6ca3f7" },
  { d: "M60,77 L165,132 A19,19 0 0 1 165,170 L60,115 A19,19 0 0 1 60,77 Z", cor: "#2054bc" },
  { d: "M165,132 A19,19 0 0 1 165,170 L60,225 A19,19 0 0 1 60,187 Z", cor: "#1d2640" },
] as const;

interface IconeProps {
  produto: ChaveProduto;
  /** Classe de tamanho do Tailwind (`size-11`, `size-14`…). */
  className?: string;
}

export function MarcaProdutoIcone({ produto, className = "size-11" }: IconeProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 rounded-[22%] bg-[linear-gradient(135deg,#2563eb_0%,#172b63_100%)] ${IDENTIDADE[produto].pontos} ${className}`}
    >
      <svg viewBox="0 0 1024 1024" className="size-full">
        {/* A sombra existe no arquivo oficial e é o que separa a fita do
            fundo azul — sem ela, em 40px, o "S" some. Em CSS e não em
            <filter> para não criar id duplicado com cinco produtos na
            mesma página. */}
        <g
          transform="translate(154.5,184.1) scale(2.645)"
          style={{ filter: "drop-shadow(0 12px 12px rgb(0 0 0 / 0.35))" }}
        >
          {FITA.map((face) => (
            <path key={face.cor} d={face.d} fill={face.cor} />
          ))}
        </g>
        <rect x="700" y="240" width="86" height="86" rx="22" fill="currentColor" />
        <rect x="812" y="300" width="54" height="54" rx="16" fill="currentColor" opacity=".85" />
        <rect x="724" y="356" width="48" height="48" rx="14" fill="currentColor" opacity=".7" />
      </svg>
    </span>
  );
}

interface LockupProps {
  produto: ChaveProduto;
  /** `md` é o card de plano; `sm` entra em linha, dentro de listas. */
  tamanho?: "sm" | "md";
  /** Fundo escuro inverte só o lettering — a pílula já tem contraste próprio. */
  tom?: "claro" | "escuro";
}

const MEDIDAS = {
  sm: { icone: "size-10", palavra: "text-[15px]", pilula: "px-1.5 py-0.5 text-[10px]" },
  md: { icone: "size-12", palavra: "text-[19px]", pilula: "px-2 py-[3px] text-[12px]" },
} as const;

/**
 * Lockup completo: ícone + "SYNTAX" com o A azul + pílula do produto.
 *
 * O lettering é texto, não imagem: o arquivo oficial traz a tagline em
 * espanhol ("FACTURACIÓN AL INSTANTE") e este site é pt-BR — congelar a marca
 * num PNG travaria a tradução da fatia es-PY (§18).
 */
export function MarcaProdutoLockup({
  produto,
  tamanho = "md",
  tom = "claro",
}: LockupProps) {
  const identidade = IDENTIDADE[produto];
  const medida = MEDIDAS[tamanho];

  return (
    <span className="inline-flex items-center gap-3">
      {/* O lettering é desenhado em pedaços ("SYNT" + "A" + "X" + pílula) para
          o A azul e a pílula colorida existirem. Lido em voz alta isso vira
          "syntaxerp": o nome de verdade vem do texto oculto e o desenho sai da
          árvore de acessibilidade. */}
      <span className="sr-only">{`Syntax ${identidade.selo}`}</span>

      <MarcaProdutoIcone produto={produto} className={medida.icone} />

      <span aria-hidden className="inline-flex items-center gap-2">
        <span
          className={`font-display font-extrabold tracking-[0.06em] ${medida.palavra} ${
            tom === "escuro" ? "text-ondark" : "text-escuro"
          }`}
        >
          {/* O A azul do lockup. Sobre #0f172a o #2563eb dá 2,60:1 — na banda
              escura ele vira o azul claro (10,10:1). */}
          SYNT
          <span className={tom === "escuro" ? "text-azul-claro" : "text-azul-vivo"}>
            A
          </span>
          X
        </span>

        <span
          className={`font-display rounded-md font-extrabold tracking-[0.08em] text-white ${identidade.pilula} ${medida.pilula}`}
        >
          {identidade.selo}
        </span>
      </span>
    </span>
  );
}
