/**
 * Copy da home — pt-BR. §6: texto longo não mora no JSX.
 *
 * A home é uma landing de funil, não uma vitrine institucional: a primeira
 * dobra mostra produto e preço, e cada dobra seguinte responde à objeção que o
 * visitante teria naquele ponto (funciona mesmo? / dá trabalho começar? / e se
 * meu caso for outro? / posso confiar? / mas e a minha dúvida específica?).
 * Mexer na ordem das seções sem olhar essa sequência quebra o funil.
 *
 * Números e recursos dos planos NÃO ficam aqui — moram em `planos.ts`, com a
 * fonte anotada. Aqui só entra copy.
 *
 * ⚠️ Ressalva de copy registrada: o §13 pede longevidade sempre como
 * "desde 2006", nunca "há X anos". O handoff de design entrega "Há quase 20
 * anos" / "20 anos" / "Quase 20 anos" em três pontos e foi mantido por
 * fidelidade. Revisar com a Syntax em 2026/2027, quando "quase 20" vira falso.
 */

export const meta = {
  title: "PDV e gestão a partir de Gs. 200.000/mês | Syntax Sistemas",
  description:
    "Ponto de venda integrado ao SIFEN, com estoque e financeiro. Três planos com preço publicado, demonstração aberta e atendimento de quem desenvolve.",
  ogAlt: "Syntax Sistemas — planos de PDV e gestão com preço publicado",
} as const;

/* -------------------------------------------------------------------------- */
/* 01 · Hero — produto e preço na primeira dobra                               */
/* -------------------------------------------------------------------------- */

export const hero = {
  /* Curto de propósito: em 390px o mono de 13px com tracking 0.1em quebra em
     duas linhas acima de ~30 caracteres, e cada linha aqui empurra o preço
     para fora da primeira tela. "Desde 2006" desceu para as provas. */
  eyebrow: "PDV + faturamento eletrônico",
  titulo: "O sistema que fatura, controla o estoque e fecha o caixa da sua empresa.",
  subtitulo:
    "Preço publicado, sem proposta por telefone. Compare os três planos, entre na demonstração e fale com a gente quando fizer sentido.",
  /* Âncora de preço acima dos botões. No celular os cards de plano ficam
     abaixo da primeira tela, e sem esta linha a dobra fecharia sem nenhum
     valor à vista — que é justamente o que a página veio resolver. */
  ancora: { prefixo: "Planos a partir de", sufixo: "por mês" },
  ctaPrimario: "Ver planos e preços",
  ctaSecundario: "Entrar na demonstração",
  /** Três provas curtas ao lado dos CTAs. Cada uma se verifica na própria página. */
  provas: ["Preço na tela", "Demonstração aberta", "Desde 2006, BR e PY"],
  /** h2 da faixa de planos: o card renderiza h3 e não pode pular nível (§8). */
  planosTitulo: "Planos publicados",
  planosNota: "Ponto de venda · Paraguai",
} as const;

/* -------------------------------------------------------------------------- */
/* 02 · Comparação — a objeção "qual deles é o meu?"                           */
/* -------------------------------------------------------------------------- */

