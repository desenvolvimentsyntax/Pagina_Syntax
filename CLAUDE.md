# CLAUDE.md — Site Institucional Syntax Sistemas

> Arquivo de contexto permanente do projeto. Leia antes de qualquer tarefa.
> Se algo aqui estiver desatualizado e afetar a tarefa, avise antes de codar.

---

## §1 — Contexto do projeto

Reformulação completa do site institucional da **Syntax Sistemas**, uma software
house brasileira. O site atual (`syntaxsistemas.com.br`) está defasado e sem
HTTPS válido.

**Objetivo do site:** gerar leads qualificados. Não é portfólio pessoal nem
blog — é vitrine comercial. Toda decisão deve responder: *isso aproxima o
visitante de solicitar uma demonstração?*

**Posicionamento:** software house moderna, não "empresa que vende sistema".

**Produtos a apresentar:**
- Sistema para restaurantes (PDV/pedidos) — produto consolidado, carro-chefe
- Sistema administrativo web de pedidos (B2B, multitenant)
- Desenvolvimento sob medida
- Sites institucionais e landing pages

**Público:** donos e gestores de restaurantes, distribuidoras, indústrias,
comércio e clínicas. Não são técnicos — a copy não pode ser jargão de dev.

---

## §2 — Stack

| Camada | Tecnologia | Observação |
|---|---|---|
| Framework | Next.js (App Router) | SSR/SSG sempre que possível |
| Linguagem | TypeScript | `strict: true`, sem `any` |
| UI | **HeroUI v3** | React Aria + Tailwind v4. Ver §3 |
| CSS | **Tailwind CSS v4** | exigido pela v3. Config em CSS, **não** há `tailwind.config.ts` |
| Animação | CSS nativo da v3 | discreto, ver §10 |
| Ícones | Lucide React | nunca emoji em produção |
| Formulários | React Hook Form + Zod | ver §12 |
| Fontes | `next/font` | ver §11 |
| Imagens | `next/image` | obrigatório, ver §11 |
| Deploy | Vercel | preview por branch |

**Pacotes do HeroUI v3:** `@heroui/react`, `@heroui/styles`, `tailwind-variants`.
Os pacotes da v2 (`@heroui/system`, `@heroui/theme`) **não existem mais**.

Setup do CSS (`app/globals.css`), nesta ordem — inverter quebra os estilos:

```css
@import "tailwindcss";
@import "@heroui/styles";
```

**Não adicionar dependência nova sem justificar.** Se o HeroUI ou o Tailwind
já resolvem, não instale nada. Em particular: a v3 anima em CSS, então
`framer-motion` **não entra por padrão** — só se uma animação específica do §10
não for viável em CSS, e com justificativa registrada aqui.

---

## §3 — Regras de UI (OBRIGATÓRIAS)

Estas regras têm prioridade sobre qualquer outra consideração de estilo.

> **É HeroUI v3, não v2.** A v3 é quebra de compatibilidade declarada.
> Conhecimento de v2 está errado aqui e vai gerar código que não compila.
> Na dúvida, busque o doc antes de escrever:
> `node .agents/skills/heroui-react/scripts/get_component_docs.mjs Button`

| Assunto | v2 (NÃO USE) | v3 (USE) |
|---|---|---|
| Provider | `<HeroUIProvider>` | **não existe provider** |
| API | `<Card title="x">` | compound: `<Card><Card.Header>` |
| Clique | `onClick` | **`onPress`** |
| Estilos | Tailwind v3 + `@heroui/theme` | Tailwind v4 + `@heroui/styles` |
| Animação | `framer-motion` | CSS |

1. **Toda UI usa componentes HeroUI.** Antes de escrever qualquer componente,
   consulte a skill do HeroUI para a API correta (props, variantes, slots).
2. **NUNCA recrie com `div` + Tailwind algo que o HeroUI já tem.** Se existe
   `Button`, `Card`, `Modal`, `Drawer`, `Accordion`, `Tabs`, `Input`,
   `TextArea`, `Chip`, `Badge`, `Avatar`, `Separator`, `Tooltip`, `Popover`,
   `Dropdown`, `Skeleton`, `Spinner`, `Link`, `Breadcrumbs`, `Alert` — use o
   componente. Se **não** existe (ver §3.1), aí sim monte com Tailwind.
3. **Componentes são compound.** `Card.Header`, `Card.Title`,
   `Card.Description`, `Card.Content`, `Card.Footer`. Nunca achate em props.
