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
 * - `tecnologias.chips`: stack real dos produtos (a lista atual é a do site
 *   novo + web moderna; confirmar antes de publicar).
 * - Conteúdo dos painéis ilustrativos (`mockup`, `produtos.esyntax.painel`):
 *   são demonstração decorativa (role="img"), não afirmação comercial.
 */

export const hero = {
  badge: "Software house · Sorocaba SP · Pedro Juan Caballero PY",
  tituloInicio: "Transformamos processos em ",
  tituloDestaque: "sistemas inteligentes",
  tituloFim: ".",
  subtitulo:
    "Sistemas web, aplicativos e automação para sua empresa vender, faturar e controlar a operação sem planilha e sem retrabalho.",
  ctaPrimario: { rotulo: "Solicitar demonstração", href: "#contato" },
  ctaSecundario: { rotulo: "Conhecer soluções", href: "#solucoes" },
  indicadores: [
    { valor: "2006", rotulo: "no mercado desde" },
    { valor: "2 países", rotulo: "Brasil e Paraguai" },
    { valor: "6 sistemas", rotulo: "no portfólio" },
  ],
} as const;

/** Painel ilustrativo do hero. Conteúdo de demonstração, decorativo. */
export const mockup = {
  url: "app.syntaxsistemas.com.br",
  produto: "Syntax ERP",
  menu: ["Visão geral", "Pedidos", "Estoque", "Financeiro", "Relatórios"],
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

export const segmentos = {
  rotulo: "Segmentos atendidos",
  itens: [
    "Distribuição",
    "Indústria",
    "Varejo",
    "Food service",
    "Controle de frotas",
    "Gestão de eventos",
  ],
} as const;

export const quemSomos = {
  overline: "Quem somos",
  titulo: "Vinte anos resolvendo a operação de quem vende e distribui",
  subtitulo:
    "A Syntax nasceu em 2006 desenvolvendo sistemas para indústrias e distribuidoras de bebidas — e cresceu junto com os clientes.",
  paragrafos: [
    "Hoje atendemos varejo, indústria, distribuição, food service, frotas e eventos, com sistemas próprios e projetos sob medida.",
    "Com matriz em Sorocaba-SP e filial em Pedro Juan Caballero-PY, acompanhamos operações em todo o Mercosul — no seu idioma e no seu fuso.",
    "Quem desenvolve é quem atende: nossa equipe reúne profissionais com mais de 15 anos de estrada em software de gestão.",
  ],
  fatos: [
    { valor: "2006", rotulo: "ano de fundação" },
    { valor: "15+ anos", rotulo: "de experiência da equipe" },
    { valor: "BR · PY", rotulo: "matriz e filial próprias" },
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

export const produtos = {
  overline: "Produtos",
  titulo: "Sistemas prontos, testados na operação real",
  subtitulo:
    "Duas gerações de produto: a plataforma web que estamos expandindo e a linha consolidada que roda em clientes desde 2006.",
  abas: {
    novaGeracao: { id: "nova-geracao", rotulo: "Nova geração web" },
    consolidada: { id: "linha-consolidada", rotulo: "Linha consolidada" },
  },
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
  novaGeracao: [
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
    },
  ],
  consolidada: [
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
} as const;

export const tecnologias = {
  overline: "Tecnologia",
  titulo: "Base moderna, sem modismo",
  texto:
    "Construímos com ferramentas maduras e mantidas pelo mercado — o que garante segurança, velocidade e facilidade de evolução.",
  chips: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "APIs REST",
    "Nuvem",
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

export const projetos = {
  overline: "Projetos",
  titulo: "Veja o que já está rodando",
  subtitulo:
    "Nada de mockup: acesse a demonstração aberta e navegue pelo sistema como um cliente.",
  itens: [
    {
      titulo: "Syntax Dex",
      selo: "Demo aberta",
      tomSelo: "ok",
      texto:
        "O administrativo web de pedidos com demonstração pública — entre e teste sem cadastro.",
      cta: { rotulo: "Acessar demonstração", href: "https://demo.syntaxsistemasdex.com.br/", externo: true },
    },
    {
      titulo: "PDV Restaurante",
      selo: "Em desenvolvimento",
      tomSelo: "info",
      texto:
        "A frente de caixa web para food service, em construção com operação piloto.",
      cta: { rotulo: "Solicitar acesso antecipado", href: "#contato", externo: false },
    },
    {
      titulo: "Linha consolidada",
      selo: "Desde 2006",
      tomSelo: "neutro",
      texto:
        "ERP, Store, Mobile e Eventos em produção em empresas do Brasil e do Paraguai.",
      cta: { rotulo: "Pedir apresentação", href: "#contato", externo: false },
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
