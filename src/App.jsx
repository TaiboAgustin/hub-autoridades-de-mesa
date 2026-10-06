import { MapaSedePage } from './ui/pages/MapaSedePage.jsx'
import './App.css'

function App({ obtenerUbicacion, listarSedes }) {
  return (
    <div className="app">
      <div className="app__barra">
        <span className="app__marca">Portal para Autoridades de Mesa</span>
      </div>
      <MapaSedePage obtenerUbicacion={obtenerUbicacion} listarSedes={listarSedes} />
    </div>
  )
}

export default App
