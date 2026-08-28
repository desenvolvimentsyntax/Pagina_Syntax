/**
 * Copy da home — pt-BR. Textos finais do handoff de design
 * (`design_handoff_landing_syntax`), fidelidade alta: nada aqui é reescrita
 * livre. §6: texto longo não mora no JSX.
 *
 * ⚠️ Ressalva de copy registrada: o §13 do CLAUDE.md pede longevidade sempre
 * como "desde 2006", nunca "há X anos" — que desatualiza sozinho. O design
 * entrega "Há quase 20 anos" / "20 anos" / "Quase 20 anos" como copy final e
 * foi mantido por decisão de fidelidade. Revisar com a Syntax em 2026/2027,
 * quando "quase 20" vira falso.
 */

export const meta = {
  title: "Syntax Sistemas — Sistemas web e automação para empresas",
  description:
    "Sistemas web, ERP e PDV para varejo, distribuição, indústria e food service. Software house em Sorocaba e Pedro Juan Caballero, desde 2006.",
  ogAlt: "Syntax Sistemas — sistemas web e automação para empresas",
} as const;

/* -------------------------------------------------------------------------- */
/* 01 · Hero                                                                   */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Software house · desde 2006 · BR & PY",
  titulo:
    "Sistemas web e automação para sua empresa vender, faturar e controlar.",
  subtitulo:
    "Do pedido à nota fiscal: soluções para varejo, distribuição, indústria e food service, sem planilha e sem retrabalho.",
  ctaPrimario: "Solicitar demonstração",
  ctaSecundario: "Conhecer soluções",
  ctaSecundarioHref: "#solucoes",
  /** Mensagem que abre no WhatsApp pelo CTA principal do hero. */
  whatsappTexto: "Olá! Vim pelo site da Syntax e quero uma demonstração.",
  painel: {
    legenda: "Operação em tempo real · dados ilustrativos",
    aria:
      "Painel ilustrativo da operação: 148 pedidos no dia (alta de 12%), R$ 86,4 mil de faturamento (alta de 8%) e o volume de pedidos das últimas sete semanas em barras crescentes.",
    tiles: [
      { rotulo: "Pedidos do dia", valor: "148", variacao: "12%" },
      { rotulo: "Faturamento", valor: "R$ 86,4 mil", variacao: "8%" },
    ],
    /** Altura relativa das barras, em %. A última é a destacada. */
    barras: [40, 55, 48, 70, 62, 85, 100],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 02 · Faixa do slogan                                                        */
/* -------------------------------------------------------------------------- */

export const slogan = {
  inicio: "Soluções que conectam.",
  destaque: "Tecnologia que transforma.",
} as const;

/* -------------------------------------------------------------------------- */
/* 03 · Soluções                                                               */
/* -------------------------------------------------------------------------- */

/** Chave do ícone Lucide — o componente resolve; content não importa React. */
export type IconeSolucao = "navegador" | "sobMedida" | "caixa" | "integracao";

export interface CartaoSolucao {
  icone: IconeSolucao;
  titulo: string;
  descricao: string;
  /** Exemplo concreto, no chip azul do design. */
  naPratica: string;
}

export const solucoes = {
  overline: "Soluções",
  titulo: "Uma solução para cada parte da sua operação",
  intro:
    "Sem termos técnicos: cada card mostra o que o sistema faz e um exemplo real de como ajuda no dia a dia.",
  cartoes: [
    {
      icone: "navegador",
      titulo: "Sistema que abre no navegador",
      descricao:
        "Funciona como um site: você entra com seu login e pronto. Nada para instalar, nada para atualizar.",
      naPratica: "Na prática: veja as vendas da loja pelo celular, de casa.",
    },
    {
      icone: "sobMedida",
      titulo: "Sistema feito sob medida",
      descricao:
        "Quando o jeito de trabalhar é só seu, a gente adapta o sistema à sua rotina, e não o contrário.",
      naPratica: "Na prática: a tela mostra só o que a sua equipe usa.",
    },
    {
      icone: "caixa",
      titulo: "Caixa para restaurantes",
      descricao:
        "Mesas, comandas e delivery na tela do caixa. A conta fecha em segundos e a nota fiscal sai na hora.",
      naPratica: "Na prática: o garçom lança o pedido e a cozinha já recebe.",
    },
    {
      icone: "integracao",
      titulo: "Sistemas conversando entre si",
      descricao:
        "Nota fiscal, pagamento e loja virtual trocam informação sozinhos. Ninguém digita a mesma coisa duas vezes.",
      naPratica: "Na prática: a venda do site já entra no estoque e no financeiro.",
    },
  ] satisfies readonly CartaoSolucao[],
} as const;

/* -------------------------------------------------------------------------- */
/* 04 · Produtos                                                               */
/* -------------------------------------------------------------------------- */

export const produtos = {
  overline: "Produtos",
  titulo: "Sistemas que movem operações de verdade",
  intro:
    "Não pedimos que você acredite: mostramos o sistema rodando. O ERP que move operações há quase 20 anos e a nova geração web com demonstração aberta.",

  erp: {
    label: "Linha consolidada · desde 2006",
    titulo: "Syntax ERP",
    descricao:
      "O sistema que sustenta a operação de indústrias, distribuidoras e comércios há quase 20 anos. Enquanto você lê isso, tem pedido sendo faturado e caminhão saindo para entrega com o Syntax rodando por trás.",
    bullets: [
      "Pedidos, estoque, financeiro e notas fiscais em um lugar só",
      "Multi loja, com faturamento e estoque consolidados",
      "Força de vendas integrada: o pedido da rua cai direto no faturamento",
    ],
    nota: "Em produção todos os dias, no Brasil e no Paraguai",
    cta: "Pedir apresentação",
    whatsappTexto: "Olá! Quero uma apresentação do Syntax ERP.",
  },

  pdv: {
    label: "Nova geração web",
    selo: "Demonstração aberta",
    titulo: "PDV Web · Paraguai",
    descricao:
      "Nosso novo caixa que abre direto no navegador, no idioma e nas regras do Paraguai. E você não precisa acreditar na nossa palavra: a demonstração é aberta. Entre agora e use como se fosse da sua loja.",
    bullets: [
      "Sem instalação e sem servidor na loja",
      "Venda, cobrança e documentos nas regras do país",
      "Português e espanhol, dos dois lados da fronteira",
    ],
    dominio: "pdv-syntax.vercel.app",
    cta: "Acessar a demonstração ao vivo",
    href: "https://pdv-syntax.vercel.app/pt",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 05 · Sobre                                                                  */
/* -------------------------------------------------------------------------- */

export const sobre = {
  overline: "Sobre a Syntax",
  titulo: "Há quase 20 anos, crescemos junto com quem confia na gente",
  paragrafos: [
    "A Syntax nasceu em 2006, em Sorocaba, dentro do setor de bebidas. Começamos ouvindo o dono da distribuidora, o vendedor na rua e o pessoal do estoque, e foi assim que aprendemos a fazer sistema: entendendo a rotina de quem usa antes de escrever qualquer linha de código.",
    "Muitos dos nossos primeiros clientes seguem com a gente até hoje. Quando o sistema entra no ar, a relação não termina: quem atende você depois é a mesma equipe que construiu, gente que conhece balcão, estoque e fiscal por dentro.",
    "Com matriz em Sorocaba SP e sede própria em Pedro Juan Caballero PY, estamos perto de quem opera dos dois lados da fronteira, no seu idioma e no seu fuso.",
  ],
  /**
   * ⚠️ conferir antes de publicar (§11): as 26 localidades vêm do mapa oficial
   * de atuação, contadas de material interno. Não vai a produção sem
   * confirmação da Syntax.
   */
  numeros: [
    { valor: "20 anos", legenda: "de estrada, sem atalhos" },
    { valor: "26", legenda: "localidades atendidas" },
    { valor: "2 países", legenda: "Brasil e Paraguai" },
  ],
  timeline: {
    label: "Nossa trajetória",
    marcos: [
      {
        titulo: "2006 · O começo",
        texto:
          "Primeiros sistemas para indústrias e distribuidoras de bebidas, em Sorocaba.",
      },
      {
        titulo: "A família cresce",
        texto:
          "Novos segmentos chegam com os clientes: varejo, indústria, food service e eventos.",
      },
      {
        titulo: "Do outro lado da fronteira",
        texto:
          "Abrimos sede própria em Pedro Juan Caballero para atender o Paraguai de perto.",
      },
      {
        titulo: "Hoje · Nova geração web",
        texto:
          "Levamos essa história para o navegador, com a mesma proximidade de sempre.",
      },
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 06 · Contato                                                                */
/* -------------------------------------------------------------------------- */

export const contatoSecao = {
  overline: "Contato",
  titulo: "Vamos conversar sobre a sua operação?",
  subtitulo:
    "Conte como sua empresa trabalha hoje e um especialista retorna com um diagnóstico aplicado ao seu segmento, sem compromisso e sem script de call center.",
  provas: [
    "Quem atende é quem desenvolve o sistema",
    "Quase 20 anos de operações rodando, no Brasil e no Paraguai",
    "Você já viu o sistema rodando na demonstração aberta",
  ],

  form: {
    titulo: "Comece a conversa agora",
    subtitulo: "Quatro campos e a mensagem chega pronta no nosso WhatsApp.",
    campos: {
      nome: { label: "Seu nome", placeholder: "Como podemos te chamar?" },
      email: {
        label: "E-mail corporativo",
        placeholder: "voce@suaempresa.com.br",
      },
      telefone: {
        label: "Telefone / WhatsApp",
        placeholder: "(15) 99999 9999",
      },
      tamanho: { label: "Tamanho da empresa", placeholder: "Selecione" },
    },
    tamanhos: [
      "Até 5 pessoas",
      "De 6 a 20 pessoas",
      "De 21 a 50 pessoas",
      "Mais de 50 pessoas",
    ],
    botao: "Falar com um especialista",
    enviando: "Abrindo o WhatsApp…",
    privacidade:
      "Seus dados não ficam salvos neste site: a mensagem abre direto no seu WhatsApp, pronta para revisar e enviar.",

    /** Linhas da mensagem montada. Campo vazio é omitido (§ handoff). */
    mensagem: {
      abertura:
        "Olá! Vim pela página da Syntax e quero falar com um especialista.",
      rotulos: {
        nome: "Nome",
        email: "E-mail",
        telefone: "Telefone",
        tamanho: "Tamanho da empresa",
      },
    },

    aviso: {
      titulo: "O navegador bloqueou a janela do WhatsApp",
      texto: "Use o link abaixo para abrir a conversa com a mensagem pronta.",
      linkRotulo: "Abrir o WhatsApp",
    },
    sucesso: {
      titulo: "Mensagem pronta no seu WhatsApp",
      texto: "Revise e envie — a conversa cai direto no comercial da Syntax.",
      linkRotulo: "Abrir o WhatsApp de novo",
    },
    preencherNovamente: "Preencher de novo",
  },
} as const;