4. **Handlers de interação são `onPress`**, não `onClick` — é o que preserva
   o comportamento de acessibilidade do React Aria (§9).
5. **Tailwind puro só para layout** (grid, flex, spacing, posicionamento) e
   para o que o HeroUI não cobre.
6. **Cores nunca em hex solto no JSX.** Sempre pelo token semântico do tema:
   `bg-accent`, `text-foreground`, `bg-surface`, `border-border`. Nunca
   `bg-[#2563EB]`, e nunca `bg-primary` — esse nome é da v2 (ver §4).
7. **Raios vêm do tema, não do utilitário.** Ajuste `--radius` no CSS e deixe
   os componentes herdarem. Não carimbe `rounded-2xl` em cima de um `Card`.
   Para caixas de layout que não são componentes HeroUI, use `rounded-2xl`.
8. **Espaçamento na escala do Tailwind:** 4, 8, 12, 16, 24, 32, 48, 64, 96,
   128. Nada de `mt-[37px]`.
9. **Componentes de seção são Server Components por padrão.** Só marque
   `"use client"` quando houver estado, evento ou animação.

**Componentes HeroUI mapeados por uso neste projeto:**

| Uso | Componente |
|---|---|
| Menu topo | **não há `Navbar` na v3** — ver §3.1 |
| Cards de produto/segmento | `Card.Header` / `.Title` / `.Description` / `.Content` / `.Footer` |
| CTAs | `Button` — `variant="primary"` e `variant="outline"` |
| Tags de tecnologia | `Chip` |
| FAQ | `Accordion` (ou `DisclosureGroup`) |
| Abas de produto | `Tabs` |
| Formulário de contato | `Form`, `TextField`, `TextArea`, `Select`, `FieldError` |
| Modal de demonstração | `Modal` |
| Menu mobile | `Drawer` |
| Seletor de idioma | `Dropdown` |
| Divisórias | `Separator` |
| Carregamento | `Skeleton`, `Spinner` |
| Depoimentos | `Avatar`, `Card` |
| Trilha de navegação | `Breadcrumbs` |

### §3.1 — O que a v3 NÃO tem (e como resolver)

Verificado contra os 71 componentes da v3.0.5:

- **`Navbar` não existe** (nem `NavbarBrand`, `NavbarContent`, `NavbarMenu` —
  eram da v2). O menu de topo é layout próprio: `<header>` com flex do
  Tailwind, `Link` do HeroUI nos itens, `Drawer` para o menu mobile e
  `Dropdown` para o seletor de idioma. Esta é a **única exceção autorizada**
  à regra 2 do §3 — não a use como pretexto para recriar outros componentes.
- **`Divider` virou `Separator`**.
- **`Textarea` virou `TextArea`** (T maiúsculo). Campo completo com label e
  erro: `TextField`.
- **`Header` existe na v3.2.2 mas NÃO é navbar** — é o primitivo de cabeçalho
  de lista do React Aria (para `ListBox`/`Menu`). Não o use no menu de topo.

Antes de assumir que um componente não existe, confira:
`node .agents/skills/heroui-react/scripts/list_components.mjs`

---

## §4 — Design tokens

**O site é escuro.** Não existe versão clara — o `<html>` carrega
`data-theme="dark"` fixo e não há alternância de tema.

A v3 tematiza por **variáveis CSS semânticas em `oklch`** — não por objeto de
tema JS e não por hex. Os tokens abaixo sobrescrevem os do HeroUI em
`app/globals.css`, **depois** dos dois `@import` do §2:

```css
:root,
[data-theme="dark"] {
  color-scheme: dark;

  --background: oklch(0.1947 0.0225 276.15); /* #12141F — topo do gradiente */
  --foreground: oklch(1 0 0);                /* branco — só títulos         */
  --foreground-base: oklch(0.9449 0.0133 262.38); /* #E8EDF6 — corpo        */
  --muted: oklch(0.7025 0.0342 260.01);      /* #93A0B5 — texto de apoio    */

  --sheet: oklch(0.1719 0.0186 259.66);      /* #0B1018 — a folha central   */
  --slate: oklch(0.7107 0.0351 256.79);      /* base das translucidezes     */

  --surface: color-mix(in oklab, var(--slate) 5%, transparent);
  --surface-secondary: color-mix(in oklab, var(--slate) 9%, transparent);
  --overlay: oklch(0.2153 0.0311 267.09);    /* OPACO — ver abaixo          */

  --accent: oklch(0.5461 0.2152 262.88);     /* #2563EB — só preenchimento  */
  --accent-soft-foreground: oklch(0.7137 0.1434 254.62); /* #60A5FA — texto */
  --focus: var(--accent-soft-foreground);
  --link: var(--accent-soft-foreground);

  --border: color-mix(in oklab, var(--slate) 14%, transparent);
  --radius: 0.75rem;                         /* base dos raios, ver §3.7    */
}
```

