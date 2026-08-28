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
| Timeline / trajetória | layout próprio (`components/ui/LinhaDoTempo.tsx`) |
| Formulário de contato | `Form`, `TextField`, `Input`, `Select`, `ListBox`, `FieldError`, `Alert` |
| Menu mobile | `Drawer` |
| Seletor de idioma | `Dropdown` |
| Divisórias | `Separator` |
| Carregamento | `Skeleton`, `Spinner` |
| Trilha de navegação | `Breadcrumbs` (páginas internas, fatia 4) |

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

**O site é claro.** Não existe versão escura — o `<html>` carrega
`data-theme="light"` fixo e não há alternância de tema.

> Até a fatia 3.6 o site era escuro (folha `#0B1018`, tokens em `oklch`, glow
> por cena). A fatia 3.7 trocou a direção de arte inteira pelo handoff
> `design_handoff_landing_syntax`. **Conhecimento do tema escuro está errado
> aqui** — `--sheet`, `--slate`, `--glow-color`, `--color-panel*`,
> `--color-micro`, `--color-hairline*` e `--shadow-glow-*` não existem mais.

A v3 tematiza por **variáveis CSS semânticas** — não por objeto de tema JS e
não por hex no JSX. Os tokens abaixo sobrescrevem os do HeroUI em
`app/globals.css`, **depois** dos dois `@import` do §2:

```css
:root,
[data-theme="light"] {
  color-scheme: light;

  --background: #ffffff;
  --foreground: #1f2937;        /* títulos — 14,70:1 no branco       */
  --foreground-base: #4b5563;   /* corpo — 7,56:1                    */
  --muted: #646c7a;             /* apoio — ver nota de contraste     */

  --surface: #ffffff;
  --surface-secondary: #f4f6fa;
  --surface-tertiary: #e8f0f8;
  --overlay: #ffffff;
  --surface-shadow: 0 0 0 0 transparent;

  --accent: #1f4e79;            /* texto E fundo — 8,66:1 no branco  */
  --accent-foreground: #ffffff;
  --accent-soft-foreground: var(--accent);
  --focus: var(--accent);
  --link: var(--accent);

  --border: #e5e9f0;
  --field-background: #f4f6fa;
  --field-border: var(--border);
  --field-border-width: 1px;

  --radius: 0.5rem;             /* botões 8px                        */
  --field-radius: 0.5625rem;    /* inputs 9px                        */
}
```

Regras que caem desse bloco — quebrar qualquer uma delas quebra o tema:

- **O bloco entra SEM `@layer`.** O HeroUI importa suas variáveis dentro de
  camada; CSS sem camada vence qualquer camada. Não use `!important` nem infle
  especificidade para "ganhar" dele.
- **`data-theme="light"` no `<html>` é obrigatório**: é o que traz do HeroUI o
  `color-scheme`, os status e os `--field-*` calibrados para o claro.
- **As superfícies são OPACAS.** Aqui a seção tem fundo próprio e o card se
  destaca por borda hairline, não por translucidez — o inverso do tema escuro.
- **`--surface-shadow` é zerado.** No design o `Card` é definido pela borda; a
  sombra (`shadow-cartao`) só entra no hover.
- **`--muted` é `#646c7a`, não o `#6b7280` do handoff.** O `#6b7280` passa no
  branco (4,83:1) mas reprova sobre `#f4f6fa` (4,42:1) e sobre os tiles
  `#e8f0f8` (4,20:1) — e é ali que ele mais aparece (intro de Produtos,
  legendas da timeline, rótulos do painel do hero). Dois pontos mais escuro
  resolve os três casos sem diferença perceptível. §9 vence fidelidade de hex.
- **`text-accent` FUNCIONA aqui**, ao contrário do tema escuro: `#1f4e79` dá
  8,66:1 no branco e serve para texto e para preenchimento.
- **`primary` é variante de Button, não cor.** `bg-primary` não existe.

Tokens de marca fora da escala semântica ficam no `@theme` do `globals.css`:
`--color-marca`, `--color-marca-hover/suave/chip`, `--color-azul-vivo`,
`--color-azul-claro/palido/barra`, `--color-escuro`, `--color-escuro-raised`,
`--color-ondark`, `--color-ondark-soft/muted`, `--color-linha`,
`--color-linha-timeline`, `--color-whatsapp*`, `--color-verde`,
`--color-semaforo-*`, `--shadow-topo/painel/cartao/form`.

**Azul vivo (`#2563eb`) é a cor da "nova geração"** e aparece em exatamente
dois pontos da narrativa: o card do PDV Web e o último marco da timeline. Fora
deles, o azul é sempre `--color-marca` (`#1f4e79`) — é o que mantém o fio
legível.

**Sobre painel escuro (`#0f172a`)** o anel de foco `#1f4e79` some. Envolva a
seção na classe `.sobre-escuro`, que troca `--focus` por `--color-azul-claro`
(10,10:1). O texto de apoio ali é `--color-ondark-muted` (7,10:1), nunca
`--muted`.

