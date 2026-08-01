import { segmentos } from "@/content/pt-BR/home";

/** Faixa de segmentos atendidos, logo abaixo do hero. Dados do site atual. */
export function SegmentosSection() {
  return (
    <section
      aria-label={segmentos.rotulo}
      className="border-y border-border bg-surface"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-9 lg:flex-row lg:items-center lg:gap-10">
        <h2 className="text-xs font-medium tracking-[0.1em] whitespace-nowrap text-foreground/50 uppercase">
          {segmentos.rotulo}
        </h2>

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2.5 text-[15px] font-medium tracking-tight text-foreground/60">
          {segmentos.itens.map((item) => (
            <li key={item} className="whitespace-nowrap">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
