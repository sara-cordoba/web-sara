# Handoff: Portfolio Sara Córdoba

## Overview
Portfolio web personal de Sara Córdoba — diseñadora & directora creativa con base en Barcelona. Es un site one-page (SPA con cuatro vistas: Inicio, Servicios, Trabajos, Contacto) que comunica un posicionamiento estratégico ("no es un problema de diseño, es un problema de sistema") y agrupa siete disciplinas en cuatro categorías de servicio.

Hay tres direcciones visuales en el bundle. Implementar la **v3** salvo indicación contraria — es la versión final aprobada (verde forest, partículas, franja en movimiento, calculadora interactiva).

## About the Design Files
Los archivos de este bundle son **referencias de diseño hechas en HTML/JSX (Babel inline)** — prototipos que muestran el look & feel y las interacciones esperadas, **no código de producción para copiar literalmente**.

La tarea es **recrear estos diseños en el codebase real** (Next.js 14 + TypeScript + Tailwind, según la captura del proyecto `web-sara`) usando los patrones del proyecto: componentes React/Server Components, Tailwind para estilos, y el sistema de tipografía/colores que decidamos consolidar.

## Fidelity
**Alta fidelidad (hifi)**. Colores, tipografía, espaciados e interacciones son finales. Replicar pixel-perfect en la implementación, adaptando solo lo necesario para encajar con Next.js + Tailwind.

## Stack objetivo
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (definir tokens en `tailwind.config.ts`)
- Animaciones con CSS puro o `framer-motion` si se prefiere
- Canvas 2D para las partículas (componente `'use client'`)

---

## Design Tokens

### Colores
```ts
// tailwind.config.ts
colors: {
  bg:         '#0a1612',  // background base
  'bg-deep':  '#050b09',
  'bg-soft':  '#0f1f1a',
  surface:    '#122821',
  'surface-2':'#18342a',
  'surface-3':'#1f3d31',
  green:      '#0d3b2e',  // verde forest principal
  'green-mid':'#1a5d45',
  lime:       '#a3d977',  // accent primario
  'lime-bright':'#c4f08f',
  'lime-deep':'#6fa44a',
  cream:      '#f5f0e6',  // texto principal
  warm:       '#d4b894',  // accent secundario nude
  text:       '#f5f0e6',
  'text-soft':'#c8c3b8',
  'text-muted':'#8a9189',
  'text-dim': '#5a615e',
  danger:     '#e06b5a',  // números de problema/pérdida
}
```

### Tipografía
```css
font-sans:    'Space Grotesk', 'Inter Tight', system-ui;  /* texto y display */
font-mono:    'JetBrains Mono', monospace;                 /* eyebrows, labels, marquee */
```

Importar Google Fonts: `Space Grotesk:400,500,600,700` + `JetBrains Mono:400,500`.

### Escalas
- **H1 hero**: `clamp(40px, 6vw, 80px)` / weight 600 / line-height 1.02 / letter-spacing -0.035em
- **H2 sección**: `clamp(32px, 4.5vw, 56px)` / weight 600 / letter-spacing -0.03em
- **Body lede**: `clamp(16px, 1.3vw, 19px)` / line-height 1.6 / color text-soft
- **Body**: 14–15px / line-height 1.55–1.6
- **Eyebrow**: 12px / mono / uppercase / letter-spacing 0.06em / color lime
- **Marquee**: 12px / mono / uppercase / letter-spacing 0.18em

### Border radius
- Cards: 18–24px
- Pills/eyebrows: 999px
- Inputs/buttons: 10–12px

### Sombras
- Card: `0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -20px rgba(0,0,0,0.5)`
- Glow lime: `0 0 40px rgba(163, 217, 119, 0.35)`
- CTA: `0 8px 24px -8px rgba(163, 217, 119, 0.5)`

### Espaciado
- Sección: `padding: 100px 32px` (mobile: `70px 20px`)
- Max-width contenido: `1280px`
- Gap entre cards: 16–24px

---

## Layout global

1. **Header fijo** (`z-index: 150`, height ~73px) — backdrop-filter blur, brand mark "SC" lime + nombre, nav 4 items (Inicio · Servicios · Trabajos · Contacto), CTA "Empezar conversación →"
2. **Background fijo** (`z-index: 0`) — gradient verde + grid sutil 64×64px masked con radial
3. **Particles canvas** (`z-index: 100`, fixed, 100vw×100vh, `pointer-events:none`) — 60 partículas verdes flotando + líneas de conexión + repulsión al cursor
4. **Marquee** (entre hero y "El problema") — banda edge-to-edge 54px verde con texto mono scroll horizontal
5. **Páginas** (`z-index: 5`, `padding-top: 90px`) — fade-in al cambiar de vista

