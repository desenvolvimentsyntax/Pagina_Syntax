import { FaixaTecnologias } from "@/components/ui/FaixaTecnologias";
import { ecossistema } from "@/content/pt-BR/home";

/**
 * Faixa entre os atos 05 e 06 — Ecossistema (peso 1): o respiro entre Método
 * e Diferenciais. Herdou o nicho da antiga faixa de Segmentos — uma frase de
 * credibilidade + os chips de stack numa linha deslizante. Curta de
 * propósito: o público não é técnico (§1). Sem SectionHeading (§7, faixa).
 */
export function EcossistemaSection() {
  return (
    <section id="ecossistema" className="border-border border-y py-10 md:py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 md:px-6 lg:flex-row lg:items-center lg:gap-12">
        <div className="shrink-0 lg:max-w-sm">
          <h2 className="text-accent-soft-foreground font-mono text-xs font-medium tracking-[0.1em] uppercase">
            {ecossistema.rotulo}
          </h2>
          <p className="text-foreground-base/70 mt-2 text-sm leading-relaxed text-pretty">
            {ecossistema.texto}
          </p>
        </div>

        <FaixaTecnologias
          rotulo={ecossistema.rotulo}
          chips={ecossistema.chips}
          className="-mx-5 px-5 md:mx-0 md:px-0 lg:min-w-0 lg:flex-1"
        />
      </div>
    </section>
  );
}
