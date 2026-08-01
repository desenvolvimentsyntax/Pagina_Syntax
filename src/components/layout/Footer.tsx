import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { CtaLink } from "@/components/ui/CtaLink";
import { MarcaSyntax } from "@/components/ui/MarcaSyntax";
import {
  contato,
  empresa,
  navAcoes,
  navRodape,
  navSolucoes,
} from "@/content/pt-BR/site";
import { ui } from "@/content/pt-BR/ui";

/**
 * Rodapé em quatro colunas: marca, navegação dos 9 atos, soluções (âncoras
 * hoje; viram as rotas da fatia 4 do §15) e contato completo. Dados reais do
 * site atual. CNPJ só renderiza quando `empresa.cnpj` for confirmado (§11).
 *
 * Fundo próprio (--color-footer), mais escuro que a folha: é ele que cobre os
 * stops claros do gradiente da página, onde nenhum texto poderia encostar.
 */
export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-16">
        {/* Hairline com o nó técnico — a marcação dos atos fecha a página. */}
        <div aria-hidden className="mb-10 flex items-center md:mb-12">
          <span className="bg-accent-soft-foreground/60 size-1 shrink-0 rounded-full" />
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_1fr_1.1fr_1.3fr]">
          <div>
            <MarcaSyntax tamanho="lg" />

            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              {ui.rodape.descricao}
            </p>

            <div className="mt-6">
              <CtaLink href={navAcoes.contato.href} tamanho="md">
                {navAcoes.contato.rotulo}
              </CtaLink>
            </div>
          </div>

          <nav aria-label={ui.rodape.navegacaoAria}>
            <h2 className="text-footer-muted font-mono text-xs font-medium tracking-[0.1em] uppercase">
              {ui.rodape.colunaNavegacao}
            </h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 text-sm lg:flex lg:flex-col lg:gap-1">
              {navRodape.map((item) => (
                <li key={item.rotulo}>
                  <a
                    href={item.href}
                    className="text-footer-muted inline-block py-2.5 transition-colors hover:text-footer-foreground"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={ui.rodape.solucoesAria}>
            <h2 className="text-footer-muted font-mono text-xs font-medium tracking-[0.1em] uppercase">
              {ui.rodape.colunaSolucoes}
            </h2>
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              {navSolucoes.map((item) => (
                <li key={item.rotulo}>
                  <a
                    href={item.href}
                    className="text-footer-muted inline-block py-2.5 transition-colors hover:text-footer-foreground"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-footer-muted font-mono text-xs font-medium tracking-[0.1em] uppercase">
              {ui.rodape.colunaContato}
            </h2>
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              <li>
                <a
                  href={contato.telefoneHref}
                  className="text-footer-muted inline-flex items-center gap-2 py-2.5 transition-colors hover:text-footer-foreground"
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
                  className="text-footer-muted inline-flex items-center gap-2 py-2.5 transition-colors hover:text-footer-foreground"
                >
                  <MessageCircle aria-hidden className="text-accent-soft-foreground size-4 shrink-0" />
                  {contato.celular} · {ui.rodape.sufixoWhatsApp}
                </a>
              </li>
              <li>
                <a
                  href={contato.telefonePyHref}
                  className="text-footer-muted inline-flex items-center gap-2 py-2.5 transition-colors hover:text-footer-foreground"
                >
                  <Phone aria-hidden className="text-accent-soft-foreground size-4 shrink-0" />
                  {contato.telefonePy} · {ui.rodape.sufixoParaguai}
                </a>
              </li>
              <li>
                <a
                  href={contato.emailHref}
                  className="text-footer-muted inline-flex items-center gap-2 py-2.5 break-all transition-colors hover:text-footer-foreground"
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
                  className="text-footer-muted inline-flex items-start gap-2 py-2.5 transition-colors hover:text-footer-foreground"
                >
                  <MapPin aria-hidden className="text-accent-soft-foreground mt-0.5 size-4 shrink-0" />
                  <span>
                    {empresa.endereco}
                    <br />
                    {ui.rodape.filialPrefixo} {empresa.filial}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Slots aguardando confirmação: política de privacidade (linkar quando
            a página existir) e seletor de idioma (§18, fatia 5). */}
        <div className="text-footer-muted mt-12 flex flex-col gap-1.5 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {empresa.razaoSocial}. {ui.rodape.direitos}
          </p>
          {empresa.cnpj ? (
            <p>
              {ui.rodape.cnpjRotulo} {empresa.cnpj}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
