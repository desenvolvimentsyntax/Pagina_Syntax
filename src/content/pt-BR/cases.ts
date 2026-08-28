/**
 * Cases de sucesso — cabeçalho da seção, pt-BR.
 *
 * A LISTA de clientes não mora aqui: é a mesma nos dois idiomas e vive em
 * `content/clientes.ts` (nome próprio não se traduz, slug é identidade e o
 * arquivo da logo é o mesmo). Aqui fica só o que é copy.
 */

import { clientes } from "@/content/clientes";

export const cases = {
  overline: "Cases de sucesso",
  titulo: "Quem já opera com o Syntax ERP",
  /** Rótulo do carrossel para leitores de tela — a faixa animada é decorativa. */
  listaAria: "Empresas atendidas pela Syntax",
  clientes,
} as const;