Regras que caem desse bloco — quebrar qualquer uma delas quebra o tema:

- **O bloco entra SEM `@layer`.** O HeroUI importa suas variáveis em
  `@layer theme`, a camada de menor precedência; CSS sem camada vence qualquer
  camada. Não use `!important` nem infle especificidade para "ganhar" dele.
- **`data-theme="dark"` no `<html>` é obrigatório**, e não é decoração: é o que
  traz do HeroUI o `color-scheme`, o `--surface-shadow` zerado (sem ele todo
  `Card` ganha um halo preto) e os status clareados. Redefinir só o `:root` com
  valores escuros herdaria tudo isso errado.
- **As superfícies são translúcidas.** É o que mantém `Card` visível sobre a
  folha; opacas na cor dela, os cards sumiriam.
- **`--overlay` é OPACO.** `Modal`, `Drawer`, `Tooltip` e `Popover` flutuam
  sobre conteúdo arbitrário — translúcido ali deixa o texto ilegível.
- **`text-accent` não existe na prática.** `#2563EB` sobre a folha dá 3,69:1 e
  reprova. Todo accent em TEXTO é `text-accent-soft-foreground` (7,50:1).
  `bg-accent` continua valendo para preenchimento.
- **`primary` é variante de Button, não cor.** `bg-primary` não existe.

Tokens de marca fora da escala semântica ficam no `@theme` do `globals.css`:
`--color-accent-2`, `--color-accent-strong`, `--color-accent-violet`,
`--color-sheet`, `--color-micro`, `--color-panel*` (mockups), `--color-footer*`,
`--color-whatsapp`, `--color-ondark*`, `--color-hairline*`,
`--shadow-glow-sm/md/lg` (glow em níveis).

**Sistema de glow por cena:** todo glow usa `var(--glow-color)` (default
`var(--accent)`, definido no `:root`). A seção muda o tom com
`[--glow-color:var(--color-accent-indigo)]` no `<section>` — nunca recolora
componente por componente.

**Violeta/indigo são a cor da "nova geração"** e aparecem exatamente em três
pontos da narrativa: H1 do hero, ato Prova e CTA final. Não use fora deles —
é o que mantém o fio legível.

`--surface-tertiary` e `--border-secondary` têm uso: são o hover e a borda do
`cartaoSyntax` peso "capa" (`components/ui/CartaoSyntax.tsx`).

**Tipografia:**
- Display / H1 / H2 de seção: **Sora** (`font-display`), 600, `tracking-[-0.03em]`
- Corpo: **Instrument Sans** (`font-sans`), 400, `leading-relaxed`
- Label / overline / números: **IBM Plex Mono** (`font-mono`), 500, `uppercase`,
  `tracking-[0.1em]`, `text-xs`

Sora e Instrument Sans são variáveis: **não passe `weight`** no `next/font`, ou
os pesos 600/800 somem. IBM Plex Mono não é variável — ali `weight` é obrigatório.

**Ritmo de seção:** `py-24` no desktop, `py-16` no mobile. **Não alterne fundo
entre seções** — todas flutuam sobre a folha do `PageShell` e a separação vem de
hairline (`border-border`) e translucidez. Seção com `bg-background` ou
`bg-surface` própria abre um retângulo visível na folha.

---

## §5 — Estrutura de pastas

```
src/
  proxy.ts                  # locale: detecção + rewrite, ver §18
                            # (Next 16 renomeou `middleware` para `proxy`)
  app/
    [locale]/
      layout.tsx            # fontes, metadata base, JSON-LD (sem provider)
      page.tsx              # home
      (rotas traduzidas por locale — ver §18)
    sitemap.ts
    robots.ts
  components/
    layout/                 # Header (menu de topo, ver §3.1), Footer
    sections/               # Hero, Produtos, ComoFunciona, CTA...
    ui/                     # wrappers finos sobre HeroUI, se necessário
  lib/
    metadata.ts             # helper de SEO, ver §8
    schema.ts               # JSON-LD, ver §8
    routes.ts               # mapa de slugs por locale, ver §18
  content/
    pt-BR/                  # textos em português
    es-PY/                  # textos em espanhol
public/
  images/
```

