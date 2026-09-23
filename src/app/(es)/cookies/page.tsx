import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Política de Cookies · Sara Córdoba",
  description: "Información sobre el uso de cookies en el sitio.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de Cookies"
      lastUpdate="Mayo 2026"
    >
      <h2>¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web instala en
        el navegador del usuario o en su dispositivo cuando este visita el
        sitio. Permiten reconocer al usuario, recordar sus preferencias o
        recoger información sobre su navegación.
      </p>

      <h2>¿Qué cookies utiliza este sitio?</h2>
      <p>
        Este sitio web{" "}
        <strong>
          no utiliza cookies de analítica, marketing, publicidad ni de
          terceros
        </strong>
        .
      </p>
      <p>
        Únicamente puede emplear cookies{" "}
        <strong>técnicas estrictamente necesarias</strong> para el correcto
        funcionamiento del sitio, como mantener el estado de la sesión del
        usuario o recordar preferencias de visualización. Estas cookies están{" "}
        <strong>exentas del deber de obtener consentimiento</strong> del
        usuario, conforme al artículo 22.2 de la LSSI-CE.
      </p>

      <h2>Gestión de cookies</h2>
      <p>
        El usuario puede configurar su navegador para aceptar, rechazar o
        eliminar las cookies. Cada navegador tiene un proceso diferente. A
        continuación, enlaces a las instrucciones oficiales:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/es/kb/proteccion-mejorada-rastreo-firefox-computadora"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/es-es/microsoft-edge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>Cambios en esta política</h2>
      <p>
        Si en el futuro este sitio incorporase cookies de terceros (analítica,
        marketing, etc.), se actualizará esta política y se implementará el
        correspondiente sistema de consentimiento previo conforme a la
        normativa vigente.
      </p>
    </LegalPage>
  );
}
