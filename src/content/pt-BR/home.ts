/**
 * Copy da home — pt-BR.
 *
 * Fontes dos fatos: site atual (syntaxsistemas.com.br) — fundação em 2006,
 * origem no setor de bebidas, produtos SYNTAX-ERP/STORE/MOBILE/EVENTOS,
 * matriz Sorocaba + filial Pedro Juan Caballero, suporte próprio — e as
 * demos reais (demo.syntaxsistemasdex.com.br, pdv-restaurante). Nenhum número
 * de cliente foi inventado (§11/§13).
 *
 * ⚠️ PENDENTE DE CONFIRMAÇÃO COM A SYNTAX:
 * - `ecossistema.abas[].chips`: stack real dos produtos (a lista atual é a do
 *   site novo + web moderna; confirmar antes de publicar). Vale para as três
 *   abas.
 * - `metodo.etapas`: o processo descrito é o fluxo padrão de uma software
 *   house; confirmar que corresponde ao da Syntax antes de publicar.
 * - Conteúdo dos painéis ilustrativos (`mockup`, `produtos.esyntax.painel`):
 *   são demonstração decorativa (role="img"), não afirmação comercial.
 */

export const hero = {
  badge: "Software house · Sorocaba SP · Pedro Juan Caballero PY",
  /** Versão do badge para telas < 640px — a completa quebra em 2 linhas. */
  badgeCurto: "Software house · BR & PY",
  tituloInicio: "A ",
  tituloDestaque: "engenharia",
  tituloFim: " por trás de quem vende, fatura e entrega.",
  subtitulo:
    "Sistemas web, aplicativos e automação para sua empresa vender, faturar e controlar a operação sem planilha e sem retrabalho.",
  ctaPrimario: { rotulo: "Solicitar demonstração", href: "#contato" },
  ctaSecundario: { rotulo: "Conhecer soluções", href: "#solucoes" },
  /**
   * ⚠️ conferir antes de publicar: "26 localidades" é contagem dos pins do
   * mapa oficial de atuação (24 cidades BR + 2 PY) — derivado, não declarado.
   */
  linhaFatos: [
    "Desde 2006",
    "Sorocaba SP · Pedro Juan Caballero PY",
    "26 localidades no Mercosul",
  ],
  indicadorRolagem: "role",
} as const;

/** Painel ilustrativo do hero. Conteúdo de demonstração, decorativo. */
export const mockup = {
  url: "app.syntaxsistemas.com.br",
  led: "produção",
  produto: "Syntax ERP",
  menu: ["Visão geral", "Pedidos", "Estoque", "Financeiro", "Relatórios"],
  /** Mini-cartões que orbitam o painel no desktop (decorativos). */
  satelites: [
    { rotulo: "NF-e autorizada", nota: "agora", tom: "ok" },
    { rotulo: "API", nota: "62 ms", tom: "info" },
  ],
  cabecalho: {
    titulo: "Operação em tempo real",
    subtitulo: "Atualizado há 2 minutos",
  },
  indicadores: [
    { rotulo: "Pedidos do dia", valor: "148", delta: "▲ 12%", tom: "positivo" },
    { rotulo: "Faturamento", valor: "R$ 86,4 mil", delta: "▲ 8%", tom: "positivo" },
    { rotulo: "Rupturas de estoque", valor: "3", delta: "▼ 5", tom: "info" },
  ],
  grafico: {
    titulo: "Pedidos por mês",
    legenda: { auto: "Digitados no sistema", manual: "Fora do sistema" },
    meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    automatico: [34, 44, 39, 52, 48, 61, 57, 70, 66, 78, 84, 93],
    manual: [30, 26, 27, 22, 23, 19, 20, 16, 15, 12, 10, 8],
  },
} as const;

