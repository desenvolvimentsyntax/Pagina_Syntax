"use client";

import { Button, Drawer, Separator, buttonVariants } from "@heroui/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/CtaLink";
import { MarcaSyntax } from "@/components/ui/MarcaSyntax";
import { SeletorIdioma } from "@/components/ui/SeletorIdioma";
import type { ItemNav } from "@/content/tipos";
import type { ChaveRota, Locale } from "@/lib/routes";

/**
 * Menu de topo. A v3 não tem Navbar (CLAUDE.md §3.1), então o header é layout
 * próprio: barra branca sticky com hairline embaixo, scrollspy marcando a
 * seção ativa, seletor de idioma e Drawer do HeroUI no mobile.
 *
 * Client component pelo estado de scroll e do menu — por isso recebe a copy
 * por prop em vez de importar `@/content`: o barril traz os dois idiomas, e o
 * que um client component importa vai junto para o navegador (§18).
 */
export interface HeaderProps {
  locale: Locale;
  /** Rota atual — o seletor de idioma troca de língua sem sair dela. */
  rota: ChaveRota;
  nav: readonly ItemNav[];
  ctaPlanos: { rotulo: string; href: string };
  textos: {
    paginaInicialAria: string;
    navPrincipalAria: string;
    abrirMenu: string;
    menuTitulo: string;
    fechar: string;
  };
  marcaAlt: string;
  idiomas: Record<Locale, string>;
  /** Linha de apoio no rodapé do menu mobile. */
  contatoResumo: string;
}

export function Header({
  locale,
  rota,
  nav,
  ctaPlanos,
  textos,
  marcaAlt,
  idiomas,
  contatoResumo,
}: HeaderProps) {
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
    const secoes = nav
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
  }, [nav]);

  return (
    <header
      className={`bg-background border-border sticky top-0 z-40 border-b transition-shadow duration-300 ${
        rolado ? "shadow-topo" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8 lg:px-12">
        <Link
          href="/"
          aria-label={textos.paginaInicialAria}
          className="flex shrink-0 items-center"
        >
          <MarcaSyntax tamanho="header" alt={marcaAlt} />
        </Link>

        <nav
          aria-label={textos.navPrincipalAria}
          className="hidden items-center gap-7 text-[15px] lg:flex"
        >
          {nav.map((item) => {
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

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <SeletorIdioma atual={locale} rota={rota} rotulos={idiomas} />

          <span className="hidden sm:inline-flex">
            <CtaLink href={ctaPlanos.href} tamanho="md">
              {ctaPlanos.rotulo}
            </CtaLink>
          </span>

          <MenuMobile
            aberto={menuAberto}
            aoMudar={setMenuAberto}
            aoNavegar={() => setMenuAberto(false)}
            nav={nav}
            ctaPlanos={ctaPlanos}
            textos={textos}
            contatoResumo={contatoResumo}
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
  nav,
  ctaPlanos,
  textos,
  contatoResumo,
}: {
  aberto: boolean;
  aoMudar: (aberto: boolean) => void;
  aoNavegar: () => void;
} & Pick<HeaderProps, "nav" | "ctaPlanos" | "textos" | "contatoResumo">) {
  return (
    <Drawer isOpen={aberto} onOpenChange={aoMudar}>
      <Button
        isIconOnly
        variant="ghost"
        aria-label={textos.abrirMenu}
        className="text-foreground size-11 lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>{textos.menuTitulo}</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav
                aria-label={textos.navPrincipalAria}
                className="flex flex-col gap-1"
              >
                {nav.map((item) => (
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
                {contatoResumo}
              </p>
            </Drawer.Body>

            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                {textos.fechar}
              </Button>
              {/* Âncora, não Button: `render` tipa as props como <button> e o
                  ref não é compatível com <a>. Mesmas classes, via
                  buttonVariants — e aqui ela precisa fechar o Drawer. */}
              <Link
                href={ctaPlanos.href}
                onClick={aoNavegar}
                data-ripple
                className={buttonVariants({
                  variant: "primary",
                  size: "md",
                  class: "relative overflow-hidden",
                })}
              >
                {ctaPlanos.rotulo}
              </Link>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
