/**
 * Cabeçalho padrão de seção: overline mono, h2 e intro, alinhados à esquerda.
 * Compartilhado por todas as seções para não duplicar a hierarquia (§7).
 *
 * `etapa` é o número do tour ("02", "03"…): a home é um funil e a numeração
 * dá ao visitante a sensação de progressão. O número entra NO overline, no
 * mesmo mono — é tipografia, não widget. A numeração de cada seção está na
 * tabela do §7 do CLAUDE.md; seção sem etapa (ex.: uso fora da home) só omite
 * a prop.
 *
 * O tom `escuro` é usado nas bandas #0f172a: o overline clareia e o h2 sobe
 * um degrau (36px contra 34px), como no handoff.
 */

interface SectionHeadingProps {
  overline: string;
  titulo: string;
  subtitulo?: string;
  /** Número do passo no tour da home: "02", "03"… */
  etapa?: string;
  tom?: "claro" | "escuro";
}

export function SectionHeading({
  overline,
  titulo,
  subtitulo,
  etapa,
  tom = "claro",
}: SectionHeadingProps) {
  const escuro = tom === "escuro";

  return (
    <div>
      <p
        className={`font-mono text-[13px] font-semibold tracking-[0.1em] uppercase ${
          escuro ? "text-azul-claro" : "text-marca"
        }`}
      >
        {etapa ? (
          <>
            <span className={escuro ? "text-ondark-muted" : "text-muted"}>
              {etapa}
            </span>
            <span aria-hidden className="mx-2">
              ·
            </span>
          </>
        ) : null}
        {overline}
      </p>

      <h2
        className={
          escuro
            ? "font-display text-ondark mt-3.5 text-[30px] leading-[1.2] font-extrabold text-pretty md:text-[36px]"
            : "font-display text-foreground mt-2.5 text-[28px] leading-[1.2] font-bold text-pretty md:text-[34px]"
        }
      >
        {titulo}
      </h2>

      {subtitulo ? (
        <p
          className={
            escuro
              ? "text-ondark-muted mt-3.5 max-w-[560px] text-[17.5px] leading-[1.65] text-pretty"
              : "text-muted mt-2.5 max-w-[560px] text-[17px] leading-[1.55] text-pretty"
          }
        >
          {subtitulo}
        </p>
      ) : null}
    </div>
  );
}
