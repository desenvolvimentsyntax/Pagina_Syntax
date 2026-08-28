import { Header } from "@/components/layout/Header";
import { conteudoDe } from "@/content";
import type { ChaveRota, Locale } from "@/lib/routes";

/**
 * Ponte servidor → cliente do menu de topo.
 *
 * O `Header` é client component (scroll, Drawer, scrollspy) e por isso não
 * pode importar `@/content`: o barril traz os dois idiomas e tudo que um
 * client component importa vai para o bundle do navegador (§18). Este wrapper
 * resolve o conteúdo no servidor e entrega só o que a barra usa.
 *
 * Existe para as três páginas não repetirem a montagem das props.
 */
export function Cabecalho({
  locale,
  rota,
}: {
  locale: Locale;
  rota: ChaveRota;
}) {
  const conteudo = conteudoDe(locale);
  const { navPrincipal, navAcoes, contato, empresa } = conteudo.site;
  const { ui } = conteudo.ui;

  return (
    <Header
      locale={locale}
      rota={rota}
      nav={navPrincipal}
      ctaPlanos={navAcoes.planos}
      textos={ui.header}
      marcaAlt={ui.marca.alt}
      idiomas={ui.idioma}
      contatoResumo={`${contato.telefone} · ${empresa.matriz}`}
    />
  );
}
