import { MessageCircle } from "lucide-react";

import { contato } from "@/content/pt-BR/site";
import { ui } from "@/content/pt-BR/ui";

/**
 * Botão flutuante de WhatsApp (§12) — alternativa permanente ao formulário.
 * Âncora pura, sem estado: continua Server Component.
 *
 * A cor vem de --color-whatsapp (green-600), não de green-500: com o glifo
 * branco o green-500 dá 2,28:1 e reprova o SC 1.4.11 (§9). Em green-600 são
 * 3,30:1.
 */
export function WhatsAppButton() {
  const href = `${contato.whatsappHref}?text=${encodeURIComponent(contato.whatsappTexto)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ui.whatsappFlutuante.aria}
      className="bg-whatsapp hover:bg-whatsapp-hover fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full text-white shadow-[0_12px_28px_-8px_rgb(0_0_0/0.65)] transition-transform hover:scale-105"
    >
      <MessageCircle aria-hidden className="size-6" />
    </a>
  );
}
