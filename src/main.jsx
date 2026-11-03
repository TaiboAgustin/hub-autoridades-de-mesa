import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { crearUsigGeocoder } from './infrastructure/adapters/usig/usigGeocoder.js'
import { crearObtenerUbicacionDeSede } from './application/usecases/obtenerUbicacionDeSede.js'
import { crearCharlasRepo } from './infrastructure/adapters/persistence/charlasRepo.js'
import { crearConsultarCharlas } from './application/usecases/consultarCharlas.js'
import { crearPostulacionesRepo } from './infrastructure/adapters/persistence/postulacionesRepo.js'
import { crearRegistrarPostulacion } from './application/usecases/registrarPostulacion.js'
import { temaInicial, aplicarTema } from './ui/hooks/useTema.js'

aplicarTema(temaInicial())

const geocoder = crearUsigGeocoder()
const obtenerUbicacionDeSede = crearObtenerUbicacionDeSede(geocoder)

const charlasRepo = crearCharlasRepo()
const consultarCharlas = crearConsultarCharlas(charlasRepo)

const postulacionesRepo = crearPostulacionesRepo()
const registrarPostulacion = crearRegistrarPostulacion(postulacionesRepo)
const listarPostulaciones = () => postulacionesRepo.listar()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App
      obtenerUbicacion={obtenerUbicacionDeSede}
      consultarCharlas={consultarCharlas}
      registrarPostulacion={registrarPostulacion}
      listarPostulaciones={listarPostulaciones}
    />
  </StrictMode>,
)