**Uma seção = um arquivo em `components/sections/`.** Nunca escreva duas
seções no mesmo componente.

---

## §6 — Convenções de código

- Componentes em `PascalCase`, arquivos idem: `HeroSection.tsx`.
- Props sempre tipadas com `interface`, exportada se reutilizável.
- Sem `export default` em componentes de seção — use named export.
- Textos longos vão para `src/content/`, não hardcoded no JSX.
- Nada de comentário óbvio. Comente só o que não é evidente pelo código.
- Commits em português, imperativo: `adiciona seção de produtos`.

---

## §7 — Anatomia padrão de uma seção

Toda seção da home segue esta estrutura. Não improvise variações.

```tsx
<section id="produtos" className="py-16 md:py-24">
  <div className="mx-auto max-w-7xl px-5 md:px-6">
    {/* Cabeçalho: use o SectionHeading, não recrie a hierarquia */}
    <SectionHeading overline="Produtos" titulo="..." subtitulo="..." />

    {/* Conteúdo */}
    <div className="mt-10 md:mt-16">...</div>
  </div>
</section>
```

`SectionHeading` (`components/ui/`) já monta overline em `font-mono`
`text-accent-soft-foreground`, H2 em `font-display` e subtítulo em
`text-foreground-base/70`. Não duplique isso à mão.

**A seção não tem fundo próprio** (§4): quem dá o fundo é o `PageShell`, que
envolve o `<main>` em `app/[locale]/page.tsx`.

### Sistema de espaçamento (escala 8px) — vale para o site inteiro

- Container: `max-w-7xl` sempre. Padding lateral: **`px-5` mobile, `md:px-6`**
  — o MESMO em toda seção, header e footer. Nenhuma seção pode parecer mais
  apertada que outra.
- Ritmo vertical: `py-16 md:py-24` em toda seção, com duas exceções nomeadas:
  o **hero preenche a dobra** (`lg:min-h-[calc(100svh-66px)]`) e **seções-faixa**
  (hoje: Ecossistema) usam `py-10 md:py-14` com `border-y`. Gaps internos em
  múltiplos de 8 (com 4 como meio passo).
- A home segue a **curva de pesos dos 9 atos** (5·3·2·4·5·2·1·3·5 — forte,
  médio, leve…). Seção nova declara seu peso e **não repete o formato da
  vizinha** — nem no desktop nem no mobile.
- Card: `p-4 sm:p-6` — nunca `p-6` fixo (em 320px o padding triplo
  folha+seção+card desperdiça ~20% da largura).
- **A folha (`PageShell`) e o header são full-bleed abaixo de `md`** (sem
  radius, sem borda lateral): moldura de 12px não lê em 320px.
- **Alvo de toque mínimo: 44px.** Link de texto pequeno ganha `py` estendido;
  CTAs de dobra usam `larguraTotal` do `CtaLink` no mobile.
- Mobile não é desktop encolhido: cada dobra tem um formato próprio
  (mostruário em camadas → editorial+timeline → acordeão de segmentos →
  capas+índice → mostruário empilhado → banda de numerais → faixa deslizante →
  banda numerada+mapa → gradiente). **Nenhuma dobra repete o formato da
  vizinha**; antes de criar seção nova, escolha um formato que ainda não
  esteja em uso ao lado.

---

## §8 — SEO (obrigatório em toda página)

Este é o motivo de o projeto ser Next.js. Nenhuma página entra sem isso.

**Toda `page.tsx` exporta `metadata`:**
- `title` único e descritivo (máx. ~60 caracteres)
- `description` única (máx. ~155 caracteres)
- `openGraph` com `title`, `description`, `images` e `locale` **conforme o
  idioma da página** (`pt_BR` ou `es_PY`) — nunca fixo, ver §18
- `twitter` com `card: "summary_large_image"`
- `alternates.canonical`

**JSON-LD obrigatório:**
- `Organization` no `layout.tsx` raiz
- `LocalBusiness` no `layout.tsx` raiz
- `SoftwareApplication` em cada página de solução
- `BreadcrumbList` em páginas internas

