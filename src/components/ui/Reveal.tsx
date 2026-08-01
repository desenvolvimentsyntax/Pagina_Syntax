"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal do §10: CSS + IntersectionObserver, sem biblioteca.
 * Sem JavaScript o conteúdo permanece visível (media query `scripting: none`
 * no globals.css); com `prefers-reduced-motion` a transição é anulada.
 */

interface RevealProps {
  children: ReactNode;
  /** Atraso em ms — escape pontual; para grades, prefira `.reveal-stagger` no pai. */
  atraso?: number;
  /** Estado inicial da entrada (§10). O destino é sempre o mesmo. */
  efeito?: "subir" | "lado" | "lado-inverso" | "escala";
  className?: string;
}

export function Reveal({
  children,
  atraso = 0,
  efeito = "subir",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            el.classList.add("reveal-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      data-efeito={efeito === "subir" ? undefined : efeito}
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
