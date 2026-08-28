/**
 * Catálogo de productos y planes — es-PY. Espeja `content/pt-BR/planos.ts`
 * clave por clave (§18).
 *
 * FUENTE DE LOS TÉRMINOS: los nombres de plan y de cada recurso NO son
 * traducción mía — son el español que la propia Syntax publica en
 * https://pdv-syntax.vercel.app/es/pricing, consultado el 28/08/2026. Es lo
 * correcto: el cliente paraguayo ya conoce el producto por esas palabras
 * ("stock" y no *estoque*, "informes gerenciales", "cuentas por cobrar"), y
 * inventar sinónimos rompería el reconocimiento.
 *
 * Los importes son los mismos de la versión portuguesa — es el mismo producto,
 * en el mismo país, en guaraníes.
 *
 * DIVERGENCIA CONSCIENTE de la página pública: el Roger confirmó el 28/08/2026
 * que el Premium incluye TODAS las funcionalidades. El /es/pricing publicado
 * todavía muestra el Premium sin la parte de stock. ⚠️ avisar a Syntax para
 * corregir esa página.
 */

import { contato } from "@/content/es-PY/site";

/** Clave de la identidad visual — MarcaProduto resuelve color y píldora. */
export type ChaveProduto = "fact" | "pro" | "premium" | "erp" | "mobile";

export interface Plano {
  chave: Extract<ChaveProduto, "fact" | "pro" | "premium">;
  plano: string;
  resumo: string;
  ganho: string;
  mensal: string;
  instalacao: string;
  recursos: readonly string[];
  destaques: readonly string[];
  realce?: "escolhido" | "completo";
}

export const MOEDA = "Gs." as const;

export const planos = [
  {
    chave: "fact",
    destaques: [
      "Emisión de factura electrónica",
      "Registro de clientes, productos y precios",
      "Gestión de XML y correo automático",
    ],
    plano: "Básico",
    resumo: "Facturación y registros",
    ganho: "Para quien necesita facturar bien y dejar de anotar clientes en un cuaderno.",
    mensal: "200.000",
    instalacao: "800.000",
    recursos: [
      "Emisión de factura",
      "Registro de clientes",
      "Registro de productos",
      "Lista de precios",
      "Envío automático de correo",
      "Gestión de XML",
    ],
  },
  {
    chave: "pro",
    destaques: [
      "Todo lo del Básico",
      "Compras, stock e inventario",
      "Informes gerenciales",
    ],
    plano: "Profesional",
    resumo: "Facturación, compras, stock e informes",
    ganho: "Para quien tiene depósito: la venta descuenta del stock y el informe cierra solo.",
    mensal: "250.000",
    instalacao: "1.500.000",
    realce: "escolhido",
    recursos: [
      "Emisión de factura",
      "Registro de clientes",
      "Registro de productos",
      "Lista de precios",
      "Envío automático de correo",
      "Gestión de XML",
      "Control de compras",
      "Control de stock",
      "Inventario",
      "Informes gerenciales",
    ],
  },
  {
    chave: "premium",
    destaques: [
      "Todo lo del Profesional",
      "Cuentas por pagar y por cobrar",
      "Flujo de caja y rentabilidad",
    ],
    plano: "Premium",
    resumo: "Stock, finanzas y facturación — completo",
    ganho: "Para quien quiere la operación entera en un solo lugar: stock, cuentas y ganancia.",
    mensal: "300.000",
    instalacao: "1.800.000",
    realce: "completo",
    recursos: [
      "Emisión de factura",
      "Registro de clientes",
      "Registro de productos",
      "Lista de precios",
      "Envío automático de correo",
      "Gestión de XML",
      "Control de compras",
      "Control de stock",
      "Inventario",
      "Informes gerenciales",
      "Control financiero",
      "Cuentas por pagar",
      "Cuentas por cobrar",
      "Flujo de caja",
      "Rentabilidad",
      "Control de gastos por centro de costo",
    ],
  },
] as const satisfies readonly Plano[];

export type ChavePlano = (typeof planos)[number]["chave"];

/**
 * Orden de las filas de la tabla comparativa: la unión de los recursos de los
 * tres planes, agrupada por lo que el comprador está tratando de decidir.
 * Deriva de `recursos` — el que lo tiene, lo tiene; nadie marca ✓ a mano.
 */
export const gruposComparacao = [
  {
    titulo: "Facturación y registros",
    recursos: [
      "Emisión de factura",
      "Registro de clientes",
      "Registro de productos",
      "Lista de precios",
      "Envío automático de correo",
      "Gestión de XML",
    ],
  },
  {
    titulo: "Compras y stock",
    recursos: [
      "Control de compras",
      "Control de stock",
      "Inventario",
      "Informes gerenciales",
    ],
  },
  {
    titulo: "Finanzas",
    recursos: [
      "Control financiero",
      "Cuentas por pagar",
      "Cuentas por cobrar",
      "Flujo de caja",
      "Rentabilidad",
      "Control de gastos por centro de costo",
    ],
  },
] as const;