export const comparacao = {
  overline: "Compare",
  titulo: "O plano certo para o tamanho da sua operação",
  intro:
    "Os três emitem fatura. O Profissional soma compras e estoque; o Premium leva tudo do Profissional e fecha o ciclo com o financeiro.",
  /** Rótulo acessível do seletor de planos (Tabs). */
  seletorAria: "Escolha um plano para ver o que ele inclui",
  cta: "Abrir a página de planos",
  ctaApoio: "Guia de escolha, tabela completa e condições de cobrança.",
  /** Link de dentro do painel do seletor para a tabela recurso a recurso. */
  linkTabela: "Ver a tabela recurso por recurso",
  /** Faixa do app que acompanha os três planos. */
  mobile: {
    titulo: "Todo plano vem com o Syntax MOBILE",
    texto:
      "A mesma operação no celular: você acompanha venda, caixa e estoque de onde estiver, sem instalar nada no computador da loja.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 03 · Demonstração aberta — a objeção "será que funciona mesmo?"             */
/* -------------------------------------------------------------------------- */

export const demo = {
  overline: "Demonstração aberta",
  titulo: "O caixa que roda todos os dias, aberto para você testar",
  texto:
    "A demonstração é o sistema de verdade, o mesmo que opera lojas no Paraguai — sem cadastro e sem falar com vendedor.",
  /** As três ações que a pessoa pode fazer agora — viram chips mono no card. */
  acoes: ["Abra uma venda", "Feche um caixa", "Emita um documento"],
  dominio: "pdv-syntax.vercel.app",
  cta: "Entrar na demonstração ao vivo",
  href: "https://pdv-syntax.vercel.app/pt",
  selo: "Aberta agora",
} as const;

/* -------------------------------------------------------------------------- */
/* 04 · Como funciona — a objeção "dá trabalho começar?"                       */
/* -------------------------------------------------------------------------- */

export const comoFunciona = {
  overline: "Como começa",
  titulo: "Do plano escolhido à primeira fatura",
  intro: "Quatro passos. Nenhum deles depende de você entender de tecnologia.",
  passos: [
    {
      titulo: "Você escolhe o plano",
      texto:
        "Compara os três aqui mesmo, com o preço na tela. Nada de orçamento fechado por telefone.",
    },
    {
      titulo: "A gente instala e configura",
      texto:
        "A instalação é cobrada uma vez e entrega a sua empresa configurada, com os cadastros no lugar.",
    },
    {
      titulo: "Sua equipe começa a vender",
      texto:
        "O balcão vende pelo teclado e não depende da conexão: a venda é registrada e sincroniza depois.",
    },
    {
      titulo: "O documento sai sozinho",
      texto:
        "O faturamento eletrônico tem ritmo próprio e não segura a fila do caixa.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 05 · Segmentos — o laço "esse sou eu"                                       */
/* -------------------------------------------------------------------------- */

export const segmentosSecao = {
  overline: "Segmentos",
  titulo: "Qual o seu segmento?",
  texto:
    "Do balcão da padaria ao caminhão da distribuidora: desde 2006 o sistema se adapta ao seu ramo — e não o contrário.",
  /**
   * Nichos que giram no rotor. Todos derivam da base declarada da Syntax
   * (restaurantes, distribuidoras, indústrias, comércio, clínicas, food
   * service, eventos — §1/§11): nada de segmento não confirmado aqui.
   */
  palavras: [
    "Restaurantes",
    "Distribuidoras",
    "Padarias",
    "Mercados",
    "Indústrias",
    "Lojas de roupa",
    "Clínicas",
    "Eventos",
  ],
  /** O rotor é decorativo (aria-hidden); esta é a frase do leitor de tela. */
  listaAria:
    "Atendemos restaurantes, distribuidoras, padarias, mercados, indústrias, lojas de roupa, clínicas e eventos.",
} as const;

/* -------------------------------------------------------------------------- */
/* 06 · Syntax ERP — o carro-chefe, em dobra própria                           */
/* -------------------------------------------------------------------------- */

/** Chave do ícone Lucide — o componente resolve; content não importa React. */
export type IconeCobertura = "pedidos" | "estoque" | "financeiro" | "fiscal";

export const erpSecao = {
  overline: "Syntax ERP",
  titulo: "O sistema que move indústrias e distribuidoras desde 2006",
  texto:
    "Enquanto você lê isso, tem pedido sendo faturado e caminhão saindo para entrega com o Syntax rodando por trás. Do pedido que o vendedor lança na rua à nota fiscal que fecha a venda.",

  segmentos: ["Indústria", "Distribuição", "Comércio", "Food service"],

  coberturaTitulo: "Uma operação inteira, num sistema só",
  cobertura: [
    { icone: "pedidos", rotulo: "Pedidos" },
    { icone: "estoque", rotulo: "Estoque" },
    { icone: "financeiro", rotulo: "Financeiro" },
    { icone: "fiscal", rotulo: "Notas fiscais" },
  ] satisfies readonly { icone: IconeCobertura; rotulo: string }[],

  cta: "Pedir apresentação",
  /**
   * No lugar de "preço sob consulta": a página inteira vende preço na tela, e
   * era a única seção que mandava ligar para descobrir. Aqui o compromisso é
   * o mesmo que a seção de contato já assume — diagnóstico sem compromisso —,
   * então não é promessa nova.
   */
  compromisso: "Diagnóstico gratuito da sua operação, sem compromisso.",
  whatsappTexto: "Olá! Quero uma apresentação do Syntax ERP.",

  /**
   * Sob medida e sites vinham em dois cards que repetiam o mesmo argumento
   * ("não cabe em software de prateleira") e competiam com o ERP. Viraram um
   * card só, deliberadamente mais leve: é rodapé da dobra, não protagonista.
   */
  projetos: {
    titulo: "Projetos sob medida",
    texto:
      "O sistema que se adapta à sua rotina, ou o site que apresenta a sua empresa no Google. Os dois orçados por projeto, pela mesma equipe que atende depois.",
    cta: "Falar sobre o meu caso",
    whatsappTexto:
      "Olá! Quero conversar sobre um projeto sob medida para a minha empresa.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 07 · Sobre — a objeção "posso confiar nessa empresa?"                       */
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
/* 08 · Dúvidas — as objeções que travam a assinatura                          */
/* -------------------------------------------------------------------------- */

export const duvidas = {
  overline: "Antes de decidir",
  titulo: "As perguntas que todo mundo faz",
  intro:
    "Se a sua não estiver aqui, o WhatsApp está logo abaixo — quem responde é quem desenvolve.",
  cta: "Perguntar no WhatsApp",
  itens: [
    {
      pergunta: "Preciso instalar alguma coisa no computador da loja?",
      resposta:
        "Não. O sistema abre no navegador, como um site: você entra com seu login e pronto. Não há servidor para manter na loja nem atualização para rodar na mão.",
    },
    {
      pergunta: "E se a internet cair no meio do movimento?",
      resposta:
        "O balcão continua vendendo. A venda é registrada do mesmo jeito e sincroniza quando a conexão volta — o caixa não para por causa da rede.",
    },
    {
      pergunta: "O preço muda se eu tiver mais de um caixa?",
      resposta:
        "A mensalidade do plano cobre o primeiro ponto de venda. Cada ponto adicional custa Gs. 100.000 por mês, à parte. A instalação é cobrada uma vez só.",
    },
    {
      pergunta: "Qual a diferença real entre o Profissional e o Premium?",
      resposta:
        "É uma escada. O Profissional soma ao Básico o controle da mercadoria: compras, estoque, inventário e relatórios gerenciais. O Premium inclui tudo do Profissional e fecha o ciclo com o financeiro completo: contas a pagar e a receber, fluxo de caixa, lucratividade e despesas por centro de custo. Se a sua dor hoje é mercadoria, o Profissional resolve; se você também precisa enxergar o dinheiro, o Premium é o plano inteiro.",
    },
    {
      pergunta: "Os valores estão em guarani. Atende empresa no Brasil?",
      resposta:
        "Atende. Os planos com preço publicado são do ponto de venda para o Paraguai. No Brasil a linha é o Syntax ERP, orçado por operação: a Syntax tem matriz em Sorocaba SP desde 2006 e sede própria em Pedro Juan Caballero.",
    },
    {
      pergunta: "Consigo ver o sistema antes de contratar?",
      resposta:
        "Sim, e sem falar com vendedor. A demonstração é aberta e roda o sistema de verdade: você abre uma venda, fecha o caixa e emite um documento como se a loja fosse sua.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 09 · Contato                                                                */
/* -------------------------------------------------------------------------- */

export const contatoSecao = {
  overline: "Contato",
  titulo: "Vamos conversar sobre a sua operação?",
  subtitulo:
    "Conte como sua empresa trabalha hoje e um especialista retorna com um diagnóstico aplicado ao seu segmento, sem compromisso e sem script de call center.",
  provas: [
    "Quem atende é quem desenvolve o sistema",
    "Quase 20 anos de operações rodando, no Brasil e no Paraguai",
    "Você já viu o preço e já pode ver o sistema rodando",
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
