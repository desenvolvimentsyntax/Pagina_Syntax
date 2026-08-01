import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { FormOrcamento } from "@/components/ui/FormOrcamento";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section id="contato" className="bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            overline={contatoSecao.overline}
            titulo={contatoSecao.titulo}
            subtitulo={contatoSecao.subtitulo}
          />

          <h3 className="mt-10 text-xs font-medium tracking-[0.1em] text-foreground/50 uppercase">
            {contatoSecao.canaisTitulo}
          </h3>

          <ul className="mt-4 flex flex-col gap-1">
            {CANAIS.map((canal) => (
              <li key={`${canal.rotulo}-${canal.valor}`}>
                <a
                  href={canal.href}
                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface"
                  {...(canal.externo
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
                  >
                    <canal.icone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {canal.rotulo}
                    </span>
                    <span className="block text-sm text-foreground/60">
                      {canal.valor}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal atraso={80}>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
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