**Também obrigatório:**
- `app/sitemap.ts` e `app/robots.ts` gerados pelo Next
- URLs com hífen, sem acento: `/solucoes/sistema-restaurantes`
- Uma única `<h1>` por página
- Hierarquia de heading sem pular nível
- `alternates.languages` com **hreflang** em toda página, ver §18
- `openGraph.locale` correto por idioma (`pt_BR` ou `es_PY`)
- Toda página entra no `sitemap.ts` **nas duas versões de idioma**

**Cada solução tem sua própria página.** Não empilhe tudo na home — é o que
faz o site ranquear para termos diferentes.

---

## §9 — Acessibilidade

Meta: Lighthouse Accessibility 100.

- Contraste mínimo AA (4.5:1 em texto corpo).
- Todo elemento interativo alcançável por teclado, com `focus-visible` visível.
- `alt` descritivo em toda imagem de conteúdo; `alt=""` em decorativa.
- Botão de ícone puro precisa de `aria-label`.
- O HeroUI é construído sobre React Aria — não sobrescreva o comportamento
  de acessibilidade dele com handlers manuais.

---

## §10 — Performance e animação

Meta: Lighthouse Performance > 95.

- Animação permitida: fade in; slide leve em **qualquer eixo** (≤24px); escala
  de entrada (≥0.96); hover em card; scroll reveal com **stagger** (passos de
  60ms via `.reveal-stagger`, atraso acumulado ≤300ms); contador animado;
  linha que se desenha (`synTraco`/`synTracoY`, ≤400ms); pulso do indicador de
  rolagem do hero (2 iterações, nunca infinito). **Nada mais.**
- **Spotlight que segue o ponteiro: só via `PointerGlow`** (`components/ui/`).
  Travas: só monta sob `pointer: fine` e sem `prefers-reduced-motion`;
  rAF-throttled; escreve CSS vars direto no style, sem estado React. Não
  reimplemente o efeito fora dele.
- **Parallax decorativo leve: só via CSS scroll-driven animation**
  (`.parallax-suave*`), dentro de `@supports (animation-timeline: view())` +
  `@media (prefers-reduced-motion: no-preference)`. Amplitude ≤24px,
  transform-only, **nunca em texto de leitura** — só camada decorativa
  `aria-hidden`. Fallback obrigatório = elemento estático. Nada de biblioteca.
- Animação regida por tempo: ≤400ms. Regida por scroll: a régua é a amplitude
  (≤24px), não a duração.
- Respeitar `prefers-reduced-motion` sempre.
- **Animação é CSS por padrão** (transition/keyframes + `IntersectionObserver`
  para scroll reveal). A v3 não usa `framer-motion` e o projeto também não —
  ver §2. Se uma animação específica não sair em CSS, justifique antes de
  instalar; e então só em componente client, só na seção que precisa.

**Desvio autorizado — `ParticleCanvas`.** A rede de partículas atrás do hero é
a única animação do site em `<canvas>`: nós com posição própria e linhas entre
vizinhos não saem em CSS. Foi aprovada no redesign do tema escuro, com estas
travas — mexer nelas exige nova decisão:

- não monta sob `prefers-reduced-motion: reduce`;
- não monta abaixo de 768px;
- só monta depois da hidratação, então fica fora do caminho do LCP;
- `cancelAnimationFrame` no cleanup e em `visibilitychange: hidden`;
- `aria-hidden`, fora da ordem de leitura.

Não use esse desvio como precedente para outras animações.
- Nada de biblioteca de parallax pesada.
- Sem layout shift: toda imagem com `width`/`height` ou `fill` + container
  com aspecto definido.

---

## §11 — Imagens e assets

- Sempre `next/image`. Nunca `<img>`.
- Formato: `.webp` (fallback automático do Next).
- Screenshots dos sistemas: usar prints reais, nunca mockup genérico
  inventado. Se não houver print, avise — não invente interface.
- **Números derivados de material interno** (ex.: as 26 localidades contadas
  do mapa oficial de atuação) entram no conteúdo com comentário
  `⚠️ conferir antes de publicar` e **não vão a produção sem confirmação da
  Syntax**. Números inventados não entram nunca (§13).
