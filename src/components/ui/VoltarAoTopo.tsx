"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Botão flutuante de voltar ao topo. Aparece depois de ~uma dobra e meia de
 * rolagem (600px) — antes disso ele só cobriria conteúdo sem servir a nada.
 *
 * Fica à ESQUERDA porque a direita é do WhatsApp, que é CTA de negócio e não
 * pode dividir atenção com utilidade de navegação.
 *
 * É uma âncora para #topo (o id da primeira seção nas duas páginas): herda o
 * scroll-behavior: smooth do html e o scroll-margin do globals.css, e o
 * teclado a alcança como qualquer link. Client component só pelo estado de
 * visibilidade — mesmo padrão de listener passivo do Header.
 */
export function VoltarAoTopo({ rotulo }: { rotulo: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 600);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href="#topo"
      aria-label={rotulo}
      aria-hidden={visivel ? undefined : true}
      tabIndex={visivel ? undefined : -1}
      className={`bg-surface border-border text-marca shadow-topo hover:text-marca-hover fixed bottom-5 left-5 z-50 flex size-11 items-center justify-center rounded-full border transition-[opacity,transform,color] duration-200 ${
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden className="size-5" />
    </a>
  );
}
