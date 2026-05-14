import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Política de Privacidad · Sara Córdoba",
  description: "Política de privacidad y tratamiento de datos personales.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de Privacidad"
      lastUpdate="Mayo 2026"
    >
      <p>
        En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y
        del Consejo, de 27 de abril de 2016 (RGPD), y de la Ley Orgánica
        3/2018, de 5 de diciembre, de Protección de Datos Personales y
        garantía de los derechos digitales (LOPDGDD), se informa al usuario de
        la siguiente política de privacidad.
      </p>

      <h2>Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Titular:</strong> Sara Córdoba Lázaro
        </li>
        <li>
          <strong>Email:</strong> scordobalazaro@gmail.com
        </li>
      </ul>

      <h2>Datos que se recopilan y finalidad</h2>
      <p>
        A través del formulario de contacto de este sitio web, se recogen los
        siguientes datos personales:
      </p>
      <ul>
        <li>Nombre</li>
        <li>Email</li>
        <li>Empresa o marca (opcional)</li>
        <li>URL de web o redes sociales (opcional)</li>
        <li>
          Información sobre el proyecto que el usuario comparte voluntariamente
        </li>
      </ul>
      <p>
        La finalidad del tratamiento es{" "}
        <strong>
          responder a la consulta y, en su caso, valorar la viabilidad del
          proyecto propuesto
        </strong>
        . En ningún caso se utilizarán los datos para fines distintos ni se
        realizarán comunicaciones comerciales no solicitadas.
      </p>

      <h2>Base legal del tratamiento</h2>
      <p>
        La base legal para el tratamiento de los datos es el{" "}
        <strong>consentimiento expreso</strong> del usuario, otorgado al
        rellenar y enviar el formulario de contacto, marcando previamente la
        casilla correspondiente.
      </p>

      <h2>Plazo de conservación</h2>
      <p>
        Los datos se conservarán durante el tiempo necesario para gestionar la
        consulta y, en caso de iniciarse una relación contractual, mientras
        dure dicha relación. Una vez finalizada, se conservarán bloqueados
        durante los plazos legalmente establecidos para atender posibles
        responsabilidades.
      </p>
      <p>
        El usuario puede solicitar la supresión de sus datos en cualquier
        momento.
      </p>

      <h2>Destinatarios</h2>
      <p>
        Los datos no se cederán a terceros, salvo obligación legal. No se
        realizan transferencias internacionales de datos.
      </p>

      <h2>Derechos del usuario</h2>
      <p>Como titular de los datos, el usuario tiene derecho a:</p>
      <ul>
        <li>
          <strong>Acceder</strong> a sus datos personales
        </li>
        <li>
          <strong>Rectificar</strong> datos inexactos
        </li>
        <li>
          <strong>Solicitar la supresión</strong> de sus datos cuando ya no
          sean necesarios
        </li>
        <li>
          <strong>Limitar el tratamiento</strong> de sus datos
        </li>
        <li>
          <strong>Oponerse</strong> al tratamiento
        </li>
        <li>
          <strong>Portabilidad</strong> de sus datos
        </li>
        <li>
          <strong>Retirar el consentimiento</strong> en cualquier momento
        </li>
      </ul>
      <p>
        Para ejercer estos derechos, el usuario puede enviar un email a
        scordobalazaro@gmail.com adjuntando una copia de su documento de
        identidad.
      </p>

      <h2>Reclamación ante la autoridad de control</h2>
      <p>
        Si el usuario considera que el tratamiento de sus datos no se ajusta a
        la normativa vigente, puede presentar una reclamación ante la{" "}
        <strong>Agencia Española de Protección de Datos (AEPD)</strong>, con
        sede en C/ Jorge Juan, 6, 28001 Madrid, o a través de su sede
        electrónica:{" "}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          aepd.es
        </a>
        .
      </p>

      <h2>Medidas de seguridad</h2>
      <p>
        La titular ha adoptado las medidas técnicas y organizativas necesarias
        para garantizar la seguridad e integridad de los datos personales y
        para evitar su alteración, pérdida, tratamiento o acceso no
        autorizado.
      </p>
    </LegalPage>
  );
}
