/**
 * Strings de interface — pt-BR. Rótulos, aria-labels e microcopy que não
 * pertencem a nenhuma seção da home (header, rodapé, 404, validação). Nada de
 * texto solto no JSX (§18): tudo que o visitante lê ou o leitor de tela
 * anuncia sai daqui, para a fatia es-PY trocar num lugar só.
 */

export const ui = {
  marca: {
    alt: "Syntax Sistemas",
  },
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
  naoEncontrada: {
    codigo: "Erro 404",
    titulo: "Página não encontrada",
    texto:
      "O endereço que você acessou não existe ou ainda não está disponível neste idioma.",
    voltarHome: "Voltar para a home",
    falarEspecialista: "Falar com especialista",
  },
  /**
   * Mensagens do schema do formulário (§12) — humanas, em português.
   * O handoff pede envio sem validação bloqueante: campo vazio simplesmente
   * sai da mensagem. Estas mensagens só aparecem quando o campo FOI
   * preenchido e está mal formado (ver lib/schemas/contato.ts).
   */
  validacao: {
    email: "Informe um e-mail válido",
    telefone: "Informe um telefone válido com DDD",
  },
} as const;

export type MensagensValidacao = typeof ui.validacao;