export const quemSomos = {
  overline: "Quem somos",
  titulo: "Desde 2006 resolvendo a operação de quem vende e distribui",
  subtitulo:
    "A Syntax nasceu em 2006 desenvolvendo sistemas para indústrias e distribuidoras de bebidas — e cresceu junto com os clientes.",
  paragrafos: [
    "Hoje atendemos varejo, indústria, distribuição, food service, frotas e eventos, com sistemas próprios e projetos sob medida.",
    "Com matriz em Sorocaba-SP e filial em Pedro Juan Caballero-PY, acompanhamos operações em todo o Mercosul — no seu idioma e no seu fuso.",
    "Quem desenvolve é quem atende: nossa equipe reúne profissionais com mais de 15 anos de estrada em software de gestão.",
  ],
  /**
   * Marcos da linha do tempo. Os dois do meio não têm ano de propósito —
   * ⚠️ conferir com a Syntax os anos reais da expansão e da filial antes de
   * datar qualquer um deles.
   */
  marcos: [
    {
      ano: "2006",
      titulo: "Fundação em Sorocaba",
      texto:
        "Primeiros sistemas para industrialização e distribuição no setor de bebidas.",
    },
    {
      ano: "Expansão",
      titulo: "A linha Syntax cresce",
      texto:
        "ERP, Store, Mobile e Eventos chegam a varejo, indústria, frotas e eventos.",
    },
    {
      ano: "Fronteira",
      titulo: "Filial no Paraguai",
      texto:
        "Operação própria em Pedro Juan Caballero, dos dois lados do Mercosul.",
    },
    {
      ano: "Hoje",
      titulo: "Nova geração web",
      texto: "E-Syntax, Dex e PDV levam a gestão da Syntax para o navegador.",
    },
  ],
} as const;

export const problemas = {
  overline: "Segmentos",
  titulo: "O problema que trava a sua operação a gente já viu — e resolveu",
  subtitulo:
    "Seis segmentos, as mesmas dores de sempre. Escolha o seu e veja por onde a Syntax começa.",
  rotuloLista: "Segmentos atendidos",
  verSolucao: { rotulo: "Ver a solução", href: "#produtos" },
  segmentos: [
    {
      id: "distribuicao",
      rotulo: "Distribuição",
      icone: "distribuicao",
      dor: "Pedido tirado no papel, romaneio errado, carga voltando para o depósito.",
      resposta:
        "Força de vendas no celular e pedido caindo direto no faturamento — sem redigitação e sem extravio.",
    },
    {
      id: "industria",
      rotulo: "Indústria",
      icone: "industria",
      dor: "A produção não enxerga o estoque; a venda não enxerga a produção.",
      resposta:
        "Ordem de produção, estoque e faturamento no mesmo sistema, com o mesmo número.",
    },
    {
      id: "varejo",
      rotulo: "Varejo",
      icone: "varejo",
      dor: "Fila no caixa, estoque que não bate e fechamento que vira hora extra.",
      resposta:
        "Automação comercial do caixa ao fiscal: SAT, NFC-e e estoque em tempo real.",
    },
    {
      id: "food-service",
      rotulo: "Food service",
      icone: "food-service",
      dor: "Comanda perdida, cozinha às cegas e fechamento demorado.",
      resposta:
        "Mesas, comandas e delivery num painel só, com emissão fiscal no fim da noite.",
    },
    {
      id: "frotas",
      rotulo: "Controle de frotas",
      icone: "frotas",
      dor: "Veículo na rua sem controle de custo e manutenção vencendo no susto.",
      resposta:
        "Viagens, abastecimento e manutenção registrados por veículo e por motorista.",
    },
    {
      id: "eventos",
      rotulo: "Gestão de eventos",
      icone: "eventos",
      dor: "Agenda em choque, orçamento por telefone e custo descoberto no fim.",
      resposta:
        "Espaços, contratos e agenda num painel só — sem reserva duplicada.",
    },
  ],
} as const;

export const solucoes = {
  overline: "O que desenvolvemos",
  titulo: "Uma solução para cada parte da sua operação",
  subtitulo:
    "Do balcão ao faturamento: escolha o ponto que mais dói hoje e comece por ele.",
  itens: [
    {
      icone: "sistemas-web",
      titulo: "Sistemas web",
      texto: "Gestão no navegador, sem instalação — acesse da loja, do escritório ou do celular.",
    },
    {
      icone: "administrativo",
      titulo: "Sistemas administrativos",
      texto: "Pedidos, estoque, financeiro e cadastros organizados em um painel só.",
    },
    {
      icone: "restaurantes",
      titulo: "Sistemas para restaurantes",
      texto: "Frente de caixa com mesas, comandas, cardápio e fechamento sem fila.",
    },
    {
      icone: "landing-pages",
      titulo: "Landing pages",
      texto: "Páginas de campanha rápidas, feitas para transformar visita em contato.",
    },
    {
      icone: "sites",
      titulo: "Sites institucionais",
      texto: "Presença profissional que aparece no Google e passa credibilidade.",
    },
    {
      icone: "sob-medida",
      titulo: "Desenvolvimento sob medida",
      texto: "Seu processo não cabe em sistema de prateleira? Construímos do seu jeito.",
    },
    {
      icone: "integracoes",
      titulo: "Integrações",
      texto: "ERP, fiscal, pagamento e e-commerce conversando entre si, sem redigitação.",
    },
    {
      icone: "apis",
      titulo: "APIs",
      texto: "Seus dados disponíveis com segurança para parceiros e outros sistemas.",
    },
  ],
} as const;

