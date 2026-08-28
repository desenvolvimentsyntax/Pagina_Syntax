/**
 * Datos institucionales — es-PY. Espeja `content/pt-BR/site.ts` clave por
 * clave (§18).
 *
 * Lo que cambia acá NO es traducción, es dato distinto por país (§18): en la
 * versión española el canal principal es el paraguayo, y la casa matriz que
 * se muestra primero es Pedro Juan Caballero.
 */

export const empresa = {
  nome: "Syntax",
  sobrenome: "Sistemas",
  razaoSocial: "Syntax Sistemas Empresariais",
  /**
   * ⚠️ conferir — el RUC paraguayo no consta en ninguna fuente pública
   * consultada. Vacío = el pie no renderiza la línea. No publicar sin
   * confirmación de Syntax.
   */
  cnpj: "",
  fundacao: "2006",
  /* Invertido a propósito respecto del pt-BR: para el visitante paraguayo, la
     oficina de Pedro Juan Caballero es la de al lado. */
  matriz: "Pedro Juan Caballero · Paraguay",
  filial: "Sorocaba · SP · Brasil",
  matrizCurta: "Pedro Juan Caballero PY",
  filialCurta: "Sorocaba SP",
  atuacao: "Mercosur",
  /**
   * ⚠️ conferir (§11): la dirección de la sede paraguaya no consta en las
   * fuentes consultadas. Hasta que Syntax la confirme, se muestra la de
   * Sorocaba, que es dato verificado del sitio anterior.
   */
  endereco: "R. Júlio César Iorio, 48 — Jd. Res. Villa Amato, Sorocaba - SP",
  mapaHref:
    "https://www.google.com/maps/place/R.+J%C3%BAlio+C%C3%A9sar+Iorio,+48+-+Jardim+Residencial+Villa+Amato,+Sorocaba+-+SP/@-23.448508,-47.380076,16z",
} as const;

/** Firma de marca, al pie, bajo el logotipo. */
export const slogan = {
  inicio: "Soluciones que conectan.",
  destaque: "Tecnología que transforma.",
} as const;

/**
 * ⚠️ PENDIENTE — WhatsApp del Paraguay.
 *
 * Todos los CTA de esta versión abren `whatsappHref`. Hoy apunta al número
 * paraguayo publicado (+595 975 983-103) armado como enlace de WhatsApp; el
 * Roger confirma si ese número recibe mensajes o envía otro. Mientras no se
 * confirme, existe el riesgo de mandar al visitante a un número que nadie lee
 * — es el único dato de esta fatia que no está verificado.
 */
export const contato = {
  telefone: "+595 975 983-103",
  telefoneHref: "tel:+595975983103",
  celular: "+595 975 983-103",
  whatsappHref: "https://wa.me/595975983103",
  telefonePy: "(15) 3325-1255",
  telefonePyHref: "tel:+551533251255",
  email: "comercial@syntaxsistemas.com.br",
  emailHref: "mailto:comercial@syntaxsistemas.com.br",
  /** Mensaje inicial del botón flotante de WhatsApp (§12). */
  whatsappTexto:
    "¡Hola! Vengo del sitio de Syntax y me gustaría conversar sobre un sistema.",
} as const;

export interface ItemNav {
  rotulo: string;
  href: string;
  /** id de la sección correspondiente, usado por el scrollspy del header. */
  secao: string;
}

/**
 * Menú superior, en el orden del embudo de la home.
 *
 * Los href son "/#seccion" y no "#seccion": desde que existe la ruta /planes,
 * un ancla suelta llevaría a /planes#nosotros, que no existe.
 */
export const navPrincipal: readonly ItemNav[] = [
  { rotulo: "Planes", href: "/#planos", secao: "planos" },
  { rotulo: "Cómo funciona", href: "/#como-funciona", secao: "como-funciona" },
  { rotulo: "Nosotros", href: "/#sobre", secao: "sobre" },
  { rotulo: "Contacto", href: "/#contato", secao: "contato" },
] as const;

export const navAcoes = {
  planos: { rotulo: "Ver planes y precios", href: "/planes" },
  whatsapp: { rotulo: "Hablar por WhatsApp", href: contato.whatsappHref },
} as const;

export const navRodape = [
  { rotulo: "Planes y precios", href: "/planes" },
  { rotulo: "Demostración", href: "/#demonstracao" },
  { rotulo: "Cómo funciona", href: "/#como-funciona" },
  { rotulo: "Nosotros", href: "/#sobre" },
  { rotulo: "Contacto", href: "/#contato" },
] as const;

/** Columna de productos del pie — la familia E-Syntax y las líneas a medida. */
export const navSolucoes = [
  { rotulo: "Syntax FACT · Básico", href: "/planes#fact" },
  { rotulo: "Syntax PRO · Profesional", href: "/planes#pro" },
  { rotulo: "Syntax PREMIUM", href: "/planes#premium" },
  { rotulo: "Syntax ERP", href: "/#erp" },
  { rotulo: "Proyectos a medida", href: "/#erp" },
] as const;
