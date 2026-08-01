import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ArcoSyntax } from "@/components/ui/ArcoSyntax";
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

/**
 * Ato 07 — Contato (peso 5): a banda em gradiente fecha o fio violeta→azul
 * (stop indigo na entrada do .cta-gradiente) com o ArcoSyntax como ornamento
 * de canto — as vars de cor do arco são sobrescritas localmente para ler em
 * branco sobre o azul. Canais diretos reais + formulário (§12).
 */
export function ContatoSection() {
  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          {/* O CTA de fechamento é o cabeçalho desta seção, não uma seção
              própria: dois CTAs seguidos no fim da página se anulam. */}
          <div className="cta-gradiente relative -mx-5 overflow-hidden px-5 py-10 text-center sm:px-12 md:mx-0 md:rounded-[20px] md:py-20">
            <ArcoSyntax className="pointer-events-none absolute -right-20 -bottom-28 w-[340px] opacity-70 [--color-hairline-strong:rgb(255_255_255/0.16)] [--glow-color:rgb(255_255_255/0.5)] md:-right-14 md:-bottom-24 md:w-[400px]" />

            <p className="relative font-mono text-xs font-medium tracking-[0.1em] text-white/70 uppercase">
              <span className="text-white/45">
                07 <span aria-hidden>/</span>{" "}
              </span>
              {contatoSecao.overline}
            </p>

            <h2 className="font-display relative mx-auto mt-4 max-w-3xl text-[28px] leading-[1.12] font-semibold tracking-[-0.03em] text-pretty text-white md:text-[52px] md:leading-[1.08]">
              {contatoSecao.titulo}
            </h2>

            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-white/80 md:mt-5 md:text-lg">
              {contatoSecao.subtitulo}
            </p>

            <div className="relative mt-9 flex justify-center">
              <CtaLink href={contatoSecao.cta.href} variante="inverso" comSeta>
                {contatoSecao.cta.rotulo}
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-10 px-5 md:mt-16 md:gap-12 md:px-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
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
                    className="borda-gradiente text-accent-soft-foreground mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg"
                  >
                    <canal.icone className="size-4" strokeWidth={1.75} />
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
            className="border-border bg-surface-secondary rounded-2xl border p-4 sm:p-8"
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