---

## Vistas

### 1. Inicio (Home) — secciones en orden:

#### a) Hero
- Grid 2 cols (1.4fr / 1fr), gap 60px, align center
- **Izquierda**:
  - Eyebrow: "Estudio independiente · Barcelona"
  - H1: `No es un problema de [diseño-tachado]. Es un problema de [sistema-lime]`
    - Tachado: `::after` lime rotado -2deg sobre la palabra "diseño" en color text-muted
  - Lede: "No solo diseño webs ni edito vídeos. Antes de tocar nada, quiero conocerte y entender el propósito real de tu proyecto — para plasmarlo con honestidad y transmitirlo al máximo."
  - Row CTA: botón lime "Empezar conversación →" + botón ghost "Ver trabajos"
  - Stats foot (3 cols): Ámbito (Web · Brand · Vídeo) / Disponibilidad (Q3 2026) / Respuesta (< 48h)
- **Derecha**: card retrato 4/5 max-width 380px
  - `<img src="sara.png">` cover
  - Tag flotante top-left: "● EN ESTUDIO" (dot lime pulsante)
  - Foot card bottom: "Sara Córdoba" + "Diseño & dirección · Barcelona"

#### b) Marquee (entre hero y problema)
- Banda 54px edge-to-edge, fondo verde gradient
- Texto mono uppercase scroll continuo (60s loop), separadores con dot lime + glow
- Items: "Diseño con propósito" · "Web · UI/UX · Branding" · "Disponible Q3 2026" · "Vídeo · Motion · Color" · "Estudio independiente · Barcelona" · "Conversación honesta →" · "Sistemas que tu equipo puede mantener" · "Respuesta en < 48h"
- Fade laterales 100px verde → transparent

#### c) El problema (3 cards, grid 3 cols)
- H2: "Tu marca trabaja duro. Pero no [conecta-lime]."
- Cada card: icon box 44px (rgba lime), número 01/02/03 + stat en danger, título, body
  1. **73% no convierten** — "Tu web parece una más" — sin jerarquía clara, mensaje no llega
  2. **−10h / semana** — "Pierdes tiempo en herramientas" — Canva + Figma + plantillas, sin sistema
  3. **Caos comunicativo** — "Tu marca no transmite lo que vales" — silos entre marca, copy, contenido

#### d) Calculadora (interactiva)
- Wrap 2 cols con borde lime sutil + radial glow lime esquina
- Izquierda: 3 sliders (horas/sem 2-30, coste/h 15-80€, % sistematizable 20-90%)
  - Track: gradient lime hasta el valor, gris después
  - Thumb: círculo lime con ring + glow
- Derecha: result panel
  - "Estás invirtiendo al año": **horas × 52 × coste** en lime gigante
  - "Ahorro estimado conmigo": **resultado × auto%** en cream
- Estado React: `useState` para hours/rate/auto

#### e) La solución (4 cards, grid 2×2)
4 categorías, cada una con icon-box gradient lime, título, sub mono, lista con flecha → lime:
- **01 Diseño & Producto** (Web · UI/UX · Branding) — Webs React/Angular/Odoo, UI/UX, sistemas de marca
- **02 Contenido & Comunicación** (Redes · Copy · Mensaje) — IG/TikTok/LinkedIn, copys, storytelling
- **03 Vídeo & Motion** (Audiovisual de marca) — CapCut/motion, color, reels/after-movies/podcasts
- **04 Dirección creativa** (COO · CMO · Project lead) — Coordinación, briefs, roadmap

#### f) Cómo funciono (4 pasos, grid 4 cols)
Cards con número en pill lime: Diagnóstico → Propuesta → Ejecución → Acompañamiento

#### g) Quién hay detrás (about)
- Grid 1fr / 1.2fr
- Izquierda: foto cuadrada 1:1 con name-tag bottom (Sara Córdoba / FUNDADORA)
- Derecha: lede + 3 bullets con check lime (Soluciones a medida, Conversación honesta, Resultados medibles)

#### h) Trabajos seleccionados (grid 3 cols)
6 cards aspect 4/5 con logo cliente como background-image, overlay hover gradient negro con número/título/tipo:
1. Cronos AI Consulting (2025) · Brand · Web
2. GPAthletes (2025) · Identidad · Redes
3. Develand (2024) · Web · Producto
4. Guillermo Amor (2024) · Personal brand
5. AJE Madrid (2024) · Eventos · Vídeo
6. October Hollow Studio (2025) · Próximamente — placeholder con texto "COMING SOON"

