import Image from "next/image";

import { conteudoDe } from "@/content";
import type { CaseCliente } from "@/content/tipos";
import { iniciaisDe } from "@/lib/iniciais";
import type { Locale } from "@/lib/routes";

/**
 * Carrossel de cases — marquee horizontal, contínuo e sem emenda.
 *
 * MECANISMO: a lista é renderizada DUAS vezes no mesmo trilho e a animação
 * anda até -50%. Como a segunda metade é idêntica à primeira, o instante em
 * que o keyframe volta a zero cai exatamente onde a primeira metade estava —
 * o corte é invisível sem nenhum JavaScript. É CSS puro, então é Server
 * Component e custa zero de runtime (o rotor de segmentos precisa de rAF
 * porque tem arrasto; aqui não).
 *
 * VELOCIDADE em px/s, não em duração fixa: a duração é calculada a partir da
 * quantidade de tiles. Assim, quando o Roger adicionar mais dez empresas, o
 * carrossel continua andando na mesma sensação de velocidade em vez de
 * acelerar para caber na mesma volta.
 *
 * DESVIO AUTORIZADO do §10 (fatia 3.11): animação infinita, como o rotor.
 * A faixa roda inclusive sob `prefers-reduced-motion` — decisão do Roger em
 * 28/08/2026, por pedido explícito (parada, a seção lia como bloco morto). A
 * trava que sobra é a pausa no hover e no foco do teclado, que é o mecanismo
 * pedido pelo WCAG 2.2.2. Anima só `transform`, no compositor.
 *
 * A faixa é `aria-hidden` porque a duplicação faria o leitor de tela anunciar
 * cada empresa duas vezes; a lista real está no `sr-only` da seção.
 */

const LARGURA_TILE = 230; // px
const ESPACO_TILE = 36; // px — sem card, a separação é o próprio respiro
const ALTURA_LOGO = 104; // px — a caixa da marca; a logo cabe dentro por contain
const VELOCIDADE = 55; // px por segundo: passa sem apressar a leitura

function Tile({ cliente }: { cliente: CaseCliente }) {
  return (
    <li
      className="shrink-0"
      style={{ width: LARGURA_TILE, marginRight: ESPACO_TILE }}
    >
      {/* Sem card em volta: a logo é a peça, e moldura branca sobre fundo
          branco só somava contorno. A altura fixa é o que alinha marcas de
          proporções diferentes na mesma linha de base e reserva o espaço
          antes de a imagem chegar (§10, sem layout shift). */}
      <div
        className="flex items-center justify-center"
        style={{ height: ALTURA_LOGO }}
      >
        {cliente.logo ? (
          <div className="relative h-full w-full">
            {/* rounded-lg: várias logos vêm com fundo sólido próprio (branco,
                preto, foto). Sem card em volta elas viram blocos na faixa —
                com o canto arredondado o bloco ao menos lê como peça, e não
                como retângulo esquecido. */}
            <Image
              src={`/images/cases/${cliente.logo}`}
              alt={cliente.nome}
              fill
              sizes="230px"
              className="rounded-lg object-contain"
            />
          </div>
        ) : (
          /* Monograma enquanto a logo não chega — iniciais soltas, no tom da
             marca. Sem caixa colorida: ao lado de uma logo de verdade, um
             quadrado azul competiria com ela em vez de ceder o lugar. */
          <span
            aria-hidden
            className="text-marca/70 font-display text-[38px] font-extrabold tracking-tight"
          >
            {iniciaisDe(cliente.nome)}
          </span>
        )}
      </div>

      <p className="text-muted mt-3 truncate text-center text-[13.5px] font-medium">
        {cliente.nome}
      </p>
    </li>
  );
}

export function CarrosselCases({ locale }: { locale: Locale }) {
  const clientes = conteudoDe(locale).cases.cases.clientes;
  const larguraCiclo = clientes.length * (LARGURA_TILE + ESPACO_TILE);
  const duracao = larguraCiclo / VELOCIDADE;

  return (
    <div
      aria-hidden
      className="marquee-cases relative"
      style={{ ["--marquee-duracao" as string]: `${duracao}s` }}
    >
      <ul className="marquee-cases__trilho flex w-max">
        {/* Duas passadas da MESMA lista: é o que fecha o loop sem emenda. */}
        {clientes.map((cliente) => (
          <Tile key={cliente.slug} cliente={cliente} />
        ))}
        {clientes.map((cliente) => (
          <Tile key={`${cliente.slug}-eco`} cliente={cliente} />
        ))}
      </ul>
    </div>
  );
}
