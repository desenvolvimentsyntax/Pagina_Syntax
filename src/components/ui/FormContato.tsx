"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CtaLink } from "@/components/ui/CtaLink";
import type { Conteudo } from "@/content";
import type { MensagensValidacao } from "@/content/tipos";
import { criarContatoSchema, type ContatoForm } from "@/lib/schemas/contato";

/**
 * Formulário de captação (§12): React Hook Form + Zod, campos HeroUI via
 * `Controller` — os campos da v3 são React Aria e registro por `ref` não
 * funciona.
 *
 * Não há backend: o envio monta a mensagem e abre o WhatsApp comercial. Nenhum
 * campo é obrigatório (decisão do handoff); campo vazio simplesmente sai da
 * mensagem, e o schema só valida o formato do que foi preenchido.
 */

/**
 * Client component: recebe a copy por prop em vez de importar o content, que
 * traria os dois idiomas para o bundle do navegador. O `import type` acima é
 * seguro — tipo some no build.
 */
type Formulario = Conteudo["home"]["contatoSecao"]["form"];

interface FormContatoProps {
  form: Formulario;
  validacao: MensagensValidacao;
  whatsappHref: string;
}

type Etapa = "formulario" | "enviada";

export function FormContato({
  form,
  validacao,
  whatsappHref,
}: FormContatoProps) {
  const contatoSchema = criarContatoSchema(validacao);
  const [etapa, setEtapa] = useState<Etapa>("formulario");
  const [popupBloqueado, setPopupBloqueado] = useState(false);
  const [linkWhatsApp, setLinkWhatsApp] = useState<string>(
    whatsappHref,
  );
  const painelRef = useRef<HTMLDivElement>(null);

  /* A etapa final substitui o formulário inteiro: sem mover o foco para ela, o
     leitor de tela e o teclado ficam presos no nada que sobrou do botão (§9). */
  useEffect(() => {
    if (etapa === "enviada") painelRef.current?.focus();
  }, [etapa]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContatoForm>({
    resolver: zodResolver(contatoSchema),
    defaultValues: { nome: "", email: "", telefone: "", tamanho: "" },
  });

  async function aoEnviar(dados: ContatoForm) {
    const { abertura, rotulos } = form.mensagem;

    const linhas = (
      [
        ["nome", dados.nome],
        ["email", dados.email],
        ["telefone", dados.telefone],
        ["tamanho", dados.tamanho],
      ] as const
    )
      .filter(([, valor]) => valor.trim() !== "")
      .map(([campo, valor]) => `${rotulos[campo]}: ${valor.trim()}`);

    const texto = linhas.length
      ? `${abertura}\n\n${linhas.join("\n")}`
      : abertura;
    const url = `${whatsappHref}?text=${encodeURIComponent(texto)}`;
    setLinkWhatsApp(url);

    // Invariante: o window.open vem ANTES de qualquer await — o bloqueador de
    // popup só libera a abertura na pilha do gesto do usuário.
    const janela = window.open(url, "_blank", "noopener,noreferrer");
    const bloqueado = janela === null;
    setPopupBloqueado(bloqueado);

    // Pausa perceptiva, não IO: segura o isPending com "Abrindo o WhatsApp…"
    // visível antes da troca de etapa (teto de 400ms do §10).
    await new Promise((resolve) => setTimeout(resolve, 400));
    setEtapa("enviada");
  }

  if (etapa === "enviada") {
    const aviso = popupBloqueado ? form.aviso : form.sucesso;

    return (
      <div ref={painelRef} tabIndex={-1} className="flex flex-col gap-5">
        <Alert status={popupBloqueado ? "warning" : "success"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{aviso.titulo}</Alert.Title>
            <Alert.Description>{aviso.texto}</Alert.Description>
          </Alert.Content>
        </Alert>

        {/* Com o popup bloqueado o link é o único caminho que resta — então
            ali ele vira o CTA de peso, não um link discreto. */}
        <div>
          <CtaLink
            href={linkWhatsApp}
            externo
            variante={popupBloqueado ? "whatsapp" : "secundario"}
            larguraTotal={popupBloqueado}
          >
            {aviso.linkRotulo}
          </CtaLink>
        </div>

        <Button
          variant="ghost"
          className="h-11 self-start"
          onPress={() => {
            reset();
            setPopupBloqueado(false);
            setEtapa("formulario");
          }}
        >
          {form.preencherNovamente}
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(aoEnviar)} className="grid gap-4">
      <Controller
        control={control}
        name="nome"
        render={({ field, fieldState }) => (
          <TextField
            validationBehavior="aria"
            isInvalid={fieldState.invalid}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          >
            <Label>{form.campos.nome.label}</Label>
            <Input
              placeholder={form.campos.nome.placeholder}
              autoComplete="name"
              onBlur={field.onBlur}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            type="email"
            validationBehavior="aria"
            isInvalid={fieldState.invalid}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          >
            <Label>{form.campos.email.label}</Label>
            <Input
              inputMode="email"
              autoComplete="email"
              placeholder={form.campos.email.placeholder}
              onBlur={field.onBlur}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="telefone"
        render={({ field, fieldState }) => (
          <TextField
            type="tel"
            validationBehavior="aria"
            isInvalid={fieldState.invalid}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          >
            <Label>{form.campos.telefone.label}</Label>
            <Input
              inputMode="tel"
              autoComplete="tel"
              placeholder={form.campos.telefone.placeholder}
              onBlur={field.onBlur}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="tamanho"
        render={({ field, fieldState }) => (
          <Select
            isInvalid={fieldState.invalid}
            name={field.name}
            value={field.value === "" ? null : field.value}
            onChange={(valor) =>
              field.onChange(valor == null ? "" : String(valor))
            }
            placeholder={form.campos.tamanho.placeholder}
          >
            <Label>{form.campos.tamanho.label}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <FieldError>{fieldState.error?.message}</FieldError>
            <Select.Popover>
              <ListBox>
                {form.tamanhos.map((tamanho) => (
                  <ListBox.Item key={tamanho} id={tamanho} textValue={tamanho}>
                    {tamanho}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      />

      <Button
        type="submit"
        isPending={isSubmitting}
        data-ripple=""
        className="button--whatsapp relative h-12 w-full overflow-hidden"
      >
        {isSubmitting ? form.enviando : form.botao}
      </Button>

      <p className="flex items-start gap-2.5 text-[13px] leading-snug text-muted">
        <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-marca" />
        <span>{form.privacidade}</span>
      </p>
    </Form>
  );
}
