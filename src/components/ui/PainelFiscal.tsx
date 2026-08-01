import { prova } from "@/content/pt-BR/home";

/**
 * Painel ilustrativo do E-Syntax.
 *
 * O site inteiro é escuro agora, então o painel não pode mais ser "a área
 * escura": pintado perto da folha (#0B1018) ele sumiria dentro dela. Sobe para
 * --color-panel, um degrau ACIMA, e a separação vem do hairline.
 * Decorativo (role="img", §9); conteúdo de demonstração (§11).
 */
export function PainelFiscal() {
  const { painel } = prova.esyntax;

  return (
    <div
      role="img"
      aria-label="Painel de documentos fiscais do E-Syntax, com NF-e, NFC-e e CT-e emitidos e status de autorização em tempo real."
      className="bg-panel overflow-hidden rounded-2xl shadow-[0_40px_70px_-45px_rgb(0_0_0/0.9),0_0_44px_color-mix(in_oklab,var(--glow-color)_26%,transparent),inset_0_0_0_1px_rgb(148_163_184_/_0.18)]"
    >
      <div aria-hidden>
        <div className="flex h-10 items-center gap-2.5 border-hairline bg-panel-raised border-b px-3.5">
          <div className="flex gap-[7px]">
            <span className="size-[9px] rounded-full bg-ondark-dim" />
            <span className="size-[9px] rounded-full bg-ondark-dim" />
            <span className="size-[9px] rounded-full bg-ondark-dim" />
          </div>
          <span className="hidden h-6 items-center truncate rounded-md bg-hairline px-3 font-mono text-[10.5px] text-ondark-soft sm:flex">
            {painel.url}
          </span>
          <span className="ml-auto flex min-w-0 items-center gap-1.5 text-[10.5px] text-ondark-soft">
            <span className="size-1.5 shrink-0 rounded-full bg-positive" />
            <span className="truncate">{painel.status}</span>
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-[15px] font-semibold tracking-tight text-ondark whitespace-nowrap">
              {painel.titulo}
            </div>
            <span className="hidden rounded-md bg-accent px-2.5 py-1.5 text-[11px] whitespace-nowrap text-accent-foreground sm:inline">
              Emitir NF-e
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {painel.cartoes.map((cartao) => (
              <div
                key={cartao.rotulo}
                className="bg-panel-raised rounded-[10px] p-3 shadow-[inset_0_0_0_1px_rgb(148_163_184_/_0.14)]"
              >
                <div className="font-mono text-[10px] tracking-[0.06em] text-ondark-dim">
                  {cartao.rotulo}
                </div>
                <div className="mt-1.5 text-lg font-semibold text-ondark tracking-tight">
                  {cartao.valor}
                </div>
                <div className="mt-1 text-[10.5px] text-positive">{cartao.nota}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 overflow-hidden bg-panel-raised rounded-[10px] shadow-[inset_0_0_0_1px_rgb(148_163_184_/_0.14)]">
            {painel.linhas.map((linha) => (
              <div
                key={linha.doc}
                className="grid grid-cols-[88px_1fr_78px] items-center gap-3 border-hairline border-b px-3.5 py-2.5 text-[11.5px] text-ondark-soft last:border-b-0 sm:grid-cols-[88px_1fr_92px_78px]"
              >
                <span className="truncate font-mono text-ondark-link">{linha.doc}</span>
                <span className="truncate">{linha.cliente}</span>
                <span className="hidden text-ondark font-mono sm:inline">
                  {linha.valor}
                </span>
                <span
                  className={
                    linha.tom === "ok"
                      ? "justify-self-start rounded-full bg-positive/15 px-2 py-0.5 text-[10px] whitespace-nowrap text-positive"
                      : "justify-self-start rounded-full bg-accent-soft-foreground/15 px-2 py-0.5 text-[10px] whitespace-nowrap text-ondark-link"
                  }
                >
                  {linha.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