- **Logo:** use `components/ui/MarcaSyntax.tsx` — mosaico de quadrados em SVG
  inline + lettering em tipografia do site. É desvio consciente do "não alterar
  o logo": o PNG oficial
  (`syntaxsistemas.com.br/template/pw-images/syntax-sistemas.png`) tem o
  lettering em cinza-escuro sobre fundo claro e fica ilegível sobre a folha
  `#0B1018`. O mosaico azul, que é a parte reconhecível da marca, foi
  preservado. Quando existir a versão clara oficial, a troca é local a esse
  arquivo — não espalhe `<img>` de logo pelo código.
- Fontes via `next/font/google`, com `display: "swap"` e `subsets: ["latin"]`.
  Ver §4 para quais aceitam `weight` e quais não.

---

## §12 — Formulários

- React Hook Form + Zod, schema em `src/lib/schemas/`.
- Campos do formulário de orçamento: nome, empresa, e-mail, telefone,
  segmento (select), mensagem.
- Validação de telefone em formato brasileiro.
- Estados obrigatórios: idle, loading (`Button` com **`isPending`** — na v3 não
  existe `isLoading`), sucesso, erro. Nunca deixe o usuário sem feedback.
- Os campos da v3 são React Aria. Ao integrar com React Hook Form, use
  `Controller` (componente controlado) — registro por `ref` não funciona.
  Erros de validação renderizam em `FieldError`, dentro de `TextField`.
- Mensagens de erro em português, humanas: "Informe um e-mail válido",
  não "Invalid email format".
- Botão de WhatsApp flutuante como alternativa ao formulário.

---

## §13 — Copy e tom de voz

- Português do Brasil, tratamento por "você".
- Frases curtas. Nada de parágrafo com mais de 3 linhas.
- Foco em benefício, não em tecnologia. O cliente não quer saber que é
  Next.js — quer saber que o pedido dele para de se perder.
- Proibido: "solução inovadora", "sinergia", "revolucionário", "disruptivo".
- Todo CTA é verbo no imperativo: "Solicitar demonstração", "Falar com
  especialista". Nunca "Saiba mais" sozinho.
- Números concretos > adjetivos. "Mais de X restaurantes atendidos" vale
  mais que "referência no mercado".
- Longevidade sempre como **"desde 2006"** — nunca "vinte anos" nem "há X
  anos", que desatualizam sozinhos. "15+ anos" só para experiência da equipe,
  nunca como idade da empresa.

---

## §14 — Comandos

```bash
npm run dev          # desenvolvimento
npm run build        # build de produção — rode antes de todo commit grande
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

Antes de considerar uma fatia pronta: `npm run build` tem que passar limpo.

---

## §15 — Fluxo de trabalho (fatias verticais)

O projeto avança em fatias verticais: uma seção sai do design, vira código,
entra no branch, e só então a próxima começa. **Não desenhar tudo antes de
codar nada.**

| Fatia | Escopo | Status |
|---|---|---|
| 0 | Scaffold (Next + Tailwind v4 + HeroUI v3) + tokens + Header + Footer | ✅ |
| 1 | Home completa em tema claro (9 seções) | ✅ |
| 2 | Redesign para o tema escuro: tokens, fontes, `PageShell`, marca | ✅ |
| 3 | Redesign das 8 seções + Método + Ecossistema | ✅ |
| 3.5 | Direção de arte da home: 9 atos, sistema de glow, componentes de marca | ⬜ |
| 4 | Páginas de solução (SEO) | ⬜ |
| 5 | Conteúdo `es-PY` (§18) — hoje `src/content/es-PY/` não existe | ⬜ |
| 6 | Lighthouse: Performance > 95, Acessibilidade 100 | ⬜ |

Uma fatia por branch: `feat/fatia-1-hero`.

---

## §16 — Troubleshooting (bugs conhecidos)

**Hidratação: erro de mismatch no menu de topo**
O `<header>` guarda estado (menu mobile aberto/fechado). Marque **só** o
componente que usa `useState` como `"use client"` e isole-o — não transforme a
página inteira em client component.

**Estilos do HeroUI não aplicam**
Nesta ordem: (1) confirme que o Tailwind é **v4** — a v3 do HeroUI não funciona
com Tailwind v3; (2) confirme a ordem dos imports em `globals.css`
(`tailwindcss` antes de `@heroui/styles`); (3) confirme
`@tailwindcss/postcss` no `postcss.config.mjs`.
Não procure `tailwind.config.ts` nem `HeroUIProvider` — **nenhum dos dois
existe na v3**.

**Erro: `HeroUIProvider is not exported` / `Cannot find @heroui/theme`**
Código v2 vazando. Não há provider na v3, e `@heroui/system` / `@heroui/theme`
foram substituídos por `@heroui/react` + `@heroui/styles` (§2).

**Componente "não existe" ao importar**
Provavelmente é nome da v2. Confira a lista real antes de concluir:
`node .agents/skills/heroui-react/scripts/list_components.mjs`
Os casos já conhecidos estão no §3.1 (`Navbar`, `Divider`, `Textarea`).

**Clique não dispara / não funciona pelo teclado**
Você usou `onClick`. Na v3 é `onPress` (§3, regra 4).

**Tudo virou claro / os `Card` ganharam halo preto**
Sumiu o `data-theme="dark"` do `<html>` (§4). Ele não é decoração: é o que traz
do HeroUI o `color-scheme`, o `--surface-shadow` zerado e os status clareados.

**Um `Card` (ou uma caixa) sumiu dentro da folha**
Foi pintado com fundo opaco na cor da folha. As superfícies do tema são
translúcidas de propósito (§4) — use `bg-surface` / `bg-surface-secondary` e
deixe a folha aparecer por baixo, ou apoie na `--border`.

**Uma seção abriu um retângulo visível na folha**
Ela tem `bg-background` ou `bg-surface` própria. Seção não tem fundo (§7): quem
dá o fundo é o `PageShell`.

**O hover do `Button` primário não muda nada**
`.button--primary` não declara `background-color` — declara `--button-bg` /
`--button-bg-hover`, e é a `.button` base que aplica a cor. O gradiente do tema
é `background-image`, então o hover precisa trocar a **imagem**, não a cor.

**Texto azul ilegível sobre a folha**
É `text-accent` (`#2563EB`, 3,69:1). Troque por `text-accent-soft-foreground`
(`#60A5FA`, 7,50:1) — §4.

