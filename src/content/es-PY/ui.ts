/**
 * Strings de interfaz — es-PY. Rótulos, aria-labels y microcopy que no
 * pertenecen a ninguna sección de la home (header, pie, 404, validación).
 * Espeja `content/pt-BR/ui.ts` clave por clave: falta una y el build rompe
 * (§18).
 *
 * Tratamiento en `usted`, vocabulario paraguayo (§18): `computadora`, no
 * *ordenador*; `celular`, no *móvil*.
 */

export const ui = {
  marca: {
    alt: "Syntax Sistemas",
  },
  header: {
    paginaInicialAria: "Página de inicio",
    navPrincipalAria: "Navegación principal",
    abrirMenu: "Abrir menú",
    menuTitulo: "Menú",
    fechar: "Cerrar",
  },
  rodape: {
    descricao:
      "Sistemas web, aplicaciones y automatización para empresas de Paraguay y Brasil.",
    navegacaoAria: "Navegación del pie de página",
    solucoesAria: "Productos",
    colunaNavegacao: "Navegación",
    colunaSolucoes: "Productos",
    colunaContato: "Contacto",
    sufixoWhatsApp: "WhatsApp",
    sufixoParaguai: "Paraguay",
    filialPrefixo: "Casa matriz:",
    direitos: "Todos los derechos reservados.",
    /** ⚠️ conferir (termo fiscal PY): no Paraguai o registro é RUC, não CNPJ. */
    cnpjRotulo: "RUC",
  },
  canais: {
    whatsapp: "WhatsApp",
    telefone: "Teléfono",
    paraguai: "Paraguay",
    email: "Correo",
    matriz: "Casa matriz",
  },
  whatsappFlutuante: {
    aria: "Conversar con Syntax por WhatsApp",
  },
  voltarAoTopo: {
    aria: "Volver al inicio de la página",
  },
  /**
   * Rótulos del selector de idioma. Cada uno queda EN EL IDIOMA DE DESTINO a
   * propósito: quien no lee la página actual necesita reconocer su propio
   * idioma en la opción. Por eso son iguales en los dos locales.
   */
  idioma: {
    "es-PY": "Ver en español",
    "pt-BR": "Ver em português",
  },
  naoEncontrada: {
    codigo: "Error 404",
    titulo: "Página no encontrada",
    texto:
      "La dirección a la que ingresó no existe o todavía no está disponible en este idioma.",
    voltarHome: "Volver al inicio",
    falarEspecialista: "Hablar con un especialista",
  },
  /**
   * Mensajes del schema del formulario (§12) — humanos, en español.
   * El envío no tiene validación bloqueante: el campo vacío simplemente sale
   * del mensaje. Estos textos solo aparecen cuando el campo FUE completado y
   * está mal formado (ver lib/schemas/contato.ts).
   */
  validacao: {
    email: "Ingrese un correo válido",
    telefone: "Ingrese un teléfono válido con código de área",
  },
} as const;

export type MensagensValidacao = typeof ui.validacao;
