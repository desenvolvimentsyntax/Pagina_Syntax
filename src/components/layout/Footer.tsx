import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { contato, empresa, navAcoes, navPrincipal } from "@/content/pt-BR/site";

/**
 * Rodapé claro. Dados reais do site atual: endereço da matriz, telefones do
 * Brasil e do Paraguai, e-mail e fundação em 2006.
 */
export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex size-[30px] items-center justify-center rounded-lg bg-accent font-mono text-[15px] font-medium text-accent-foreground"
              >
                &lt;/&gt;
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-foreground">
                {empresa.nome}{" "}
                <span className="font-normal text-foreground/60">
                  {empresa.sobrenome}
                </span>
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">
              Sistemas web, aplicativos e automação para empresas do Brasil e do
              Paraguai. No mercado desde {empresa.fundacao}.
            </p>

            <a
              href={navAcoes.contato.href}
              className="mt-6 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {navAcoes.contato.rotulo}
            </a>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-xs font-medium tracking-[0.1em] text-foreground/50 uppercase">
              Navegação
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {navPrincipal.map((item) => (
                <li key={item.rotulo}>
                  <a
                    href={item.href}
                    className="text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contato"
                  className="text-foreground/70 transition-colors hover:text-foreground"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-medium tracking-[0.1em] text-foreground/50 uppercase">
              Contato
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={contato.telefoneHref}
                  className="inline-flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Phone aria-hidden className="size-4 shrink-0 text-accent" />
                  {contato.telefone}
                </a>
              </li>
              <li>
                <a
                  href={contato.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
                >
                  <MessageCircle aria-hidden className="size-4 shrink-0 text-accent" />
                  {contato.celular} · WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contato.telefonePyHref}
                  className="inline-flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Phone aria-hidden className="size-4 shrink-0 text-accent" />
                  {contato.telefonePy} · Paraguai
                </a>
              </li>
              <li>
                <a
                  href={contato.emailHref}
                  className="inline-flex items-center gap-2 break-all text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Mail aria-hidden className="size-4 shrink-0 text-accent" />
                  {contato.email}
                </a>
              </li>
              <li>
                <a
                  href={empresa.mapaHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-start gap-2 text-foreground/70 transition-colors hover:text-foreground"
                >
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>
                    {empresa.endereco}
                    <br />
                    Filial: {empresa.filial}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-foreground/50">
          © {ano} {empresa.razaoSocial}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
