/* global React */

const V3_PROBLEMS = [
  {
    stat: "73% no convierten",
    icon: "✕",
    title: "Tu web parece una más",
    body: "Sin jerarquía clara, sin propósito definido. El visitante llega, no entiende qué le ofreces y se va. No es un problema de diseño bonito — es un problema de mensaje y estructura.",
  },
  {
    stat: "−10h / semana",
    icon: "⏱",
    title: "Pierdes tiempo en herramientas",
    body: "Canva por aquí, plantilla por allá, Figma sin orden. Cada pieza la haces desde cero porque no tienes un sistema visual que escale. Cada hora se va en producir, no en pensar.",
  },
  {
    stat: "Caos comunicativo",
    icon: "✕",
    title: "Tu marca no transmite lo que vales",
    body: "Tienes algo verdadero que decir pero el cómo lo cuentas no está a la altura. Marca, copy y contenido viven en silos distintos. Suena a otra empresa cualquiera.",
  },
];

const V3_SOLUTIONS = [
  {
    icon: "01",
    title: "Diseño & Producto",
    sub: "Web · UI/UX · Branding",
    items: ["Webs en React, Angular u Odoo", "Diseño de interfaz y experiencia", "Sistemas de marca completos"],
  },
  {
    icon: "02",
    title: "Contenido & Comunicación",
    sub: "Redes · Copy · Mensaje",
    items: ["Estrategia y producción para Instagram, TikTok y LinkedIn", "Copys que conectan y posicionan", "Mensaje y storytelling"],
  },
  {
    icon: "03",
    title: "Vídeo & Motion",
    sub: "Audiovisual de marca",
    items: ["CapCut · Motion graphics", "Color, ritmo y narrativa cuidados", "Reels, after-movies, vídeo-podcasts"],
  },
  {
    icon: "04",
    title: "Dirección creativa",
    sub: "COO · CMO · Project lead",
    items: ["Coordinación de creativos, devs y partners", "Briefs, roadmap y entregables claros", "Que todo llegue a tiempo y sin perder el alma"],
  },
];

const V3_STEPS = [
  { n: "01", title: "Diagnóstico", body: "Hablamos. Entiendo tu negocio, tu cliente y por qué ahora. Sin compromiso, sin venta dura." },
  { n: "02", title: "Propuesta", body: "Te entrego una propuesta clara: qué construyo, en qué tiempos, con qué presupuesto y qué resultado esperar." },
  { n: "03", title: "Ejecución", body: "Diseño, programo, edito y/o coordino. Tú revisas en hitos. Sin sorpresas, sin emails de relleno." },
  { n: "04", title: "Acompañamiento", body: "Te dejo formación, plantillas y un sistema que tu equipo puede mantener. No te dejo sola tras el go-live." },
];

const V3_WORKS = [
  { title: "Cronos AI Consulting", year: "2025", type: "Brand · Web", logo: "assets/cronos.jpg", logoBg: "#000" },
  { title: "GPAthletes", year: "2025", type: "Identidad · Redes", logo: "assets/gpathletes.jpg", logoBg: "#bfe0e5", logoFill: true },
  { title: "Develand", year: "2024", type: "Web · Producto", logo: "assets/develand.png", logoBg: "#0e1a2b" },
  { title: "Guillermo Amor", year: "2024", type: "Personal brand", logo: "assets/guillermo-amor.png", logoBg: "#000" },
  { title: "AJE Madrid", year: "2024", type: "Eventos · Vídeo", logo: "assets/aje-madrid.png", logoBg: "#fff" },
  { title: "October Hollow Studio", year: "2025", type: "Próximamente", placeholder: true },
];

