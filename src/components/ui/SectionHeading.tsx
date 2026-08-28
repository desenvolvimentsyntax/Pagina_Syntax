/**
 * Cabeçalho padrão de seção: overline mono, h2 e intro, alinhados à esquerda.
 * Compartilhado por todas as seções para não duplicar a hierarquia (§7).
 *
 * O tom `escuro` é a banda de contato: o overline clareia para passar sobre
 * #0f172a e o h2 sobe de 30px para os 34px extrabold do handoff.
 */

interface SectionHeadingProps {
  overline: string;
  titulo: string;
  subtitulo?: string;
  tom?: "claro" | "escuro";
}

export function SectionHeading({
  overline,
  titulo,
  subtitulo,
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
        {overline}
      </p>

      <h2
        className={
          escuro
            ? "font-display text-ondark mt-3.5 text-[34px] leading-[1.2] font-extrabold text-pretty"
            : "font-display text-foreground mt-2.5 text-[30px] leading-[1.25] font-bold text-pretty"
        }
      >
        {titulo}
      </h2>

      {subtitulo ? (
        <p
          className={
            escuro
              ? "text-ondark-muted mt-3.5 max-w-[620px] text-[17.5px] leading-[1.65] text-pretty"
              : "text-muted mt-2.5 max-w-[620px] text-[17px] leading-[1.55] text-pretty"
          }
        >
          {subtitulo}
        </p>
      ) : null}
    </div>
  );
}