**`Chip` saiu sem fundo, parecendo texto solto**
É `variant="tertiary"` — ela define `--chip-bg: transparent` por design. Para
pílula visível use `secondary` (o padrão) ou `soft` com `color`.

**Uma classe de cor simplesmente não aplica**
O token não existe mais. Os `--color-ink*` foram substituídos por
`--color-panel*` quando o site virou escuro. O Tailwind v4 não acusa erro:
a classe só não é gerada.

**`next/image` com imagem externa quebrando**
Domínio precisa estar em `images.remotePatterns` no `next.config`.

**Layout shift no hero ao carregar fonte**
Confirme `display: "swap"` e que a fonte está sendo aplicada via variável CSS
no `<html>`, não por classe em componente filho.

**Lighthouse SEO abaixo de 100**
Quase sempre: falta de `description`, falta de `canonical`, ou mais de um
`<h1>` na página.

---

## §17 — Como adicionar algo novo

**Nova seção na home:**
1. Criar `src/components/sections/NomeSection.tsx`
2. Seguir a anatomia do §7 sem improvisar
3. Textos em `src/content/`, não no JSX
4. Importar em `app/[locale]/page.tsx` na posição correta
5. Verificar hierarquia de heading (§8) e contraste (§9)
6. `npm run build` limpo

**Nova página de solução:**
1. Criar `src/app/[locale]/<slug>/page.tsx` — slug sem acento, com hífen.
   **Toda rota vive sob `[locale]`** (§5); o slug de cada idioma vem do mapa
   em `src/lib/routes.ts` (§18) e precisa existir nos dois
2. Exportar `metadata` completa (§8), com `alternates.languages` recíproco
3. Adicionar JSON-LD `SoftwareApplication` + `BreadcrumbList`
4. Incluir no `sitemap.ts` **nas duas versões de idioma**
5. Linkar no menu de topo (§3.1) e no `Footer`
6. Uma `<h1>` só

**Novo componente de UI:**
1. Primeiro verifique se o HeroUI já tem — quase sempre tem
2. Se tiver, use direto; não crie wrapper sem motivo
3. Se precisar de wrapper, coloque em `components/ui/` e documente por quê

**Nova dependência:**
Justifique antes de instalar. Se HeroUI ou Tailwind resolvem, não instale.

---

## §18 — Internacionalização (pt-BR + es-PY)

O site atende Brasil **e Paraguai**. Duas versões completas: português do
Brasil e espanhol paraguaio. Não é tradução automática de plugin — é conteúdo
versionado.

### Roteamento

