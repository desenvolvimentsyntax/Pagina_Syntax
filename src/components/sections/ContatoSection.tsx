import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { FormOrcamento } from "@/components/ui/FormOrcamento";
import { Reveal } from "@/components/ui/Reveal";
import { contatoSecao } from "@/content/pt-BR/home";
import { contato, empresa } from "@/content/pt-BR/site";

const CANAIS = [
  {
    icone: MessageCircle,
    rotulo: "WhatsApp",
    valor: contato.celular,
    href: contato.whatsappHref,
    externo: true,
  },
  {
    icone: Phone,
    rotulo: "Telefone",
    valor: contato.telefone,
    href: contato.telefoneHref,
    externo: false,
  },
  {
    icone: Phone,
    rotulo: "Paraguai",
    valor: contato.telefonePy,
    href: contato.telefonePyHref,
    externo: false,
  },
  {
    icone: Mail,
    rotulo: "E-mail",
    valor: contato.email,
    href: contato.emailHref,
    externo: false,
  },
  {
    icone: MapPin,
    rotulo: "Matriz",
    valor: empresa.endereco,
    href: empresa.mapaHref,
    externo: true,
  },
] as const;

/** Contato: canais diretos reais + formulário de orçamento (§12). */
export function ContatoSection() {
  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          {/* O CTA de fechamento é o cabeçalho desta seção, não uma seção
              própria: dois CTAs seguidos no fim da página se anulam. */}
          <div className="cta-gradiente relative overflow-hidden rounded-[20px] px-6 py-14 text-center sm:px-12 md:py-20">
            <p className="font-mono text-xs font-medium tracking-[0.1em] text-white/70 uppercase">
              {contatoSecao.overline}
            </p>

            <h2 className="font-display mx-auto mt-4 max-w-3xl text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-white md:text-[52px]">
              {contatoSecao.titulo}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-pretty text-white/80">
              {contatoSecao.subtitulo}
            </p>

            <div className="mt-9 flex justify-center">
              <CtaLink href={contatoSecao.cta.href} variante="inverso" comSeta>
                {contatoSecao.cta.rotulo}
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
        <Reveal>
          <h3 className="text-micro font-mono text-xs font-medium tracking-[0.1em] uppercase">
            {contatoSecao.canaisTitulo}
          </h3>

          <ul className="mt-4 flex flex-col gap-1">
            {CANAIS.map((canal) => (
              <li key={`${canal.rotulo}-${canal.valor}`}>
                <a
                  href={canal.href}
                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface-secondary"
                  {...(canal.externo
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-soft-foreground"
                  >
                    <canal.icone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {canal.rotulo}
                    </span>
                    <span className="block text-sm text-muted">
                      {canal.valor}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal atraso={80}>
          <div
            id="formulario"
            className="border-border bg-surface-secondary rounded-2xl border p-6 sm:p-8"
          >
            <h3 className="font-display text-foreground text-xl font-semibold tracking-tight">
              {contatoSecao.form.titulo}
            </h3>
            <div className="mt-6">
              <FormOrcamento />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
