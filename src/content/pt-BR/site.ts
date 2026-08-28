/**
 * Dados institucionais — pt-BR.
 * Tudo aqui foi extraído do site atual (syntaxsistemas.com.br): telefones BR e
 * PY, e-mail, endereço da matriz e fundação em 2006. Nada é inventado (§11).
 */

export const empresa = {
  nome: "Syntax",
  sobrenome: "Sistemas",
  razaoSocial: "Syntax Sistemas Empresariais",
  /**
   * ⚠️ conferir — o CNPJ não existe em nenhuma fonte pública consultada.
   * Vazio = o rodapé não renderiza a linha. Não publicar sem confirmação.
   */
  cnpj: "",
  fundacao: "2006",
  matriz: "Sorocaba · SP · Brasil",
  filial: "Pedro Juan Caballero · Paraguai",
  /* Formas curtas para linhas que já usam "·" como separador entre as duas
     cidades — com as longas o leitor vê cinco itens em vez de dois. */
  matrizCurta: "Sorocaba SP",
  filialCurta: "Pedro Juan Caballero PY",
  atuacao: "Mercosul",
  endereco: "R. Júlio César Iorio, 48 — Jd. Res. Villa Amato, Sorocaba - SP",
  mapaHref:
    "https://www.google.com/maps/place/R.+J%C3%BAlio+C%C3%A9sar+Iorio,+48+-+Jardim+Residencial+Villa+Amato,+Sorocaba+-+SP/@-23.448508,-47.380076,16z",
} as const;

export const contato = {
  telefone: "(15) 3325-1255",
  telefoneHref: "tel:+551533251255",
  celular: "(15) 99808-9820",
  whatsappHref: "https://wa.me/5515998089820",
  telefonePy: "+595 975 983-103",
  telefonePyHref: "tel:+595975983103",
  email: "comercial@syntaxsistemas.com.br",
  emailHref: "mailto:comercial@syntaxsistemas.com.br",
  /** Mensagem inicial do botão flutuante de WhatsApp (§12). */
  whatsappTexto:
    "Olá! Vim pelo site da Syntax e gostaria de conversar sobre um sistema.",
} as const;

export interface ItemNav {
  rotulo: string;
  href: string;
  /** id da seção correspondente, usado pelo scrollspy do header. */
  secao: string;
}

/** Os quatro itens do menu do design, na ordem das seções da home. */
export const navPrincipal: readonly ItemNav[] = [
  { rotulo: "Soluções", href: "#solucoes", secao: "solucoes" },
  { rotulo: "Produtos", href: "#produtos", secao: "produtos" },
  { rotulo: "Sobre", href: "#sobre", secao: "sobre" },
  { rotulo: "Contato", href: "#contato", secao: "contato" },
] as const;

export const navAcoes = {
  /** CTA do header: vai direto ao WhatsApp, não à âncora de contato. */
  whatsapp: { rotulo: "Falar no WhatsApp", href: contato.whatsappHref },
  contato: { rotulo: "Solicitar demonstração", href: "#contato" },
} as const;

/** O rodapé repete a navegação da home mais os canais diretos. */
export const navRodape = [
  { rotulo: "Soluções", href: "#solucoes" },
  { rotulo: "Produtos", href: "#produtos" },
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Contato", href: "#contato" },
] as const;

/**
 * Coluna de soluções do rodapé. Hoje são âncoras da home; na fatia 4 (§15)
 * cada uma vira a rota própria de /solucoes/<slug> (§18).
 */
export const navSolucoes = [
  { rotulo: "Sistema para restaurantes", href: "#solucoes" },
  { rotulo: "Sistema administrativo", href: "#produtos" },
  { rotulo: "Desenvolvimento sob medida", href: "#solucoes" },
  { rotulo: "Sites e landing pages", href: "#solucoes" },
] as const;
