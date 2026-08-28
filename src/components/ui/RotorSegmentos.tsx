"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rotor de segmentos — a lista sobe em fluxo contínuo, como um outdoor
 * passando. É o laço da dobra "Qual o seu segmento?": o visitante espera o
 * ramo dele passar.
 *
 * MECANISMO: velocidade constante, não passo a passo. Um `requestAnimationFrame`
 * soma sempre os mesmos px por milissegundo e escreve o `transform` DIRETO no
 * DOM — sem estado React no meio, então não há re-render por frame nem easing
 * a cada palavra. Foi o que tirou o atrito: transição com curva sempre acelera
 * e freia, e era isso que lia como pausa.
 *
 * DESTAQUE POR ZONA, não por palavra. Como nada é discreto, não existe "a
 * palavra ativa": a faixa é renderizada DUAS vezes, uma apagada e outra
 * pintada no degradê, e a de cima é recortada na linha central. Quem passa
 * pela zona acende — o brilho é do lugar, não do elemento.
 *
 * ARRASTO: no celular (e com o mouse) dá para girar com o dedo. É pointer
 * event, então o mesmo código cobre dedo, caneta e mouse. A faixa acompanha
 * 1:1 e, ao soltar, ENCAIXA na palavra mais próxima antes de o fluxo retomar.
 *
 * O encaixe não é enfeite: sob `prefers-reduced-motion` a lista anda em
 * saltos de uma linha, então largar o dedo fora de posição deixaria a zona
 * acesa permanentemente entre duas palavras — e cada salto seguinte herdaria
 * o desalinhamento, sem nunca se corrigir. Com o encaixe, o azul sempre
 * volta a emoldurar uma palavra inteira.
 *
 * `touch-action: pan-x` mantém a rolagem horizontal da página com o
 * navegador e reserva o eixo Y para o gesto.
 *
 * DESVIO AUTORIZADO do §10 (fatia 3.10): animação contínua e infinita, fora
 * da lista permitida. Aprovada com estas travas — mexer nelas exige decisão
 * nova:
 * - sob `prefers-reduced-motion: reduce` NÃO há fluxo: a palavra troca seca,
 *   sem deslizar, a cada 4s (reduce pede menos movimento, não conteúdo
 *   congelado);
 * - o laço pausa fora da viewport (IntersectionObserver) e com a aba oculta
 *   (o próprio rAF já para), então não queima bateria fora da tela;
 * - anima só `transform`, no compositor, sem layout nem paint;
 * - o carrossel é `aria-hidden` e o conteúdo real é o parágrafo `sr-only`.
 *
 * Sem fonte própria: o arquivo de referência carregava Plus Jakarta Sans via
 * <link>; aqui é a Montserrat do tema (§4) — nada de quarta família.
 */

const ALTURA_LINHA = 64; // px — altura de cada linha; o translateY depende dela
const VISIVEIS = 5; // ímpar, para existir uma linha central exata
const VELOCIDADE = 0.042; // px por ms ≈ uma palavra a cada 1,5s
const PASSO_REDUZIDO_MS = 4000; // ritmo da troca seca sob reduced-motion
const ENCAIXE_MS = 260; // tempo do ajuste que centraliza a palavra ao soltar

interface RotorSegmentosProps {
  palavras: readonly string[];
  /** Frase completa para leitores de tela — a faixa animada é decorativa. */
  rotuloAria: string;
}

