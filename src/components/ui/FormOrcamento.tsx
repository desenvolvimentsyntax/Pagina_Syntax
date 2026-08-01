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
  TextArea,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { contatoSecao } from "@/content/pt-BR/home";
import { contato } from "@/content/pt-BR/site";
import { contatoSchema, type ContatoForm } from "@/lib/schemas/contato";

/**
 * Formulário de orçamento (§12): React Hook Form + Zod, campos HeroUI via
 * `Controller` (os campos da v3 são React Aria — registro por ref não
 * funciona). Sem backend por ora: o envio abre o WhatsApp comercial com a
 * mensagem montada; nada é armazenado no site.
 */

const { form } = contatoSecao;

type Etapa = "formulario" | "sucesso";

export function FormOrcamento() {
  const [etapa, setEtapa] = useState<Etapa>("formulario");
  const [falhouAbrir, setFalhouAbrir] = useState(false);
  const [linkWhatsApp, setLinkWhatsApp] = useState<string>(contato.whatsappHref);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContatoForm>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      nome: "",
      empresa: "",
      email: "",
      telefone: "",
      segmento: "",
      mensagem: "",
    },
  });

  function aoEnviar(dados: ContatoForm) {
    const texto = [
      "Olá! Vim pelo site da Syntax e gostaria de uma demonstração.",
      "",
      `*Nome:* ${dados.nome}`,
      `*Empresa:* ${dados.empresa}`,
      `*E-mail:* ${dados.email}`,
      `*Telefone:* ${dados.telefone}`,
      `*Segmento:* ${dados.segmento}`,
      "",
      dados.mensagem,
    ].join("\n");

    const url = `${contato.whatsappHref}?text=${encodeURIComponent(texto)}`;
    setLinkWhatsApp(url);

    const janela = window.open(url, "_blank", "noopener,noreferrer");
    setFalhouAbrir(janela === null);
    setEtapa("sucesso");
  }

  if (etapa === "sucesso") {
    return (
      <div className="flex flex-col gap-5">
        <Alert status={falhouAbrir ? "warning" : "success"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {falhouAbrir ? "Quase lá" : form.sucesso.titulo}
            </Alert.Title>
            <Alert.Description>
              {falhouAbrir ? form.erro : form.sucesso.texto}
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-[15px] font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          {form.sucesso.linkRotulo}
        </a>

        <Button
          variant="ghost"
          onPress={() => {
            reset();
            setFalhouAbrir(false);
            setEtapa("formulario");
          }}
        >
          Preencher novamente
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(aoEnviar)} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name="nome"
          render={({ field, fieldState }) => (
            <TextField
              isRequired
              validationBehavior="aria"
              isInvalid={fieldState.invalid}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            >
              <Label>{form.campos.nome.label}</Label>
              <Input placeholder={form.campos.nome.placeholder} onBlur={field.onBlur} />
              <FieldError>{fieldState.error?.message}</FieldError>
            </TextField>
          )}
        />

        <Controller
          control={control}
          name="empresa"
          render={({ field, fieldState }) => (
            <TextField
              isRequired
              validationBehavior="aria"
              isInvalid={fieldState.invalid}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            >
              <Label>{form.campos.empresa.label}</Label>
              <Input placeholder={form.campos.empresa.placeholder} onBlur={field.onBlur} />
              <FieldError>{fieldState.error?.message}</FieldError>
            </TextField>
          )}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              isRequired
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
              isRequired
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
                placeholder={form.campos.telefone.placeholder}
                onBlur={field.onBlur}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </TextField>
          )}
        />
      </div>

      <Controller
        control={control}
        name="segmento"
        render={({ field, fieldState }) => (
          <Select
            isInvalid={fieldState.invalid}
            name={field.name}
            value={field.value === "" ? null : field.value}
            onChange={(valor) => field.onChange(valor == null ? "" : String(valor))}
            placeholder={form.campos.segmento.placeholder}
          >
            <Label>{form.campos.segmento.label}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <FieldError>{fieldState.error?.message}</FieldError>
            <Select.Popover>
              <ListBox>
                {form.segmentos.map((segmento) => (
                  <ListBox.Item key={segmento} id={segmento} textValue={segmento}>
                    {segmento}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      />

      <Controller
        control={control}
        name="mensagem"
        render={({ field, fieldState }) => (
          <TextField
            isRequired
            validationBehavior="aria"
            isInvalid={fieldState.invalid}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          >
            <Label>{form.campos.mensagem.label}</Label>
            <TextArea
              rows={4}
              placeholder={form.campos.mensagem.placeholder}
              onBlur={field.onBlur}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Button type="submit" isPending={isSubmitting} className="mt-1 h-12">
        {isSubmitting ? form.enviando : form.botao}
      </Button>

      <p className="text-xs leading-relaxed text-foreground/50">
        Seus dados vão direto para o WhatsApp comercial da Syntax — nada fica
        armazenado neste site.
      </p>
    </Form>
  );
}
