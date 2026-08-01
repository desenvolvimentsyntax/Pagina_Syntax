import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { metodo } from "@/content/pt-BR/home";

/**
 * Ato 05 — o método como banda de numerais (peso 2). Numeral gigante vazado
 * (contorno hairline que acende com --glow-color no hover, `.numeral-vazado`)
 * no lugar do dot com ícone. A linha conectora só existe no desktop — no
 * mobile a ausência dela é o que o distingue da LinhaDoTempo (§7).
 *
 * É uma <ol> porque a ordem das etapas é a informação.
 */
export function MetodoSection() {
  return (
    <section id="metodo" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <SectionHeading
            indice="05"
            overline={metodo.overline}
            titulo={metodo.titulo}
            subtitulo={metodo.subtitulo}
          />
        </Reveal>

        <ol className="reveal-stagger mt-10 grid gap-x-6 gap-y-10 min-[480px]:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {metodo.etapas.map((etapa, i) => {
            const ultima = i === metodo.etapas.length - 1;

            return (
              <li key={etapa.titulo} className="etapa-metodo group relative">
                <Reveal>
                  {/* Conector horizontal entre numerais — só lg. */}
                  {ultima ? null : (
                    <span
                      aria-hidden
                      className="absolute top-[30px] left-[84px] hidden h-px w-[calc(100%-84px)] bg-[linear-gradient(90deg,var(--accent),var(--accent-soft-foreground)_55%,var(--color-hairline))] lg:block"
                    />
                  )}

                  <span
                    aria-hidden
                    className="numeral-vazado font-display block text-[52px] leading-none font-semibold tracking-[-0.02em] lg:text-[60px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="etapa-corpo">
                    <h3 className="font-display text-foreground mt-4 text-[17px] font-semibold tracking-tight lg:text-lg">
                      {etapa.titulo}
                    </h3>
                    <p className="text-foreground-base/70 mt-1.5 text-[14px] leading-relaxed lg:mt-2 lg:text-[15px]">
                      {etapa.texto}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