/* ========== Calculator ========== */
function Calculator() {
  const [hours, setHours] = React.useState(8);
  const [rate, setRate] = React.useState(35);
  const [auto, setAuto] = React.useState(60);

  const yearlyHours = hours * 52;
  const yearlyCost = yearlyHours * rate;
  const savings = Math.round(yearlyCost * (auto / 100));

  const slider = (val, min, max) => ({ '--p': `${((val - min) / (max - min)) * 100}%` });

  return (
    <div className="v3-calc-wrap">
      <div className="v3-calc-controls">
        <h4>Ajusta tus datos</h4>
        <div className="v3-calc-row">
          <div className="label">Horas/semana en producir contenido o web <b>{hours}h</b></div>
          <input type="range" min="2" max="30" value={hours} onChange={e => setHours(+e.target.value)} style={slider(hours, 2, 30)} />
        </div>
        <div className="v3-calc-row">
          <div className="label">Coste hora de tu equipo (o tuyo) <b>{rate}€</b></div>
          <input type="range" min="15" max="80" value={rate} onChange={e => setRate(+e.target.value)} style={slider(rate, 15, 80)} />
        </div>
        <div className="v3-calc-row">
          <div className="label">% que podemos sistematizar/optimizar <b>{auto}%</b></div>
          <input type="range" min="20" max="90" value={auto} onChange={e => setAuto(+e.target.value)} style={slider(auto, 20, 90)} />
        </div>
      </div>
      <div className="v3-calc-result">
        <div>
          <div className="result-label">Estás invirtiendo al año</div>
          <div className="result-num">{yearlyCost.toLocaleString('es-ES')} €</div>
          <div className="result-sub">en producir y mantener tu presencia digital sin un sistema detrás.</div>
        </div>
        <div className="savings">
          <div className="result-label">Ahorro estimado conmigo</div>
          <div className="savings-num">{savings.toLocaleString('es-ES')} €/año</div>
          <div className="savings-sub">construyendo un sistema que tu equipo puede mantener.</div>
        </div>
      </div>
    </div>
  );
}

