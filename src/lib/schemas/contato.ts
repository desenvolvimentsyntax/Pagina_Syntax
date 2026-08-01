import { z } from "zod";

/**
 * Schema do formulário de orçamento (CLAUDE.md §12).
 * Mensagens humanas, em português. Telefone validado por quantidade de
 * dígitos (aceita fixo e celular com DDD, com ou sem +55).
 */
export const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  empresa: z.string().trim().min(2, "Informe o nome da empresa"),
  email: z.email("Informe um e-mail válido"),
  telefone: z
    .string()
    .trim()
    .refine((valor) => {
      const digitos = valor.replace(/\D/g, "");
      return digitos.length >= 10 && digitos.length <= 13;
    }, "Informe um telefone válido com DDD"),
  segmento: z.string().min(1, "Selecione o segmento"),
  mensagem: z
    .string()
    .trim()
    .min(10, "Conte em poucas palavras o que você precisa"),
});

export type ContatoForm = z.infer<typeof contatoSchema>;
