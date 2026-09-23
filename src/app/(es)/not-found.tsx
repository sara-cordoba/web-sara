import type { Metadata } from "next";

/* La página de "esto no existe".
 *
 * POR QUÉ EXISTE ESTE ARCHIVO: antes no hacía falta. Había un solo layout
 * raíz y Next metía aquí su 404 de fábrica, así que la página salía con la
 * cabecera y el fondo de la web. Al pasar a dos layouts raíz (uno por idioma)
 * el 404 se quedaba fuera de los dos y Next lo servía pelado, sin cabecera y
 * sin <html lang>.
 *
 * Puesto dentro del grupo español, vuelve a heredar el marco de siempre. Lo
 * de dentro es copia de lo que pintaba Next, letra por letra, para que la
 * página se vea igual que antes: sí, el texto está en inglés y el estilo de
 * Next fuerza el fondo blanco, pero era así antes de todo esto.
 *
 * Si algún día se quiere un 404 de verdad, en español y con el estilo de la
 * casa, es aquí y se puede tirar todo lo de abajo.
 */

export const metadata: Metadata = {
  title: "404: This page could not be found.",
};

const ESTILO_NEXT =
  "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}";

export default function NoEncontrada() {
  return (
    <div
      style={{
        fontFamily:
          'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <style dangerouslySetInnerHTML={{ __html: ESTILO_NEXT }} />
        <h1
          className="next-error-h1"
          style={{
            display: "inline-block",
            margin: "0 20px 0 0",
            padding: "0 23px 0 0",
            fontSize: 24,
            fontWeight: 500,
            verticalAlign: "top",
            lineHeight: "49px",
          }}
        >
          404
        </h1>
        <div style={{ display: "inline-block" }}>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "49px",
              margin: 0,
            }}
          >
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
}
