/**
 * Casos de éxito — las empresas que Syntax atiende. Espeja
 * `content/pt-BR/cases.ts` clave por clave (§18).
 *
 * ⚠️ conferir antes de publicar (§11): lista de clientes reales entregada por
 * el Roger el 28/08/2026. Mostrar el nombre de un cliente en una página
 * comercial exige autorización de cada empresa — confirmar con Syntax cuáles
 * pueden aparecer antes de ir a producción.
 *
 * La razón social NO entra acá a propósito: en la lista original varios
 * clientes son persona física (el nombre del dueño en lugar de la empresa), y
 * nombre de persona en una vitrina pública es dato personal.
 *
 * Los nombres y los slugs son idénticos al pt-BR — nombre propio no se
 * traduce, y el slug es clave de identidad compartida entre los dos idiomas.
 */

export interface CaseCliente {
  /** Clave estable de la lista. */
  slug: string;
  /** Nombre comercial — es lo que aparece bajo el logo. */
  nome: string;
  /** Archivo en `public/images/cases/`, con extensión. Ausente = monograma. */
  logo?: string;
}

export const cases = {
  overline: "Casos de éxito",
  titulo: "Quiénes ya operan con Syntax ERP",
  /** Rótulo del carrusel para lectores de pantalla — la faja animada es decorativa. */
  listaAria: "Empresas atendidas por Syntax",

  clientes: [
    { slug: "yuyo-comercial", nome: "Yuyo Comercial", logo: "yuyo-comercial.webp" },
    { slug: "calixto", nome: "Calixto" },
    { slug: "virgen-de-caacupe", nome: "Distribuidora Virgen de Caacupé" },
    { slug: "bodega-tio-charlie", nome: "Bodega Tio Charlie" },
    { slug: "4h-distribuidora", nome: "4H Distribuidora" },
    { slug: "alpa", nome: "ALPA" },
    { slug: "pjj-distribuidora", nome: "PJJ Distribuidora", logo: "pjj-distribuidora.jpg" },
    { slug: "alpa-inca", nome: "ALPA INCA" },
    { slug: "grupo-fronterizo-santa-rosa", nome: "Grupo Fronterizo" },
    { slug: "triple-s", nome: "Triple S" },
    { slug: "distribuidora-fronterizo", nome: "Distribuidora Fronterizo" },
    { slug: "distribuidora-kuarahy-chaco", nome: "Distribuidora Kuarahy", logo: "distribuidora-kuarahy.jpg" },
    { slug: "mauri-distribuidora", nome: "Mauri Distribuidora", logo: "mauri-distribuidora.jpg" },
    { slug: "supermercado-jp", nome: "Supermercado JP" },
    { slug: "distribuidora-toledo", nome: "Distribuidora Toledo" },
    { slug: "importados-mas", nome: "Importados Mas" },
    { slug: "inmaculada", nome: "Dist. Inmaculada" },
    { slug: "don-gato", nome: "Don Gato" },
    { slug: "valepar-funada", nome: "Valepar Funada" },
    { slug: "jc-distribuidora", nome: "JC Distribuidora" },
    { slug: "ata-distribuidora", nome: "ATA Distribuidora" },
    { slug: "jamile-beer", nome: "Jamile Beer", logo: "jamile-beer.jpg" },
    { slug: "via-punta", nome: "Via Punta" },
    { slug: "glubcha", nome: "GLUBCHA" },
    { slug: "doce-mania", nome: "Doce Mania" },
    { slug: "kids-play", nome: "Kids Play" },
    { slug: "global-pet", nome: "Global PET" },
    { slug: "imperial-cia", nome: "Distribuidora Imperial & Cia" },
    { slug: "monaco", nome: "Monaco" },
    { slug: "chopp-cia", nome: "Chopp & Cia", logo: "chopp-cia.webp" },
    /* ⚠️ o arquivo entregue para a KM Pneus não é a logo: é um anúncio de
       terceiro (foto de carro + marca d'água "GuiaSchnell"). Fica no
       monograma até chegar a logo real — republicar peça de outro site numa
       página comercial não se faz. */
    { slug: "km-pneus", nome: "KM Pneus" },
  ] satisfies readonly CaseCliente[],
} as const;