- Locales: `pt-BR` (padrão) e `es-PY`.
- Estrutura: `src/app/[locale]/...`
- `pt-BR` **sem prefixo** na URL (`/solucoes/...`), `es-PY` **com** (`/es/soluciones/...`).
  Isso preserva o SEO já existente do domínio em português.
- `src/proxy.ts` (antigo `middleware.ts` — renomeado no Next 16) detecta o
  locale por `Accept-Language` e faz **rewrite**, mantendo a URL limpa.
  **A escolha manual do usuário tem prioridade** e é persistida em cookie.
  Nunca force o idioma por geolocalização sem deixar trocar.
- Locale sem revisão humana não vai ao ar: `LOCALES_PUBLICADOS` em
  `src/lib/routes.ts` controla isso, e a rota responde 404 até ser liberada.

### Slugs traduzidos (SEO)

URL traduzida ranqueia; URL em português com conteúdo em espanhol, não.
Mapa em `src/lib/routes.ts`:

| pt-BR | es-PY |
|---|---|
| `/solucoes` | `/es/soluciones` |
| `/solucoes/sistema-restaurantes` | `/es/soluciones/sistema-restaurantes` |
| `/solucoes/sistema-administrativo` | `/es/soluciones/sistema-administrativo` |
| `/solucoes/desenvolvimento-sob-medida` | `/es/soluciones/desarrollo-a-medida` |
| `/solucoes/landing-pages` | `/es/soluciones/landing-pages` |
| `/sobre` | `/es/nosotros` |
| `/contato` | `/es/contacto` |

### hreflang (obrigatório)

Toda página exporta:

```ts
alternates: {
  canonical: "https://syntaxsistemas.com.br/solucoes/sistema-restaurantes",
  languages: {
    "pt-BR": "https://syntaxsistemas.com.br/solucoes/sistema-restaurantes",
    "es-PY": "https://syntaxsistemas.com.br/es/soluciones/sistema-restaurantes",
    "x-default": "https://syntaxsistemas.com.br/solucoes/sistema-restaurantes",
  },
}
```

Regra: hreflang é **recíproco**. Se a página PT aponta para a ES, a ES tem
que apontar de volta. Sem isso o Google ignora as duas.

### Conteúdo

- Textos em `src/content/pt-BR/` e `src/content/es-PY/`, mesma estrutura de
  chaves nos dois. Chave que existe num e não no outro é erro de build.
- **Nunca traduza automaticamente e publique.** Conteúdo traduzido por máquina
  e não revisado ranqueia mal e queima credibilidade em página comercial.
  Se não houver revisão humana para uma seção, marque como pendente e não
  publique aquela rota.
- Nada de texto solto no JSX — quebra a tradução silenciosamente.

### Espanhol do Paraguai — decisões de idioma

- **Tratamento: `usted`.** O Paraguai usa voseo na fala, mas comunicação
  comercial B2B é em `usted`. Não escreva "vos podés".
- Vocabulário: `computadora` (não *ordenador*), `celular` (não *móvil*),
  `administrar` / `gestionar`.
- Evite espanhol neutro genérico traduzido do Brasil ("sistema de gestión
  empresarial" soa a template).
- CTAs: "Solicitar demostración", "Hablar con un especialista",
  "Conocer soluciones".
- Headline de referência: *"Transformamos procesos en sistemas inteligentes."*

### Dados locais que mudam por versão

Estes **não** são só tradução — são conteúdo diferente:

- Telefone e WhatsApp (número Paraguai +595 vs. Brasil +55)
- Endereço e mapa no footer
- Moeda em qualquer menção de preço (BRL / PYG)
- Formato de telefone na validação do formulário (§12)
- Campo `segmento` do formulário, se os segmentos diferirem por país
- JSON-LD: `LocalBusiness` com `areaServed: ["BR", "PY"]`
- Depoimentos: priorize clientes paraguaios na versão ES, se houver

### Impacto no fluxo (§15)

Cada fatia agora só é considerada pronta quando existe **nos dois idiomas**.
Não acumule "traduzo tudo no final" — vira uma fatia de uma semana no fim do
projeto que ninguém quer fazer.

### Troca de idioma na UI

Seletor no menu de topo (§3.1), à direita, usando `Dropdown` do HeroUI. Mostrar idioma,
não bandeira — bandeira representa país, não língua, e Paraguai/Espanha/
Argentina compartilham o mesmo idioma. Rótulos: `PT` e `ES`.
