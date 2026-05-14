import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Aviso Legal · Sara Córdoba",
  description: "Aviso legal del sitio web de Sara Córdoba.",
};

export default function AvisoLegalPage() {
  return (
    <LegalPage eyebrow="Legal" title="Aviso Legal" lastUpdate="Mayo 2026">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
        Servicios de la Sociedad de la Información y de Comercio Electrónico
        (LSSI-CE), se exponen los datos identificativos del titular de este
        sitio web:
      </p>

      <ul>
        <li>
          <strong>Titular:</strong> Sara Córdoba Lázaro
        </li>
        <li>
          <strong>Email de contacto:</strong> scordobalazaro@gmail.com
        </li>
      </ul>

      <h2>Objeto</h2>
      <p>
        El presente Aviso Legal regula el uso del sitio web saracordoba.com (en
        adelante, el Sitio), titularidad de la persona indicada anteriormente.
      </p>
      <p>
        El acceso al Sitio atribuye la condición de usuario e implica la
        aceptación plena y sin reservas de todas las disposiciones incluidas
        en este Aviso Legal en la versión publicada en el momento del acceso.
      </p>

      <h2>Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del Sitio (textos, fotografías, gráficos,
        imágenes, iconos, tecnología, software, así como su diseño gráfico y
        códigos fuente) son propiedad intelectual de la titular o de terceros,
        sin que puedan entenderse cedidos al usuario ninguno de los derechos
        de explotación reconocidos por la normativa vigente sobre propiedad
        intelectual.
      </p>
      <p>
        Queda prohibida la reproducción, distribución, comunicación pública y
        transformación de cualquier contenido del Sitio sin autorización
        expresa de su titular.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        La titular del Sitio no se responsabiliza de los daños que pudieran
        ocasionarse en los equipos de los usuarios por posibles virus
        informáticos contraídos por el usuario a causa de su navegación, ni
        de cualesquiera otros daños derivados de dicha navegación.
      </p>
      <p>
        La titular se reserva el derecho a denegar o retirar el acceso al
        Sitio, en cualquier momento y sin necesidad de preaviso, a aquellos
        usuarios que incumplan estas condiciones.
      </p>

      <h2>Enlaces externos</h2>
      <p>
        En caso de que el Sitio contuviese enlaces a otros sitios web, la
        titular no ejerce ningún tipo de control sobre dichos sitios y
        contenidos. En ningún caso la titular asumirá responsabilidad alguna
        por los contenidos de algún enlace perteneciente a un sitio web ajeno.
      </p>

      <h2>Legislación aplicable y jurisdicción</h2>
      <p>
        La relación entre la titular y el usuario se regirá por la normativa
        española vigente. Para la resolución de cualquier controversia, las
        partes se someten a los Juzgados y Tribunales del domicilio del
        usuario.
      </p>
    </LegalPage>
  );
}
