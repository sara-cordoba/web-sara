"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FORMULARIO,
  FORMULARIO_NETLIFY,
  GUION,
  INICIO,
  PAGINAS_SIN_NIKA,
  temaDeTexto,
  TEXTOS,
  type Boton,
} from "@/data/chatbot";
import { avisarAlSalir, enviarFormulario } from "@/data/site";

/* Nika no tiene inteligencia artificial ni servidor: todo lo que dice está
   en src/data/chatbot.ts. Este archivo solo lo enseña.

   Lo único que sale de aquí es un aviso a Sara por el formulario de Netlify,
   y como mucho UNO por sesión: su plan tiene 100 envíos al mes compartidos
   con los otros tres formularios de la web. */

/* La pausa antes de cada burbuja va con lo larga que sea: escribir una frase
   de dos palabras no cuesta lo mismo que un párrafo. Sin esto, cuatro
   burbujas caen en menos de dos segundos y parece un volcado de texto, no
   una conversación. */
const ESPERA_BASE = 300; // ms
const ESPERA_POR_LETRA = 7; // ms
const ESPERA_MAXIMA = 1200; // ms
const pausaPara = (texto: string) =>
  Math.min(ESPERA_MAXIMA, ESPERA_BASE + texto.length * ESPERA_POR_LETRA);
const LLAVE_SESION = "nika-aviso-enviado";
const BOTONES_MINIMOS = 2; // para avisar del recorrido sin datos personales

/* Volver y empezar de nuevo se apuntan en el recorrido, porque a Sara le dice
   algo que alguien se arrepintiera ahí. Pero no cuentan como interés: si no,
   dar dos veces atrás dispararía un aviso de un visitante que no ha mirado
   nada, y los avisos son 100 al mes entre los cuatro formularios. */
const pasosDeGuion = (recorrido: string[]) =>
  recorrido.filter((x) => x !== TEXTOS.atras && x !== TEXTOS.reiniciar).length -
  1;

type Mensaje = { de: "nika" | "tu"; texto: string };