/** Cobros que valen para los tres planes. */
export const condicoes = {
  pontoAdicional: "100.000",
  nota: "Valores en guaraníes. La instalación se cobra una vez; la mensualidad es recurrente. Cada punto de venta adicional cuesta Gs. 100.000 por mes, aparte.",
  rotuloMensal: "por mes",
  rotuloInstalacao: "de instalación, se cobra una vez",
  rotuloPonto: "por punto de venta adicional/mes",
} as const;

/**
 * La misma lista, leída por el contrato: `planos` es `as const`, entonces su
 * tipo es la unión de los tres literales y `realce` solo existe en los que
 * declaran la clave.
 */
export const listaPlanos: readonly Plano[] = planos;

/** El plan más barato — el ancla de precio del hero sale de acá. */
export const planoDeEntrada: Plano = listaPlanos.reduce((menor, plano) =>
  Number(plano.mensal.replace(/\./g, "")) < Number(menor.mensal.replace(/\./g, ""))
    ? plano
    : menor,
);

/** Mensaje de WhatsApp por plan — el vendedor ya sabe de qué se trata. */
export function whatsappDoPlano(plano: Plano): string {
  const texto = `¡Hola! Vengo del sitio de Syntax y quiero contratar el plan ${plano.plano} (Gs. ${plano.mensal}/mes).`;
  return `${contato.whatsappHref}?text=${encodeURIComponent(texto)}`;
}

/** Rótulos de la tarjeta de plan y de la tabla comparativa. */
export const rotulos = {
  realceEscolhido: "El más elegido",
  realceCompleto: "El más completo",
  /** Prefijo del CTA — el nombre del plan entra después: "Quiero el Profesional". */
  ctaContratar: "Quiero el",
  ctaDetalhes: "Ver todo lo que incluye",
  incluidos: "Qué está incluido",
  colunaRecurso: "Recurso",
  tabelaAria: "Comparación de recursos entre los planes Básico, Profesional y Premium",
  temAria: "incluido",
  naoTemAria: "no incluido",
} as const;

/** Copy de la ruta /planes. */
export const paginaPlanos = {
  meta: {
    title: "Planes y precios del punto de venta | Syntax Sistemas",
    description:
      "Tres planes con precio publicado: Básico Gs. 200.000, Profesional Gs. 250.000 y Premium Gs. 300.000 por mes. Vea recurso por recurso qué incluye cada uno.",
  },
  trilha: { home: "Inicio", atual: "Planes y precios" },
  eyebrow: "Planes y precios",
  titulo: "El precio está acá. Sin propuesta por teléfono.",
  intro:
    "Tres planes para el punto de venta. Elija por lo que su operación necesita, revise recurso por recurso y hable con nosotros sabiendo ya cuánto cuesta.",
  comparacao: {
    overline: "Recurso por recurso",
    titulo: "Qué entra en cada plan",
    intro:
      "La escalera es simple: el Profesional suma compras y stock al Básico, y el Premium lleva todo lo del Profesional más las finanzas completas.",
  },
} as const;

/**
 * Guía "¿cuál plan es el mío?" — el diferencial de la ruta /planes sobre la
 * home. Una situación por plan, en la voz del dueño (§13).
 */
export const guiaDecisao = {
  overline: "¿Cuál plan es el mío?",
  titulo: "Elija por su rutina, no por la lista de recursos",
  itens: [
    {
      chave: "fact",
      situacao: "Necesito facturar bien y ordenar clientes, productos y precios.",
    },
    {
      chave: "pro",
      situacao: "Tengo depósito: compro, almaceno y repongo mercadería cada semana.",
    },
    {
      chave: "premium",
      situacao: "Además del stock, necesito ver cuentas, costos y cuánto queda.",
    },
  ],
  /** Prefijo — el nombre comercial entra después: "Ver el Profesional". */
  cta: "Ver el",
} as const satisfies {
  overline: string;
  titulo: string;
  itens: readonly { chave: ChavePlano; situacao: string }[];
  cta: string;
};

/** Sección "Condiciones" de /planes — qué significa cada cobro. */
export const condicoesPagina = {
  overline: "Condiciones",
  titulo: "Qué cubre cada valor",
  itens: [
    {
      termo: "Mensualidad",
      texto: "El valor recurrente del plan, con el primer punto de venta incluido.",
    },
    {
      termo: "Instalación",
      texto:
        "Se cobra una sola vez, al inicio: entrega su empresa configurada, con los registros en su lugar.",
    },
    {
      termo: "Punto de venta adicional",
      texto: `Gs. ${condicoes.pontoAdicional} por mes por cada caja además de la primera.`,
    },
    {
      termo: "Moneda",
      texto:
        "Los planes del punto de venta son en guaraníes. En Brasil la línea es Syntax ERP, presupuestada por operación.",
    },
  ],
  ponteErp: { rotulo: "Conocer Syntax ERP", href: "/#erp" },
} as const;
