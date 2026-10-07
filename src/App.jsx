import { useState } from "react";
import MenuPersona from './ui/pages/menuPersonaForm';
import MenuAdministrador from './ui/pages/menuAdministradorForm';
import SolicitudForm from './ui/pages/SolicitudForm';
import SolicitudesLista from './ui/pages/SolicitudesLista';
import { validarPermisosAdministrador } from './domain/model/menuAdministrador';
import ConsultaCharlas from "./ui/pages/ConsultarCharlas.jsx";
import { MapaSedePage } from "./ui/pages/MapaSedePage.jsx";
import { useTema } from "./ui/hooks/useTema.js";
import { botonPrimario, botonFantasma } from "./ui/estilos";
import "./App.css";

function IconoLuna() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function IconoSol() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function App({ obtenerUbicacion, listarSedes }) {
  const { tema, alternarTema } = useTema();
  const esOscuro = tema === "oscuro";
  const [sedeSolicitada, setSedeSolicitada] = useState("");
  const [vistaActual, setVistaActual] = useState("inicio");

  function seleccionarRol(rol) {
  if (rol === "admin") {
    const administrador = {
      rol: "admin",
      nombre: "Administrador",
    };

    if (validarPermisosAdministrador(administrador)) {
      setVistaActual("menuAdministrador");
    }
  } else {
    setVistaActual("menuPersona");
  }
}

function seleccionarOpcionPersona(opcionId) {
  if (opcionId === "inscripcion") {
    setVistaActual("formularioInscripcion");
  }

  if (opcionId === "charlas") {
    setVistaActual("consultaCharlas");
  }

}

function seleccionarOpcionAdministrador(opcionId) {
  if (opcionId === "ver_solicitudes") {
    setVistaActual("listaSolicitudes");
  }
}
function volverAlInicio() {
  setVistaActual("inicio");
}

function volverAlMenuPersona() {
  setVistaActual("menuPersona");
}

function volverAlMenuAdministrador() {
  setVistaActual("menuAdministrador");
}

function mostrarUbicacion(nombreSede) {
  setSedeSolicitada(nombreSede);
  document
  .getElementById("seccion-mapa")
  ?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  }

  return (
    <div className="app">
      <header className="encabezado">
        <div className="encabezado__contenido">
          <span className="encabezado__sello" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 13 4 4L19 7" />
            </svg>
          </span>

          <div>
            <p className="encabezado__marca">Autoridades de Mesa</p>
            <p className="encabezado__sub">Capacitaciones y sedes</p>
          </div>

          <button
            type="button"
            className="tema-toggle"
            onClick={alternarTema}
            aria-label={
              esOscuro ? "Activar modo claro" : "Activar modo oscuro"
            }
          >
            {esOscuro ? <IconoSol /> : <IconoLuna />}
          </button>
        </div>
      </header>

      <div className="encabezado__filete" aria-hidden="true" />
      {vistaActual === "inicio" && (
  <main
    style={{
      padding: "20px",
      textAlign: "center",
      marginTop: "50px",
    }}
  >
    <h2>Bienvenido</h2>

    <p>Seleccioná con qué perfil deseás ingresar:</p>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <button
        type="button"
        onClick={() => seleccionarRol("usuario")}
        style={{ ...botonPrimario, padding: "10px 20px", fontSize: "16px" }}
      >
        Ingresar como Postulante
      </button>

      <button
        type="button"
        onClick={() => seleccionarRol("admin")}
        style={{ ...botonFantasma, padding: "10px 20px", fontSize: "16px" }}
      >
        Ingresar como Administrador
      </button>
    </div>
  </main>
)}

      {vistaActual === "menuPersona" && (
  <MenuPersona
    onSelectOption={seleccionarOpcionPersona}
    onVolver={volverAlInicio}
  />
)}

{vistaActual === "menuAdministrador" && (
  <MenuAdministrador
    onSelectOption={seleccionarOpcionAdministrador}
    onVolver={volverAlInicio}
  />
)}

{vistaActual === "listaSolicitudes" && (
  <SolicitudesLista onVolver={volverAlMenuAdministrador} />
)}

{vistaActual === "formularioInscripcion" && (
  <SolicitudForm onVolver={volverAlMenuPersona} onVolverInicio={volverAlInicio} />
)}

{vistaActual === "consultaCharlas" && (
  <>
    <button
      type="button"
      onClick={volverAlMenuPersona}
      style={{ ...botonFantasma, margin: "20px", padding: "8px 16px" }}
    >
      Volver al menú
    </button>

    <ConsultaCharlas alVerUbicacion={mostrarUbicacion} />

    <MapaSedePage
      obtenerUbicacion={obtenerUbicacion}
      listarSedes={listarSedes}
      sedeSolicitada={sedeSolicitada}
    />
  </>
)}
    </div>
  );
}

export default App;

