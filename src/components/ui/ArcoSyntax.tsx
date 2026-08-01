/**
 * Ornamento de cena (L1.5): o arco de quadrados da marca (MarcaSyntax, raios
 * 23/13 do viewBox 64) redesenhado em escala arquitetônica — traço hairline
 * com quatro quadrados acesos em var(--glow-color). É a marca virando
 * estrutura; decorativo puro, fora da ordem de leitura.
 */

interface QuadradoArco {
  /** Graus, 0 = leste, sentido anti-horário. */
  angulo: number;
  raio: number;
  lado: number;
  /** Aceso: preenchido com --glow-color em vez de traço hairline. */
  aceso?: boolean;
}

const ARCO: QuadradoArco[] = [
  { angulo: 48, raio: 23, lado: 7.5 },
  { angulo: 76, raio: 23, lado: 8.5, aceso: true },
  { angulo: 104, raio: 23, lado: 7.5 },
  { angulo: 132, raio: 23, lado: 8.5 },
  { angulo: 160, raio: 23, lado: 7.5 },
  { angulo: 188, raio: 23, lado: 8.5, aceso: true },
  { angulo: 216, raio: 23, lado: 7.5 },
  { angulo: 244, raio: 23, lado: 8.5 },
  { angulo: 272, raio: 23, lado: 7.5 },
  { angulo: 300, raio: 23, lado: 6.5 },

  { angulo: 62, raio: 13, lado: 5.5, aceso: true },
  { angulo: 98, raio: 13, lado: 6.5 },
  { angulo: 134, raio: 13, lado: 5.5 },
  { angulo: 170, raio: 13, lado: 6.5 },
  { angulo: 206, raio: 13, lado: 5.5 },
  { angulo: 242, raio: 13, lado: 6.5, aceso: true },
  { angulo: 278, raio: 13, lado: 5.5 },
];

interface ArcoSyntaxProps {
  className?: string;
}

export function ArcoSyntax({ className }: ArcoSyntaxProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      focusable="false"
      className={className}
    >
      {ARCO.map(({ angulo, raio, lado, aceso }) => {
        const radianos = (angulo * Math.PI) / 180;
        const x = 32 + raio * Math.cos(radianos) - lado / 2;
        const y = 32 - raio * Math.sin(radianos) - lado / 2;

        return aceso ? (
          <rect
            key={`${angulo}-${raio}`}
            x={x}
            y={y}
            width={lado}
            height={lado}
            rx={1.1}
            fill="var(--glow-color)"
            opacity={0.55}
          />
        ) : (
          <rect
            key={`${angulo}-${raio}`}
            x={x}
            y={y}
            width={lado}
            height={lado}
            rx={1.1}
            fill="none"
            stroke="var(--color-hairline-strong)"
            strokeWidth={0.4}
          />
        );
      })}
    </svg>
  );
}
