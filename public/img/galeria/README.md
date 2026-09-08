# Imágenes y vídeos de la galería

Aquí van las piezas que se ven en `/trabajos`.

## La forma rápida

```
node scripts/preparar-galeria.mjs "C:/Users/sarac/Desktop/carpeta-con-originales"
```

Comprime, convierte y deja todo listo en esta carpeta. Después solo hay que
añadir cada pieza en `src/data/galeria.ts` con su título y su tipo.

## A mano, si lo prefieres

**Imágenes:** `.webp` (o `.jpg` / `.png`, se sirven en webp igualmente).
1600 px por el lado largo va sobrado.

**Vídeos:** `.mp4` de 864x864. Cada vídeo necesita **una imagen con el mismo
nombre y extensión `.webp`**: es lo que se ve en la rejilla antes de que el
vídeo arranque. Por ejemplo:

```
mockup-triptico.mp4     <- el vídeo
mockup-triptico.webp    <- la portada, obligatoria
```

Nombres sin espacios, sin acentos y sin eñes: `folleto-campana.mp4`, no
`Folleto Campaña (1).mp4`.

## Detalles que importan

- **En la rejilla las piezas se ven cuadradas**, recortadas por el centro. Si
  una pieza no es cuadrada y al recortarla se pierde texto, ponle
  `encaje: "completa"` en los datos y se verá entera.
- **Los vídeos van mudos y en bucle** en la rejilla, y solo se reproducen
  mientras se ven en pantalla. Al ampliarlos suena el audio, si lo tienen.
- **`destacada: true`** pone una pieza al doble de tamaño. Con dos o tres basta.
- **Solo se cargan las cuatro primeras al entrar.** El resto se carga según se
  baja, así que se pueden poner 30 sin que la página vaya lenta.
- **Vigila el peso.** Las siete piezas actuales suman 1,1 MB ya comprimidas;
  los originales pesaban 14 MB. Todo lo que se deje aquí acaba en el
  repositorio.
