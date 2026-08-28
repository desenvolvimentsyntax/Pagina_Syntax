import { Card } from "@heroui/react";

import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Trajetória da empresa, ao lado do texto do Sobre. O container é o Card do
 * HeroUI (§3 regra 2); só a timeline em si é layout próprio, porque a v3 não
 * tem esse componente.
 *
 * O trilho é desenhado por marco (e omitido no último) em vez de uma linha
 * absoluta única — assim ele acompanha a altura real de cada bloco de texto,
 * que varia com a quebra de linha. Estática de propósito: o design não anima
 * a trajetória.
 */
export function LinhaDoTempo({ locale }: { locale: Locale }) {
  const { sobre } = conteudoDe(locale).home;
  const { label, marcos } = sobre.timeline;

  return (
    <Card
      variant="secondary"
      className="border-border gap-5 rounded-2xl border p-6 sm:p-8"
    >
      <Card.Header>
        <Card.Title className="text-marca font-mono text-[13px] font-semibold tracking-[0.1em] uppercase">
          {label}
        </Card.Title>
      </Card.Header>

      <ol>
        {marcos.map((marco, indice) => {
          const ultimo = indice === marcos.length - 1;

          return (
            <li key={marco.titulo} className="flex gap-4">
              <div aria-hidden className="flex flex-col items-center">
                <span
                  className={`mt-1.5 size-3 shrink-0 rounded-full ${
                    ultimo ? "bg-azul-vivo ring-azul-palido ring-4" : "bg-marca"
                  }`}
                />
                {ultimo ? null : (
                  <span className="bg-linha-timeline w-[2px] flex-1" />
                )}
              </div>

              <div className={ultimo ? undefined : "pb-6"}>
                <p className="text-foreground text-base font-bold">
                  {marco.titulo}
                </p>
                <p className="text-muted text-[15px] leading-relaxed">
                  {marco.texto}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
