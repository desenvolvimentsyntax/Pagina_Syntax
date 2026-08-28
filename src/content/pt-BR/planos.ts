/**
 * Catálogo de produtos e planos — pt-BR.
 *
 * FONTE DOS NÚMEROS (§11: nada de número inventado): mensalidade, instalação,
 * ponto adicional e a lista de recursos de cada plano foram transcritos da
 * página de preços publicada em https://pdv-syntax.vercel.app/pt/pricing,
 * consultada em 28/08/2026. Nome do plano e a frase de uma linha também são
 * de lá. Se o preço mudar lá, muda aqui — este arquivo é a única cópia.
 *
 * DIVERGÊNCIA CONSCIENTE da página pública: o Roger confirmou em 28/08/2026
 * que o Premium inclui TODAS as funcionalidades — Básico + compras/estoque +
 * financeiro. O /pt/pricing publicado ainda mostra o Premium SEM a parte de
 * estoque; este site já segue a regra confirmada. ⚠️ avisar a Syntax para
 * corrigir a página de pricing do PDV, senão as duas fontes se contradizem.
 *
 * ⚠️ conferir: "todo plano inclui o Syntax MOBILE" foi confirmado pelo
 * Roger em 28/08/2026, mas não consta da página de preços pública.
 */

import { contato } from "@/content/pt-BR/site";

/** Chave da identidade visual — o MarcaProduto resolve cor e pílula. */
export type ChaveProduto = "fact" | "pro" | "premium" | "erp" | "mobile";

export interface Plano {
  /** Identidade de marca (lockup oficial) e âncora da rota /planos. */
  chave: Extract<ChaveProduto, "fact" | "pro" | "premium">;
  /** Nome comercial do plano na página de preços. */
  plano: string;
  /** A frase de uma linha da página de preços — o "para quem é". */
  resumo: string;
  /** Ganho concreto, em linguagem de dono de loja (§13). */
  ganho: string;
  mensal: string;
  instalacao: string;
  recursos: readonly string[];
  /**
   * As três linhas que o card mostra na primeira dobra. Não são recursos
   * novos: agrupam os de `recursos`. "Tudo do Básico" é literal — os seis
   * itens do Básico estão nos três planos.
   */
  destaques: readonly string[];
  /**
   * Realce visual do card no comparativo. "escolhido" é a pílula azul do
   * plano do meio (o único com CTA primário); "completo" é a borda dourada
   * do Premium — realce de curiosidade, sem roubar o botão forte do PRO.
   */
  realce?: "escolhido" | "completo";
}

export const MOEDA = "Gs." as const;

export const planos = [
  {
    chave: "fact",
    destaques: [
      "Emissão de fatura eletrônica",
      "Cadastro de clientes, produtos e preços",
      "Gestão de XML e e-mail automático",
    ],
    plano: "Básico",
    resumo: "Faturamento e cadastros",
    ganho: "Para quem precisa faturar certo e parar de controlar cliente no caderno.",
    mensal: "200.000",
    instalacao: "800.000",
    recursos: [
      "Emissão de fatura",
      "Cadastro de clientes",
      "Cadastro de produtos",
      "Lista de preços",
      "Envio automático de e-mail",
      "Gestão de XML",
    ],
  },
  {
    chave: "pro",
    destaques: [
      "Tudo do Básico",
      "Compras, estoque e inventário",
      "Relatórios gerenciais",
    ],
    plano: "Profissional",
    resumo: "Faturamento, compras, estoque e relatórios",
    ganho: "Para quem tem depósito: a venda baixa o estoque e o relatório fecha sozinho.",
    mensal: "250.000",
    instalacao: "1.500.000",
    realce: "escolhido",
    recursos: [
      "Emissão de fatura",
      "Cadastro de clientes",
      "Cadastro de produtos",
      "Lista de preços",
      "Envio automático de e-mail",
      "Gestão de XML",
      "Controle de compras",
      "Controle de estoque",
      "Inventário",
      "Relatórios gerenciais",
    ],
  },
  {
    chave: "premium",
    destaques: [
      "Tudo do Profissional",
      "Contas a pagar e a receber",
      "Fluxo de caixa e lucratividade",
    ],
    plano: "Premium",
    resumo: "Estoque, financeiro e faturamento — completo",
    ganho: "Para quem quer a operação inteira num lugar só: estoque, contas e lucro.",
    mensal: "300.000",
    instalacao: "1.800.000",
    realce: "completo",
    recursos: [
      "Emissão de fatura",
      "Cadastro de clientes",
      "Cadastro de produtos",
      "Lista de preços",
      "Envio automático de e-mail",
      "Gestão de XML",
      "Controle de compras",
      "Controle de estoque",
      "Inventário",
      "Relatórios gerenciais",
      "Controle financeiro",
      "Contas a pagar",
      "Contas a receber",
      "Fluxo de caixa",
      "Lucratividade",
      "Controle de despesas por centro de custo",
    ],
  },
] as const satisfies readonly Plano[];

export type ChavePlano = (typeof planos)[number]["chave"];

/**
 * Ordem das linhas da tabela comparativa: a união dos recursos dos três
 * planos, agrupada pelo que o comprador está tentando decidir. Deriva do
 * `recursos` acima — quem tem, tem; ninguém marca X à mão.
 */
