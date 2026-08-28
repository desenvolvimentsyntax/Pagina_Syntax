import { slogan } from "@/content/pt-BR/home";

/**
 * Faixa do slogan entre o hero e as Soluções — respiro escuro que separa as
 * duas seções claras.
 *
 * É um <p>, não um heading: a frase é assinatura de marca e entrar na
 * hierarquia de títulos criaria um h2 sem seção por baixo (§9).
 */
export function SloganSection() {
  return (
    <div className="sobre-escuro bg-escuro">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-7 lg:px-12">
        <p className="font-display text-ondark text-center text-[21px] leading-snug font-bold tracking-[0.02em] text-balance">
          {slogan.inicio} <span className="text-azul-claro">{slogan.destaque}</span>
        </p>
      </div>
    </div>
  );
}
