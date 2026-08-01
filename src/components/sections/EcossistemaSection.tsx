import { Chip, Tabs } from "@heroui/react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecossistema } from "@/content/pt-BR/home";

/**
 * Ecossistema de tecnologia em três abas. Substitui a antiga TecnologiasSection
 * — as duas eram chips de stack, e manter as duas repetia a informação.
 *
 * Curta de propósito: o público não é técnico (§1). Serve de credibilidade,
 * não de vitrine de jargão. Tabs do HeroUI não exige "use client" (§3.9).
 */
export function EcossistemaSection() {
  return (
    <section id="ecossistema" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            overline={ecossistema.overline}
            titulo={ecossistema.titulo}
            subtitulo={ecossistema.subtitulo}
          />
        </Reveal>

        <Tabs className="mt-10" defaultSelectedKey={ecossistema.abas[0].id}>
          <Tabs.ListContainer>
            <Tabs.List aria-label="Ecossistema de tecnologia">
              {ecossistema.abas.map((aba) => (
                <Tabs.Tab key={aba.id} id={aba.id}>
                  {/* Rótulo completo não cabe na lista em 320px */}
                  <span className="sm:hidden">{aba.rotuloCurto}</span>
                  <span className="hidden sm:inline">{aba.rotulo}</span>
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>

          {ecossistema.abas.map((aba) => (
            <Tabs.Panel key={aba.id} id={aba.id} className="pt-6 md:pt-8">
              <div className="border-border bg-surface grid items-center gap-8 rounded-2xl border p-4 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <p className="text-foreground-base/70 max-w-md text-base leading-relaxed">
                  {aba.texto}
                </p>

                <ul className="flex flex-wrap gap-2.5 lg:justify-end">
                  {aba.chips.map((chip) => (
                    <li key={chip}>
                      <Chip variant="secondary">{chip}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
