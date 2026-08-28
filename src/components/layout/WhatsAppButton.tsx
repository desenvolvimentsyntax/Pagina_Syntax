import { MessageCircle } from "lucide-react";

import { contato } from "@/content/pt-BR/site";
import { ui } from "@/content/pt-BR/ui";

/**
 * Botão flutuante de WhatsApp (§12) — alternativa permanente ao formulário.
 * Âncora pura, sem estado: continua Server Component.
 *
 * O glifo é escuro, não branco: branco sobre o verde #25d366 dá 2,01:1 e
 * reprova o SC 1.4.11; o #0f172a dá 9,08:1 (§9). É o mesmo par que o design
 * usa no botão de envio do formulário.
 *
 * A sombra é a `shadow-topo` do design — sobre página clara, a sombra pesada
 * do tema escuro anterior virava uma mancha cinza em volta do círculo.
 *
 * `data-ripple` engancha no componente `Ripple` montado na página; sem ele o
 * atributo é inerte. O par que o ripple exige é posição + `overflow-hidden`, e
 * aqui o `fixed` já cria o bloco de contenção — `relative` seria conflito.
 */
export function WhatsAppButton() {
  const href = `${contato.whatsappHref}?text=${encodeURIComponent(contato.whatsappTexto)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ui.whatsappFlutuante.aria}
      data-ripple
      className="bg-whatsapp hover:bg-whatsapp-hover text-escuro shadow-topo fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105"
    >
      <MessageCircle aria-hidden className="size-6" />
    </a>
  );
}
