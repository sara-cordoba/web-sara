// Graba un recorrido de una web: abre a tamaño de escritorio, cierra avisos y
// ventanas emergentes, y va bajando en pasos pequeños capturando un fotograma
// en cada uno. Después ffmpeg los monta.
//
//   node grabar-web.mjs <url> <carpeta-salida> <nombre>
const [, , URL_TO_TEST, OUT, NOMBRE] = process.argv;

const LADO = 1280; // ventana cuadrada: la rejilla de la galería es cuadrada
const FPS = 24;
const SEGUNDOS = 7; // de ida; el bucle luego va y vuelve -> unos 14 s
// Px por segundo. Es LO PRIMERO que hay que mirar si un recorrido no se lee.
// Historial de intentos, para no repetirlos: 1100 y 700 eran un borrón. 250 se
// lee muy cómodo, pero deja fuera dos tercios de cada página. 450 es el punto
// elegido: se lee, y se ve el doble de web que a 250.
const VELOCIDAD = Number(process.env.VELOCIDAD || 450);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fs = await import("node:fs");

const wsUrl = (await (await fetch("http://127.0.0.1:9222/json/version")).json())
  .webSocketDebuggerUrl;
const sock = await new Promise((res, rej) => {
  const w = new WebSocket(wsUrl);
  w.addEventListener("open", () => res(w));
  w.addEventListener("error", rej);
});
let id = 0;
const pending = new Map();
sock.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const i = ++id;
    pending.set(i, { resolve, reject });
    sock.send(JSON.stringify({ id: i, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId: s } = await send("Target.attachToTarget", {
  targetId,
  flatten: true,
});
await send("Page.enable", {}, s);
await send("Runtime.enable", {}, s);
await send(
  "Emulation.setDeviceMetricsOverride",
  { width: LADO, height: LADO, deviceScaleFactor: 1, mobile: false },
  s,
);

const ev = async (x) =>
  (await send("Runtime.evaluate", { expression: x, returnByValue: true }, s))
    .result.value;

await send("Page.navigate", { url: URL_TO_TEST }, s);
await sleep(7000);

await ev(`(function(){
  var e = document.createElement('style');
  e.textContent = 'html{scrollbar-width:none!important}::-webkit-scrollbar{display:none!important;width:0!important}';
  document.head.appendChild(e);
  return true;
})()`);

/* Cierra lo que se ponga por delante: aviso de cookies, ventana de
   newsletter, lo que sea. Se llama varias veces porque algunas aparecen a
   mitad del recorrido. */
const CERRAR = `(function(){
  var hechos = [];
  var textos = ['aceptar','acepto','rechazar','entendido','de acuerdo',
                'ahora no','no gracias','cerrar','close','×','✕','x'];
  var visible = function(el){
    if (!el || el.offsetParent === null) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  var candidatos = [...document.querySelectorAll(
    'button, a[role=button], [role=button], input[type=button], input[type=submit], .close, [class*=close], [aria-label*=errar], [aria-label*=lose]'
  )].filter(visible);
  for (var t of textos) {
    var b = candidatos.find(function(el){
      var s = ((el.innerText || el.value || el.getAttribute('aria-label') || '')).trim().toLowerCase();
      return s.length <= 20 && (s === t || s.includes(t));
    });
    if (b) { try { b.click(); hechos.push(t); } catch(e){} }
  }
  return hechos.join(', ') || 'nada que cerrar';
})()`;

console.log("  primera pasada:", await ev(CERRAR));
await sleep(2000);

// Recorrer una vez para que carguen imágenes y se disparen los emergentes.
const altoTotal = await ev("document.documentElement.scrollHeight");
for (let y = 0; y < altoTotal; y += 600) {
  await ev("window.scrollTo(0," + y + ")");
  await sleep(200);
}
await sleep(1500);
console.log("  tras recorrerla:", await ev(CERRAR));
await ev("window.scrollTo(0,0)");
await sleep(3000);
console.log("  antes de grabar:", await ev(CERRAR));
await sleep(1500);

/* El paso sale de la velocidad, no al revés: así VELOCIDAD se cumple siempre
   y es de verdad el único mando que hay que tocar. Lo que se ajusta es cuánto
   dura el recorrido, no lo deprisa que va. Una página corta se acaba antes y
   el vídeo sale más corto; ninguna se recorre a trompicones para rellenar. */
const recorrible = Math.max(0, altoTotal - LADO);
const paso = VELOCIDAD / FPS;
const FOTOGRAMAS = Math.min(
  Math.round(FPS * SEGUNDOS),
  Math.floor(recorrible / paso) + 1,
);
const recorrido = paso * (FOTOGRAMAS - 1);
console.log(
  `  página ${altoTotal}px | recorro ${Math.round(recorrido)}px de ${recorrible}px (${Math.round((recorrido / recorrible) * 100)}%) a ${Math.round(paso * FPS)} px/s en ${(FOTOGRAMAS / FPS).toFixed(1)}s`,
);

const carpeta = `${OUT}/fotogramas-${NOMBRE}`;
fs.rmSync(carpeta, { recursive: true, force: true });
fs.mkdirSync(carpeta, { recursive: true });

for (let i = 0; i < FOTOGRAMAS; i++) {
  await ev("window.scrollTo(0," + Math.round(i * paso) + ")");
  await sleep(55);
  // cada segundo, comprobar que no se ha colado nada por delante
  if (i % FPS === 0 && i > 0) await ev(CERRAR);
  const { data } = await send(
    "Page.captureScreenshot",
    { format: "jpeg", quality: 92 },
    s,
  );
  fs.writeFileSync(
    `${carpeta}/f${String(i).padStart(4, "0")}.jpg`,
    Buffer.from(data, "base64"),
  );
}
console.log(`  ${FOTOGRAMAS} fotogramas guardados`);
process.exit(0);