/* ========== Pages ========== */
function HomeV3({ onCta }) {
  return (
    <>
      <section className="v3-section v3-hero">
        <div className="v3-hero-inner">
          <div>
            <div className="v3-eyebrow">Estudio independiente · Barcelona</div>
            <h1 className="v3-h1">
              No es un problema de <span className="strike">diseño</span>.<br/>
              Es un problema de <span className="accent">sistema</span>.
            </h1>
            <p className="v3-lede">
              No solo diseño webs ni edito vídeos. Antes de tocar nada, quiero conocerte y entender el propósito real de tu proyecto — para plasmarlo con honestidad y transmitirlo al máximo.
            </p>
            <div className="v3-hero-cta-row">
              <button className="v3-cta" onClick={() => onCta('contacto')}>
                Empezar conversación <span className="arrow">→</span>
              </button>
              <button className="v3-btn-ghost" onClick={() => onCta('trabajos')}>Ver trabajos</button>
            </div>
            <div className="v3-hero-foot">
              <div className="v3-hero-stat">
                <div className="lbl">Ámbito</div>
                <div className="val">Web · Brand · <span className="accent">Vídeo</span></div>
              </div>
              <div className="v3-hero-stat">
                <div className="lbl">Disponibilidad</div>
                <div className="val"><span className="accent">Q3</span> 2026</div>
              </div>
              <div className="v3-hero-stat">
                <div className="lbl">Respuesta</div>
                <div className="val">&lt; 48h</div>
              </div>
            </div>
          </div>
          <div className="v3-hero-card" style={{maxWidth: 380, marginLeft: 'auto'}}>
            <div className="v3-card-tag"><span className="v3-card-dot" /> EN ESTUDIO</div>
            <img src="assets/sara.png" alt="Sara Córdoba" />
            <div className="v3-card-foot">
              <b>Sara Córdoba</b>
              <span>Diseño & dirección · Barcelona</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE between hero and problem */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        margin: '40px 0 0',
        height: '54px',
        background: 'linear-gradient(90deg, #0d3b2e 0%, #1a5d45 50%, #0d3b2e 100%)',
        borderTop: '1px solid rgba(163, 217, 119, 0.30)',
        borderBottom: '1px solid rgba(163, 217, 119, 0.30)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        <style>{`
          @keyframes v3-marq-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .v3-mqt {
            display: flex; gap: 56px; white-space: nowrap;
            animation: v3-marq-scroll 60s linear infinite;
            padding-left: 56px; flex-shrink: 0; align-items: center;
          }
          .v3-mqi {
            display: inline-flex; align-items: center; gap: 14px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px; letter-spacing: 0.18em;
            text-transform: uppercase; color: #f5f0e6;
            font-weight: 500; flex-shrink: 0;
          }
          .v3-mqi .a { color: #a3d977; }
          .v3-mqs {
            display: inline-block; width: 5px; height: 5px;
            border-radius: 50%; background: #a3d977;
            box-shadow: 0 0 8px #a3d977; flex-shrink: 0;
          }
          .v3-mqf-l, .v3-mqf-r {
            position: absolute; top: 0; bottom: 0;
            width: 100px; z-index: 2; pointer-events: none;
          }
          .v3-mqf-l { left: 0; background: linear-gradient(90deg, #0d3b2e, transparent); }
          .v3-mqf-r { right: 0; background: linear-gradient(-90deg, #0d3b2e, transparent); }
        `}</style>
        <div className="v3-mqf-l" />
        <div className="v3-mqt">
          {Array.from({length: 2}).map((_, i) => (
            <React.Fragment key={i}>
              <span className="v3-mqi">Diseño con <span className="a">propósito</span></span>
              <span className="v3-mqs" />
              <span className="v3-mqi">Web · UI/UX · Branding</span>
              <span className="v3-mqs" />
              <span className="v3-mqi">Disponible <span className="a">Q3 2026</span></span>
              <span className="v3-mqs" />
              <span className="v3-mqi">Vídeo · Motion · Color</span>
              <span className="v3-mqs" />
              <span className="v3-mqi">Estudio independiente · <span className="a">Barcelona</span></span>
              <span className="v3-mqs" />
              <span className="v3-mqi">Conversación honesta <span className="a">→</span></span>
              <span className="v3-mqs" />
              <span className="v3-mqi">Sistemas que tu equipo puede mantener</span>
              <span className="v3-mqs" />
              <span className="v3-mqi">Respuesta en <span className="a">&lt; 48h</span></span>
              <span className="v3-mqs" />
            </React.Fragment>
          ))}
        </div>
        <div className="v3-mqf-r" />
      </div>

      {/* PROBLEM */}
      <section className="v3-section">
        <div className="v3-eyebrow">El problema</div>
        <h2 className="v3-h2">Tu marca trabaja duro.<br/>Pero no <span className="accent">conecta</span>.</h2>
        <p className="v3-lede">La solución no es producir más contenido. Es construir el sistema que cuente quién eres con honestidad y consistencia.</p>
        <div className="v3-problem-grid">
          {V3_PROBLEMS.map((p, i) => (
            <div key={i} className="v3-problem-card">
              <div className="icon">{p.icon}</div>
              <div className="v3-problem-num">
                <span>{String(i+1).padStart(2,'0')}</span>
                <span className="v3-problem-stat">{p.stat}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="v3-section">
        <div className="v3-eyebrow">Calculadora</div>
        <h2 className="v3-h2">¿Cuánto te <span className="accent">cuesta</span> no tener<br/>un sistema detrás?</h2>
        <p className="v3-lede">Mueve los valores y mira lo que tu equipo (o tú misma) está dejando sobre la mesa cada año.</p>
        <Calculator />
      </section>

      {/* SOLUTION */}
      <section className="v3-section">
        <div className="v3-eyebrow">La solución</div>
        <h2 className="v3-h2">Tu sistema visual y narrativo,<br/>en <span className="accent">un solo equipo</span>.</h2>
        <p className="v3-lede">No vendo piezas sueltas. Construyo el sistema completo: marca, web, contenido, vídeo y dirección.</p>
        <div className="v3-solution-grid">
          {V3_SOLUTIONS.map((s, i) => (
            <div key={i} className="v3-solution-card">
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <div className="sub">{s.sub}</div>
              <ul className="v3-solution-list">
                {s.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="v3-section">
        <div className="v3-eyebrow">Cómo funciono</div>
        <h2 className="v3-h2">De la conversación al impacto<br/>en <span className="accent">cuatro pasos</span>.</h2>
        <div className="v3-process-grid">
          {V3_STEPS.map((s, i) => (
            <div key={i} className="v3-step">
              <div className="num"><span>{s.n}</span></div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="v3-section">
        <div className="v3-eyebrow">Quién hay detrás</div>
        <h2 className="v3-h2">No soy una agencia.<br/>Soy <span className="accent">tu equipo</span> creativo.</h2>
        <div className="v3-about">
          <div className="v3-about-photo">
            <img src="assets/sara.png" alt="Sara Córdoba" />
            <div className="v3-about-name">
              <b>Sara Córdoba</b>
              <span>FUNDADORA</span>
            </div>
          </div>
          <div>
            <p className="v3-lede">
              Llevo años ayudando a marcas con algo verdadero que decir a construir su voz visual y narrativa. No me caso con una herramienta ni con una disciplina — me caso con tu propósito.
            </p>
            <div className="v3-about-bullets">
              <div className="v3-about-bullet">
                <div className="check">✓</div>
                <div>
                  <b>Soluciones a medida</b>
                  <span>Cada proyecto se diseña a partir de tu operativa real, no de una plantilla.</span>
                </div>
              </div>
              <div className="v3-about-bullet">
                <div className="check">✓</div>
                <div>
                  <b>Conversación honesta</b>
                  <span>Si algo no encaja te lo digo. Si no soy la persona indicada, también.</span>
                </div>
              </div>
              <div className="v3-about-bullet">
                <div className="check">✓</div>
                <div>
                  <b>Resultados medibles</b>
                  <span>KPIs claros desde el día uno. Sé qué quieres conseguir y por qué.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKS PREVIEW */}
      <section className="v3-section">
        <div className="v3-eyebrow">Trabajos seleccionados</div>
        <h2 className="v3-h2">Proyectos<br/><span className="accent">recientes</span>.</h2>
        <div className="v3-works-grid">
          {V3_WORKS.map((w, i) => (
            <div key={i} className="v3-work">
              {w.placeholder ? (
                <div className="v3-work-image placeholder" />
              ) : (
                <div className="v3-work-image" style={{
                  backgroundImage: `url(${w.logo})`,
                  backgroundColor: w.logoBg || '#000',
                  backgroundSize: w.logoFill ? 'cover' : 'contain',
                }} />
              )}
              <div className="v3-work-overlay">
                <div className="v3-work-num">{String(i+1).padStart(2,'0')} — {w.year}</div>
                <div className="v3-work-title">{w.title}</div>
                <div className="v3-work-meta">{w.type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="v3-section">
        <div className="v3-banner">
          <h2>¿Listo para que tu marca<br/><span className="accent">cuente lo que vale</span>?</h2>
          <p>Cuéntame en qué estás trabajando. Una conversación de 30 minutos, sin compromiso, para ver si encajamos.</p>
          <button className="v3-cta" onClick={() => onCta('contacto')}>
            Empezar conversación <span className="arrow">→</span>
          </button>
          <div className="v3-banner-meta">Sin compromiso · Respuesta en menos de 48h</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="v3-footer">
        <div>
          <h5>Sara Córdoba · Estudio</h5>
          <p style={{margin: 0, color: 'var(--text-soft)', maxWidth: 360}}>
            Diseño con propósito para marcas que tienen algo verdadero que decir.
          </p>
          <div className="v3-footer-copy">© 2026 · Barcelona</div>
        </div>
        <div>
          <h5>Navegación</h5>
          <ul>
            <li><a onClick={() => onCta('home')} style={{cursor:'pointer'}}>Inicio</a></li>
            <li><a onClick={() => onCta('servicios')} style={{cursor:'pointer'}}>Servicios</a></li>
            <li><a onClick={() => onCta('trabajos')} style={{cursor:'pointer'}}>Trabajos</a></li>
            <li><a onClick={() => onCta('contacto')} style={{cursor:'pointer'}}>Contacto</a></li>
          </ul>
        </div>
        <div>
          <h5>Contacto</h5>
          <ul>
            <li>scordobalazaro@gmail.com</li>
            <li>Barcelona, ES</li>
            <li>Disponible Q3 2026</li>
          </ul>
        </div>
      </footer>
    </>
  );
}

function ServiciosV3() {
  return (
    <section className="v3-section">
      <div className="v3-eyebrow">Servicios</div>
      <h2 className="v3-h2">Tu sistema visual,<br/>en <span className="accent">cuatro disciplinas</span>.</h2>
      <p className="v3-lede">No vendo piezas sueltas. Construyo el sistema completo: marca, web, contenido, vídeo y dirección.</p>
      <div className="v3-solution-grid">
        {V3_SOLUTIONS.map((s, i) => (
          <div key={i} className="v3-solution-card">
            <div className="icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <div className="sub">{s.sub}</div>
            <ul className="v3-solution-list">
              {s.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrabajosV3() {
  return (
    <section className="v3-section">
      <div className="v3-eyebrow">Trabajos seleccionados</div>
      <h2 className="v3-h2">Proyectos<br/><span className="accent">recientes</span>.</h2>
      <div className="v3-works-grid">
        {V3_WORKS.map((w, i) => (
          <div key={i} className="v3-work">
            {w.placeholder ? (
              <div className="v3-work-image placeholder" />
            ) : (
              <div className="v3-work-image" style={{
                backgroundImage: `url(${w.logo})`,
                backgroundColor: w.logoBg || '#000',
                backgroundSize: w.logoFill ? 'cover' : 'contain',
              }} />
            )}
            <div className="v3-work-overlay">
              <div className="v3-work-num">{String(i+1).padStart(2,'0')} — {w.year}</div>
              <div className="v3-work-title">{w.title}</div>
              <div className="v3-work-meta">{w.type}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactoV3() {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="v3-section">
      <div className="v3-eyebrow">Hablemos</div>
      <h2 className="v3-h2">¿Empezamos<br/>con un <span className="accent">café</span>?</h2>
      <p className="v3-lede">Cuéntame en qué estás trabajando. Respondo en menos de 48 horas — sin formularios automáticos, sin plantillas.</p>
      <div className="v3-contact">
        <div>
          <div className="v3-contact-meta">
            <div className="v3-contact-meta-item">
              <span className="label">Email</span>
              <span className="val"><span className="accent">scordobalazaro</span>@gmail.com</span>
            </div>
            <div className="v3-contact-meta-item">
              <span className="label">Base</span>
              <span className="val">Barcelona, ES</span>
            </div>
            <div className="v3-contact-meta-item">
              <span className="label">Disponibilidad</span>
              <span className="val"><span className="accent">Q3</span> 2026</span>
            </div>
            <div className="v3-contact-meta-item">
              <span className="label">Estado</span>
              <span className="val"><span className="v3-card-dot" style={{display:'inline-block', marginRight:8, verticalAlign:'middle'}}/>Aceptando proyectos</span>
            </div>
          </div>
        </div>
        <form className="v3-form" onSubmit={(e) => {e.preventDefault(); setSent(true);}}>
          <div className="v3-field">
            <label>Nombre</label>
            <input type="text" placeholder="Cómo te llamas" required />
          </div>
          <div className="v3-field">
            <label>Email</label>
            <input type="email" placeholder="hola@..." required />
          </div>
          <div className="v3-field">
            <label>Tipo de proyecto</label>
            <select>
              <option>Diseño & Producto (Web · UI/UX · Branding)</option>
              <option>Contenido & Comunicación</option>
              <option>Vídeo & Motion</option>
              <option>Dirección creativa</option>
              <option>No estoy seguro/a — ayúdame</option>
            </select>
          </div>
          <div className="v3-field">
            <label>Cuéntame</label>
            <textarea placeholder="Qué quieres construir, para quién, y por qué ahora." rows="3" />
          </div>
          <button className="v3-cta" type="submit">
            <span>{sent ? 'Recibido — gracias' : 'Enviar mensaje'}</span>
            <span className="arrow">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}

window.HomeV3 = HomeV3;
window.ServiciosV3 = ServiciosV3;
window.TrabajosV3 = TrabajosV3;
window.ContactoV3 = ContactoV3;