export function RotorSegmentos({ palavras, rotuloAria }: RotorSegmentosProps) {
  const n = palavras.length;
  const alturaCiclo = n * ALTURA_LINHA;

  // false no SSR de propósito: o primeiro paint é igual nos dois lados e o
  // efeito ajusta no cliente — sem mismatch de hidratação.
  const [reduzido, setReduzido] = useState(false);

  const raizRef = useRef<HTMLDivElement>(null);
  const camadaBaseRef = useRef<HTMLDivElement>(null);
  const camadaAcesaRef = useRef<HTMLDivElement>(null);

  const visivelRef = useRef(true);
  const arrastandoRef = useRef(false);
  /* Enquanto encaixa, o fluxo contínuo não soma velocidade: os dois
     escrevem o mesmo transform e brigariam pelo controle. */
  const encaixandoRef = useRef(false);
  const encaixeFrameRef = useRef<number | undefined>(undefined);
  const inicioYRef = useRef(0);
  const inicioOffsetRef = useRef(0);

  /* O deslocamento vive em ref, não em estado: ele muda a cada frame e quem o
     desenha é o próprio rAF, escrevendo no DOM. Estado aqui significaria ~60
     re-renders por segundo de 48 nós de texto, à toa. Começa numa cópia do
     meio para haver faixa antes e depois. */
  const offsetRef = useRef(alturaCiclo);

  // Pausa fora da viewport: o laço continua, mas não avança.
  useEffect(() => {
    const el = raizRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        visivelRef.current = entrada?.isIntersecting ?? true;
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | undefined;
    let intervalo: ReturnType<typeof setInterval> | undefined;
    let anterior: number | undefined;

    // Módulo do ciclo: a faixa é periódica, então a volta é invisível.
    const pinta = () => {
      const y = -(offsetRef.current % alturaCiclo);
      const transform = `translate3d(0, ${y}px, 0)`;
      if (camadaBaseRef.current) camadaBaseRef.current.style.transform = transform;
      if (camadaAcesaRef.current) camadaAcesaRef.current.style.transform = transform;
    };

    /* Fluxo contínuo: soma VELOCIDADE × Δt. O delta é medido em vez de
       assumido, então a velocidade é a mesma em 60Hz e em 144Hz. */
    const passoContinuo = (agora: number) => {
      const delta = anterior === undefined ? 0 : agora - anterior;
      anterior = agora;

      if (visivelRef.current && !arrastandoRef.current && !encaixandoRef.current) {
        // Clamp de 100ms: voltando de aba oculta, o Δt acumulado daria um salto.
        offsetRef.current += Math.min(delta, 100) * VELOCIDADE;
        pinta();
      }

      frame = requestAnimationFrame(passoContinuo);
    };

    const liga = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      clearInterval(intervalo);
      anterior = undefined;
      setReduzido(mq.matches);

      if (mq.matches) {
        // Troca seca: salta uma linha inteira, sem nada entre um estado e outro.
        intervalo = setInterval(() => {
          if (document.hidden || !visivelRef.current) return;
          offsetRef.current += ALTURA_LINHA;
          pinta();
        }, PASSO_REDUZIDO_MS);
        return;
      }

      frame = requestAnimationFrame(passoContinuo);
    };

    liga();
    mq.addEventListener("change", liga);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      clearInterval(intervalo);
      mq.removeEventListener("change", liga);
    };
  }, [alturaCiclo]);

  /* O arrasto escreve no DOM pelo mesmo caminho do rAF — por isso repete o
     cálculo do transform aqui em vez de chamar o `pinta` do efeito, que é
     local a ele. */
  function desenha() {
    const y = -(offsetRef.current % alturaCiclo);
    const transform = `translate3d(0, ${y}px, 0)`;
    if (camadaBaseRef.current) camadaBaseRef.current.style.transform = transform;
    if (camadaAcesaRef.current) camadaAcesaRef.current.style.transform = transform;
  }

  /* setPointerCapture: o gesto continua nosso mesmo se o dedo sair da caixa,
     e o pointerup/cancel chega de qualquer jeito — sem listener no document. */
  function aoPegar(evento: React.PointerEvent<HTMLDivElement>) {
    // Um toque novo cancela o encaixe em curso — o dedo tem prioridade.
    if (encaixeFrameRef.current !== undefined) {
      cancelAnimationFrame(encaixeFrameRef.current);
      encaixeFrameRef.current = undefined;
    }
    encaixandoRef.current = false;

    arrastandoRef.current = true;
    inicioYRef.current = evento.clientY;
    inicioOffsetRef.current = offsetRef.current;
    evento.currentTarget.setPointerCapture(evento.pointerId);
  }

  function aoMover(evento: React.PointerEvent<HTMLDivElement>) {
    if (!arrastandoRef.current) return;
    // Arrastar para CIMA avança a lista — o mesmo sentido do fluxo.
    const delta = inicioYRef.current - evento.clientY;
    // O módulo mantém o número pequeno mesmo depois de muitos arrastos.
    offsetRef.current =
      (((inicioOffsetRef.current + delta) % alturaCiclo) + alturaCiclo) % alturaCiclo;
    desenha();
  }

  function aoSoltar() {
    arrastandoRef.current = false;

    const de = offsetRef.current;
    const ate = Math.round(de / ALTURA_LINHA) * ALTURA_LINHA;
    if (de === ate) return;

    // Sob reduce o ajuste é instantâneo: quem pediu menos movimento não
    // ganha uma animação de brinde por ter arrastado.
    if (reduzido) {
      offsetRef.current = ate;
      desenha();
      return;
    }

    encaixandoRef.current = true;
    const inicio = performance.now();

    const encaixa = (agora: number) => {
      const t = Math.min((agora - inicio) / ENCAIXE_MS, 1);
      // easeOutCubic: chega desacelerando, sem repique.
      const suave = 1 - Math.pow(1 - t, 3);
      offsetRef.current = de + (ate - de) * suave;
      desenha();

      if (t < 1) {
        encaixeFrameRef.current = requestAnimationFrame(encaixa);
        return;
      }
      encaixeFrameRef.current = undefined;
      encaixandoRef.current = false;
    };

    encaixeFrameRef.current = requestAnimationFrame(encaixa);
  }

  // Três cópias: uma antes, uma em cena, uma depois.
  const faixa = [...palavras, ...palavras, ...palavras];

  /* As duas camadas compartilham TUDO que afeta métrica de texto — peso,
     tamanho, tracking, altura de linha. Com `font-bold` embaixo e
     `font-extrabold` em cima, os glifos têm larguras diferentes e a palavra
     acesa aparece fantasmagórica, com o contorno duplicado da camada de
     baixo escapando por trás. O destaque se faz por cor e brilho, nunca por
     peso. */
  const linha =
    "font-display flex items-center text-[clamp(1.7rem,3.2vw,2.4rem)] leading-none font-bold tracking-tight";

  /* A zona acesa é uma MÁSCARA em degradê, não um recorte duro. Com corte
     reto a palavra que está atravessando aparece serrada ao meio — meia
     letra acesa, meia apagada. Com o degradê ela acende e apaga por
     transparência conforme cruza o centro, que é o que faz o destaque
     parecer luz e não janela. As paradas em % da altura da caixa: 100% no
     miolo da linha central e transparente a uma linha de distância. */
  const zonaAcesa =
    "linear-gradient(to bottom, transparent 36%, #000 47%, #000 53%, transparent 64%)";

  return (
    <div ref={raizRef}>
      <p className="sr-only">{rotuloAria}</p>

      <div
        aria-hidden
        onPointerDown={aoPegar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        className="relative cursor-grab overflow-hidden select-none active:cursor-grabbing"
        style={{
          height: VISIVEIS * ALTURA_LINHA,
          // Vertical é nosso; horizontal segue com o navegador.
          touchAction: "pan-x",
          // Esmaece topo e base para as palavras "nascerem" e "sumirem".
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 26%, #000 74%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 26%, #000 74%, transparent)",
        }}
      >
        {/* Camada de baixo: a lista inteira apagada. */}
        <div
          ref={camadaBaseRef}
          className={reduzido ? undefined : "will-change-transform"}
          style={{ transform: `translate3d(0, ${-alturaCiclo % alturaCiclo}px, 0)` }}
        >
          {faixa.map((palavra, posicao) => (
            <div
              key={posicao}
              className={`${linha} text-muted`}
              style={{ height: ALTURA_LINHA }}
            >
              {palavra}
            </div>
          ))}
        </div>

        {/* Camada de cima: a MESMA lista pintada no degradê, revelada só na
            zona central. Como as duas andam juntas, a palavra acende ao
            entrar na zona e apaga ao sair — o destaque é do lugar, não do
            elemento, e é isso que permite o movimento ser contínuo.

            A máscara fica no wrapper e o brilho na camada que se move: assim
            o drop-shadow é calculado sobre o texto e SÓ DEPOIS mascarado. Na
            ordem inversa a sombra nasceria da silhueta já recortada. */}
        <div
          className="absolute inset-0"
          style={{ WebkitMaskImage: zonaAcesa, maskImage: zonaAcesa }}
        >
          <div
            ref={camadaAcesaRef}
            className={`brilho-rotor ${reduzido ? "" : "will-change-transform"}`}
            style={{ transform: `translate3d(0, ${-alturaCiclo % alturaCiclo}px, 0)` }}
          >
            {faixa.map((palavra, posicao) => (
              <div
                key={posicao}
                className={`${linha} bg-[linear-gradient(100deg,var(--color-azul-vivo),var(--color-produto-erp))] bg-clip-text text-transparent`}
                style={{ height: ALTURA_LINHA }}
              >
                {palavra}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