export default function Nika() {
  const router = useRouter();
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false); // nunca se abre solo
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cola, setCola] = useState<string[]>([]);
  const [botones, setBotones] = useState<Boton[]>([]);
  const [modo, setModo] = useState<"chat" | "formulario" | "enviado">("chat");
  const [recorrido, setRecorrido] = useState<string[]>(["Inicio"]);
  /* Dónde estamos y por dónde hemos venido. La pila es lo que hace que
     "Volver" exista: sin ella, equivocarse de botón era quedarse encerrada,
     porque la única salida era cerrar el chat y perder la conversación. */
  const [nodoActual, setNodoActual] = useState(INICIO);
  const [pila, setPila] = useState<string[]>([]);
  const [entrada, setEntrada] = useState("");
  const [sinMovimiento, setSinMovimiento] = useState(false);

  // formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [recomendado, setRecomendado] = useState("");
  const [consiente, setConsiente] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [falloEnvio, setFalloEnvio] = useState(false);

  /** Índice del mensaje por el que se coloca la vista al llegar una respuesta. */
  const [ancla, setAncla] = useState<number | null>(null);

  const finRef = useRef<HTMLDivElement | null>(null);
  const listaRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lanzadorRef = useRef<HTMLButtonElement | null>(null);
  const recorridoRef = useRef(recorrido);
  recorridoRef.current = recorrido;
  const modoRef = useRef(modo);
  modoRef.current = modo;

  useEffect(() => {
    setSinMovimiento(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  /* Un solo aviso por sesión, pase lo que pase.
     Se lleva la cuenta en dos sitios a propósito: en memoria, que siempre
     funciona, y en sessionStorage, que además aguanta si se recarga la
     página. Hay navegadores que bloquean el almacenamiento (modo privado,
     bloqueadores); si solo dependiera de él, la guarda se caería y se
     mandarían avisos de más, que es justo lo que hay que evitar con 100
     envíos al mes. */
  const avisadoRef = useRef(false);

  const yaAvisado = () => {
    if (avisadoRef.current) return true;
    try {
      return sessionStorage.getItem(LLAVE_SESION) === "1";
    } catch {
      return false;
    }
  };
  const marcarAvisado = () => {
    avisadoRef.current = true;
    try {
      sessionStorage.setItem(LLAVE_SESION, "1");
    } catch {
      /* si el navegador no deja guardar, la marca en memoria ya nos vale */
    }
  };

  // ---- las burbujas van saliendo de una en una ----
  useEffect(() => {
    if (cola.length === 0) return;
    const t = setTimeout(() => {
      setMensajes((m) => [...m, { de: "nika", texto: cola[0] }]);
      setCola((c) => c.slice(1));
    }, pausaPara(cola[0]));
    return () => clearTimeout(t);
  }, [cola]);

  /* Al llegar una respuesta, el chat se coloca en su PRINCIPIO, no al final.
     Si no, con una respuesta larga el visitante empieza a leer por la mitad:
     el navegador salta abajo del todo y las primeras líneas quedan fuera de
     la pantalla. El ancla es el mensaje del propio visitante, así ve lo que
     preguntó y debajo el principio de la respuesta. */
  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;
    if (ancla !== null) {
      const destino = lista.querySelector<HTMLElement>("[data-ancla]");
      if (destino) {
        lista.scrollTo({
          top: destino.offsetTop - lista.offsetTop - 8,
          behavior: sinMovimiento ? "auto" : "smooth",
        });
        return;
      }
    }
    finRef.current?.scrollIntoView({
      behavior: sinMovimiento ? "auto" : "smooth",
      block: "end",
    });
  }, [mensajes, botones, modo, ancla, sinMovimiento]);

  // los botones aparecen cuando Nika ha terminado de hablar
  const nodoPendiente = useRef<Boton[]>([]);
  useEffect(() => {
    if (cola.length === 0 && nodoPendiente.current.length > 0) {
      setBotones(nodoPendiente.current);
      nodoPendiente.current = [];
    }
  }, [cola]);

  const abrir = () => {
    setAbierto(true);
    if (mensajes.length === 0 && cola.length === 0) {
      const nodo = GUION[INICIO];
      setAncla(0);
      setCola(nodo.burbujas);
      nodoPendiente.current = nodo.botones ?? [];
    }
  };

  /** Al cerrar: si no ha dejado contacto pero ha andado por el guion, se
      manda solo el recorrido. Sin nombre, sin correo, sin nada personal. */
  const cerrar = useCallback(() => {
    setAbierto(false);
    lanzadorRef.current?.focus();
    const pasos = pasosDeGuion(recorridoRef.current);
    if (!yaAvisado() && pasos >= BOTONES_MINIMOS) {
      marcarAvisado();
      void enviarFormulario(FORMULARIO_NETLIFY, {
        nombre: "",
        correo: "",
        mensaje: "",
        recomendado: "",
        recorrido: recorridoRef.current.join(" → "),
      });
    }
  }, []);

  /* Casi nadie pulsa la X: se cierra la pestaña y ya. Para que el recorrido
     no se pierda, se avisa también al salir de la página.
     Con las mismas dos guardas: dos botones como mínimo y un solo aviso por
     sesión. Y no se avisa si tiene el formulario abierto, porque entonces
     está a punto de dejar sus datos y eso vale mucho más que el recorrido. */
  useEffect(() => {
    const alSalir = () => {
      if (modoRef.current === "formulario") return;
      const pasos = pasosDeGuion(recorridoRef.current);
      if (yaAvisado() || pasos < BOTONES_MINIMOS) return;
      marcarAvisado();
      avisarAlSalir(FORMULARIO_NETLIFY, {
        nombre: "",
        correo: "",
        mensaje: "",
        recomendado: "",
        recorrido: recorridoRef.current.join(" → "),
      });
    };
    const alOcultarse = () => {
      if (document.visibilityState === "hidden") alSalir();
    };
    window.addEventListener("pagehide", alSalir);
    document.addEventListener("visibilitychange", alOcultarse);
    return () => {
      window.removeEventListener("pagehide", alSalir);
      document.removeEventListener("visibilitychange", alOcultarse);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", alPulsar);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierto, cerrar]);

  /* El viaje a otra página se hace con retraso, para que dé tiempo a leer el
     aviso antes de que cambie el suelo. Si mientras tanto se pulsa Volver o
     Empezar de nuevo, ese viaje se cancela: llevarte a una página que ya has
     dicho que no querías es peor que no llevarte a ninguna. */
  const viajeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelarViaje = () => {
    if (viajeRef.current) clearTimeout(viajeRef.current);
    viajeRef.current = null;
  };
  useEffect(() => cancelarViaje, []);

  /** Coloca un nodo del guion: sus burbujas y, cuando calle, sus botones. */
  const contar = (clave: string, burbujas?: string[]) => {
    const nodo = GUION[clave];
    if (!nodo) return;
    setNodoActual(clave);
    setCola(burbujas ?? nodo.burbujas);
    if (nodo.abreFormulario && !burbujas) setModo("formulario");
    else {
      setModo("chat");
      nodoPendiente.current = nodo.botones ?? [];
    }
  };

  const anotar = (texto: string) => {
    setAncla(mensajes.length); // el mensaje que va a entrar ahora
    setMensajes((m) => [...m, { de: "tu", texto }]);
    setRecorrido((r) => [...r, texto]);
    setBotones([]);
  };

  const pulsarBoton = (b: Boton) => {
    anotar(b.texto);
    // De aquí se vuelve a este mismo paso, sea cual sea el botón: el formulario
    // y las páginas no son un paso nuevo del guion, son una parada.
    setPila((p) => [...p, nodoActual]);

    if (b.formulario) {
      setModo("formulario");
      return;
    }

    if (b.ir) {
      /* Nika lo acusa ANTES de llevarte. Y después no se le dejan los botones
         sueltos del paso anterior, que ya no vienen a cuento: quedan las dos
         salidas, que es lo único que hace falta al volver la vista al chat. */
      const destino = b.ir;
      const aviso = b.aviso ?? TEXTOS.avisoAlIr;
      setCola([aviso]);
      nodoPendiente.current = [];
      cancelarViaje();
      viajeRef.current = setTimeout(() => {
        viajeRef.current = null;
        if (b.descarga) {
          const a = document.createElement("a");
          a.href = destino;
          a.download = "";
          a.click();
        } else {
          router.push(destino); // el chat se queda abierto
        }
      }, pausaPara(aviso) + 450);
      return;
    }

    if (b.nodo) contar(b.nodo);
  };

  /** Deshace el último botón y devuelve las opciones del paso anterior. */
  const volverAtras = () => {
    if (pila.length === 0) return;
    cancelarViaje();
    anotar(TEXTOS.atras);
    const destino = pila[pila.length - 1];
    setPila((p) => p.slice(0, -1));
    /* Se repiten las opciones, no el discurso: volver a soltar las burbujas
       enteras cada vez que se da atrás llena el chat de lo mismo. */
    contar(destino, [TEXTOS.alVolver]);
  };

  /** Borra la conversación y vuelve al saludo. Los datos ya escritos en la
      ficha se quedan: reiniciar el guion no es tirar el nombre y el correo. */
  const empezarDeNuevo = () => {
    cancelarViaje();
    setMensajes([]);
    setRecorrido((r) => [...r, TEXTOS.reiniciar]);
    setPila([]);
    setAncla(0);
    setBotones([]);
    setModo("chat");
    contar(INICIO);
  };

  const enviarEntrada = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = entrada.trim();
    if (!texto) return;
    anotar(texto);
    setMensaje(texto); // se arrastra al campo del formulario
    setEntrada("");
    // Escribir tambien es un paso: si no era esto lo que queria, se vuelve.
    setPila((pl) => [...pl, nodoActual]);
    /* Si se reconoce el tema, se contesta con lo que ya hay escrito. Si no,
       "libre": se le pasa el mensaje a Sara y no se fuerza una respuesta que
       no viene a cuento. */
    contar(temaDeTexto(texto) ?? "libre");
  };

  const enviarFicha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setFalloEnvio(false);
    const ok = await enviarFormulario(FORMULARIO_NETLIFY, {
      nombre,
      correo,
      mensaje,
      recomendado,
      recorrido: recorrido.join(" → "),
    });
    setEnviando(false);
    if (ok) {
      marcarAvisado();
      setModo("enviado");
      setMensajes((m) => [
        ...m,
        { de: "nika", texto: FORMULARIO.exito.replace("{nombre}", nombre) },
      ]);
    } else {
      setFalloEnvio(true);
    }
  };

  const puedeVolver = pila.length > 0;
  /* "Siempre" quiere decir: en cuanto la conversación se ha movido. Se mira lo
     que hay en pantalla, no el recorrido, porque el recorrido no se borra al
     reiniciar (Sara quiere ver que alguien volvió a empezar). Sin esto, tras
     reiniciar quedaba un botón que ya no hacía nada. */
  const puedeReiniciar =
    pila.length > 0 || mensajes.length > GUION[INICIO].burbujas.length;

  // En las legales no sale. Va aquí abajo y no arriba porque los hooks de
  // React tienen que ejecutarse siempre, en todas las páginas.
  if (PAGINAS_SIN_NIKA.includes(ruta)) return null;

  return (
    <>
      <button
        ref={lanzadorRef}
        type="button"
        onClick={() => (abierto ? cerrar() : abrir())}
        aria-label={abierto ? TEXTOS.cerrar : TEXTOS.abrir}
        aria-expanded={abierto}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[185] flex items-center gap-2 rounded-full bg-lime text-green font-semibold text-[14px] pl-4 pr-5 py-3 shadow-cta transition-all duration-200 hover:bg-lime-bright hover:-translate-y-px cursor-pointer border-0"
      >
        <span
          className="w-2 h-2 rounded-full bg-green/70 animate-pulse-dot"
          aria-hidden
        />
        {abierto ? "Cerrar" : TEXTOS.abrir}
      </button>

      {abierto && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label={`${TEXTOS.titulo}, ${TEXTOS.subtitulo}`}
          className="fixed inset-0 sm:inset-auto sm:bottom-[86px] sm:right-5 sm:w-[390px] sm:h-[min(640px,78vh)] z-[190] flex flex-col bg-[#0c0c0c] sm:rounded-[18px] border border-lime/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] outline-none animate-page-fade overflow-hidden"
        >
          {/* cabecera */}
          <header className="flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0 bg-[#0a0a0a]">
            <div
              className="w-9 h-9 rounded-full grid place-items-center text-green font-bold text-[13px] flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #a3d977, #6fa44a)" }}
              aria-hidden
            >
              NK
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-text text-[14px] font-semibold leading-tight">
                {TEXTOS.titulo}
              </div>
              <div className="text-text-muted text-[11px] leading-tight mt-0.5">
                {TEXTOS.subtitulo}
              </div>
            </div>
            <button
              type="button"
              onClick={cerrar}
              aria-label={TEXTOS.cerrar}
              className="w-9 h-9 grid place-items-center rounded-full text-text-muted hover:text-lime hover:bg-lime/10 transition-colors cursor-pointer bg-transparent border-0 text-lg flex-shrink-0"
            >
              ✕
            </button>
          </header>

          {/* conversación */}
          <div
            ref={listaRef}
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5"
            aria-live="polite"
          >
            {mensajes.map((m, i) => (
              <Burbuja
                key={i}
                de={m.de}
                texto={m.texto}
                esAncla={i === ancla}
              />
            ))}

            {cola.length > 0 && <Escribiendo />}

            {botones.length > 0 && cola.length === 0 && (
              <div className="flex flex-col gap-2 mt-1.5">
                {botones.map((b) => (
                  <button
                    key={b.texto}
                    type="button"
                    onClick={() => pulsarBoton(b)}
                    className="text-left text-[14px] leading-snug px-4 py-2.5 rounded-[12px] border border-lime/30 text-lime bg-lime/[0.04] hover:bg-lime/[0.12] hover:border-lime/60 transition-colors cursor-pointer"
                  >
                    {b.texto}
                  </button>
                ))}
              </div>
            )}

            {modo === "formulario" && cola.length === 0 && (
              <FichaContacto
                nombre={nombre}
                setNombre={setNombre}
                correo={correo}
                setCorreo={setCorreo}
                mensaje={mensaje}
                setMensaje={setMensaje}
                recomendado={recomendado}
                setRecomendado={setRecomendado}
                consiente={consiente}
                setConsiente={setConsiente}
                enviando={enviando}
                fallo={falloEnvio}
                onSubmit={enviarFicha}
              />
            )}

            {/* Las salidas. Van en todo menos en el saludo (de donde no hay
                de dónde volver) y también con la ficha abierta, que es justo
                donde más fácil es sentirse metida en un callejón. */}
            {cola.length === 0 && (puedeVolver || puedeReiniciar) && (
              <div className="flex flex-wrap gap-2 mt-1">
                {puedeVolver && (
                  <BotonSalida onClick={volverAtras}>{TEXTOS.atras}</BotonSalida>
                )}
                {puedeReiniciar && (
                  <BotonSalida onClick={empezarDeNuevo}>
                    {TEXTOS.reiniciar}
                  </BotonSalida>
                )}
              </div>
            )}

            <div ref={finRef} />
          </div>

          {/* escribir libremente */}
          {modo === "chat" && (
            <form
              onSubmit={enviarEntrada}
              className="flex items-center gap-2 px-3 py-3 border-t border-border flex-shrink-0 bg-[#0a0a0a]"
            >
              <input
                type="text"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                placeholder={TEXTOS.marcadorEntrada}
                aria-label={TEXTOS.marcadorEntrada}
                className="flex-1 min-w-0 bg-[rgba(0,0,0,0.35)] border border-lime/15 rounded-full px-4 py-2.5 text-text text-[14px] placeholder:text-text-dim focus:border-lime/50 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                aria-label={TEXTOS.enviarEntrada}
                disabled={!entrada.trim()}
                className="w-10 h-10 flex-shrink-0 grid place-items-center rounded-full bg-lime text-green font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-lime-bright transition-colors cursor-pointer border-0"
              >
                →
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

/* ---------- piezas ---------- */

/** Pinta **lo que va entre asteriscos** en negrita, sin meter HTML a pelo. */
function ConNegrita({ texto }: { texto: string }) {
  const trozos = texto.split("**");
  return (
    <>
      {trozos.map((t, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-text">
            {t}
          </strong>
        ) : (
          <span key={i}>{t}</span>
        ),
      )}
    </>
  );
}

function Burbuja({
  de,
  texto,
  esAncla,
}: {
  de: "nika" | "tu";
  texto: string;
  esAncla?: boolean;
}) {
  const esNika = de === "nika";
  return (
    <div
      data-ancla={esAncla ? "1" : undefined}
      className={
        "max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-line " +
        (esNika
          ? "self-start rounded-[14px] rounded-bl-[4px] bg-[#161616] text-text-soft border border-border"
          : "self-end rounded-[14px] rounded-br-[4px] bg-lime text-green font-medium")
      }
    >
      <ConNegrita texto={texto} />
    </div>
  );
}

/* Las salidas van en gris y en pastilla, no en verde como las opciones del
   guion: son para deshacer, no para avanzar, y no deben competir con lo que
   Nika está ofreciendo. */
function BotonSalida({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[13px] px-3 py-1.5 rounded-full border border-border text-text-muted hover:text-lime hover:border-lime/40 hover:bg-lime/[0.06] transition-colors cursor-pointer bg-transparent"
    >
      {children}
    </button>
  );
}

function Escribiendo() {
  return (
    <div
      className="self-start rounded-[14px] rounded-bl-[4px] bg-[#161616] border border-border px-4 py-3 flex gap-1"
      aria-label="Nika está escribiendo"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse-dot"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  );
}

function FichaContacto(props: {
  nombre: string;
  setNombre: (v: string) => void;
  correo: string;
  setCorreo: (v: string) => void;
  mensaje: string;
  setMensaje: (v: string) => void;
  recomendado: string;
  setRecomendado: (v: string) => void;
  consiente: boolean;
  setConsiente: (v: boolean) => void;
  enviando: boolean;
  fallo: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const c = FORMULARIO.campos;
  return (
    <form
      onSubmit={props.onSubmit}
      className="mt-2 rounded-[14px] border border-lime/20 bg-[#0a0a0a] p-4 flex flex-col gap-3"
    >
      <p className="text-text-soft text-[13px] m-0">{FORMULARIO.intro}</p>

      <Campo etiqueta={c.nombre.etiqueta}>
        <input
          type="text"
          required
          autoComplete="name"
          value={props.nombre}
          onChange={(e) => props.setNombre(e.target.value)}
          placeholder={c.nombre.marcador}
          className="v3-input !text-[14px] !py-2"
        />
      </Campo>

      <Campo etiqueta={c.correo.etiqueta}>
        <input
          type="email"
          required
          autoComplete="email"
          value={props.correo}
          onChange={(e) => props.setCorreo(e.target.value)}
          placeholder={c.correo.marcador}
          className="v3-input !text-[14px] !py-2"
        />
      </Campo>

      <Campo etiqueta={c.mensaje.etiqueta}>
        <textarea
          required
          rows={3}
          value={props.mensaje}
          onChange={(e) => props.setMensaje(e.target.value)}
          placeholder={c.mensaje.marcador}
          className="v3-input !text-[14px] !py-2 resize-y"
        />
      </Campo>

      <Campo etiqueta={c.recomendado.etiqueta} opcional>
        <input
          type="text"
          value={props.recomendado}
          onChange={(e) => props.setRecomendado(e.target.value)}
          placeholder={c.recomendado.marcador}
          className="v3-input !text-[14px] !py-2"
        />
      </Campo>

      <label className="flex items-start gap-2.5 text-[12px] text-text-soft cursor-pointer leading-relaxed">
        <input
          type="checkbox"
          required
          checked={props.consiente}
          onChange={(e) => props.setConsiente(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-lime cursor-pointer flex-shrink-0"
        />
        <span>
          {FORMULARIO.consentimiento}{" "}
          <Link
            href="/privacidad"
            target="_blank"
            className="text-lime underline underline-offset-2"
          >
            Cómo se tratan
          </Link>
          .
        </span>
      </label>

      {props.fallo && (
        <p className="text-danger text-[12px] m-0 leading-relaxed">
          {FORMULARIO.fallo}
        </p>
      )}

      <button
        type="submit"
        disabled={props.enviando}
        className="mt-1 bg-lime text-green font-semibold text-[14px] px-5 py-2.5 rounded-[10px] hover:bg-lime-bright transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-0"
      >
        {props.enviando ? FORMULARIO.enviando : FORMULARIO.enviar}
      </button>
    </form>
  );
}

function Campo({
  etiqueta,
  opcional,
  children,
}: {
  etiqueta: string;
  opcional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-text-muted">
        {etiqueta}
        {opcional && <span className="text-text-dim"> · opcional</span>}
      </span>
      {children}
    </label>
  );
}
