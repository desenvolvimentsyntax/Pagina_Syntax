/**
 * Cabeçalho padrão de seção (anatomia do §7): overline, título e subtítulo.
 * Compartilhado por todas as seções para não duplicar a hierarquia.
 *
 * Com `indice`, o overline vira marcação técnica do ato — "01 / Quem somos" —
 * seguido da linha com nó que ancora a seção na "planta" do fundo (§4).
 */

interface SectionHeadingProps {
  overline?: string;
  titulo: string;
  subtitulo?: string;
  /** Índice do ato na narrativa ("01"–"08"). */
  indice?: string;
  centralizado?: boolean;
}

export function SectionHeading({
  overline,
  titulo,
  subtitulo,
  indice,
  centralizado = false,
}: SectionHeadingProps) {
  return (
    <div className={centralizado ? "mx-auto max-w-3xl text-center" : undefined}>
      {overline ? (
        <p
          className={`text-accent-soft-foreground flex items-center gap-3 font-mono text-xs font-medium tracking-[0.1em] uppercase ${
            centralizado ? "justify-center" : ""
          }`}
        >
          {indice ? (
            <span className="text-micro">
              {indice}
              <span aria-hidden> /</span>
            </span>
          ) : null}
          <span>{overline}</span>
          {indice && !centralizado ? (
            <span aria-hidden className="flex max-w-36 flex-1 items-center">
              <span className="bg-accent-soft-foreground/60 size-1 shrink-0 rounded-full" />
              <span className="bg-hairline h-px flex-1" />
            </span>
          ) : null}
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
