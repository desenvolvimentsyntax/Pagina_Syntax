import { mockup } from "@/content/pt-BR/home";

/**
 * Painel ilustrativo do hero — card de navegador flat.
 *
 * O painel precisa de fundo ACIMA da folha (--color-panel), não abaixo: pintado
 * na cor da folha ele desapareceria dentro dela. É decorativo — o leitor de
 * tela recebe uma descrição única e o conteúdo interno fica oculto (§9).
 * Conteúdo de demonstração (§11).
 *
 * `variante="compacto"` é a versão da dobra mobile: sem sidebar, sem URL,
 * 2 KPIs e 8 barras — orçada para entrar na primeira tela de 390×844.
 * Os satélites (mini-cartões com parallax) só existem na completa, em lg+.
 */

interface DashboardMockupProps {
  variante?: "completo" | "compacto";
  className?: string;
}

export function DashboardMockup({
  variante = "completo",
  className,
}: DashboardMockupProps) {
  const compacto = variante === "compacto";

  return (
    <div
      role="img"
      aria-label="Painel do Syntax ERP mostrando pedidos do dia, faturamento e o volume de pedidos registrados no sistema ao longo do ano."
      className={`w-full ${compacto ? "max-w-[440px]" : "max-w-[680px]"} ${className ?? ""}`}
    >
      <div aria-hidden className="relative">
        <div className="border-hairline-strong bg-panel overflow-hidden rounded-2xl border shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9),0_0_44px_color-mix(in_oklab,var(--glow-color)_28%,transparent)]">
          <BarraNavegador compacto={compacto} />

          {compacto ? (
            <Conteudo compacto />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-[168px_1fr]">
              <Sidebar />
              <Conteudo />
            </div>
          )}
        </div>

        {compacto ? null : <Satelites />}
      </div>
    </div>
  );
}

function BarraNavegador({ compacto }: { compacto: boolean }) {
  return (
    <div className="border-hairline bg-panel-raised flex h-9 items-center gap-2 border-b px-3.5">
      <span className="bg-ondark-dim size-2 rounded-full" />
      <span className="bg-ondark-dim size-2 rounded-full" />
      <span className="bg-ondark-dim size-2 rounded-full" />
      {compacto ? null : (
        <span className="border-hairline bg-panel text-ondark-soft ml-2 hidden h-5 items-center truncate rounded-md border px-2.5 font-mono text-[10.5px] sm:flex">
          {mockup.url}
        </span>
      )}
      <span className="text-ondark-dim ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[9px] tracking-[0.08em] uppercase">
        <span className="bg-positive size-1.5 rounded-full" />
        {mockup.led}
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

function Conteudo({ compacto = false }: { compacto?: boolean }) {
  const indicadores = compacto
    ? mockup.indicadores.slice(0, 2)
    : mockup.indicadores;

  return (
    <div className={compacto ? "p-3.5" : "p-4 sm:p-5"}>
      <div className="flex items-end justify-between gap-3">
        <div className="shrink-0">
          <div className="text-[14.5px] font-semibold tracking-tight text-ondark whitespace-nowrap">
            {mockup.cabecalho.titulo}
          </div>
          <div className="text-ondark-soft mt-0.5 text-[10.5px] whitespace-nowrap">
            {mockup.cabecalho.subtitulo}
          </div>
        </div>
        {compacto ? null : (
          <div className="hidden shrink-0 gap-1.5 sm:flex">
            <span className="border-hairline bg-panel-raised text-ondark-soft rounded-md border px-2.5 py-1 text-[10px]">
              30 dias
            </span>
            <span className="rounded-md bg-accent px-2.5 py-1 text-[10px] text-accent-foreground">
              Exportar
            </span>
          </div>
        )}
      </div>

      <div
        className={
          compacto
            ? "mt-3 grid grid-cols-2 gap-2.5"
            : "mt-3.5 grid grid-cols-2 gap-2.5 min-[400px]:grid-cols-3"
        }
      >
        {indicadores.map((kpi) => (
          <div
            key={kpi.rotulo}
            className={`border-hairline bg-panel-raised min-w-0 rounded-xl border p-3 ${
              compacto ? "" : "last:hidden min-[400px]:last:block"
            }`}
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

      <Grafico compacto={compacto} />
    </div>
  );
}

function Grafico({ compacto }: { compacto: boolean }) {
  const { grafico } = mockup;

  return (
    <div className="border-hairline mt-3 rounded-xl border px-4 pt-4 pb-3">
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

      <div
        className={`mt-3.5 flex items-end gap-1.5 sm:gap-2 ${compacto ? "h-[88px]" : "h-[110px]"}`}
      >
        {grafico.automatico.map((auto, i) => (
          <div
            key={grafico.meses[i]}
            className={`h-full flex-1 flex-col justify-end gap-[3px] ${
              i < 4 ? (compacto ? "hidden" : "hidden sm:flex") : "flex"
            }`}
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
          <span
            key={mes}
            className={i < 4 ? (compacto ? "hidden" : "hidden sm:inline") : undefined}
          >
            {mes}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Mini-cartões que orbitam o painel (L1.5). Parallax em velocidades
 * diferentes — decorativo, dentro do role="img" do pai, só lg+.
 */
function Satelites() {
  const [primeiro, segundo] = mockup.satelites;

  return (
    <div className="hidden lg:block">
      <div className="parallax-suave bg-panel-raised border-hairline-strong absolute top-14 -left-12 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]">
        <span className="bg-positive size-1.5 rounded-full" />
        <span className="text-ondark text-[11px] font-medium whitespace-nowrap">
          {primeiro.rotulo}
        </span>
        <span className="text-ondark-dim text-[10px] whitespace-nowrap">
          {primeiro.nota}
        </span>
      </div>

      <div className="parallax-suave--lento bg-panel-raised border-hairline-strong absolute -right-7 bottom-16 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 font-mono shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]">
        <span className="text-ondark-soft text-[10px] tracking-[0.06em] uppercase whitespace-nowrap">
          {segundo.rotulo}
        </span>
        <span className="text-accent-soft-foreground text-[11px] font-medium whitespace-nowrap">
          {segundo.nota}
        </span>
      </div>
    </div>
  );
}
