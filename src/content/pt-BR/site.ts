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

/**
 * Assinatura de marca. Foi a faixa própria entre as dobras 04 e 05 até a
 * fatia 3.10, quando a dobra de segmentos ocupou o lugar — agora fecha o
 * rodapé, sob a marca. Mora aqui (e não em home.ts) porque o rodapé é
 * compartilhado por todas as páginas.
 */
export const slogan = {
  inicio: "Soluções que conectam.",
  destaque: "Tecnologia que transforma.",
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

/**
 * Menu de topo, na ordem do funil da home.
 *
 * Os href são "/#secao" e não "#secao": desde que existe a rota /planos, uma
 * âncora nua levaria para /planos#sobre, que não existe. Com o caminho na
 * frente o navegador rola na home e navega a partir de qualquer outra página —
 * e, quando já se está na home, continua sendo rolagem no mesmo documento.
 */
export const navPrincipal: readonly ItemNav[] = [
  { rotulo: "Planos", href: "/#planos", secao: "planos" },
  { rotulo: "Como funciona", href: "/#como-funciona", secao: "como-funciona" },
  { rotulo: "Sobre", href: "/#sobre", secao: "sobre" },
  { rotulo: "Contato", href: "/#contato", secao: "contato" },
] as const;

export const navAcoes = {
  /**
   * CTA do header. Numa landing de funil ele é a ação que o visitante ainda
   * não tomou: ver o preço. O WhatsApp continua a um toque no botão flutuante
   * e no formulário, então nada se perde ao trocar.
   */
  planos: { rotulo: "Ver planos e preços", href: "/planos" },
  whatsapp: { rotulo: "Falar no WhatsApp", href: contato.whatsappHref },
} as const;

/** O rodapé repete a navegação da home mais os canais diretos. */
export const navRodape = [
  { rotulo: "Planos e preços", href: "/planos" },
  { rotulo: "Demonstração", href: "/#demonstracao" },
  { rotulo: "Como funciona", href: "/#como-funciona" },
  { rotulo: "Sobre", href: "/#sobre" },
  { rotulo: "Contato", href: "/#contato" },
] as const;

/**
 * Coluna de produtos do rodapé — a família E-Syntax e as linhas orçadas por
 * projeto. Os três planos apontam para a âncora deles em /planos; na fatia 4
 * (§15) as duas últimas ganham rota própria em /solucoes/<slug> (§18).
 */
export const navSolucoes = [
  { rotulo: "Syntax FACT · Básico", href: "/planos#fact" },
  { rotulo: "Syntax PRO · Profissional", href: "/planos#pro" },
  { rotulo: "Syntax PREMIUM", href: "/planos#premium" },
  { rotulo: "Syntax ERP", href: "/#erp" },
  { rotulo: "Projetos sob medida", href: "/#erp" },
] as const;
