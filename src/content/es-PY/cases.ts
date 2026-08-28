/**
 * Casos de éxito — encabezado de la sección, es-PY.
 *
 * La LISTA de clientes no vive acá: es la misma en los dos idiomas y está en
 * `content/clientes.ts` (nombre propio no se traduce, el slug es identidad y
 * el archivo del logo es el mismo). Acá queda solo lo que es copy.
 */

import { clientes } from "@/content/clientes";

export const cases = {
  overline: "Casos de éxito",
  titulo: "Quiénes ya operan con Syntax ERP",
  /** Rótulo del carrusel para lectores de pantalla — la faja animada es decorativa. */
  listaAria: "Empresas atendidas por Syntax",
  clientes,
} as const;
