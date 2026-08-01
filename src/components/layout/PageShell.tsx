import type { ReactNode } from "react";

/**
 * A folha central do site: um painel escuro que flutua sobre o gradiente da
 * página (.fundo-pagina, no globals.css). É ela que dá a profundidade do §4 —
 * as seções não alternam mais fundo branco/cinza, todas flutuam aqui dentro.
 *
 * No mobile a folha é full-bleed: moldura de 12px não lê em 320px e rouba 26px
 * de largura útil — o radius, a borda lateral e o respiro só entram em md+.
 *
 * As camadas decorativas (grid e glow) são absolutas e `pointer-events-none`
 * para não interceptar clique nem entrar na ordem de leitura (§9).
 * Server Component: não há estado nem evento (§3.9).
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="px-0 pb-px md:px-5 lg:px-8">
      <div className="border-border bg-sheet relative mx-auto max-w-[1440px] overflow-hidden border-y shadow-[0_60px_120px_-50px_rgb(0_0_0/0.9)] md:rounded-[18px] md:border-x">
        {/* Grid pattern de 88px — hairline duplo, horizontal e vertical. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-hairline)_1px,transparent_1px)] bg-[size:88px_88px] opacity-60"
        />

        {/* Glow radial no topo, atrás do hero. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]"
        />

        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