**Tipografia:**
- Display / H1 / H2 / títulos de card: **Montserrat** (`font-display`), 700–800
- Corpo: **Inter** (`font-sans`), 400–600, `leading-relaxed`
- Label / overline / domínios: **JetBrains Mono** (`font-mono`), 500–600,
  `uppercase`, `tracking-[0.1em]`, `text-[13px]`

As três são variáveis no Google Fonts: **não passe `weight`** no `next/font`,
ou os pesos 700/800 somem.

**Ritmo de seção:** `py-14 md:py-16` nas seções de conteúdo, `py-16 md:py-18`
nas de peso (hero, sobre, contato) e `py-6 md:py-7` na faixa do slogan.
**Cada seção TEM fundo próprio** — branco, `bg-surface-secondary` ou
`bg-escuro` — e a separação vem da alternância mais `border-t border-border`.
Isto é o inverso da regra do tema escuro: não existe mais folha central nem
`PageShell`.

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
    layout/                 # Header (menu de topo, ver §3.1), Footer, WhatsAppButton
    sections/               # Hero, Slogan, Solucoes, Produtos, Sobre, Contato
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
<section
  id="produtos"
  className="bg-surface-secondary border-border border-t py-14 md:py-16"
>
  <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
    {/* Cabeçalho: use o SectionHeading, não recrie a hierarquia */}
    <SectionHeading overline="Produtos" titulo="..." subtitulo="..." />

    {/* Conteúdo */}
    <div className="mt-10 md:mt-12">...</div>
  </div>
</section>
```

`SectionHeading` (`components/ui/`) já monta overline em `font-mono`
`text-marca`, H2 em `font-display` e intro em `text-muted`. `tom="escuro"`
inverte tudo para as bandas `bg-escuro`. Não duplique isso à mão.

**A seção TEM fundo próprio** (§4) — é ele que a separa da vizinha.

### Sistema de espaçamento (escala 8px) — vale para o site inteiro

- Container: `max-w-7xl` sempre. Padding lateral **`px-5 md:px-8 lg:px-12`** —
  o MESMO em toda seção, header e footer. Nenhuma seção pode parecer mais
  apertada que outra.
- Ritmo vertical: ver §4. Gaps internos em múltiplos de 8 (4 como meio passo).
- Card: `p-6 sm:p-7` (soluções, 28px do design) e `p-6 sm:p-9` (produtos,
  36px) — nunca padding grande fixo: em 320px o padding duplo desperdiça a
  largura útil.
- Raio: cards de solução `rounded-[14px]`; cards grandes, timeline e form
  `rounded-2xl` (16px); pills `rounded-full`. Botões (8px) e inputs (9px)
  herdam do tema — não carimbe `rounded` em cima deles.
- **Alvo de toque mínimo: 44px.** Link de texto pequeno ganha `py` estendido;
  CTAs de dobra usam `larguraTotal` do `CtaLink` no mobile.
- Mobile não é desktop encolhido. As seis dobras da home, em ordem: hero
  (grid texto + painel) → faixa do slogan → grade 2×2 de soluções → dois cards
  de produto (um claro, um escuro) → editorial + timeline → banda escura com
  formulário. **Nenhuma dobra repete o formato da vizinha**; antes de criar
  seção nova, escolha um formato que ainda não esteja em uso ao lado.

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
  60ms via `.reveal-stagger`, atraso acumulado ≤300ms); pulso de indicador
  (`animate-pulso`, 2 iterações, **nunca infinito**); ripple de toque nos CTAs.
  **Nada mais.**
- Animação regida por tempo: ≤400ms, com a única exceção do ripple.
- Respeitar `prefers-reduced-motion` sempre. O bloco global no fim do
  `globals.css` já zera duração e iteração — **não reimplemente por componente**.
- **Animação é CSS por padrão** (transition/keyframes + `IntersectionObserver`
  para scroll reveal). A v3 não usa `framer-motion` e o projeto também não —
  ver §2. Se uma animação específica não sair em CSS, justifique antes de
  instalar; e então só em componente client, só na seção que precisa.
- Nada de biblioteca de parallax, de partículas ou de scroll.
- Sem layout shift: toda imagem com `width`/`height` ou `fill` + container
  com aspecto definido.

**Desvio autorizado — o ripple.** A "marca de dedo em vidro" no `pointerdown`
dos CTAs dura 650ms, acima do teto de 400ms. É interação assinada do handoff de
design e foi aprovada na fatia 3.7, com estas travas — mexer nelas exige nova
decisão:

- keyframe `rippleFx` no `globals.css`, só `transform` + `opacity`, então roda
  no compositor;
- um único listener no `document`, montado uma vez por `components/ui/Ripple.tsx`
  na página — não um listener por botão, e sem estado React;
- não monta sob `prefers-reduced-motion: reduce`;
- o `<span>` é removido em 700ms, então não vaza nó no DOM;
- `removeEventListener` no cleanup do `useEffect`.

Elementos entram no efeito só com `data-ripple` + `relative overflow-hidden` —
o `CtaLink` já emite os dois. Não reimplemente o efeito fora dele.

## §11 — Imagens e assets

- Sempre `next/image`. Nunca `<img>`.
- Formato: `.webp` (fallback automático do Next).
- Screenshots dos sistemas: usar prints reais, nunca mockup genérico
  inventado. Se não houver print, avise — não invente interface.
- **Números derivados de material interno** (ex.: as 26 localidades contadas
  do mapa oficial de atuação) entram no conteúdo com comentário
  `⚠️ conferir antes de publicar` e **não vão a produção sem confirmação da
  Syntax**. Números inventados não entram nunca (§13).
- **Logo:** use `components/ui/MarcaSyntax.tsx` — `next/image` do PNG oficial
  em `public/images/syntax-logo.png` (1019×656, fundo transparente, sem
  tagline). Dois tamanhos: `header` (112×72) e `rodape` (87×56).
  O lettering é escuro, então ele lê bem sobre branco e **some sobre
  `#0f172a`**: no rodapé a marca vai dentro de um bloco claro. O mosaico SVG
  desenhado à mão que existia no tema escuro foi aposentado na fatia 3.7 —
  agora que o site é claro, o PNG oficial é o certo. Não espalhe `<img>` de
  logo pelo código: a troca é local a esse arquivo.
