import { Card } from "@heroui/react";
import {
  Braces,
  Globe,
  LayoutDashboard,
  MousePointerClick,
  PanelsTopLeft,
  PencilRuler,
  UtensilsCrossed,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solucoes } from "@/content/pt-BR/home";

const ICONES: Record<string, LucideIcon> = {
  "sistemas-web": Globe,
  administrativo: LayoutDashboard,
  restaurantes: UtensilsCrossed,
  "landing-pages": MousePointerClick,
  sites: PanelsTopLeft,
  "sob-medida": PencilRuler,
  integracoes: Workflow,
  apis: Braces,
};

/** Grade das oito frentes de desenvolvimento. Cards HeroUI (§3, mapa de uso). */
export function SolucoesSection() {
  return (
    <section id="solucoes" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            overline={solucoes.overline}
            titulo={solucoes.titulo}
            subtitulo={solucoes.subtitulo}
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solucoes.itens.map((item, i) => {
            const Icone = ICONES[item.icone];

            return (
              <li key={item.titulo} className="h-full">
                <Reveal atraso={(i % 4) * 60} className="h-full">
                  <Card className="h-full border border-border bg-surface transition-[border-color,box-shadow] hover:border-accent-soft-foreground/40 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.75)]">
                    <Card.Header>
                      <span
                        aria-hidden
                        className="mb-3 flex size-11 items-center justify-center rounded-lg bg-accent/15 text-accent-soft-foreground"
                      >
                        {Icone ? <Icone className="size-5" /> : null}
                      </span>
                      <Card.Title>{item.titulo}</Card.Title>
                      <Card.Description>{item.texto}</Card.Description>
                    </Card.Header>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
