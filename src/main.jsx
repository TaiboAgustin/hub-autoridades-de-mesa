import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { crearUsigGeocoder } from './infrastructure/adapters/usig/usigGeocoder.js'
import { crearSedesRepo } from './infrastructure/adapters/persistence/sedesRepo.js'
import { crearObtenerUbicacionDeSede } from './application/usecases/obtenerUbicacionDeSede.js'
import { temaInicial, aplicarTema } from './ui/hooks/useTema.js'

aplicarTema(temaInicial())

const geocoder = crearUsigGeocoder()
const sedesRepo = crearSedesRepo()
const obtenerUbicacionDeSede = crearObtenerUbicacionDeSede(geocoder)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App obtenerUbicacion={obtenerUbicacionDeSede} listarSedes={sedesRepo.listar} />
  </StrictMode>,
)
