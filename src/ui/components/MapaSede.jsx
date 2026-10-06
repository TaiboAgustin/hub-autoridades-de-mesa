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
      <div className="mapa-sede mapa-sede--placeholder" role="status">
        <p>Elegí una sede para ver su ubicación en el mapa.</p>
      </div>
    )
  }

  if (estado === 'loading') {
    return (
      <div
        className="mapa-sede mapa-sede--placeholder"
        role="status"
        aria-live="polite"
      >
        <span className="mapa-sede__spinner" aria-hidden="true" />
        <p>Buscando la ubicación de la sede…</p>
      </div>
    )
  }

  if (estado === 'error') {
    return (
      <div className="mapa-sede mapa-sede--error" role="alert">
        <p className="mapa-sede__error-text">{mensajeError}</p>
        <button
          type="button"
          className="boton boton--secundario"
          onClick={() => setIntento((n) => n + 1)}
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="mapa-sede">
      <div className="mapa-sede__mapa">
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

      <figure className="ficha-sede">
        <figcaption className="ficha-sede__titulo">{sede.nombre}</figcaption>
        <p className="ficha-sede__direccion">{ubicacion.direccionNormalizada}</p>
        <p className="ficha-sede__coords">
          {ubicacion.lat.toFixed(6)}, {ubicacion.lng.toFixed(6)}
        </p>
      </figure>
    </div>
  )
}
