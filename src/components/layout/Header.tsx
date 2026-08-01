"use client";

import { Button, Drawer, Separator, buttonVariants } from "@heroui/react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/CtaLink";
import { MarcaSyntax } from "@/components/ui/MarcaSyntax";
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
    <header className="sticky top-0 z-40 px-0 pt-0 md:px-5 md:pt-4 lg:px-8">
      {/* Pill de vidro flutuante em md+; no mobile vira barra full-bleed,
          coerente com a folha sem moldura. O fundo translúcido só ganha corpo
          ao rolar, senão o blur come o glow do hero logo abaixo. */}
      <div
        className={`mx-auto flex h-14 max-w-[1360px] items-center justify-between pr-3 pl-5 transition-[background-color,box-shadow] duration-300 md:h-[66px] md:rounded-full md:pr-4 md:pl-6 ${
          rolado
            ? "bg-surface-secondary shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_18px_40px_-24px_rgb(0_0_0/0.85)] backdrop-blur-[14px]"
            : "bg-surface shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-[14px]"
        }`}
      >
        <div className="flex items-center gap-8 xl:gap-10">
          <a href="#topo" aria-label="Página inicial" className="flex min-h-11 items-center">
            <MarcaSyntax />
          </a>

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
                    ? "text-accent-soft-foreground font-medium"
                    : "text-foreground-base/70 hover:text-foreground"
                }`}
              >
                {item.rotulo}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex">
            <CtaLink href={navAcoes.contato.href} tamanho="md">
              {navAcoes.contato.rotulo}
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
        aria-label="Abrir menu"
        className="text-foreground size-11 lg:hidden"
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
                    className="text-foreground-base hover:bg-surface-secondary rounded-lg px-3 py-3 text-base transition-colors"
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
                Fechar
              </Button>
              {/* Âncora, não Button: `render` tipa as props como <button> e o
                  ref não é compatível com <a>. Mesmas classes, via
                  buttonVariants — e aqui ela precisa fechar o Drawer. */}
              <a
                href={navAcoes.contato.href}
                onClick={aoNavegar}
                className={buttonVariants({ variant: "primary", size: "md" })}
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
