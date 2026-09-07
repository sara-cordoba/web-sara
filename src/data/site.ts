// Datos de contacto del sitio.
// ESTE ES EL ÚNICO SITIO DONDE SE ESCRIBE EL CORREO: cambiarlo aquí lo cambia en toda la web.
export const CONTACT_EMAIL = "sara@saracordoba.com";

// Formulario de contacto.
// Formspree (https://formspree.io -> New Form) da un endpoint del tipo:
//   https://formspree.io/f/xxxxxxxx
// Se configura en un archivo .env.local en la raíz del proyecto:
//   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
// Mientras esté sin configurar, los formularios NO fingen que han enviado:
// avisan al visitante y le ofrecen escribir directamente al correo de arriba.
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

// Sin dirección configurada no se envía nada y el formulario lo dice claramente,
// en lugar de dar las gracias por un mensaje que no ha salido de aquí.
export const FORM_ENABLED = /^https?:\/\/.+/.test(FORM_ENDPOINT);