export const prova = {
  overline: "Produtos",
  titulo: "Sistemas reais, rodando agora",
  subtitulo:
    "Nada de mockup: a demonstração do Dex é aberta — entre e navegue como um cliente.",
  esyntax: {
    nome: "E-Syntax",
    selo: "Plataforma web",
    descricao:
      "A gestão da Syntax no navegador: ERP, automação comercial, documentos fiscais e força de vendas em um ambiente só, na nuvem.",
    pontos: [
      "Multi-loja com estoque e faturamento consolidados",
      "NF-e, NFC-e e demais documentos fiscais integrados",
      "Migração acompanhada a partir do sistema desktop",
    ],
    cta: { rotulo: "Solicitar demonstração", href: "#contato" },
    /** Painel ilustrativo (decorativo). */
    painel: {
      url: "e.syntaxsistemas.com.br",
      status: "SEFAZ online",
      titulo: "Documentos fiscais",
      cartoes: [
        { rotulo: "NF-e", valor: "2.184", nota: "autorizadas" },
        { rotulo: "NFC-e", valor: "9.730", nota: "no mês" },
        { rotulo: "CT-e", valor: "612", nota: "no mês" },
        { rotulo: "Rejeições", valor: "0", nota: "hoje" },
      ],
      linhas: [
        { doc: "NF-e 44201", cliente: "Distribuidora Andradas", valor: "R$ 84.320", status: "Autorizada", tom: "ok" },
        { doc: "NFC-e 90887", cliente: "Padaria Bella Vista", valor: "R$ 1.248", status: "Autorizada", tom: "ok" },
        { doc: "CT-e 12094", cliente: "Costeira Transportes", valor: "R$ 6.910", status: "Em fila", tom: "espera" },
      ],
    },
  },
  demos: [
    {
      sigla: "Dx",
      nome: "Syntax Dex",
      dominio: "demo.syntaxsistemasdex.com.br",
      href: "https://demo.syntaxsistemasdex.com.br/",
      selo: "Demo aberta",
      tomSelo: "ok",
      descricao:
        "Administrativo web de pedidos: clientes, produtos, tabelas de preço e aprovação da força de vendas em qualquer dispositivo.",
      tags: ["Pedidos", "Força de vendas", "Distribuição"],
      cta: "Acessar demonstração",
    },
    {
      sigla: "PDV",
      nome: "PDV Restaurante",
      dominio: "ambiente de testes",
      href: "https://pdv-restaurante-develop.vercel.app/login",
      selo: "Em desenvolvimento",
      tomSelo: "info",
      descricao:
        "Frente de caixa web para bares, padarias e restaurantes: mesas, comandas, delivery e fechamento com emissão fiscal.",
      tags: ["Mesas e comandas", "Delivery", "Food service"],
      cta: "Ver o ambiente de testes",
    },
  ],
  /** A linha consolidada como catálogo técnico — sem cards (§7). */
  catalogo: {
    rotulo: "Linha consolidada",
    nota: "Em produção em empresas do Brasil e do Paraguai desde 2006.",
    cta: { rotulo: "Pedir apresentação", href: "#contato" },
    itens: [
      {
        sigla: "ERP",
        nome: "Syntax ERP",
        descricao: "Gestão completa para indústrias e distribuidoras: do pedido à entrega.",
        tags: ["Indústria", "Distribuição"],
      },
      {
        sigla: "ST",
        nome: "Syntax Store",
        descricao: "Automação comercial completa para o varejo, do caixa ao estoque.",
        tags: ["Varejo", "Automação comercial"],
      },
      {
        sigla: "MB",
        nome: "Syntax Mobile",
        descricao: "Força de vendas e ações de mercado na palma da mão da sua equipe.",
        tags: ["Vendas externas", "Mobilidade"],
      },
      {
        sigla: "EV",
        nome: "Syntax Eventos",
        descricao: "Gestão para produção de eventos e locação de espaços, sem choque de agenda.",
        tags: ["Eventos", "Locação"],
      },
    ],
  },
} as const;

