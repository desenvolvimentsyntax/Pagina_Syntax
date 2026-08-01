import { MessageCircle } from "lucide-react";

import { contato } from "@/content/pt-BR/site";

/**
 * Botão flutuante de WhatsApp (§12) — alternativa permanente ao formulário.
 * Âncora pura, sem estado: continua Server Component.
 */
export function WhatsAppButton() {
  const href = `${contato.whatsappHref}?text=${encodeURIComponent(contato.whatsappTexto)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Conversar com a Syntax pelo WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_12px_28px_-8px_rgb(34_197_94_/_0.6)] transition-transform hover:scale-105 hover:bg-green-600"
    >
      <MessageCircle aria-hidden className="size-6" />
    </a>
  );
}
