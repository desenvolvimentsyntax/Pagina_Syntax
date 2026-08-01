/**
 * Strings de interface — pt-BR. Rótulos, aria-labels e microcopy que não
 * pertencem a nenhuma seção da home (header, rodapé, 404, mockups,
 * validação). Nada de texto solto no JSX (§18): tudo que o visitante lê ou
 * o leitor de tela anuncia sai daqui, para a fatia es-PY trocar num lugar só.
 */

export const ui = {
  header: {
    paginaInicialAria: "Página inicial",
    navPrincipalAria: "Navegação principal",
    abrirMenu: "Abrir menu",
    menuTitulo: "Menu",
    fechar: "Fechar",
  },
  rodape: {
    descricao:
      "Sistemas web, aplicativos e automação para empresas do Brasil e do Paraguai.",
    navegacaoAria: "Navegação do rodapé",
    solucoesAria: "Soluções",
    colunaNavegacao: "Navegação",
    colunaSolucoes: "Soluções",
    colunaContato: "Contato",
    sufixoWhatsApp: "WhatsApp",
    sufixoParaguai: "Paraguai",
    filialPrefixo: "Filial:",
    direitos: "Todos os direitos reservados.",
    cnpjRotulo: "CNPJ",
  },
  canais: {
    whatsapp: "WhatsApp",
    telefone: "Telefone",
    paraguai: "Paraguai",
    email: "E-mail",
    matriz: "Matriz",
  },
  whatsappFlutuante: {
    aria: "Conversar com a Syntax pelo WhatsApp",
  },
  /**
   * Os painéis são demonstração desenhada em código, com nomes de empresa
   * fictícios — o rótulo visível "dados ilustrativos" evita que sejam lidos
   * como clientes reais (§11/§13).
   */
  mockups: {
    dadosIlustrativos: "dados ilustrativos",
    dashboardAria:
      "Painel do Syntax ERP com dados ilustrativos: pedidos do dia, faturamento e volume de pedidos ao longo do ano.",
    painelFiscalAria:
      "Painel de documentos fiscais do E-Syntax com dados ilustrativos: NF-e, NFC-e e CT-e emitidos e status de autorização.",
  },
  naoEncontrada: {
    codigo: "Erro 404",
    titulo: "Página não encontrada",
    texto:
      "O endereço que você acessou não existe ou ainda não está disponível neste idioma.",
    voltarHome: "Voltar para a home",
    falarEspecialista: "Falar com especialista",
  },
  /** Mensagens do schema do formulário (§12) — humanas, em português. */
  validacao: {
    nome: "Informe seu nome",
    empresa: "Informe o nome da empresa",
    email: "Informe um e-mail válido",
    telefone: "Informe um telefone válido com DDD",
    segmento: "Selecione o segmento",
    mensagem: "Conte em poucas palavras o que você precisa",
  },
} as const;

export type MensagensValidacao = typeof ui.validacao;
