import ConsultaCharlas from "./ui/ConsultarCharlas";
import { MapaSedePage } from "./ui/pages/MapaSedePage.jsx";
import { useTema } from "./ui/hooks/useTema.js";
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

      <ConsultaCharlas />

      <MapaSedePage
        obtenerUbicacion={obtenerUbicacion}
        listarSedes={listarSedes}
      />
    </div>
  );
}

export default App;