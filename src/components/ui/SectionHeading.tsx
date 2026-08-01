/**
 * Cabeçalho padrão de seção (anatomia do §7): overline, título e subtítulo.
 * Compartilhado por todas as seções para não duplicar a hierarquia.
 */

interface SectionHeadingProps {
  overline?: string;
  titulo: string;
  subtitulo?: string;
  centralizado?: boolean;
}

export function SectionHeading({
  overline,
  titulo,
  subtitulo,
  centralizado = false,
}: SectionHeadingProps) {
  return (
    <div className={centralizado ? "mx-auto max-w-3xl text-center" : undefined}>
      {overline ? (
        <p className="text-accent-soft-foreground font-mono text-xs font-medium tracking-[0.1em] uppercase">
          {overline}
        </p>
      ) : null}

      <h2 className="text-foreground font-display mt-4 text-3xl font-semibold tracking-[-0.028em] text-balance md:text-[42px] md:leading-[1.1]">
        {titulo}
      </h2>

      {subtitulo ? (
        <p
          className={`text-foreground-base/70 mt-4 max-w-2xl text-lg leading-relaxed text-pretty ${
            centralizado ? "mx-auto" : ""
          }`}
        >
          {subtitulo}
        </p>
      ) : null}
    </div>
  );
}
