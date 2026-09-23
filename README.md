# web-sara

Web de Sara Córdoba. Next.js 14 (App Router), TypeScript y Tailwind.
Alojada en Netlify, con despliegue automático: **cada push a `main` publica la
web en menos de un minuto**. No hay que lanzar nada a mano.

```bash
npm run dev     # desarrollo, en http://localhost:3000
npm run build   # construir
npm run lint    # revisar el código
```

## Páginas

| Ruta | Qué es |
|---|---|
| `/` | Home: trabajos, proyectos, testimonios |
| `/trabajos` | Galería de piezas de diseño, con vídeo |
| `/perfil` | Perfil profesional, para quien contrata. Enlazada solo desde el pie de la home |
| `/recomienda` | Programa de recomendaciones. Enlazada solo desde el pie |
| `/webs-para-casas-rurales` | Página de la campaña en frío |
| `/contacto`, `/aviso-legal`, `/privacidad`, `/cookies` | |
| `/en`, `/en/work`, `/en/contact` | Las mismas home, galería y contacto, en inglés |

## Dónde están los textos

Casi todo el contenido está separado del diseño, en `src/data/`:

| Archivo | Qué contiene |
|---|---|
| `site.ts` | El correo que se enseña en la web y el envío de formularios |
| `v3.ts` | Servicios y fichas de proyecto de la home |
| `galeria.ts` | Las piezas de `/trabajos` |
| `testimonios.ts` | Los testimonios del carrusel |
| `perfil.ts` | Todo `/perfil` |
| `rural.ts` | Todo `/webs-para-casas-rurales` |
| `recomienda.ts` | Todo `/recomienda` |
| `antes-despues.ts` | El comparador de web vieja y nueva (montado, sin usar todavía) |

Lo que antes estaba escrito dentro del marcado (titulares, botones, etiquetas
de formulario) ahora está en `src/i18n/`:

| Archivo | Qué contiene |
|---|---|
| `i18n/es.ts` | Todos esos textos, en español |
| `i18n/en.ts` | Los mismos, en inglés. Tiene que tener la misma forma que `es.ts`: si falta una clave, **la construcción falla** |
| `i18n/contenido-en.ts` | La traducción de lo que vive en `src/data/`: fichas de proyecto, servicios, testimonios y galería |
| `i18n/config.ts` | Los dos idiomas y el mapa de rutas equivalentes |

---

## Dos idiomas

El español es el idioma por defecto y vive en las rutas de siempre, sin
prefijo. El inglés cuelga de `/en`.

Cada idioma tiene su propio layout raíz, con su `<html lang>`:
`src/app/(es)/` y `src/app/(en)/`. Por eso no hay `src/app/layout.tsx`.

**Al añadir una página que exista en los dos idiomas**, basta con una línea en
`EQUIVALENTES`, en [`src/i18n/config.ts`](src/i18n/config.ts). Con eso ya
funcionan el selector de la cabecera y las etiquetas `hreflang` de esa página.

**Al añadir un proyecto, un testimonio o una pieza de galería**, se añade en
`src/data/` como siempre, y su traducción en `src/i18n/contenido-en.ts` con la
misma clave (el título del proyecto, el nombre del archivo…). Si no se traduce,
ese elemento sale **en español dentro de la web inglesa**: nunca desaparece ni
rompe nada.

**Qué NO está en inglés, a propósito:** `/perfil` (el CV, con su PDF en
español), `/recomienda`, `/webs-para-casas-rurales` y las tres páginas legales.
Y Nika, que tiene su guion entero en español: no sale en `/en`. Para cambiarlo,
`PREFIJOS_SIN_NIKA` en [`src/data/chatbot.ts`](src/data/chatbot.ts).

El idioma elegido se recuerda en `localStorage`, no en una cookie. **Nunca se
redirige a nadie**: a quien llega con el navegador en inglés se le ofrece la
versión inglesa en una barra que se puede cerrar.

---

## Formularios

Los recoge **Netlify Forms**. No hay cuentas de terceros, ni claves, ni
variables de entorno. Netlify detecta los tres formularios al construir el
sitio, leyendo `public/__forms.html`.

Los envíos se guardan siempre en el panel de Netlify, aunque falle el correo.

### Dónde llegan los avisos

**Hoy van al Gmail de Sara.**

El correo del dominio, **sara@saracordoba.com, todavía no existe**: está
contratado el dominio pero no el buzón, y se ha aplazado hasta lanzar la
campaña de correo en frío. Mientras tanto **esa dirección no lee nada**,
aunque aparezca escrita en la web.

### Puesta en marcha en el panel de Netlify (una sola vez)

Netlify **no busca formularios hasta que se le dice**. Viene desactivado de
fábrica, así que sin este paso los envíos devuelven 404 y no se guarda nada.

**Paso 1 — activar la detección:**

- Entrar en [app.netlify.com](https://app.netlify.com) y abrir el proyecto.
- Menú lateral: **Forms**.
- Botón **Enable form detection**.
- **Volver a desplegar**: la detección ocurre al construir el sitio, así que
  no vale con activarla. Sirve cualquier push, o el botón **Trigger deploy**
  en **Deploys**.

**Paso 2 — el aviso por correo:**

- **Project configuration** → **Notifications** → **Emails and webhooks**.
- Sección **Form submission notifications** → añadir una notificación.
- Se puede elegir un formulario concreto (`contacto`, `casas-rurales`,
  `recomienda`) o todos a la vez.
- Poner la dirección de destino y guardar.

Sin el paso 2 los envíos se siguen guardando en **Forms**, pero no llega
ningún aviso.

### Cuando exista sara@saracordoba.com, hay que cambiarlo en DOS sitios

**1. El aviso por correo:** repetir el paso 2 de arriba con la dirección
nueva.

**2. La dirección que se enseña en la web — en el código:**

Cambiar `CONTACT_EMAIL` en [`src/data/site.ts`](src/data/site.ts). Con eso
cambia en los siete sitios donde aparece: pie, contacto, páginas legales y el
enlace de repuesto de los tres formularios.

### Si añades un campo a un formulario

Hay que añadirlo en **dos** archivos, con el mismo `name`:

1. El componente: `ContactForm.tsx`, `RuralLeadForm.tsx` o `RecomiendaForm.tsx`.
2. **`public/__forms.html`**, que es donde Netlify aprende qué campos existen.

Si te saltas el segundo, ese dato **se pierde sin avisar**: el formulario dice
que se ha enviado y el campo no aparece en el panel.

### En local no se envía

Los formularios solo funcionan en la web publicada, porque quien los recoge es
Netlify. En `localhost` avisan de que no se ha podido enviar y ofrecen escribir
por correo, en vez de dar las gracias por un mensaje que no ha salido.

### Límites

Netlify Forms es gratis y sin límite en los planes actuales por créditos. En
los planes antiguos, el nivel gratuito son 100 envíos al mes. Se consulta en
**Forms → Usage**.
