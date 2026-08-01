import { empresa } from "@/content/pt-BR/site";

/**
 * Marca da Syntax: o mosaico de quadrados em arco, redesenhado em SVG, mais o
 * lettering em tipografia do site.
 *
 * Desvio consciente do §11 ("não alterar o logo"), decidido no redesign: o PNG
 * oficial traz o lettering em cinza-escuro sobre fundo claro e fica ilegível
 * sobre a folha #0B1018. O mosaico azul, que é a parte reconhecível da marca,
 * lê bem no escuro e foi preservado. Quando existir a versão clara oficial, a
 * troca é local a este arquivo.
 *
 * Server Component; o SVG é decorativo (o nome já vem em texto ao lado, §9).
 */

interface Quadrado {
  /** Graus, 0 = leste, sentido anti-horário. */
  angulo: number;
  /** Distância do centro, em unidades do viewBox 64×64. */
  raio: number;
  lado: number;
  cor: string;
}

/* O arco abre para a direita, formando o "C" da marca. */
const MOSAICO: Quadrado[] = [
  { angulo: 48, raio: 23, lado: 7.5, cor: "var(--color-accent-2)" },
  { angulo: 76, raio: 23, lado: 8.5, cor: "var(--accent-soft-foreground)" },
  { angulo: 104, raio: 23, lado: 7.5, cor: "var(--color-slate-mark)" },
  { angulo: 132, raio: 23, lado: 8.5, cor: "var(--color-accent-2)" },
  { angulo: 160, raio: 23, lado: 7.5, cor: "var(--color-slate-mark)" },
  { angulo: 188, raio: 23, lado: 8.5, cor: "var(--accent-soft-foreground)" },
  { angulo: 216, raio: 23, lado: 7.5, cor: "var(--color-slate-mark)" },
  { angulo: 244, raio: 23, lado: 8.5, cor: "var(--color-accent-2)" },
  { angulo: 272, raio: 23, lado: 7.5, cor: "var(--color-slate-mark)" },
  { angulo: 300, raio: 23, lado: 6.5, cor: "var(--accent-soft-foreground)" },

  { angulo: 62, raio: 13, lado: 5.5, cor: "var(--color-slate-mark)" },
  { angulo: 98, raio: 13, lado: 6.5, cor: "var(--color-accent-2)" },
  { angulo: 134, raio: 13, lado: 5.5, cor: "var(--accent-soft-foreground)" },
  { angulo: 170, raio: 13, lado: 6.5, cor: "var(--color-slate-mark)" },
  { angulo: 206, raio: 13, lado: 5.5, cor: "var(--color-accent-2)" },
  { angulo: 242, raio: 13, lado: 6.5, cor: "var(--accent-soft-foreground)" },
  { angulo: 278, raio: 13, lado: 5.5, cor: "var(--color-slate-mark)" },
];

function MosaicoSyntax({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden focusable="false" className={className}>
      {MOSAICO.map(({ angulo, raio, lado, cor }) => {
        const radianos = (angulo * Math.PI) / 180;
        const x = 32 + raio * Math.cos(radianos) - lado / 2;
        const y = 32 - raio * Math.sin(radianos) - lado / 2;

        return (
          <rect
            key={`${angulo}-${raio}`}
            x={x}
            y={y}
            width={lado}
            height={lado}
            rx={lado * 0.22}
            fill={cor}
          />
        );
      })}
    </svg>
  );
}

interface MarcaSyntaxProps {
  /** `md` no header, `lg` no rodapé. */
  tamanho?: "md" | "lg";
  className?: string;
}

const MOSAICO_TAMANHO = {
  md: "size-9",
  lg: "size-11",
} as const;

const NOME_TAMANHO = {
  md: "text-[17px]",
  lg: "text-xl",
} as const;

export function MarcaSyntax({ tamanho = "md", className }: MarcaSyntaxProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <MosaicoSyntax className={`${MOSAICO_TAMANHO[tamanho]} shrink-0`} />

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-semibold tracking-tight ${NOME_TAMANHO[tamanho]} text-foreground`}
        >
          {empresa.nome}
        </span>
        <span className="text-micro mt-1 text-[9.5px] font-medium tracking-[0.34em] uppercase">
          {empresa.sobrenome}
        </span>
      </span>
    </span>
  );
}
