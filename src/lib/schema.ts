/**
 * JSON-LD (CLAUDE.md §8). Organization + LocalBusiness no layout raiz.
 * `areaServed: ["BR", "PY"]` porque a operação é Brasil + Paraguai (§18).
 * Endereço e fundação extraídos do site atual — não inventados.
 */
import { conteudoDe } from "@/content";
import { SITE_URL, urlDe, type Locale } from "@/lib/routes";

export function schemaOrganization(locale: Locale) {
  const { contato, empresa } = conteudoDe(locale).site;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: `${empresa.nome} ${empresa.sobrenome}`,
    legalName: empresa.razaoSocial,
    foundingDate: empresa.fundacao,
    url: SITE_URL,
    email: contato.email,
    telephone: contato.telefoneHref.replace("tel:", ""),
    areaServed: ["BR", "PY"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contato.telefoneHref.replace("tel:", ""),
        email: contato.email,
        availableLanguage: ["pt-BR", "es-PY"],
        areaServed: "BR",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contato.telefonePyHref.replace("tel:", ""),
        email: contato.email,
        availableLanguage: ["es-PY", "pt-BR"],
        areaServed: "PY",
      },
    ],
  };
}

export function schemaLocalBusiness(locale: Locale) {
  const { contato, empresa } = conteudoDe(locale).site;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: `${empresa.nome} ${empresa.sobrenome}`,
    url: SITE_URL,
    email: contato.email,
    telephone: contato.telefoneHref.replace("tel:", ""),
    foundingDate: empresa.fundacao,
    areaServed: ["BR", "PY"],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "R. Júlio César Iorio, 48 — Jardim Residencial Villa Amato",
        addressLocality: "Sorocaba",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Pedro Juan Caballero",
        addressCountry: "PY",
      },
    ],
  };
}

/**
 * FAQPage (§8) — as mesmas seis objeções da dobra de dúvidas da home. A fonte
 * é o `content`, então resposta editada lá vale aqui sem ninguém lembrar.
 */
export function schemaFaq(locale: Locale) {
  const { duvidas } = conteudoDe(locale).home;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${urlDe("home", locale)}#faq`,
    mainEntity: duvidas.itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}

/**
 * SoftwareApplication + AggregateOffer da página de planos (§8).
 *
 * O `price` do schema.org não aceita separador de milhar: "200.000" seria lido
 * como 200,0. Por isso o ponto sai aqui — o valor exibido continua formatado
 * no `content`, que é onde a pessoa lê.
 */
function precoNumerico(valor: string) {
  return valor.replace(/\./g, "");
}

export function schemaPlanos(locale: Locale) {
  const { planos } = conteudoDe(locale).planos;
  const urlPlanos = urlDe("planos", locale);
  const valores = planos.map((plano) => Number(precoNumerico(plano.mensal)));

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${urlPlanos}#software`,
    name: "Syntax — Ponto de venda",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: urlPlanos,
    inLanguage: ["pt-BR", "es-PY"],
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PYG",
      lowPrice: Math.min(...valores),
      highPrice: Math.max(...valores),
      offerCount: planos.length,
      offers: planos.map((plano) => ({
        "@type": "Offer",
        name: plano.plano,
        description: plano.resumo,
        price: precoNumerico(plano.mensal),
        priceCurrency: "PYG",
        url: `${urlPlanos}#${plano.chave}`,
        availability: "https://schema.org/InStock",
      })),
    },
  };
}

/** BreadcrumbList das páginas internas (§8). */
export function schemaBreadcrumb(
  trilha: readonly { nome: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trilha.map((item, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: item.nome,
      item: item.url,
    })),
  };
}
