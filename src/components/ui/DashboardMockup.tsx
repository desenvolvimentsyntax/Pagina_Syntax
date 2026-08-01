import { mockup } from "@/content/pt-BR/home";

/**
 * Painel ilustrativo do hero — card de navegador flat, tema claro.
 * É decorativo: o leitor de tela recebe uma descrição única e o conteúdo
 * interno fica oculto (CLAUDE.md §9). Conteúdo de demonstração (§11).
 */
export function DashboardMockup() {
  return (
    <div
      role="img"
      aria-label="Painel do Syntax ERP mostrando pedidos do dia, faturamento e o volume de pedidos registrados no sistema ao longo do ano."
      className="w-full max-w-[680px]"
    >
      <div
        aria-hidden
        className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_32px_64px_-36px_rgb(15_23_42_/_0.35)]"
      >
        <BarraNavegador url={mockup.url} />

        <div className="grid grid-cols-1 sm:grid-cols-[168px_1fr]">
          <Sidebar />
          <Conteudo />
        </div>
      </div>
    </div>
  );
}

function BarraNavegador({ url }: { url: string }) {
  return (
    <div className="flex h-9 items-center gap-2 border-b border-border bg-surface px-3.5">
      <span className="size-2 rounded-full bg-slate-300" />
      <span className="size-2 rounded-full bg-slate-300" />
      <span className="size-2 rounded-full bg-slate-300" />
      <span className="ml-2 hidden h-5 items-center truncate rounded-md border border-border bg-background px-2.5 font-mono text-[10.5px] text-slate-500 sm:flex">
        {url}
      </span>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="hidden border-r border-border bg-surface/60 p-3 sm:block">
      <div className="flex items-center gap-2 px-1.5 pb-3.5">
        <span className="size-5 rounded-md bg-accent" />
        <span className="text-xs font-semibold whitespace-nowrap text-foreground">
          {mockup.produto}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {mockup.menu.map((item, i) => (
          <div
            key={item}
            className={
              i === 0
                ? "flex items-center gap-2.5 rounded-md bg-accent/10 px-2 py-2 text-[11.5px] font-medium text-accent"
                : "flex items-center gap-2.5 rounded-md px-2 py-2 text-[11.5px] text-slate-500"
            }
          >
            <span
              className={
                i === 0
                  ? "size-[5px] rounded-full bg-accent"
                  : "size-[5px] rounded-full bg-slate-300"
              }
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Conteudo() {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-end justify-between gap-3">
        <div className="shrink-0">
          <div className="text-[14.5px] font-semibold tracking-tight whitespace-nowrap text-foreground">
            {mockup.cabecalho.titulo}
          </div>
          <div className="mt-0.5 text-[10.5px] whitespace-nowrap text-slate-500">
            {mockup.cabecalho.subtitulo}
          </div>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-[10px] text-slate-500">
            30 dias
          </span>
          <span className="rounded-md bg-accent px-2.5 py-1 text-[10px] text-accent-foreground">
            Exportar
          </span>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-3 gap-2.5">
        {mockup.indicadores.map((kpi) => (
          <div
            key={kpi.rotulo}
            className="rounded-xl border border-border bg-surface/60 p-3"
          >
            <div className="text-[10px] leading-tight text-slate-500">
              {kpi.rotulo}
            </div>
            <div className="mt-1.5 text-lg font-semibold tracking-tight whitespace-nowrap text-foreground sm:text-xl">
              {kpi.valor}
            </div>
            <div
              className={
                kpi.tom === "positivo"
                  ? "mt-1 text-[10px] text-green-600"
                  : "mt-1 text-[10px] text-accent"
              }
            >
              {kpi.delta}
            </div>
          </div>
        ))}
      </div>

      <Grafico />
    </div>
  );
}

function Grafico() {
  const { grafico } = mockup;

  return (
    <div className="mt-3 rounded-xl border border-border px-4 pt-4 pb-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11.5px] font-medium whitespace-nowrap text-foreground">
          {grafico.titulo}
        </div>
        <div className="flex shrink-0 items-center gap-3 text-[9.5px] whitespace-nowrap text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-[7px] rounded-[2px] bg-accent" />
            {grafico.legenda.auto}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-[7px] rounded-[2px] bg-slate-200" />
            {grafico.legenda.manual}
          </span>
        </div>
      </div>

      <div className="mt-3.5 flex h-[110px] items-end gap-1.5 sm:gap-2">
        {grafico.automatico.map((auto, i) => (
          <div
            key={grafico.meses[i]}
            className="flex h-full flex-1 flex-col justify-end gap-[3px]"
          >
            <div
              className="origin-bottom animate-grow rounded-t-[3px] bg-accent"
              style={{ height: `${auto}%` }}
            />
            <div
              className="origin-bottom animate-grow rounded-b-[3px] bg-slate-200"
              style={{ height: `${grafico.manual[i]}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-400">
        {grafico.meses.map((mes) => (
          <span key={mes}>{mes}</span>
        ))}
      </div>
    </div>
  );
}
