# Imágenes de la galería

Aquí van las piezas que se ven en `/trabajos`.

## Cómo añadir una

1. **Deja el archivo en esta carpeta.**
   - Tamaño recomendado: **1600 px por el lado largo**, por debajo de 500 kB.
   - Formato: `.webp` si puedes. Si no, `.jpg` o `.png` valen igual —
     la web las convierte a webp sola al servirlas.
   - Nombre sin espacios ni acentos: `cartel-aje-madrid.webp`, no `Cartel AJE (1).png`.

2. **Añade una línea en `src/data/galeria.ts`** con el nombre del archivo,
   el título, el cliente y el tipo de pieza.

Y ya está. La rejilla, la ampliación al hacer clic y la carga diferida
funcionan solas.

## Detalles que importan

- **En la rejilla las piezas se ven cuadradas** y recortadas por el centro.
  Al hacer clic se ve la imagen entera, sin recortar. Si una pieza es muy
  alargada, comprueba que se entiende también recortada.
- **`destacada: true`** pone una pieza al doble de tamaño. Úsalo con dos o
  tres como mucho, o pierde el efecto.
- **Solo se cargan las cuatro primeras al entrar.** El resto se carga según
  se baja, así que se pueden poner 30 sin que la página vaya lenta.
- **Si una imagen pesa varios MB, súbela igual pero redúcela antes.** La web
  la sirve más ligera, pero el archivo original se queda en el repositorio.
