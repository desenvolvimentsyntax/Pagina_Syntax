import Link from "next/link";

import { contato } from "@/content/pt-BR/site";

/**
 * 404 dentro do layout do locale. Atende tanto rota inexistente quanto
 * idioma ainda não publicado (§18).
 */
export default function NaoEncontrado() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.1em] text-ondark-dim">
        Erro 404
      </p>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        Página não encontrada
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
        O endereço que você acessou não existe ou ainda não está disponível
        neste idioma.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-[10px] bg-blue-600 px-6 text-[15px] font-medium text-white transition-colors hover:bg-blue-700"
        >
          Voltar para a home
        </Link>
        <a
          href={contato.whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-12 items-center rounded-[10px] border border-hairline-strong bg-slate-400/8 px-6 text-[15px] font-medium text-slate-200 transition-colors hover:bg-slate-400/14"
        >
          Falar com especialista
        </a>
      </div>
    </main>
  );
}
