/**
 * Lista de clientes do carrossel de cases — COMPARTILHADA pelos dois idiomas.
 *
 * Mora fora de `pt-BR/` e `es-PY/` porque não é copy: nome próprio não se
 * traduz, o slug é identidade e o arquivo da logo é o mesmo nos dois lados.
 * Até a fatia 5 cada locale tinha a sua cópia, e adicionar uma logo exigia
 * lembrar de editar os dois — a trava de paridade não pega esse tipo de
 * divergência, porque a chave existe nos dois, só com valor diferente.
 *
 * O que continua por idioma em `<locale>/cases.ts` é só o cabeçalho da seção
 * (overline, título e o rótulo do leitor de tela).
 *
 * ⚠️ conferir antes de publicar (§11): lista de clientes reais entregue pelo
 * Roger em 28/08/2026. Mostrar nome de cliente em página comercial exige
 * autorização de cada empresa — confirmar com a Syntax quais podem aparecer.
 *
 * A razão social NÃO entra aqui de propósito: na lista original vários
 * clientes são pessoa física (o nome do dono no lugar da empresa), e nome de
 * pessoa numa vitrine pública é dado pessoal.
 */

export interface CaseCliente {
  /** Chave estável da lista. */
  slug: string;
  /** Nome comercial — é o que aparece sob a logo. */
  nome: string;
  /**
   * Arquivo em `public/images/cases/`, COM extensão. Ausente = monograma de
   * iniciais. É chave explícita, e não um `onError` no cliente, para o
   * servidor já mandar a peça certa sem piscar.
   */
  logo?: string;
}

export const clientes = [
  { slug: "yuyo-comercial", nome: "Yuyo Comercial", logo: "yuyo-comercial.webp" },
  { slug: "calixto", nome: "Calixto" },
  { slug: "virgen-de-caacupe", nome: "Distribuidora Virgen de Caacupé" },
  { slug: "bodega-tio-charlie", nome: "Bodega Tio Charlie" },
  { slug: "4h-distribuidora", nome: "4H Distribuidora" },
  { slug: "alpa", nome: "ALPA" },
  { slug: "pjj-distribuidora", nome: "PJJ Distribuidora", logo: "pjj-distribuidora.jpg" },
  { slug: "alpa-inca", nome: "ALPA INCA" },
  /* O arquivo entregue é um post promocional (linha Conti sobre fundo azul),
     não a logo isolada. É material da própria empresa, sem marca d'água de
     terceiro, então foi recortada só a faixa da marca — inteiro, o post
     deixaria a logo ocupando um quarto do tile e ilegível. */
  {
    slug: "grupo-fronterizo-santa-rosa",
    nome: "Grupo Fronterizo",
    logo: "grupo-fronterizo.jpg",
  },
  { slug: "triple-s", nome: "Triple S" },
  { slug: "distribuidora-fronterizo", nome: "Distribuidora Fronterizo" },
  {
    slug: "distribuidora-kuarahy-chaco",
    nome: "Distribuidora Kuarahy",
    logo: "distribuidora-kuarahy.jpg",
  },
  {
    slug: "mauri-distribuidora",
    nome: "Mauri Distribuidora",
    logo: "mauri-distribuidora.jpg",
  },
  { slug: "supermercado-jp", nome: "Supermercado JP" },
  { slug: "distribuidora-toledo", nome: "Distribuidora Toledo" },
  { slug: "importados-mas", nome: "Importados Mas" },
  { slug: "inmaculada", nome: "Dist. Inmaculada" },
  /* Lockup vertical oficial, recortado das margens do arquivo entregue. Vai
     inteiro (marca DG + "DISTRIBUIDORA DON GATO S.A.") porque só o quadrado
     DG, sem o texto, não identificaria a empresa. O bloco preto é da própria
     arte — o lettering é branco e sumiria se fosse recortado. */
  { slug: "don-gato", nome: "Don Gato", logo: "don-gato.jpg" },
  { slug: "valepar-funada", nome: "Valepar Funada" },
  { slug: "jc-distribuidora", nome: "JC Distribuidora" },
  { slug: "ata-distribuidora", nome: "ATA Distribuidora" },
  { slug: "jamile-beer", nome: "Jamile Beer", logo: "jamile-beer.jpg" },
  { slug: "via-punta", nome: "Via Punta" },
  { slug: "glubcha", nome: "GLUBCHA" },
  { slug: "doce-mania", nome: "Doce Mania" },
  /* ⚠️ o arquivo entregue para a Kids Play é uma FOTO do letreiro da loja,
     não um arquivo de logo: a parede listrada aparece atrás das letras e, no
     tile de 104px ao lado das logos vetoriais, lê como miniatura borrada.
     Fica no monograma até chegar a arte original. */
  { slug: "kids-play", nome: "Kids Play" },
  { slug: "global-pet", nome: "Global PET" },
  { slug: "imperial-cia", nome: "Distribuidora Imperial & Cia" },
  { slug: "monaco", nome: "Monaco" },
  { slug: "chopp-cia", nome: "Chopp & Cia", logo: "chopp-cia.webp" },
  /* O arquivo entregue é um anúncio de terceiro (foto de carro + marca d'água
     "GuiaSchnell"). Foi recortada SÓ a caixa branca com a logo da própria
     empresa — a foto e a marca d'água ficam de fora, e o que sobra é material
     do cliente. Republicar a peça inteira é que não se faria. */
  { slug: "km-pneus", nome: "KM Pneus", logo: "km-pneus.jpg" },
] as const satisfies readonly CaseCliente[];
