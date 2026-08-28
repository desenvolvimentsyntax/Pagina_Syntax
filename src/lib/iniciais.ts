/**
 * Monograma de duas letras para o cliente que ainda não tem logo.
 *
 * Mora em `lib` e não em `content` porque é lógica, não copy: os dois idiomas
 * usam exatamente o mesmo algoritmo, e duplicar isso por locale seria criar
 * duas versões para divergirem depois.
 *
 * As palavras genéricas saem antes ("Distribuidora Toledo" vira TO, não DT),
 * senão metade da faixa seria "DI" e o monograma deixaria de identificar. A
 * lista serve aos dois idiomas — em espanhol e português as palavras de
 * fachada de empresa são praticamente as mesmas.
 */
const GENERICAS = new Set([
  "distribuidora",
  "dist",
  "comercial",
  "industrial",
  "supermercado",
  "importados",
  "grupo",
  "bodega",
  "de",
  "del",
  "la",
  "el",
  "y",
  "e",
  "&",
  "cia",
  "sa",
  "srl",
  "eas",
  "ltda",
]);

export function iniciaisDe(nome: string): string {
  const palavras = nome
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((palavra) => palavra && !GENERICAS.has(palavra));

  const base =
    palavras.length >= 2
      ? palavras[0][0] + palavras[1][0]
      : palavras.length === 1
        ? palavras[0].slice(0, 2)
        : nome.slice(0, 2);

  return base.toUpperCase();
}
