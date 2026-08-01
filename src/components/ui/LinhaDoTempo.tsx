/**
 * Linha do tempo da história da empresa (ato Quem Somos). Layout próprio
 * autorizado — a v3 não tem Timeline (§3 regra 5).
 *
 * O trilho se desenha com o scroll (`.traco-scroll-y`, CSS scroll-driven);
 * sem suporte ou com reduced-motion ele já nasce completo. A âncora visual
 * de cada marco é o rótulo mono — o Método usa numeral gigante, formatos
 * distintos de propósito (§7).
 */

interface Marco {
  ano: string;
  titulo: string;
  texto: string;
}

interface LinhaDoTempoProps {
  marcos: readonly Marco[];
}

export function LinhaDoTempo({ marcos }: LinhaDoTempoProps) {
  return (
    <ol className="relative flex flex-col gap-8">
      <span
        aria-hidden
        className="traco-scroll-y from-accent via-accent-soft-foreground/50 to-hairline absolute top-2 bottom-2 left-[5px] w-px bg-gradient-to-b"
      />

      {marcos.map((marco) => (
        <li key={marco.titulo} className="relative pl-9">
          <span
            aria-hidden
            className="border-accent-soft-foreground/60 bg-sheet shadow-glow-sm absolute top-1 left-0 size-[11px] rounded-full border"
          />

          <p className="text-accent-soft-foreground font-mono text-xs font-medium tracking-[0.1em] uppercase">
            {marco.ano}
          </p>
          <h3 className="text-foreground mt-1.5 text-[15px] font-semibold tracking-tight md:text-base">
            {marco.titulo}
          </h3>
          <p className="text-foreground-base/70 mt-1 text-[13.5px] leading-relaxed md:text-sm">
            {marco.texto}
          </p>
        </li>
      ))}
    </ol>
  );
}
