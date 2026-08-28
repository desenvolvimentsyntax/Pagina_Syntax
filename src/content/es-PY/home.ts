/**
 * Copy de la home — es-PY. Espeja `content/pt-BR/home.ts` clave por clave: si
 * falta una, el build rompe (§18). §6: el texto largo no vive en el JSX.
 *
 * Esta es la versión PRINCIPAL del sitio: el producto que la página vende
 * (punto de venta en guaraníes, integrado al SIFEN) y los clientes del
 * carrusel son paraguayos. La versión portuguesa es la traducción, no al revés.
 *
 * TRES PUNTOS NO SON TRADUCCIÓN, son contenido propio (§18 — "no traduzca
 * automáticamente"):
 *  - la pregunta de las FAQ sobre moneda se invierte: acá lo natural es
 *    preguntar si atienden en Brasil, no en Paraguay;
 *  - "notas fiscais" es concepto brasileño; acá es documento electrónico;
 *  - el hero no necesita aclarar "· Paraguay": el visitante ya está en casa.
 *
 * Tratamiento en `usted` (§18): comunicación comercial B2B paraguaya no usa
 * voseo. Nada de "vos podés".
 */

export const meta = {
  title: "PDV y gestión desde Gs. 200.000/mes | Syntax Sistemas",
  description:
    "Punto de venta integrado al SIFEN, con stock y finanzas. Tres planes con precio publicado, demostración abierta y atención de quien desarrolla.",
  ogAlt: "Syntax Sistemas — planes de PDV y gestión con precio publicado",
} as const;

/* -------------------------------------------------------------------------- */
/* 01 · Hero — producto y precio en el primer pliegue                          */
/* -------------------------------------------------------------------------- */

export const hero = {
  /* Corto a propósito: en 390px el mono de 13px con tracking 0.1em quiebra en
     dos líneas arriba de ~30 caracteres, y cada línea empuja el precio fuera
     de la primera pantalla. */
  eyebrow: "PDV + facturación electrónica",
  titulo: "El sistema que factura, controla el stock y cierra la caja de su empresa.",
  subtitulo:
    "Precio publicado, sin propuesta por teléfono. Compare los tres planes, entre en la demostración y hable con nosotros cuando tenga sentido.",
  /* Ancla de precio arriba de los botones. En el celular las tarjetas de plan
     quedan bajo la primera pantalla, y sin esta línea el pliegue cerraría sin
     ningún valor a la vista — que es justamente lo que la página vino a
     resolver. */
  ancora: { prefixo: "Planes desde", sufixo: "por mes" },
  ctaPrimario: "Ver planes y precios",
  ctaSecundario: "Entrar en la demostración",
  /** Tres pruebas cortas al lado de los CTA. Cada una se verifica en la página. */
  provas: ["Precio a la vista", "Demostración abierta", "Desde 2006, PY y BR"],
  /** h2 de la faja de planes: la tarjeta renderiza h3 y no puede saltar nivel (§8). */
  planosTitulo: "Planes publicados",
  planosNota: "Punto de venta",
} as const;

/* -------------------------------------------------------------------------- */
/* 02 · Comparación — la objeción "¿cuál es el mío?"                           */
/* -------------------------------------------------------------------------- */

