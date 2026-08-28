import { buttonVariants } from "@heroui/react";
import Link from "next/link";

import { conteudoDe } from "@/content";
import { LOCALE_PADRAO } from "@/lib/routes";

/**
 * 404 dentro do layout do locale. Atende tanto rota inexistente quanto
 * idioma ainda não publicado (§18).
 */
export default function NaoEncontrado() {
  /* O 404 não recebe params do segmento, então cai no idioma padrão do site —
     que é justamente o certo para quem chegou por uma URL que não existe. */
  const conteudo = conteudoDe(LOCALE_PADRAO);
  const { ui } = conteudo.ui;
  const { contato } = conteudo.site;

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center md:px-8 lg:px-12">
      <p className="text-marca font-mono text-[13px] font-semibold tracking-[0.1em] uppercase">
        {ui.naoEncontrada.codigo}
      </p>

      <h1 className="text-foreground font-display mt-4 text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.15] font-extrabold text-pretty">
        {ui.naoEncontrada.titulo}
      </h1>

      <p className="text-foreground-base mt-4 max-w-[520px] text-[17px] leading-relaxed">
        {ui.naoEncontrada.texto}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" })}>
          {ui.naoEncontrada.voltarHome}
        </Link>
        <a
          href={contato.whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          {ui.naoEncontrada.falarEspecialista}
        </a>
      </div>
    </main>
  );
}
