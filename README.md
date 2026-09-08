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

### Cuando exista sara@saracordoba.com, hay que cambiarlo en DOS sitios

**1. El aviso por correo — en el panel de Netlify** (no está en el código):

- Entrar en [app.netlify.com](https://app.netlify.com) y abrir el proyecto.
- Menú lateral: **Forms**.
- Pestaña **Settings and usage** (o **Usage and configuration**).
- Bajar hasta **Form notifications** → botón **Add notification** →
  **Email notification**.
- En **Email to notify**, cambiar la dirección.
- Guardar con **Save**.

Hay que hacerlo **una vez por formulario** si se quiere separar el aviso de
cada uno: `contacto`, `casas-rurales` y `recomienda`.

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
