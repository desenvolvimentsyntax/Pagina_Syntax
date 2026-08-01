/**
 * JSON-LD (CLAUDE.md §8). Organization + LocalBusiness no layout raiz.
 * `areaServed: ["BR", "PY"]` porque a operação é Brasil + Paraguai (§18).
 * Endereço e fundação extraídos do site atual — não inventados.
 */
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
