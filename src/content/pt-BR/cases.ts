/**
 * Cases de sucesso — as empresas que a Syntax atende.
 *
 * ⚠️ conferir antes de publicar (§11): esta é a lista de clientes reais
 * entregue pelo Roger em 28/08/2026. Nome de cliente em página comercial
 * precisa de autorização de cada empresa — confirmar com a Syntax quais
 * podem aparecer antes de ir a produção.
 *
 * A razão social NÃO entra aqui de propósito. Na lista original vários
 * clientes são pessoa física (o nome do dono no lugar da empresa), e nome de
 * pessoa numa vitrine pública é dado pessoal — a página mostra só o nome
 * comercial, que é o que interessa como prova.
 *
 * `logo` guarda o NOME DO ARQUIVO, com extensão — em vez de um booleano com
 * extensão fixa, porque as logos chegam em .webp e em .jpg conforme o que o
 * cliente mandou, e converter à mão a cada entrega é atrito à toa (o
 * next/image reotimiza os dois do mesmo jeito). Sem `logo`, o tile cai no
 * monograma de iniciais — e a decisão é do servidor, não um `onError` no
 * cliente, que pisca.
 */

export interface CaseCliente {
  /** Chave estável da lista. */
  slug: string;
  /** Nome comercial — é o que aparece sob a logo. */
  nome: string;
  /** Arquivo em `public/images/cases/`, com extensão. Ausente = monograma. */
  logo?: string;
}

export const cases = {
  overline: "Cases de sucesso",
  titulo: "Quem já opera com o Syntax ERP",
  /** Rótulo do carrossel para leitores de tela — a faixa animada é decorativa. */
  listaAria: "Empresas atendidas pela Syntax",

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
