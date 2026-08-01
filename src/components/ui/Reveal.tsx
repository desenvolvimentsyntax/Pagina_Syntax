"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal do §10: CSS + IntersectionObserver, sem biblioteca.
 * Sem JavaScript o conteúdo permanece visível (media query `scripting: none`
 * no globals.css); com `prefers-reduced-motion` a transição é anulada.
 */

interface RevealProps {
  children: ReactNode;
  /** Atraso em ms para escalonar itens de uma mesma grade (máx. sutil). */
  atraso?: number;
  className?: string;
}

export function Reveal({ children, atraso = 0, className }: RevealProps) {
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
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
