// Datos de contacto y envío de formularios.

// ESTE ES EL ÚNICO SITIO DONDE SE ESCRIBE EL CORREO QUE SE ENSEÑA EN LA WEB.
// Cambiarlo aquí lo cambia en las 7 páginas donde aparece.
//
// OJO: este buzón todavía no existe. Está contratado el dominio pero no el
// correo, así que hoy nadie lee lo que se mande ahí. Los avisos de los
// formularios NO pasan por esta dirección: van al Gmail de Sara, configurado
// en el panel de Netlify. Ver la sección "Formularios" del README.
export const CONTACT_EMAIL = "sara@saracordoba.com";

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
