import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { MarcaSyntax } from "@/components/ui/MarcaSyntax";
import { conteudoDe } from "@/content";
import type { Locale } from "@/lib/routes";

/**
 * Rodapé em quatro colunas: marca, navegação da home, soluções (âncoras hoje;
 * viram as rotas da fatia 4 do §15) e canais diretos. Dados reais do site
 * atual — o CNPJ só renderiza quando `empresa.cnpj` for confirmado (§11).
 *
 * Não é uma seção nova: repete o `bg-escuro` da banda de contato e se separa
 * dela só por um hairline, para a página fechar numa única massa escura em vez
 * de ganhar mais um bloco. Por isso também não há CTA aqui — o formulário
 * logo acima já é a captação.
 *
 * `sobre-escuro` troca o anel de foco para o azul claro: o azul institucional
 * do `--focus` desaparece sobre #0f172a (§9).
 */

/* text-sm tem entrelinha de 20px; py-3 (24px) fecha o alvo de toque de 44px.
   Sem utilitário de display: quem usa escolhe, para não empilhar `inline-block`
   e `flex` na mesma âncora. */
const LINK = "py-3 text-ondark-muted transition-colors hover:text-ondark";

/* Mesma receita de eyebrow do SectionHeading tom="escuro": sobre #0f172a o
   rótulo mono é sempre `text-azul-claro` (10,10:1). Em `text-ondark-muted` ele
   ficava na cor exata dos links da coluna e a hierarquia sumia. */
const CABECALHO_COLUNA =
  "font-mono text-xs font-semibold uppercase tracking-[0.1em] text-azul-claro";

const ICONE = "size-4 shrink-0 text-azul-claro";

export function Footer({ locale }: { locale: Locale }) {
  const conteudo = conteudoDe(locale);
  const { contato, empresa, navRodape, navSolucoes, slogan } = conteudo.site;
  const { ui } = conteudo.ui;
  const ano = new Date().getFullYear();

  return (
    <footer className="sobre-escuro bg-escuro border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr] lg:gap-8">
          <div>
            {/* O PNG da marca tem o lettering escuro e sumiria no #0f172a. Em
                vez de recolorir o logo, ele ganha um apoio claro do tamanho do
                conteúdo — mesma lógica do §11 do CLAUDE.md. */}
            <div className="bg-surface inline-flex w-fit rounded-xl px-4 py-3">
              <MarcaSyntax tamanho="rodape" alt={ui.marca.alt} />
            </div>

            {/* Assinatura de marca — era a faixa própria da home até a fatia
                3.10, quando a dobra de segmentos ocupou o lugar dela. */}
            <p className="font-display text-ondark mt-5 text-[15px] leading-snug font-bold">
              {slogan.inicio}{" "}
              <span className="text-azul-claro">{slogan.destaque}</span>
            </p>

            <p className="text-ondark-muted mt-2.5 max-w-sm text-sm leading-relaxed">
              {ui.rodape.descricao}
            </p>
          </div>

          <nav aria-label={ui.rodape.navegacaoAria}>
            <h2 className={CABECALHO_COLUNA}>{ui.rodape.colunaNavegacao}</h2>
            <ul className="mt-2 grid grid-cols-2 text-sm sm:grid-cols-1">
              {navRodape.map((item) => (
                <li key={item.rotulo}>
                  <a href={item.href} className={`${LINK} inline-block`}>
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={ui.rodape.solucoesAria}>
            <h2 className={CABECALHO_COLUNA}>{ui.rodape.colunaSolucoes}</h2>
            <ul className="mt-2 flex flex-col text-sm">
              {navSolucoes.map((item) => (
                <li key={item.rotulo}>
                  <a href={item.href} className={`${LINK} inline-block`}>
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={CABECALHO_COLUNA}>{ui.rodape.colunaContato}</h2>
            <ul className="mt-2 flex flex-col text-sm">
              <li>
                <a
                  href={contato.telefoneHref}
                  className={`${LINK} flex items-center gap-2.5`}
                >
                  <Phone aria-hidden className={ICONE} />
                  {contato.telefone}
                </a>
              </li>
              <li>
                <a
                  href={contato.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${LINK} flex items-center gap-2.5`}
                >
                  <MessageCircle aria-hidden className={ICONE} />
                  {contato.celular} · {ui.rodape.sufixoWhatsApp}
                </a>
              </li>
              <li>
                <a
                  href={contato.telefonePyHref}
                  className={`${LINK} flex items-center gap-2.5`}
                >
                  <Phone aria-hidden className={ICONE} />
                  {contato.telefonePy} · {ui.rodape.sufixoParaguai}
                </a>
              </li>
              <li>
                <a
                  href={contato.emailHref}
                  className={`${LINK} flex items-center gap-2.5 break-all`}
                >
                  <Mail aria-hidden className={ICONE} />
                  {contato.email}
                </a>
              </li>
              <li>
                <a
                  href={empresa.mapaHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${LINK} flex items-start gap-2.5 leading-relaxed`}
                >
                  <MapPin aria-hidden className={`${ICONE} mt-0.5`} />
                  <span>{empresa.endereco}</span>
                </a>
                <p className="text-ondark-muted pb-3 pl-6 text-sm">
                  {ui.rodape.filialPrefixo} {empresa.filial}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-ondark-muted mt-12 flex flex-col gap-1.5 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
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
