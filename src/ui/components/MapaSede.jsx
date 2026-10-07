import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import {
  DireccionNoEncontradaError,
  ServicioDeMapasNoDisponibleError,
} from '../../domain/model/errors.js'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl })

const MENSAJES = {
  noEncontrada:
    'No encontramos esa dirección. Revisá que la sede tenga una dirección válida en CABA.',
  servicio:
    'No pudimos conectar con el servicio de mapas. Reintentá en unos segundos.',
}

function mensajeDeError(error) {
  if (error instanceof DireccionNoEncontradaError) return MENSAJES.noEncontrada
  if (error instanceof ServicioDeMapasNoDisponibleError) return MENSAJES.servicio
  return MENSAJES.servicio
}

export function MapaSede({ sede, obtenerUbicacion }) {
  const [estado, setEstado] = useState('idle')
  const [ubicacion, setUbicacion] = useState(null)
  const [mensajeError, setMensajeError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    if (!sede) {
      setEstado('idle')
      setUbicacion(null)
      return
    }

    let cancelado = false
    setEstado('loading')

    obtenerUbicacion(sede)
      .then((resultado) => {
        if (cancelado) return
        setUbicacion(resultado)
        setEstado('success')
      })
      .catch((error) => {
        if (cancelado) return
        setMensajeError(mensajeDeError(error))
        setEstado('error')
      })

    return () => {
      cancelado = true
    }
  }, [sede, obtenerUbicacion, intento])

  if (estado === 'idle') {
    return (
      <div className="estado" role="status">
        <span className="rotulo">Sin sede seleccionada</span>
        <p className="estado__texto">Elegí una sede para consultar su ubicación.</p>
      </div>
    )
  }

  if (estado === 'loading') {
    return (
      <div className="estado" role="status" aria-live="polite">
        <span className="rotulo">Verificando dirección…</span>
        <span className="barra-progreso" aria-hidden="true" />
      </div>
    )
  }

  if (estado === 'error') {
    return (
      <div className="estado estado--error" role="alert">
        <span className="rotulo">No se pudo verificar</span>
        <p className="estado__texto">{mensajeError}</p>
        <button
          type="button"
          className="boton"
          onClick={() => setIntento((n) => n + 1)}
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="resultado">
      <figure className="documento">
        <figcaption className="rotulo documento__rotulo">
          Ubicación de la sede
        </figcaption>
        <div className="mapa">
          <MapContainer
            key={`${ubicacion.lat},${ubicacion.lng}`}
            center={[ubicacion.lat, ubicacion.lng]}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[ubicacion.lat, ubicacion.lng]}>
              <Popup>{sede.nombre}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </figure>

      <section className="datos-sede">
        <h2 className="datos-sede__rotulo">Datos de la sede</h2>
        <dl className="campos">
          <div className="campo">
            <dt className="rotulo">Sede</dt>
            <dd>{sede.nombre}</dd>
          </div>
          <div className="campo">
            <dt className="rotulo">Dirección</dt>
            <dd>{ubicacion.direccionNormalizada}</dd>
          </div>
          <div className="campo">
            <dt className="rotulo">Coordenadas</dt>
            <dd className="mono">
              {ubicacion.lat.toFixed(6)}, {ubicacion.lng.toFixed(6)}
            </dd>
          </div>
        </dl>
        <div className="sello" aria-hidden="true">
          <span className="sello__linea sello__linea--chica">Ubicación</span>
          <span className="sello__linea sello__linea--grande">Verificada</span>
          <span className="sello__linea sello__linea--chica">· USIG ·</span>
        </div>
      </section>
    </div>
  )
}