#### i) Banner CTA final
Card grande con grid sutil + radial glows, H2 "¿Listo para que tu marca [cuente lo que vale-lime]?" + lede + CTA + meta ("Sin compromiso · Respuesta en menos de 48h")

#### j) Footer
3 cols: Brand+copy / Navegación / Contacto

### 2. Servicios
Reutiliza solo el bloque "La solución" (4 cards) con eyebrow distinto.

### 3. Trabajos
Reutiliza solo el bloque "Trabajos seleccionados" (6 cards).

### 4. Contacto
- H2: "¿Empezamos con un [café-lime]?"
- Grid 2 cols:
  - Izquierda: meta-list (Email · Base · Disponibilidad · Estado con dot lime)
  - Derecha: form (Nombre / Email / Tipo de proyecto select / Cuéntame textarea / botón submit)

---

## Interacciones

- **Cambio de página**: fade + translateY 12px → 0, 600ms ease-out
- **Hover cards**: `translateY(-4px)`, border-color → border-strong, 350ms ease
- **CTA hover**: `translateY(-1px)` + glow lime expandido + flecha translateX(3px)
- **Particle dots**: flicker (sin phase 0.65 + 0.35), drift up 0.05 vy, repulsión cursor radio 120px
- **Marquee**: animación `translateX(0 → -50%)` 60s linear infinite (track duplicado 2x para loop)
- **Card-tag dot**: `pulse-dot` 2s opacity 1 ↔ 0.55 + box-shadow 8px ↔ 14px
- **Aura glow** (cards principales con `::before`): gradient line lime 90deg, opacity 0 → 0.6 al hover

---

## Estado / data

```ts
// home page
const [page, setPage] = useState<'home' | 'servicios' | 'trabajos' | 'contacto'>('home');

// calculator
const [hours, setHours] = useState(8);
const [rate, setRate]   = useState(35);
const [auto, setAuto]   = useState(60);
const yearlyCost = hours * 52 * rate;
const savings    = Math.round(yearlyCost * (auto/100));

// contact form
const [sent, setSent] = useState(false);
```

---

## Assets necesarios
Copiar al proyecto Next.js en `public/img/`:
- `sara.png` — retrato Sara
- `cronos.jpg` — logo Cronos AI
- `gpathletes.jpg` — logo GPAthletes (background-size: cover, no contain)
- `develand.png` — logo Develand
- `guillermo-amor.png` — logo Guillermo Amor
- `aje-madrid.png` — logo AJE Madrid

(Todos están en `assets/` del bundle adjunto)

---

## Ficheros del bundle

| Archivo | Qué contiene |
|---|---|
| `Portfolio Sara Cordoba v3.html` | Entry point — chrome, navegación, mounting |
| `v3-styles.css` | Tokens, layout, todos los estilos de sección |
| `v3-pages.jsx` | `HomeV3`, `ServiciosV3`, `TrabajosV3`, `ContactoV3`, `Calculator` |
| `v3-particles.jsx` | Canvas 2D con partículas, conexiones y repulsión cursor |
| `tweaks-panel.jsx` | Panel de ajustes — **omitir en producción**, era solo para iteración |
| `assets/` | Imágenes (retrato + logos clientes) |

---

## Plan de implementación sugerido

1. Setup Tailwind con los tokens del bloque "Design Tokens" arriba
2. Importar fuentes en `app/layout.tsx`
3. Crear componentes:
   - `components/Chrome.tsx` (header + nav)
   - `components/Particles.tsx` (`'use client'`, port 1:1 de `v3-particles.jsx`)
   - `components/Marquee.tsx` (CSS animation, no necesita JS)
   - `components/Hero.tsx`, `Problem.tsx`, `Calculator.tsx`, `Solution.tsx`, `Process.tsx`, `About.tsx`, `Works.tsx`, `Banner.tsx`, `Contact.tsx`, `Footer.tsx`
4. App Router: `/`, `/servicios`, `/trabajos`, `/contacto` (o single-page con state si se prefiere mantener la SPA fade)
5. Optimizar imágenes con `next/image`
6. Validar accesibilidad (focus rings sobre lime, contrastes WCAG AA)

---

## Notas finales
- El bundle adjunto **no incluye** el panel de Tweaks porque era una herramienta de iteración (no debe ir a producción).
- Los archivos `Portfolio Sara Cordoba.html` (v1 mármol) y `Portfolio Sara Cordoba v2.html` (v2 dark dorado) **se descartan** — solo implementar v3.
- Si el dev tiene dudas sobre algún detalle, los HTML son la fuente de verdad — abrirlos en navegador y hacer DevTools sobre cualquier elemento.
