"use client";

import { Button, Drawer, Separator } from "@heroui/react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { navAcoes, navPrincipal, empresa, contato } from "@/content/pt-BR/site";

/**
 * Menu de topo. A v3 não tem Navbar (CLAUDE.md §3.1), então o header é layout
 * próprio: sticky com blur ao rolar, scrollspy marcando a seção ativa e
 * Drawer do HeroUI no mobile. Client component pelo estado de scroll/menu.
 */
export function Header() {
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<string | null>(null);

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    const secoes = navPrincipal
      .map((item) => document.getElementById(item.secao))
      .filter((el): el is HTMLElement => el !== null);
    if (secoes.length === 0) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setSecaoAtiva(entrada.target.id);
        }
      },
      // Faixa central da viewport: a seção que a ocupa é a ativa.
      { rootMargin: "-40% 0px -55% 0px" },
    );

    secoes.forEach((secao) => observer.observe(secao));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ${
        rolado
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8 xl:gap-10">
          <Marca />

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-6 text-[14.5px] lg:flex"
          >
            {navPrincipal.map((item) => (
              <a
                key={item.rotulo}
                href={item.href}
                aria-current={secaoAtiva === item.secao ? "true" : undefined}
                className={`whitespace-nowrap transition-colors ${
                  secaoAtiva === item.secao
                    ? "font-medium text-accent"
                    : "text-foreground/65 hover:text-foreground"
                }`}
              >
                {item.rotulo}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={navAcoes.contato.href}
            className="hidden h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium whitespace-nowrap text-accent-foreground transition-colors hover:bg-accent/90 sm:inline-flex"
          >
            {navAcoes.contato.rotulo}
          </a>

          <MenuMobile
            aberto={menuAberto}
            aoMudar={setMenuAberto}
            aoNavegar={() => setMenuAberto(false)}
          />
        </div>
      </div>
    </header>
  );
}

function Marca() {
  return (
    <a href="#topo" className="flex items-center gap-2.5" aria-label="Página inicial">
      <span
        aria-hidden
        className="flex size-[30px] items-center justify-center rounded-lg bg-accent font-mono text-[15px] font-medium text-accent-foreground"
      >
        &lt;/&gt;
      </span>
      <span className="text-[17px] font-semibold tracking-tight whitespace-nowrap text-foreground">
        {empresa.nome}{" "}
        <span className="font-normal text-foreground/60">{empresa.sobrenome}</span>
      </span>
    </a>
  );
}

function MenuMobile({
  aberto,
  aoMudar,
  aoNavegar,
}: {
  aberto: boolean;
  aoMudar: (aberto: boolean) => void;
  aoNavegar: () => void;
}) {
  return (
    <Drawer isOpen={aberto} onOpenChange={aoMudar}>
      <Button
        isIconOnly
        variant="ghost"
        aria-label="Abrir menu"
        className="text-foreground lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Menu</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav aria-label="Navegação principal" className="flex flex-col gap-1">
                {navPrincipal.map((item) => (
                  <a
                    key={item.rotulo}
                    href={item.href}
                    onClick={aoNavegar}
                    className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-surface"
                  >
                    {item.rotulo}
                  </a>
                ))}
              </nav>

              <Separator className="my-3" />

              <p className="px-3 text-sm text-foreground/60">
                {contato.telefone} · {empresa.matriz}
              </p>
            </Drawer.Body>

            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                Fechar
              </Button>
              {/* Âncora, não Button: `render` tipa as props como <button> e o
                  ref não é compatível com <a>. Mesmo motivo do CtaLink. */}
              <a
                href={navAcoes.contato.href}
                onClick={aoNavegar}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                {navAcoes.contato.rotulo}
              </a>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
