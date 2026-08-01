import { z } from "zod";

import { ui, type MensagensValidacao } from "@/content/pt-BR/ui";

/**
 * Schema do formulário de orçamento (CLAUDE.md §12). Telefone validado por
 * quantidade de dígitos (aceita fixo e celular com DDD, com ou sem +55).
 * Factory: as mensagens são copy e vêm do content — a fatia es-PY (§18) cria
 * o schema dela trocando só o objeto de mensagens.
 */
export function criarContatoSchema(mensagens: MensagensValidacao) {
  return z.object({
    nome: z.string().trim().min(2, mensagens.nome),
    empresa: z.string().trim().min(2, mensagens.empresa),
    email: z.email(mensagens.email),
    telefone: z
      .string()
      .trim()
      .refine((valor) => {
        const digitos = valor.replace(/\D/g, "");
        return digitos.length >= 10 && digitos.length <= 13;
      }, mensagens.telefone),
    segmento: z.string().min(1, mensagens.segmento),
    mensagem: z.string().trim().min(10, mensagens.mensagem),
  });
}

export const contatoSchema = criarContatoSchema(ui.validacao);

export type ContatoForm = z.infer<typeof contatoSchema>;