export const gruposComparacao = [
  {
    titulo: "Faturamento e cadastros",
    recursos: [
      "Emissão de fatura",
      "Cadastro de clientes",
      "Cadastro de produtos",
      "Lista de preços",
      "Envio automático de e-mail",
      "Gestão de XML",
    ],
  },
  {
    titulo: "Compras e estoque",
    recursos: [
      "Controle de compras",
      "Controle de estoque",
      "Inventário",
      "Relatórios gerenciais",
    ],
  },
  {
    titulo: "Financeiro",
    recursos: [
      "Controle financeiro",
      "Contas a pagar",
      "Contas a receber",
      "Fluxo de caixa",
      "Lucratividade",
      "Controle de despesas por centro de custo",
    ],
  },
] as const;

/** Cobranças que valem para os três planos. */
export const condicoes = {
  pontoAdicional: "100.000",
  nota:
    "Valores em guaranis. A instalação é cobrada uma vez; a mensalidade é recorrente. Cada ponto de venda adicional custa Gs. 100.000 por mês, à parte.",
  rotuloMensal: "por mês",
  rotuloInstalacao: "de instalação, cobrada uma vez",
  rotuloPonto: "por ponto de venda adicional/mês",
} as const;

/**
 * A mesma lista, lida pelo contrato.
 *
 * `planos` é `as const`, então seu tipo é a união dos três literais — e nela
 * `realce` só existe nos planos que declaram a chave. Quem percorre a lista
 * para montar UI usa esta, não aquela.
 */
export const listaPlanos: readonly Plano[] = planos;

/** O plano mais barato — a âncora de preço do hero sai daqui, não de valor fixo. */
export const planoDeEntrada: Plano = listaPlanos.reduce((menor, plano) =>
  Number(plano.mensal.replace(/\./g, "")) < Number(menor.mensal.replace(/\./g, ""))
    ? plano
    : menor,
);

/** Mensagem de WhatsApp por plano — o vendedor já sabe do que se trata. */
export function whatsappDoPlano(plano: Plano): string {
  const texto = `Olá! Vim pelo site da Syntax e quero contratar o plano ${plano.plano} (Gs. ${plano.mensal}/mês).`;
  return `${contato.whatsappHref}?text=${encodeURIComponent(texto)}`;
}

/** Rótulos do card de plano e da tabela comparativa (§18: nada solto no JSX). */
export const rotulos = {
  realceEscolhido: "Mais escolhido",
  realceCompleto: "O mais completo",
  /** Prefixo do CTA — o nome do plano entra depois: "Quero o Profissional". */
  ctaContratar: "Quero o",
  ctaDetalhes: "Ver tudo que inclui",
  incluidos: "O que está incluído",
  colunaRecurso: "Recurso",
  tabelaAria: "Comparação de recursos entre os planos Básico, Profissional e Premium",
  temAria: "incluído",
  naoTemAria: "não incluído",
} as const;

/** Copy da rota /planos (§18: nada solto no JSX). */
export const paginaPlanos = {
  meta: {
    title: "Planos e preços do ponto de venda | Syntax Sistemas",
    description:
      "Três planos com preço publicado: Básico Gs. 200.000, Profissional Gs. 250.000 e Premium Gs. 300.000 por mês. Veja recurso por recurso o que cada um inclui.",
  },
  trilha: { home: "Início", atual: "Planos e preços" },
  eyebrow: "Planos e preços",
  titulo: "O preço está aqui. Sem proposta por telefone.",
  intro:
    "Três planos para o ponto de venda no Paraguai. Escolha pelo que a sua operação precisa, confira recurso por recurso e fale com a gente já sabendo quanto custa.",
  comparacao: {
    overline: "Recurso por recurso",
    titulo: "O que entra em cada plano",
    intro:
      "A escada é simples: o Profissional soma compras e estoque ao Básico, e o Premium leva tudo do Profissional mais o financeiro completo.",
  },
} as const;

/**
 * Guia "qual plano é o meu?" — o diferencial da rota /planos sobre a home.
 * Uma situação por plano, na voz do dono (§13); a âncora leva ao card.
 */
export const guiaDecisao = {
  overline: "Qual plano é o meu?",
  titulo: "Escolha pela sua rotina, não pela lista de recursos",
  itens: [
    {
      chave: "fact",
      situacao: "Preciso faturar certo e organizar clientes, produtos e preços.",
    },
    {
      chave: "pro",
      situacao: "Tenho depósito: compro, estoco e reponho mercadoria toda semana.",
    },
    {
      chave: "premium",
      situacao: "Além do estoque, preciso enxergar contas, custos e quanto sobra.",
    },
  ],
  /** Prefixo — o nome comercial entra depois: "Ver o Profissional". */
  cta: "Ver o",
} as const satisfies {
  overline: string;
  titulo: string;
  itens: readonly { chave: ChavePlano; situacao: string }[];
  cta: string;
};

/** Seção "Condições" de /planos — o que cada cobrança significa. */
export const condicoesPagina = {
  overline: "Condições",
  titulo: "O que cada valor cobre",
  itens: [
    {
      termo: "Mensalidade",
      texto: "O valor recorrente do plano, com o primeiro ponto de venda incluído.",
    },
    {
      termo: "Instalação",
      texto:
        "Cobrada uma única vez, na entrada: entrega a sua empresa configurada, com os cadastros no lugar.",
    },
    {
      termo: "Ponto de venda adicional",
      texto: `Gs. ${condicoes.pontoAdicional} por mês para cada caixa além do primeiro.`,
    },
    {
      termo: "Moeda e país",
      texto:
        "Os planos do ponto de venda são em guaranis, para o Paraguai. No Brasil, a linha é o Syntax ERP, orçada por operação.",
    },
  ],
  ponteErp: { rotulo: "Conhecer o Syntax ERP", href: "/#erp" },
} as const;
