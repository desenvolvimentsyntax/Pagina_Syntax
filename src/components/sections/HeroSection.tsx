import { CtaLink } from "@/components/ui/CtaLink";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { hero } from "@/content/pt-BR/home";
import { contato } from "@/content/pt-BR/site";

/**
 * Hero da home — a única `<h1>` da página (§9).
 *
 * O CTA principal não vai para a âncora de contato: abre o WhatsApp já com a
 * mensagem escrita, que é o caminho mais curto para o lead do handoff.
 */
export function HeroSection() {
  const whatsappHref = `${contato.whatsappHref}?text=${encodeURIComponent(
    hero.whatsappTexto,
  )}`;

  return (
    <section id="topo" className="fundo-hero py-16 md:py-18">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12">
        <div>
          <p className="text-marca font-mono text-[13px] font-semibold tracking-[0.1em] uppercase">
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-foreground mt-3.5 text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.15] font-extrabold text-pretty">
            {hero.titulo}
          </h1>

          {/* Corpo em --foreground-base, não em --muted como as intros das
              outras seções: aqui o fundo é o radial do hero, e no miolo claro
              (#dbeafe) o muted cai para 4,34:1 — abaixo do AA de 19px (§9).
              O #4b5563 dá 6,20:1 no ponto mais claro do gradiente. */}
          <p className="text-foreground-base mt-4.5 text-[19px] leading-[1.55] text-pretty">
            {hero.subtitulo}
          </p>

          <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaLink href={whatsappHref} externo larguraTotal>
              {hero.ctaPrimario}
            </CtaLink>
            <CtaLink
              href={hero.ctaSecundarioHref}
              variante="secundario"
              larguraTotal
            >
              {hero.ctaSecundario}
            </CtaLink>
          </div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}