export const comparacao = {
  overline: "Compare",
  titulo: "El plan correcto para el tamaño de su operación",
  intro:
    "Los tres emiten factura. El Profesional suma compras y stock; el Premium lleva todo lo del Profesional y cierra el ciclo con las finanzas.",
  /** Rótulo accesible del selector de planes (Tabs). */
  seletorAria: "Elija un plan para ver qué incluye",
  cta: "Abrir la página de planes",
  ctaApoio: "Guía de elección, tabla completa y condiciones de cobro.",
  /** Enlace desde el panel del selector hacia la tabla recurso por recurso. */
  linkTabela: "Ver la tabla recurso por recurso",
  /** Faja de la app que acompaña a los tres planes. */
  mobile: {
    titulo: "Todo plan viene con Syntax MOBILE",
    texto:
      "La misma operación en el celular: usted sigue venta, caja y stock desde donde esté, sin instalar nada en la computadora del local.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 03 · Demostración abierta — la objeción "¿funciona de verdad?"              */
/* -------------------------------------------------------------------------- */

export const demo = {
  overline: "Demostración abierta",
  titulo: "La caja que funciona todos los días, abierta para que la pruebe",
  texto:
    "La demostración es el sistema de verdad, el mismo que opera locales en Paraguay — sin registro y sin hablar con un vendedor.",
  /** Las tres acciones que la persona puede hacer ahora — chips mono. */
  acoes: ["Abra una venta", "Cierre una caja", "Emita un documento"],
  dominio: "pdv-syntax.vercel.app",
  cta: "Entrar en la demostración en vivo",
  href: "https://pdv-syntax.vercel.app/es",
  selo: "Abierta ahora",
} as const;

/* -------------------------------------------------------------------------- */
/* 04 · Cómo funciona — la objeción "¿da mucho trabajo empezar?"               */
/* -------------------------------------------------------------------------- */

export const comoFunciona = {
  overline: "Cómo empieza",
  titulo: "Del plan elegido a la primera factura",
  intro: "Cuatro pasos. Ninguno depende de que usted entienda de tecnología.",
  passos: [
    {
      titulo: "Usted elige el plan",
      texto:
        "Compara los tres acá mismo, con el precio a la vista. Nada de presupuesto cerrado por teléfono.",
    },
    {
      titulo: "Instalamos y configuramos",
      texto:
        "La instalación se cobra una vez y entrega su empresa configurada, con los registros en su lugar.",
    },
    {
      titulo: "Su equipo empieza a vender",
      texto:
        "El mostrador vende por teclado y no depende de la conexión: la venta se registra y sincroniza después.",
    },
    {
      titulo: "El documento sale solo",
      texto:
        "La facturación electrónica tiene su propio ritmo y no frena la fila de la caja.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 05 · Segmentos — el lazo "ese soy yo"                                       */
/* -------------------------------------------------------------------------- */

export const segmentosSecao = {
  overline: "Segmentos",
  titulo: "¿Cuál es su rubro?",
  texto:
    "Del mostrador de la panadería al camión de la distribuidora: desde 2006 el sistema se adapta a su rubro — y no al revés.",
  /**
   * Rubros que giran en el rotor. Todos derivan de la base declarada de Syntax
   * (§1/§11): nada de rubro no confirmado acá.
   */
  palavras: [
    "Restaurantes",
    "Distribuidoras",
    "Panaderías",
    "Supermercados",
    "Industrias",
    "Tiendas de ropa",
    "Clínicas",
    "Eventos",
  ],
  /** El rotor es decorativo (aria-hidden); esta es la frase del lector de pantalla. */
  listaAria:
    "Atendemos restaurantes, distribuidoras, panaderías, supermercados, industrias, tiendas de ropa, clínicas y eventos.",
} as const;

/* -------------------------------------------------------------------------- */
/* 06 · Syntax ERP — el buque insignia, en pliegue propio                      */
/* -------------------------------------------------------------------------- */

/** Clave del ícono Lucide — el componente resuelve; el content no importa React. */
export type IconeCobertura = "pedidos" | "estoque" | "financeiro" | "fiscal";

export const erpSecao = {
  overline: "Syntax ERP",
  titulo: "El sistema que mueve industrias y distribuidoras desde 2006",
  texto:
    "Mientras usted lee esto, hay un pedido facturándose y un camión saliendo a entregar con Syntax funcionando por detrás. Del pedido que el vendedor carga en la calle al documento que cierra la venta.",

  segmentos: ["Industria", "Distribución", "Comercio", "Gastronomía"],

  coberturaTitulo: "Una operación entera, en un solo sistema",
  cobertura: [
    { icone: "pedidos", rotulo: "Pedidos" },
    { icone: "estoque", rotulo: "Stock" },
    { icone: "financeiro", rotulo: "Finanzas" },
    /* "Notas fiscais" es concepto brasileño; acá el documento es electrónico. */
    { icone: "fiscal", rotulo: "Facturación" },
  ] satisfies readonly { icone: IconeCobertura; rotulo: string }[],

  cta: "Pedir una presentación",
  /**
   * En lugar de "precio a consultar": la página entera vende precio a la
   * vista. El compromiso es el mismo que la sección de contacto ya asume.
   */
  compromisso: "Diagnóstico gratuito de su operación, sin compromiso.",
  whatsappTexto: "¡Hola! Quiero una presentación de Syntax ERP.",

  projetos: {
    titulo: "Proyectos a medida",
    texto:
      "El sistema que se adapta a su rutina, o el sitio que presenta su empresa en Google. Los dos presupuestados por proyecto, por el mismo equipo que atiende después.",
    cta: "Hablar sobre mi caso",
    whatsappTexto:
      "¡Hola! Quiero conversar sobre un proyecto a medida para mi empresa.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 07 · Nosotros — la objeción "¿puedo confiar en esta empresa?"               */
/* -------------------------------------------------------------------------- */

export const sobre = {
  overline: "Sobre Syntax",
  titulo: "Hace casi 20 años crecemos junto a quienes confían en nosotros",
  paragrafos: [
    "Syntax nació en 2006, en Sorocaba, dentro del sector de bebidas. Empezamos escuchando al dueño de la distribuidora, al vendedor en la calle y a la gente del depósito, y así aprendimos a hacer sistemas: entendiendo la rutina de quien lo usa antes de escribir una sola línea de código.",
    "Muchos de nuestros primeros clientes siguen con nosotros hasta hoy. Cuando el sistema entra en funcionamiento la relación no termina: quien lo atiende después es el mismo equipo que lo construyó, gente que conoce mostrador, depósito y facturación por dentro.",
    "Con sede propia en Pedro Juan Caballero PY y casa matriz en Sorocaba SP, estamos cerca de quien opera de los dos lados de la frontera, en su idioma y en su horario.",
  ],
  /**
   * ⚠️ conferir antes de publicar (§11): las 26 localidades vienen del mapa
   * oficial de actuación, contadas de material interno. No va a producción sin
   * confirmación de Syntax.
   */
  numeros: [
    { valor: "20 años", legenda: "de camino, sin atajos" },
    { valor: "26", legenda: "localidades atendidas" },
    { valor: "2 países", legenda: "Paraguay y Brasil" },
  ],
  timeline: {
    label: "Nuestra trayectoria",
    marcos: [
      {
        titulo: "2006 · El comienzo",
        texto:
          "Primeros sistemas para industrias y distribuidoras de bebidas, en Sorocaba.",
      },
      {
        titulo: "La familia crece",
        texto:
          "Nuevos rubros llegan con los clientes: comercio, industria, gastronomía y eventos.",
      },
      {
        titulo: "Del otro lado de la frontera",
        texto:
          "Abrimos sede propia en Pedro Juan Caballero para atender Paraguay de cerca.",
      },
      {
        titulo: "Hoy · Nueva generación web",
        texto:
          "Llevamos esa historia al navegador, con la misma cercanía de siempre.",
      },
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 08 · Dudas — las objeciones que frenan la firma                             */
/* -------------------------------------------------------------------------- */

export const duvidas = {
  overline: "Antes de decidir",
  titulo: "Las preguntas que todos hacen",
  intro:
    "Si la suya no está acá, el WhatsApp está justo abajo — responde quien desarrolla.",
  cta: "Preguntar por WhatsApp",
  itens: [
    {
      pergunta: "¿Necesito instalar algo en la computadora del local?",
      resposta:
        "No. El sistema abre en el navegador, como un sitio: usted entra con su usuario y listo. No hay servidor que mantener en el local ni actualización que correr a mano.",
    },
    {
      pergunta: "¿Y si se cae internet en pleno movimiento?",
      resposta:
        "El mostrador sigue vendiendo. La venta se registra igual y sincroniza cuando vuelve la conexión — la caja no para por la red.",
    },
    {
      pergunta: "¿El precio cambia si tengo más de una caja?",
      resposta:
        "La mensualidad del plan cubre el primer punto de venta. Cada punto adicional cuesta Gs. 100.000 por mes, aparte. La instalación se cobra una sola vez.",
    },
    {
      pergunta: "¿Cuál es la diferencia real entre el Profesional y el Premium?",
      resposta:
        "Es una escalera. El Profesional suma al Básico el control de la mercadería: compras, stock, inventario e informes gerenciales. El Premium incluye todo lo del Profesional y cierra el ciclo con las finanzas completas: cuentas por pagar y por cobrar, flujo de caja, rentabilidad y gastos por centro de costo. Si su dolor hoy es la mercadería, el Profesional lo resuelve; si además necesita ver el dinero, el Premium es el plan entero.",
    },
    {
      /* Invertida respecto del pt-BR: para el visitante paraguayo la moneda no
         es la duda — la duda es si la empresa también atiende del otro lado. */
      pergunta: "¿Atienden empresas en Brasil?",
      resposta:
        "Sí. Los planes con precio publicado son del punto de venta para Paraguay. En Brasil la línea es Syntax ERP, presupuestada por operación: Syntax tiene sede propia en Pedro Juan Caballero y casa matriz en Sorocaba SP desde 2006.",
    },
    {
      pergunta: "¿Puedo ver el sistema antes de contratar?",
      resposta:
        "Sí, y sin hablar con un vendedor. La demostración es abierta y corre el sistema de verdad: usted abre una venta, cierra la caja y emite un documento como si el local fuera suyo.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 09 · Contacto                                                               */
/* -------------------------------------------------------------------------- */

export const contatoSecao = {
  overline: "Contacto",
  titulo: "¿Conversamos sobre su operación?",
  subtitulo:
    "Cuéntenos cómo trabaja su empresa hoy y un especialista vuelve con un diagnóstico aplicado a su rubro, sin compromiso y sin libreto de call center.",
  provas: [
    "Quien lo atiende es quien desarrolla el sistema",
    "Casi 20 años de operaciones funcionando, en Paraguay y Brasil",
    "Ya vio el precio y ya puede ver el sistema funcionando",
  ],

  form: {
    titulo: "Empiece la conversación ahora",
    subtitulo: "Cuatro campos y el mensaje llega listo a nuestro WhatsApp.",
    campos: {
      nome: { label: "Su nombre", placeholder: "¿Cómo lo llamamos?" },
      email: {
        label: "Correo corporativo",
        placeholder: "usted@suempresa.com.py",
      },
      telefone: {
        label: "Teléfono / WhatsApp",
        placeholder: "0971 234 567",
      },
      tamanho: { label: "Tamaño de la empresa", placeholder: "Seleccione" },
    },
    tamanhos: [
      "Hasta 5 personas",
      "De 6 a 20 personas",
      "De 21 a 50 personas",
      "Más de 50 personas",
    ],
    botao: "Hablar con un especialista",
    enviando: "Abriendo WhatsApp…",
    privacidade:
      "Sus datos no quedan guardados en este sitio: el mensaje abre directo en su WhatsApp, listo para revisar y enviar.",

    /** Líneas del mensaje armado. El campo vacío se omite. */
    mensagem: {
      abertura:
        "¡Hola! Vengo de la página de Syntax y quiero hablar con un especialista.",
      rotulos: {
        nome: "Nombre",
        email: "Correo",
        telefone: "Teléfono",
        tamanho: "Tamaño de la empresa",
      },
    },

    aviso: {
      titulo: "El navegador bloqueó la ventana de WhatsApp",
      texto: "Use el enlace de abajo para abrir la conversación con el mensaje listo.",
      linkRotulo: "Abrir WhatsApp",
    },
    sucesso: {
      titulo: "Mensaje listo en su WhatsApp",
      texto: "Revise y envíe — la conversación cae directo en el comercial de Syntax.",
      linkRotulo: "Abrir WhatsApp otra vez",
    },
    preencherNovamente: "Completar de nuevo",
  },
} as const;
