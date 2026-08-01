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
        <p className="text-sm font-medium tracking-wide text-accent uppercase">
          {overline}
        </p>
      ) : null}

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground md:text-4xl">
        {titulo}
      </h2>

      {subtitulo ? (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-foreground/70 ${
            centralizado ? "mx-auto" : ""
          }`}
        >
          {subtitulo}
        </p>
      ) : null}
    </div>
  );
}
