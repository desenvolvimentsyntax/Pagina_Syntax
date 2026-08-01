import { Chip } from "@heroui/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projetos } from "@/content/pt-BR/home";

const COR_SELO = {
  ok: "success",
  info: "accent",
  neutro: "default",
} as const;

/**
 * Projetos verificáveis no lugar de "cases" com depoimento inventado (§11/§13):
 * a demo aberta do Dex é a prova pública; o resto aponta para conversa real.
 */
export function ProjetosSection() {
  return (
    <section id="projetos" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            overline={projetos.overline}
            titulo={projetos.titulo}
            subtitulo={projetos.subtitulo}
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {projetos.itens.map((item, i) => (
            <li key={item.titulo} className="h-full">
              <Reveal atraso={i * 60} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border-border bg-surface border p-4 sm:p-6">
                  <div>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={COR_SELO[item.tomSelo as keyof typeof COR_SELO]}
                    >
                      {item.selo}
                    </Chip>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground-base/70">
                    {item.texto}
                  </p>

                  <a
                    href={item.cta.href}
                    className="mt-3 inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-accent-soft-foreground hover:underline"
                    {...(item.cta.externo
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {item.cta.rotulo}
                    {item.cta.externo ? (
                      <ArrowUpRight aria-hidden className="size-4" />
                    ) : (
                      <ArrowRight aria-hidden className="size-4" />
                    )}
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
