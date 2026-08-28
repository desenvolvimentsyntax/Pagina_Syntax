import type { MetadataRoute } from "next";

import { LOCALES_PUBLICADOS, urlDe, type ChaveRota } from "@/lib/routes";

/**
 * §8: toda página entra no sitemap nas duas versões de idioma.
 * Só entram locales publicados — §18 não deixa indexar rota sem revisão
 * humana, então hoje sai apenas pt-BR.
 *
 * Toda rota nova criada pelo §17 deve ser listada aqui.
 */
const ROTAS_EXISTENTES: readonly ChaveRota[] = ["home", "planos"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROTAS_EXISTENTES.flatMap((chave) =>
    LOCALES_PUBLICADOS.map((locale) => ({
      url: urlDe(chave, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: chave === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES_PUBLICADOS.map((outro) => [outro, urlDe(chave, outro)]),
        ),
      },
    })),
  );
}