- Fontes via `next/font/google`, com `display: "swap"` e `subsets: ["latin"]`.
  Ver §4 para quais aceitam `weight` e quais não.

---

## §12 — Formulários

- React Hook Form + Zod, schema em `src/lib/schemas/`.
- Campos do formulário de contato: nome, e-mail, telefone, tamanho da empresa
  (select). **Nenhum é obrigatório** — o handoff de design é explícito que não
  há validação bloqueante: é abertura de conversa, não cadastro. O schema em
  `lib/schemas/contato.ts` valida só o FORMATO do que foi preenchido, para não
  montar uma mensagem de WhatsApp com e-mail quebrado. Campo vazio é omitido
  da mensagem.
- Validação de telefone em formato brasileiro (quando preenchido).
- O envio não tem backend: monta o texto e abre `wa.me`. O `window.open` vem
  **antes de qualquer `await`** — fora da pilha do gesto do usuário o
  bloqueador de popup mata a abertura. Se ele devolver `null`, o popup foi
  bloqueado e o link vira o CTA primário.
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
  **Exceção registrada (fatia 3.7):** a copy do handoff de design usa
  "Há quase 20 anos", "20 anos" e "Quase 20 anos" em três pontos (título de
  Sobre, faixa de números, provas de Contato). Foi mantida por decisão de
  fidelidade ao hifi, com o alerta no topo de `content/pt-BR/home.ts`. Rever
  com a Syntax quando "quase 20" virar falso. Copy nova continua sob a regra.

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
| 3.5 | Direção de arte da home: 9 atos, sistema de glow, componentes de marca | ✅ |
| 3.6 | FAQ (ato 07) + prova social gated + poda de copy + form + OG/viewport + copy centralizada em `content/` | ✅ |
| 3.7 | **Troca da direção de arte**: home clara do handoff `design_handoff_landing_syntax` — 6 dobras, Montserrat/Inter/JetBrains, tokens claros, marca em PNG oficial | ✅ |
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

**Tudo virou escuro / os `Card` ganharam sombra que não estava no design**
Sumiu o `data-theme="light"` do `<html>` (§4), ou alguém removeu o
`--surface-shadow: 0 0 0 0 transparent`. Nenhum dos dois é decoração.

**Duas seções vizinhas viraram uma mancha só**
Faltou fundo próprio numa delas. Aqui seção TEM fundo (§4/§7): branco,
`bg-surface-secondary` ou `bg-escuro`, mais `border-t border-border`. Não
existe mais `PageShell`.

**O hover do `Button` primário não muda nada**
`.button--primary` não declara `background-color` — declara `--button-bg` /
`--button-bg-hover`, e é a `.button` base que aplica a cor. Mexa nas variáveis,
não na propriedade.

**O anel de foco sumiu dentro da banda escura**
`--focus` é `#1f4e79`, que não lê sobre `#0f172a`. Falta a classe
`.sobre-escuro` no wrapper da seção (§4).

**A marca sumiu no rodapé**
O PNG oficial tem lettering escuro (§11). No `#0f172a` ela precisa do bloco
claro por trás — não troque a imagem, ajuste o contêiner.

**`Chip` saiu sem fundo, parecendo texto solto**
É `variant="tertiary"` — ela define `--chip-bg: transparent` por design. Para
pílula visível use `secondary` (o padrão) ou `soft` com `color`.

**Uma classe de cor simplesmente não aplica**
O token não existe mais. Os `--color-panel*`, `--color-micro`,
`--color-hairline*`, `--shadow-glow-*`, `--sheet` e `--glow-color` saíram na
fatia 3.7, quando o site virou claro. O Tailwind v4 não acusa erro: a classe
só não é gerada e o estilo some em silêncio. Confira o nome contra o `@theme`
do `globals.css`.

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
