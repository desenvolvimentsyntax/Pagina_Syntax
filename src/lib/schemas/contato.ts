import { z } from "zod";

import type { MensagensValidacao } from "@/content/tipos";

/**
 * Schema do formulário de contato (CLAUDE.md §12: React Hook Form + Zod).
 *
 * O handoff de design é explícito: "campos vazios são omitidos da mensagem;
 * não há validação bloqueante" — é um formulário de abertura de conversa, não
 * de cadastro. Então nenhum campo é obrigatório; o que o schema faz é validar
 * o FORMATO do que foi preenchido, para não montar uma mensagem de WhatsApp
 * com e-mail ou telefone quebrado. Campo vazio passa e some da mensagem.
 *
 * Factory: as mensagens são copy e vêm do content. Quem monta o formulário
 * chama `criarContatoSchema(ui.validacao)` com as mensagens do locale — não
 * existe mais um schema pré-montado, porque não existe mais um idioma só.
 */
export function criarContatoSchema(mensagens: MensagensValidacao) {
  const vazio = (valor: string) => valor.trim() === "";

  return z.object({
    nome: z.string().trim(),
    email: z
      .string()
      .trim()
      .refine((valor) => vazio(valor) || z.email().safeParse(valor).success, {
        message: mensagens.email,
      }),
    telefone: z
      .string()
      .trim()
      .refine(
        (valor) => {
          if (vazio(valor)) return true;
          const digitos = valor.replace(/\D/g, "");
          return digitos.length >= 10 && digitos.length <= 13;
        },
        { message: mensagens.telefone },
      ),
    tamanho: z.string(),
  });
}

export type ContatoForm = z.infer<ReturnType<typeof criarContatoSchema>>;
