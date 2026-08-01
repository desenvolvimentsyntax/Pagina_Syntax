import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config nativo. O eslint-config-next 16 já exporta arrays de flat
 * config, então não passa por FlatCompat — o compat quebra no ESLint 10
 * ("Converting circular structure to JSON").
 */
const config = [
  { ignores: [".next/**", "node_modules/**", ".agents/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...nextTypescript,
  {
    // Sem isto, o eslint-plugin-react tenta detectar a versão do React e cai
    // em `context.getFilename()`, que o ESLint 10 removeu. Fixar a versão
    // evita a detecção — e é mais barato que travar o ESLint no 9.
    settings: { react: { version: "19.2" } },
  },
];

export default config;
