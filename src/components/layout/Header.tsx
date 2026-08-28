"use client";

import { Button, Drawer, Separator, buttonVariants } from "@heroui/react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/CtaLink";
import { MarcaSyntax } from "@/components/ui/MarcaSyntax";
import { contato, empresa, navAcoes, navPrincipal } from "@/content/pt-BR/site";
import { ui } from "@/content/pt-BR/ui";

/**
 * Menu de topo. A v3 não tem Navbar (CLAUDE.md §3.1), então o header é layout
 * próprio: barra branca sticky com hairline embaixo, scrollspy marcando a
 * seção ativa e Drawer do HeroUI no mobile. Client component pelo estado de
 * scroll e do menu.
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
      className={`bg-background border-border sticky top-0 z-40 border-b transition-shadow duration-300 ${
        rolado ? "shadow-topo" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8 lg:px-12">
        <a
          href="#topo"
          aria-label={ui.header.paginaInicialAria}
          className="flex shrink-0 items-center"
        >
          <MarcaSyntax tamanho="header" />
        </a>

        <nav
          aria-label={ui.header.navPrincipalAria}
          className="hidden items-center gap-7 text-[15px] lg:flex"
        >
          {navPrincipal.map((item) => {
            const ativo = secaoAtiva === item.secao;
            return (
              <a
                key={item.rotulo}
                href={item.href}
                aria-current={ativo ? "true" : undefined}
                className={`text-marca hover:text-marca-hover flex min-h-11 items-center whitespace-nowrap transition-colors ${
                  ativo ? "font-semibold" : "font-medium"
                }`}
              >
                {item.rotulo}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden sm:inline-flex">
            <CtaLink href={navAcoes.whatsapp.href} tamanho="md" externo>
              {navAcoes.whatsapp.rotulo}
            </CtaLink>
          </span>

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
        aria-label={ui.header.abrirMenu}
        className="text-foreground size-11 lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>{ui.header.menuTitulo}</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav
                aria-label={ui.header.navPrincipalAria}
                className="flex flex-col gap-1"
              >
                {navPrincipal.map((item) => (
                  <a
                    key={item.rotulo}
                    href={item.href}
                    onClick={aoNavegar}
                    className="text-foreground-base hover:bg-surface-secondary hover:text-marca rounded-lg px-3 py-3 text-base font-medium transition-colors"
                  >
                    {item.rotulo}
                  </a>
                ))}
              </nav>

              <Separator className="my-3" />

              <p className="text-muted px-3 text-sm">
                {contato.telefone} · {empresa.matriz}
              </p>
            </Drawer.Body>

            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                {ui.header.fechar}
              </Button>
              {/* Âncora, não Button: `render` tipa as props como <button> e o
                  ref não é compatível com <a>. Mesmas classes, via
                  buttonVariants — e aqui ela precisa fechar o Drawer. */}
              <a
                href={navAcoes.whatsapp.href}
                target="_blank"
                rel="noreferrer noopener"
                onClick={aoNavegar}
                data-ripple
                className={buttonVariants({
                  variant: "primary",
                  size: "md",
                  class: "relative overflow-hidden",
                })}
              >
                {navAcoes.whatsapp.rotulo}
              </a>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
