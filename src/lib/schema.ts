/**
 * JSON-LD (CLAUDE.md §8). Organization + LocalBusiness no layout raiz.
 * `areaServed: ["BR", "PY"]` porque a operação é Brasil + Paraguai (§18).
 * Endereço e fundação extraídos do site atual — não inventados.
 */
import { faq } from "@/content/pt-BR/home";
import { contato, empresa } from "@/content/pt-BR/site";
import { SITE_URL } from "@/lib/routes";

export function schemaOrganization() {
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

/**
 * FAQPage gerado do mesmo array que o FaqSection renderiza — o script vive
 * dentro da seção: se ela sair da página, o schema sai junto. O Google exibe
 * pouco rich result de FAQ desde 2023; o markup permanece válido e sem custo.
 */
export function schemaFAQPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };
}

export function schemaLocalBusiness() {
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
