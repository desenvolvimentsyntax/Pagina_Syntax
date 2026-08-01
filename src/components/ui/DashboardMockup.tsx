import { mockup } from "@/content/pt-BR/home";

/**
 * Painel ilustrativo do hero — card de navegador flat.
 *
 * O painel precisa de fundo ACIMA da folha (--color-panel), não abaixo: pintado
 * na cor da folha ele desapareceria dentro dela. É decorativo — o leitor de
 * tela recebe uma descrição única e o conteúdo interno fica oculto (§9).
 * Conteúdo de demonstração (§11).
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
        className="border-hairline-strong bg-panel overflow-hidden rounded-2xl border shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]"
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
    <div className="border-hairline bg-panel-raised flex h-9 items-center gap-2 border-b px-3.5">
      <span className="bg-ondark-dim size-2 rounded-full" />
      <span className="bg-ondark-dim size-2 rounded-full" />
      <span className="bg-ondark-dim size-2 rounded-full" />
      <span className="border-hairline bg-panel text-ondark-soft ml-2 hidden h-5 items-center truncate rounded-md border px-2.5 font-mono text-[10.5px] sm:flex">
        {url}
      </span>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="border-hairline bg-panel-raised hidden border-r p-3 sm:block">
      <div className="flex items-center gap-2 px-1.5 pb-3.5">
        <span className="size-5 rounded-md bg-accent" />
        <span className="text-xs font-semibold text-ondark whitespace-nowrap">
          {mockup.produto}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {mockup.menu.map((item, i) => (
          <div
            key={item}
            className={
              i === 0
                ? "flex items-center gap-2.5 rounded-md bg-accent/10 px-2 py-2 text-[11.5px] font-medium text-accent-soft-foreground"
                : "flex items-center gap-2.5 rounded-md px-2 py-2 text-[11.5px] text-ondark-soft"
            }
          >
            <span
              className={
                i === 0
                  ? "size-[5px] rounded-full bg-accent"
                  : "size-[5px] rounded-full bg-ondark-dim"
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
          <div className="text-[14.5px] font-semibold tracking-tight text-ondark whitespace-nowrap">
            {mockup.cabecalho.titulo}
          </div>
          <div className="text-ondark-soft mt-0.5 text-[10.5px] whitespace-nowrap">
            {mockup.cabecalho.subtitulo}
          </div>
        </div>
        <div className="hidden shrink-0 gap-1.5 sm:flex">
          <span className="border-hairline bg-panel-raised text-ondark-soft rounded-md border px-2.5 py-1 text-[10px]">
            30 dias
          </span>
          <span className="rounded-md bg-accent px-2.5 py-1 text-[10px] text-accent-foreground">
            Exportar
          </span>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-2.5 min-[400px]:grid-cols-3">
        {mockup.indicadores.map((kpi) => (
          <div
            key={kpi.rotulo}
            className="border-hairline bg-panel-raised min-w-0 rounded-xl border p-3 last:hidden min-[400px]:last:block"
          >
            <div className="text-ondark-soft text-[10px] leading-tight">
              {kpi.rotulo}
            </div>
            <div className="mt-1.5 truncate text-base font-semibold tracking-tight text-ondark sm:text-xl">
              {kpi.valor}
            </div>
            <div
              className={
                kpi.tom === "positivo"
                  ? "mt-1 text-[10px] text-positive"
                  : "mt-1 text-[10px] text-accent-soft-foreground"
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
    <div className="border-hairline rounded-xl border px-4 pt-4 pb-3 mt-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-ondark text-[11.5px] font-medium whitespace-nowrap">
          {grafico.titulo}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1 text-[9.5px] whitespace-nowrap text-ondark-soft sm:flex-row sm:items-center sm:gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-[7px] rounded-[2px] bg-accent" />
            {grafico.legenda.auto}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-[7px] rounded-[2px] bg-ondark-dim" />
            {grafico.legenda.manual}
          </span>
        </div>
      </div>

      <div className="mt-3.5 flex h-[110px] items-end gap-1.5 sm:gap-2">
        {grafico.automatico.map((auto, i) => (
          <div
            key={grafico.meses[i]}
            className={`h-full flex-1 flex-col justify-end gap-[3px] ${i < 4 ? "hidden sm:flex" : "flex"}`}
          >
            <div
              className="origin-bottom animate-grow rounded-t-[3px] bg-accent"
              style={{ height: `${auto}%` }}
            />
            <div
              className="origin-bottom animate-grow rounded-b-[3px] bg-ondark-dim"
              style={{ height: `${grafico.manual[i]}%` }}
            />
          </div>
        ))}
      </div>

      <div className="text-ondark-dim mt-2 flex justify-between font-mono text-[9px]">
        {grafico.meses.map((mes, i) => (
          <span key={mes} className={i < 4 ? "hidden sm:inline" : undefined}>
            {mes}
          </span>
        ))}
      </div>
    </div>
  );
}