export const metodo = {
  overline: "O jeito Syntax",
  titulo: "Como um sistema nosso sai do papel",
  subtitulo:
    "Quatro etapas, sem surpresa no meio do caminho. Você sabe o que vem a seguir desde a primeira conversa.",
  etapas: [
    {
      icone: "diagnostico",
      titulo: "Entendemos a operação",
      texto:
        "Sentamos com quem usa o sistema todo dia e mapeamos onde o processo trava hoje.",
    },
    {
      icone: "proposta",
      titulo: "Desenhamos a solução",
      texto:
        "Você recebe o escopo, o prazo e o valor por escrito antes de qualquer linha de código.",
    },
    {
      icone: "desenvolvimento",
      titulo: "Construímos e implantamos",
      texto:
        "Entregas em partes, com a sua equipe testando desde cedo e treinada na virada.",
    },
    {
      icone: "suporte",
      titulo: "Acompanhamos depois",
      texto:
        "Quem atende é quem desenvolveu. O sistema evolui junto com a sua operação.",
    },
  ],
} as const;

export const ecossistema = {
  overline: "Ecossistema",
  titulo: "Base moderna, sem modismo",
  subtitulo:
    "Construímos com ferramentas maduras e mantidas pelo mercado — o que garante segurança, velocidade e facilidade de evolução.",
  abas: [
    {
      id: "nuvem",
      rotulo: "Nuvem",
      rotuloCurto: "Nuvem",
      texto:
        "Seus sistemas rodam no navegador, sem instalação. Acesse da loja, do escritório ou do celular, com os dados sempre atualizados.",
      chips: ["Nuvem", "React", "Next.js", "Acesso por navegador"],
    },
    {
      id: "apis",
      rotulo: "APIs e integrações",
      rotuloCurto: "APIs",
      texto:
        "Seus sistemas conversam entre si. Nada de redigitar no financeiro o que já foi digitado no pedido.",
      chips: ["APIs REST", "Node.js", "TypeScript", "Integrações"],
    },
    {
      id: "erp",
      rotulo: "Gestão e ERP",
      rotuloCurto: "ERP",
      texto:
        "Pedido, estoque, faturamento e documento fiscal no mesmo lugar, com histórico de tudo que passou pela operação.",
      chips: ["PostgreSQL", "Documentos fiscais", "Multi-loja", "Força de vendas"],
    },
  ],
} as const;

export const diferenciais = {
  overline: "Por que a Syntax",
  titulo: "O que mantém nossos clientes desde 2006",
  itens: [
    {
      icone: "suporte",
      titulo: "Suporte de quem desenvolve",
      texto:
        "Manutenção e atendimento feitos pela própria equipe que constrói o sistema — sem call center de script.",
    },
    {
      icone: "experiencia",
      titulo: "Vinte anos de operação",
      texto:
        "Desde 2006 dentro de distribuidoras, comércios e indústrias. Conhecemos o chão de loja, não só o código.",
    },
    {
      icone: "mercosul",
      titulo: "Brasil e Paraguai",
      texto:
        "Matriz em Sorocaba e filial em Pedro Juan Caballero: atendimento nos dois lados da fronteira.",
    },
    {
      icone: "sob-medida",
      titulo: "Sob medida de verdade",
      texto:
        "Quando o processo é seu, o sistema também é: projetos personalizados do levantamento à entrega.",
    },
  ],
} as const;

export const contatoSecao = {
  overline: "Contato",
  titulo: "Vamos conversar sobre a sua operação?",
  subtitulo:
    "Conte o que precisa e retornamos com uma demonstração aplicada ao seu segmento.",
  canaisTitulo: "Canais diretos",
  cta: { rotulo: "Falar com especialista", href: "#formulario" },
  form: {
    titulo: "Solicite uma demonstração",
    campos: {
      nome: { label: "Nome", placeholder: "Seu nome" },
      empresa: { label: "Empresa", placeholder: "Nome da empresa" },
      email: { label: "E-mail", placeholder: "voce@empresa.com.br" },
      telefone: { label: "Telefone / WhatsApp", placeholder: "(15) 99999-9999" },
      segmento: { label: "Segmento", placeholder: "Selecione o segmento" },
      mensagem: {
        label: "Mensagem",
        placeholder: "Conte em poucas linhas o que você precisa resolver",
      },
    },
    segmentos: [
      "Distribuição",
      "Indústria",
      "Varejo",
      "Restaurante / food service",
      "Frotas",
      "Eventos",
      "Outro",
    ],
    botao: "Enviar pelo WhatsApp",
    enviando: "Abrindo o WhatsApp…",
    sucesso: {
      titulo: "Mensagem pronta no seu WhatsApp",
      texto:
        "Abrimos uma conversa com a nossa equipe comercial com os seus dados preenchidos. É só enviar.",
      linkRotulo: "Não abriu? Toque aqui para abrir o WhatsApp",
    },
    erro:
      "Não conseguimos abrir o WhatsApp automaticamente. Use o link abaixo ou fale conosco pelos canais diretos.",
  },
} as const;
