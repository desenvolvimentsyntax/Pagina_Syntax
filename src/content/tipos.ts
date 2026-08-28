/**
 * Tipos de ESTRUTURA do conteúdo, compartilhados pelos dois idiomas.
 *
 * Copy muda por locale; estrutura não. `chave`, `icone`, `realce` e `slug` são
 * identificadores — existem iguais em pt-BR e es-PY de propósito, porque é o
 * que permite indexar mapas como o `IDENTIDADE` do MarcaProduto sem depender
 * do idioma.
 *
 * O pt-BR é a referência declarativa desses tipos (foi o primeiro a existir);
 * a trava de paridade em `content/index.ts` garante que o es-PY não divirja.
 * São `export type`, então nada disso sobrevive ao build — não há acoplamento
 * de runtime com o português.
 */

export type { CaseCliente } from "@/content/pt-BR/cases";
export type { IconeCobertura } from "@/content/pt-BR/home";
export type { ChaveProduto, ChavePlano, Plano } from "@/content/pt-BR/planos";
export type { ItemNav } from "@/content/pt-BR/site";
/**
 * Declarada aqui, e não reexportada do pt-BR: lá ela é `typeof ui.validacao`,
 * ou seja, o tipo é o PRÓPRIO texto em português — e a mensagem em espanhol
 * nunca satisfaria isso. Os demais tipos deste arquivo são interfaces ou
 * uniões de identificadores, que são iguais nos dois idiomas e podem vir por
 * reexport.
 */
export interface MensagensValidacao {
  email: string;
  telefone: string;
}
