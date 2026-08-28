"use client";

import { useEffect } from "react";

/**
 * Ripple do handoff — a "marca de dedo em vidro" que sai do ponto tocado em
 * todo CTA. Delegação num único listener no document: qualquer elemento com
 * `data-ripple` (mais `relative overflow-hidden`) entra no efeito sem virar
 * componente cliente. Monte uma vez por página.
 *
 * A keyframe `rippleFx` mora no globals.css; aqui só nasce o <span>. Sem
 * estado React de propósito: o efeito é puramente visual e um re-render por
 * clique seria caro à toa.
 */

/** Diâmetro = maior lado do botão × 2.2 (handoff): cobre o botão de canto a canto. */
const FATOR_DIAMETRO = 2.2;
/** 650ms de animação + folga antes de tirar o nó do DOM. */
const VIDA_MS = 700;

export function Ripple() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Guarda as ondas vivas para que uma desmontagem no meio da animação não
       deixe <span> órfão nem timer pendente. */
    const ondas = new Map<HTMLSpanElement, number>();

    const aoPressionar = (evento: PointerEvent) => {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;

      const gatilho = alvo.closest<HTMLElement>("[data-ripple]");
      if (!gatilho) return;

      const caixa = gatilho.getBoundingClientRect();
      const diametro = Math.max(caixa.width, caixa.height) * FATOR_DIAMETRO;
      const x = evento.clientX - caixa.left - diametro / 2;
      const y = evento.clientY - caixa.top - diametro / 2;

      const onda = document.createElement("span");
      /* Nó puramente decorativo dentro de um link/botão: fora da árvore de
         acessibilidade para não entrar no nome acessível do CTA (§9). */
      onda.setAttribute("aria-hidden", "true");
      onda.style.cssText = `position:absolute; left:${x}px; top:${y}px; width:${diametro}px; height:${diametro}px; border-radius:50%; pointer-events:none; background:radial-gradient(circle, rgba(255,255,255,.85) 0%, rgba(255,255,255,.35) 40%, rgba(255,255,255,0) 70%); animation:rippleFx .65s ease-out forwards;`;

      gatilho.appendChild(onda);

      ondas.set(
        onda,
        window.setTimeout(() => {
          ondas.delete(onda);
          onda.remove();
        }, VIDA_MS),
      );
    };

    document.addEventListener("pointerdown", aoPressionar);

    return () => {
      document.removeEventListener("pointerdown", aoPressionar);
      for (const [onda, temporizador] of ondas) {
        window.clearTimeout(temporizador);
        onda.remove();
      }
      ondas.clear();
    };
  }, []);

  return null;
}
