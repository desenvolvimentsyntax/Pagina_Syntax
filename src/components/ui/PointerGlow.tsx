"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Spotlight que segue o ponteiro (§10): escreve --mx/--my nos descendentes
 * [data-spotlight] e o CSS desenha o radial. Todos os cartões do grupo são
 * atualizados a cada quadro — é o que faz o glow dos vizinhos "apontar" para
 * o cursor. Sem estado React: zero re-render por movimento.
 *
 * Travas (§10): só liga sob (pointer: fine) e sem prefers-reduced-motion;
 * fora disso os listeners nem montam e o CSS nem gera o pseudo-elemento.
 */

interface PointerGlowProps {
  children: ReactNode;
  className?: string;
}

export function PointerGlow({ children, className }: PointerGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grupo = ref.current;
    if (!grupo) return;

    const fino = window.matchMedia("(pointer: fine)");
    const semMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fino.matches || semMotion.matches) return;

    let quadro = 0;

    const aoMover = (e: PointerEvent) => {
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        for (const alvo of grupo.querySelectorAll<HTMLElement>("[data-spotlight]")) {
          const caixa = alvo.getBoundingClientRect();
          alvo.style.setProperty("--mx", `${e.clientX - caixa.left}px`);
          alvo.style.setProperty("--my", `${e.clientY - caixa.top}px`);
        }
      });
    };

    grupo.addEventListener("pointermove", aoMover);
    return () => {
      grupo.removeEventListener("pointermove", aoMover);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div ref={ref} data-pointer-glow className={className}>
      {children}
    </div>
  );
}
