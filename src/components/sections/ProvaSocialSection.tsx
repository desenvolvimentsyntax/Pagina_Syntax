import Image from "next/image";

import { provaSocial } from "@/content/pt-BR/home";

/**
 * Faixa de prova social — entre o hero e o ato 01, SEM índice de ato (mesmo
 * status da faixa Ecossistema, peso 1): ativá-la não renumera a narrativa.
 *
 * GATED (§11/§13): sem logos reais autorizados pela Syntax, a seção não
 * monta. NUNCA preencher `provaSocial.logos` com material fictício — nem
 * para preview; o vercel.app é público.
 *
 * Formato distinto das vizinhas (hero = mostruário em camadas; Quem somos =
 * editorial+timeline) e da faixa Ecossistema (aqui logos estáticos,
 * sem border-y e sem deslize).
 */
export function ProvaSocialSection() {
  if (provaSocial.logos.length === 0) return null;

  return (
    <section aria-label={provaSocial.rotulo} className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <p className="text-micro text-center font-mono text-xs font-medium tracking-[0.1em] uppercase">
          {provaSocial.rotulo}
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {provaSocial.logos.map((logo) => (
            <li key={logo.nome}>
              <Image
                src={logo.src}
                alt={logo.nome}
                width={logo.largura}
                height={logo.altura}
                className="h-8 w-auto opacity-60 transition-opacity duration-300 hover:opacity-100 md:h-9"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
