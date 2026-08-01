/**
 * Mapa de atuação estilizado (ato Diferenciais): matriz de pontos com os
 * estados atendidos acesos e as duas sedes marcadas. Não é geografia fiel —
 * é a "planta" da marca aplicada aos dados reais do mapa oficial da empresa
 * (26 localidades; ver ⚠️ em `atuacao`, §11). Decorativo: os números reais
 * ficam em texto ao lado, este SVG é aria-hidden.
 */

const COLUNAS = 20;
const LINHAS = 14;
const PASSO = 24;

/** Posições [coluna, linha] acesas — desenho abstrato do sudeste + Mercosul. */
const ACESOS: ReadonlyArray<readonly [number, number]> = [
  // GO
  [10, 4], [11, 4], [10, 5],
  // MG
  [12, 6], [13, 6], [13, 5],
  // MS
  [8, 7], [9, 7],
  // SP — o núcleo
  [11, 7], [12, 7], [11, 8], [12, 8], [13, 8], [10, 8], [12, 9], [13, 9],
  // PY
  [6, 8], [6, 10],
  // RS
  [9, 11], [10, 11], [9, 12],
];

/** Sedes: Sorocaba-SP e Pedro Juan Caballero-PY. */
const SEDES: ReadonlyArray<readonly [number, number]> = [
  [12, 8],
  [6, 8],
];

const ehSede = (c: number, l: number) =>
  SEDES.some(([sc, sl]) => sc === c && sl === l);

export function MapaAtuacao({ className }: { className?: string }) {
  const largura = (COLUNAS - 1) * PASSO + 16;
  const altura = (LINHAS - 1) * PASSO + 16;

  return (
    <svg
      viewBox={`0 0 ${largura} ${altura}`}
      aria-hidden
      focusable="false"
      className={className}
    >
      {Array.from({ length: LINHAS }, (_, linha) =>
        Array.from({ length: COLUNAS }, (_, coluna) => {
          const x = coluna * PASSO + 8;
          const y = linha * PASSO + 8;

          if (ehSede(coluna, linha)) {
            return (
              <g key={`${coluna}-${linha}`}>
                <circle cx={x} cy={y} r={9} fill="var(--glow-color)" opacity={0.18} />
                <rect
                  x={x - 4}
                  y={y - 4}
                  width={8}
                  height={8}
                  rx={2}
                  fill="var(--color-accent-2)"
                />
              </g>
            );
          }

          const aceso = ACESOS.some(([c, l]) => c === coluna && l === linha);

          return aceso ? (
            <circle
              key={`${coluna}-${linha}`}
              cx={x}
              cy={y}
              r={3}
              fill="var(--glow-color)"
              opacity={0.85}
            />
          ) : (
            <circle
              key={`${coluna}-${linha}`}
              cx={x}
              cy={y}
              r={1.4}
              fill="var(--color-hairline-strong)"
            />
          );
        }),
      )}
    </svg>
  );
}
