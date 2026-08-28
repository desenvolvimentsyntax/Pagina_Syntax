import { Check } from "lucide-react";

import { FormContato } from "@/components/ui/FormContato";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/** py estendido: a linha de 14,5px tem 26px — o alvo de toque precisa de 44px (§9). */
const CANAL = "inline-block py-2.5 transition-colors hover:text-ondark-soft";

/**
 * Seção 7 — captação. Fecha a página no escuro para o card branco do
 * formulário virar o ponto mais claro da dobra, que é onde o olho para.
 * `sobre-escuro` troca o anel de foco pelo azul claro (o institucional some
 * sobre #0f172a).
 */
export function ContatoSection({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { contatoSecao } = conteudo.home;
  const { contato, empresa } = conteudo.site;
  const { ui } = conteudo.ui;
  const { form } = contatoSecao;

  return (
    <section id="contato" className="sobre-escuro bg-escuro py-16 md:py-18">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:px-12">
        <Reveal>
          <SectionHeading
            tom="escuro"
            etapa="10"
            overline={contatoSecao.overline}
            titulo={contatoSecao.titulo}
            subtitulo={contatoSecao.subtitulo}
          />

          <ul className="mt-6 grid gap-3.5 text-[15.5px] text-ondark-soft">
            {contatoSecao.provas.map((prova) => (
              <li key={prova} className="flex items-center gap-3">
                <Check
                  aria-hidden
                  strokeWidth={2.2}
                  className="size-5 shrink-0 text-verde"
                />
                {prova}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-ondark-muted/20 pt-6 text-[14.5px] leading-[1.8] text-ondark-muted">
            <p className="flex flex-wrap items-center gap-x-2">
              <a
                href={contato.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className={CANAL}
              >
                {`${ui.canais.whatsapp} ${contato.celular}`}
              </a>
              <span aria-hidden>·</span>
              <a href={contato.telefoneHref} className={CANAL}>
                {`${ui.canais.telefone} ${contato.telefone}`}
              </a>
            </p>
            <p>
              <a href={contato.emailHref} className={CANAL}>
                {contato.email}
              </a>
            </p>
            <p className="flex flex-wrap items-center gap-x-2 pt-1">
              {empresa.matrizCurta}
              <span aria-hidden>·</span>
              {empresa.filialCurta}
            </p>
          </div>
        </Reveal>

        <Reveal efeito="lado-inverso">
          <div className="rounded-2xl bg-surface p-6 shadow-form sm:p-9">
            <h3 className="font-display text-[20px] font-bold text-foreground">
              {form.titulo}
            </h3>
            <p className="mt-1 text-[14.5px] text-muted">{form.subtitulo}</p>

            <div className="mt-6">
              <FormContato
                form={form}
                validacao={ui.validacao}
                whatsappHref={contato.whatsappHref}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
