import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { MarcaSyntax } from "@/components/ui/MarcaSyntax";
import { contato, empresa, navAcoes, navPrincipal } from "@/content/pt-BR/site";

/**
 * Rodapé. Dados reais do site atual: endereço da matriz, telefones do Brasil e
 * do Paraguai, e-mail e fundação em 2006.
 *
 * Fundo próprio (--color-footer), mais escuro que a folha: é ele que cobre os
 * stops claros do gradiente da página, onde nenhum texto poderia encostar.
 */
export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_1fr_1.2fr]">
          <div>
            <MarcaSyntax tamanho="lg" />

            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Sistemas web, aplicativos e automação para empresas do Brasil e do
              Paraguai. No mercado desde {empresa.fundacao}.
            </p>

            <div className="mt-6">
              <CtaLink href={navAcoes.contato.href} tamanho="md">
                {navAcoes.contato.rotulo}
              </CtaLink>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-footer-muted font-mono text-xs font-medium tracking-[0.1em] uppercase">
              Navegação
            </h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 text-sm md:flex md:flex-col md:gap-1">
              {navPrincipal.map((item) => (
                <li key={item.rotulo}>
                  <a
                    href={item.href}
                    className="text-footer-muted inline-block py-2 transition-colors hover:text-footer-foreground"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contato"
                  className="text-footer-muted inline-block py-2 transition-colors hover:text-footer-foreground"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-footer-muted font-mono text-xs font-medium tracking-[0.1em] uppercase">
              Contato
            </h2>
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              <li>
                <a
                  href={contato.telefoneHref}
                  className="text-footer-muted inline-flex items-center gap-2 py-2 transition-colors hover:text-footer-foreground"
                >
                  <Phone aria-hidden className="text-accent-soft-foreground size-4 shrink-0" />
                  {contato.telefone}
                </a>
              </li>
              <li>
                <a
                  href={contato.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-footer-muted inline-flex items-center gap-2 py-2 transition-colors hover:text-footer-foreground"
                >
                  <MessageCircle aria-hidden className="text-accent-soft-foreground size-4 shrink-0" />
                  {contato.celular} · WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contato.telefonePyHref}
                  className="text-footer-muted inline-flex items-center gap-2 py-2 transition-colors hover:text-footer-foreground"
                >
                  <Phone aria-hidden className="text-accent-soft-foreground size-4 shrink-0" />
                  {contato.telefonePy} · Paraguai
                </a>
              </li>
              <li>
                <a
                  href={contato.emailHref}
                  className="text-footer-muted inline-flex items-center gap-2 py-2 break-all transition-colors hover:text-footer-foreground"
                >
                  <Mail aria-hidden className="text-accent-soft-foreground size-4 shrink-0" />
                  {contato.email}
                </a>
              </li>
              <li>
                <a
                  href={empresa.mapaHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-footer-muted inline-flex items-start gap-2 py-2 transition-colors hover:text-footer-foreground"
                >
                  <MapPin aria-hidden className="mt-0.5 text-accent-soft-foreground size-4 shrink-0" />
                  <span>
                    {empresa.endereco}
                    <br />
                    Filial: {empresa.filial}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-footer-muted mt-12 border-t border-white/10 pt-6 text-xs">
          © {ano} {empresa.razaoSocial}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
