import { buttonVariants } from "@heroui/react";
import Link from "next/link";

import { contato } from "@/content/pt-BR/site";

/**
 * 404 dentro do layout do locale. Atende tanto rota inexistente quanto
 * idioma ainda não publicado (§18).
 */
export default function NaoEncontrado() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-micro font-mono text-sm tracking-[0.1em] uppercase">
        Erro 404
      </p>

      <h1 className="text-foreground font-display mt-4 text-3xl font-semibold tracking-[-0.028em] sm:text-4xl">
        Página não encontrada
      </h1>

      <p className="text-foreground-base/70 mt-4 max-w-md text-base leading-relaxed">
        O endereço que você acessou não existe ou ainda não está disponível
        neste idioma.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Voltar para a home
        </Link>
        <a
          href={contato.whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          Falar com especialista
        </a>
      </div>
    </main>
  );
}
