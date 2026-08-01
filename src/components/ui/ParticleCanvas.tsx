"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rede de partículas atrás do hero.
 *
 * Desvio consciente do §10, autorizado no redesign: é a única animação do site
 * que não sai em CSS puro (nós com posição própria e linhas entre vizinhos).
 * As travas que mantêm o desvio dentro do espírito do §10:
 *
 * - não monta sob `prefers-reduced-motion: reduce`;
 * - não monta abaixo de 768px (onde é enfeite caro e o LCP é mais apertado);
 * - só monta depois da hidratação, então fica fora do caminho do LCP;
 * - o rAF é cancelado no cleanup e quando a aba vai para segundo plano.
 *
 * Puramente decorativo: aria-hidden, fora da ordem de leitura (§9).
 */

const NOS = 46;
const DISTANCIA_LINK = 150;
const VELOCIDADE = 0.22;

interface No {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function ParticleCanvas() {
  const [ativo, setAtivo] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const telaPequena = window.matchMedia("(max-width: 767px)");

    const avaliar = () => setAtivo(!semMovimento.matches && !telaPequena.matches);
    avaliar();

    semMovimento.addEventListener("change", avaliar);
    telaPequena.addEventListener("change", avaliar);
    return () => {
      semMovimento.removeEventListener("change", avaliar);
      telaPequena.removeEventListener("change", avaliar);
    };
  }, []);

  useEffect(() => {
    if (!ativo) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let largura = 0;
    let altura = 0;
    let nos: No[] = [];
    let frame = 0;

    const dimensionar = () => {
      largura = canvas.clientWidth;
      altura = canvas.clientHeight;
      canvas.width = Math.floor(largura * dpr);
      canvas.height = Math.floor(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const semear = () => {
      nos = Array.from({ length: NOS }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        vx: (Math.random() - 0.5) * VELOCIDADE,
        vy: (Math.random() - 0.5) * VELOCIDADE,
      }));
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, largura, altura);

      for (const no of nos) {
        no.x += no.vx;
        no.y += no.vy;

        if (no.x <= 0 || no.x >= largura) no.vx *= -1;
        if (no.y <= 0 || no.y >= altura) no.vy *= -1;
      }

      for (let i = 0; i < nos.length; i++) {
        for (let j = i + 1; j < nos.length; j++) {
          const dx = nos[i].x - nos[j].x;
          const dy = nos[i].y - nos[j].y;
          const distancia = Math.hypot(dx, dy);
          if (distancia > DISTANCIA_LINK) continue;

          ctx.strokeStyle = `rgba(96, 165, 250, ${0.16 * (1 - distancia / DISTANCIA_LINK)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nos[i].x, nos[i].y);
          ctx.lineTo(nos[j].x, nos[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(147, 197, 253, 0.42)";
      for (const no of nos) {
        ctx.beginPath();
        ctx.arc(no.x, no.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(desenhar);
    };

    dimensionar();
    semear();
    frame = requestAnimationFrame(desenhar);

    const observer = new ResizeObserver(() => {
      dimensionar();
      semear();
    });
    observer.observe(canvas);

    const aoTrocarVisibilidade = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(desenhar);
    };
    document.addEventListener("visibilitychange", aoTrocarVisibilidade);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", aoTrocarVisibilidade);
    };
  }, [ativo]);

  if (!ativo) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
