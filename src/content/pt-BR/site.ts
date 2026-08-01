/**
 * Dados institucionais — pt-BR.
 * Tudo aqui foi extraído do site atual (syntaxsistemas.com.br): telefones BR e
 * PY, e-mail, endereço da matriz e fundação em 2006. Nada é inventado (§11).
 */

export const empresa = {
  nome: "Syntax",
  sobrenome: "Sistemas",
  razaoSocial: "Syntax Sistemas Empresariais",
  fundacao: "2006",
  matriz: "Sorocaba · SP · Brasil",
  filial: "Pedro Juan Caballero · Paraguai",
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

/*
 * Seis itens é o teto: com sete o menu estoura em 1024px. A ordem segue os
 * 9 atos da narrativa (§7); Ecossistema (virou faixa) e Projetos (fundido em
 * Produtos) saíram — as âncoras continuam navegáveis pelo footer.
 */
export const navPrincipal: readonly ItemNav[] = [
  { rotulo: "Quem somos", href: "#quem-somos", secao: "quem-somos" },
  { rotulo: "Segmentos", href: "#segmentos", secao: "segmentos" },
  { rotulo: "Soluções", href: "#solucoes", secao: "solucoes" },
  { rotulo: "Produtos", href: "#produtos", secao: "produtos" },
  { rotulo: "Método", href: "#metodo", secao: "metodo" },
  { rotulo: "Diferenciais", href: "#diferenciais", secao: "diferenciais" },
] as const;

export const navAcoes = {
  contato: { rotulo: "Solicitar demonstração", href: "#contato" },
} as const;
