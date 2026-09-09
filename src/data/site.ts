// Datos de contacto y envío de formularios.

// ESTE ES EL ÚNICO SITIO DONDE SE ESCRIBE EL CORREO QUE SE ENSEÑA EN LA WEB.
// Cambiarlo aquí lo cambia en las 7 páginas donde aparece: pie, contacto,
// páginas legales y el enlace de repuesto de los tres formularios.
//
// PROVISIONAL: aquí debería ir sara@saracordoba.com, pero ese buzón todavía
// no existe (hay dominio, no hay correo) y se ha aplazado hasta lanzar la
// campaña en frío. Mientras tanto va el Gmail, que sí lee alguien: enseñar
// una dirección que nadie atiende es peor que enseñar una menos bonita.
//
// El día que exista el buzón del dominio hay que cambiarlo AQUÍ y, aparte,
// en el aviso por correo del panel de Netlify. Ver "Formularios" en el README.
export const CONTACT_EMAIL = "scordobalazaro@gmail.com";

// ---------------------------------------------------------------------------
// Formularios
//
// Los recoge Netlify Forms. No hay cuentas de terceros, ni claves, ni
// variables de entorno que configurar: Netlify detecta los formularios al
// construir el sitio leyendo public/__forms.html.
//
// Los envíos se guardan en el panel de Netlify (Forms) y, además, se avisa
// por correo si está configurado el aviso. Instrucciones en el README.
//
// SI AÑADES UN CAMPO a cualquier formulario, hay que añadirlo TAMBIÉN en
// public/__forms.html con el mismo name, o ese dato se pierde sin avisar.
// ---------------------------------------------------------------------------

/** Netlify recoge los envíos en el propio archivo que define los formularios. */
export const RUTA_FORMULARIOS = "/__forms.html";

/**
 * En local no hay Netlify que recoja nada, así que no se envía y se dice.
 * Es preferible a dar las gracias por un mensaje que no ha salido de aquí.
 */
export function formulariosActivos() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1" && host !== "";
}

/**
 * Aviso "a la carrera", para cuando el visitante se va de la página.
 * Ahí no da tiempo a un envío normal: el navegador corta la petición al
 * cerrar. sendBeacon se lo queda el navegador y lo manda igual.
 * No devuelve si ha llegado, porque para entonces ya no hay nadie escuchando.
 */
export function avisarAlSalir(
  formulario: string,
  datos: Record<string, string>,
): boolean {
  if (!formulariosActivos()) return false;
  if (typeof navigator === "undefined" || !navigator.sendBeacon) return false;

  const cuerpo = new URLSearchParams({ "form-name": formulario, ...datos });
  try {
    return navigator.sendBeacon(
      RUTA_FORMULARIOS,
      new Blob([cuerpo.toString()], {
        type: "application/x-www-form-urlencoded",
      }),
    );
  } catch {
    return false;
  }
}

/** Devuelve true solo si el envío ha llegado de verdad. */
export async function enviarFormulario(
  formulario: string,
  datos: Record<string, string>,
): Promise<boolean> {
  if (!formulariosActivos()) return false;

  const cuerpo = new URLSearchParams({
    "form-name": formulario,
    ...datos,
  });

  try {
    const res = await fetch(RUTA_FORMULARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: cuerpo.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}
