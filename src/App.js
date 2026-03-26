import { useEffect, useState } from "react";
import "./App.css";
import { normasData, checklistData, consejosData } from "./data";

function App() {
  const [normas, setNormas] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [consejos, setConsejos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [seccionActiva, setSeccionActiva] = useState("normas");
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  // Cargar datos locales directamente (sin fetch)
  useEffect(() => {
    setNormas(normasData);
    setChecklist(checklistData);
    setConsejos(consejosData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitContacto = (e) => {
    e.preventDefault();
    console.log("Mensaje enviado:", formData);
    setMensajeEnviado(true);
    setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    setTimeout(() => setMensajeEnviado(false), 3000);
  };

  const categorias = ["Todos", "Moto", "Bici", "Ambos"];
  
  const normasFiltradas = categoriaSeleccionada === "Todos" 
    ? normas 
    : normas.filter(n => n.categoria === categoriaSeleccionada);

  const getImportanciaColor = (importancia) => {
    if (importancia === "Crítica") return "#dc3545";
    if (importancia === "Alta") return "#ffc107";
    return "#28a745";
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚦 R.I.D.E.</h1>
        <p>Road Information & Digital Enforcement</p>
        <p className="slogan">"Conocer la norma es proteger tu vida"</p>
      </header>

      <div className="contenedor">
        <aside className="sidebar">
          <h3>🚗 Tipo de vehículo</h3>
          <div className="categorias">
            {categorias.map(cat => (
              <button
                key={cat}
                className={`categoria-btn ${categoriaSeleccionada === cat ? 'active' : ''}`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat === "Todos" && "📋 Todos"}
                {cat === "Moto" && "🏍️ Moto"}
                {cat === "Bici" && "🚲 Bicicleta"}
                {cat === "Ambos" && "🔄 Ambos"}
              </button>
            ))}
          </div>
          
          <div className="secciones">
            <h3>📚 Información</h3>
            <button 
              className={`seccion-btn ${seccionActiva === "normas" ? 'active' : ''}`}
              onClick={() => setSeccionActiva("normas")}
            >
              📜 Normas de Tránsito
            </button>
            <button 
              className={`seccion-btn ${seccionActiva === "checklist" ? 'active' : ''}`}
              onClick={() => setSeccionActiva("checklist")}
            >
              🔧 Checklist de Seguridad
            </button>
            <button 
              className={`seccion-btn ${seccionActiva === "consejos" ? 'active' : ''}`}
              onClick={() => setSeccionActiva("consejos")}
            >
              💡 Consejos R.I.D.E.
            </button>
            <button 
              className={`seccion-btn ${seccionActiva === "contacto" ? 'active' : ''}`}
              onClick={() => setSeccionActiva("contacto")}
            >
              📞 Contacto R.I.D.E.
            </button>
          </div>
        </aside>

        <main className="contenido">
          {seccionActiva === "normas" && (
            <>
              <h2>📜 Normas de Tránsito</h2>
              <div className="lista-items">
                {normasFiltradas.map(n => (
                  <div key={n.id} className="item-card">
                    <div className="item-imagen">
                      <img src={n.imagen} alt={n.titulo} />
                    </div>
                    <div className="item-info">
                      <h3>{n.titulo}</h3>
                      <p className="descripcion">{n.descripcion}</p>
                      <div className="multa">💰 Multa: ${n.multa.toLocaleString()}</div>
                      <div className="consejo">💡 {n.consejo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {seccionActiva === "checklist" && (
            <>
              <h2>🔧 Checklist de Seguridad</h2>
              <p className="subtitulo">Revisa estos puntos antes de salir a la vía</p>
              <div className="lista-checklist">
                {checklist.map(c => (
                  <div key={c.id} className="checklist-item">
                    <div className="check-status">
                      <input type="checkbox" id={`check-${c.id}`} />
                    </div>
                    <div className="check-info">
                      <label htmlFor={`check-${c.id}`}>
                        <strong>{c.item}</strong>
                      </label>
                      <span 
                        className="importancia"
                        style={{ background: getImportanciaColor(c.importancia) }}
                      >
                        {c.importancia}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="aviso-seguridad">
                ⚠️ Recuerda: 5 minutos de revisión pueden salvarte la vida
              </div>
            </>
          )}

          {seccionActiva === "consejos" && (
            <>
              <h2>💡 Consejos R.I.D.E.</h2>
              <p className="subtitulo">Sabiduría vial para un viaje seguro</p>
              <div className="lista-consejos">
                {consejos.map(c => (
                  <div key={c.id} className="consejo-card">
                    <div className="consejo-titulo">
                      <span>🛡️</span>
                      <h3>{c.titulo}</h3>
                    </div>
                    <p>{c.descripcion}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {seccionActiva === "contacto" && (
            <>
              <h2>📞 Contáctanos</h2>
              <p className="subtitulo">¿Tienes dudas o sugerencias? Escríbenos</p>
              
              {mensajeEnviado && (
                <div className="mensaje-exito">
                  ✅ ¡Mensaje enviado con éxito! Te responderemos pronto.
                </div>
              )}
              
              <form className="formulario-contacto" onSubmit={handleSubmitContacto}>
                <div className="campo-formulario">
                  <label>👤 Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>
                
                <div className="campo-formulario">
                  <label>📧 Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ej: juan@email.com"
                    required
                  />
                </div>
                
                <div className="campo-formulario">
                  <label>📱 Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ej: 3001234567"
                  />
                </div>
                
                <div className="campo-formulario">
                  <label>💬 Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows="4"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-enviar">
                  📨 Enviar Mensaje
                </button>
              </form>
              
              <div className="info-contacto">
                <h3>📌 Otros canales de contacto</h3>
                <div className="contacto-canal">
                  <span>📧</span>
                  <p>ride@seguridadvial.com</p>
                </div>
                <div className="contacto-canal">
                  <span>📞</span>
                  <p>+57 300 123 4567</p>
                </div>
                <div className="contacto-canal">
                  <span>📍</span>
                  <p>Bogotá, Colombia</p>
                </div>
                <div className="contacto-canal">
                  <span>🕐</span>
                  <p>Lun - Vie: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </>
          )}
        </main>

        <aside className="seguridad-sidebar">
          <h2>🛡️ Seguridad R.I.D.E.</h2>
          <div className="frase-dia">
            <p>"No seas un fantasma en la vía"</p>
            <small>Usa luces y reflectivos</small>
          </div>
          <div className="datos-importantes">
            <h3>📊 Datos importantes</h3>
            <ul>
              <li>🚨 70% de accidentes son evitables</li>
              <li>🪖 Casco reduce 40% riesgo de muerte</li>
              <li>💡 Luces visibilidad +150 metros</li>
              <li>🔧 Revisión previa = vida segura</li>
              <li>📞 Denuncia conducción peligrosa: #767</li>
            </ul>
          </div>
          <div className="emergencia">
            <h3>🚨 Línea de emergencia</h3>
            <p className="numero-emergencia">123</p>
            <small>Policía de Tránsito</small>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;