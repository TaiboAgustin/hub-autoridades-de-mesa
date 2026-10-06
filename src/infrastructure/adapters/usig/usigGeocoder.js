import { Ubicacion } from '../../../domain/model/Ubicacion.js'
import {
  DireccionNoEncontradaError,
  ServicioDeMapasNoDisponibleError,
} from '../../../domain/model/errors.js'

const URL_BASE = 'https://servicios.usig.buenosaires.gob.ar/normalizar/'

export function crearUsigGeocoder({ fetchImpl = fetch } = {}) {
  async function obtenerCoordenadas(direccion) {
    const url = `${URL_BASE}?direccion=${encodeURIComponent(direccion)}&geocodificar=true&srid=4326`

    let respuesta
    try {
      respuesta = await fetchImpl(url)
    } catch {
      throw new ServicioDeMapasNoDisponibleError()
    }

    if (!respuesta.ok) {
      throw new ServicioDeMapasNoDisponibleError()
    }

    const datos = await respuesta.json()
    const normalizadas = datos?.direccionesNormalizadas ?? []

    if (normalizadas.length === 0) {
      throw new DireccionNoEncontradaError(direccion)
    }

    const primera = normalizadas[0]
    const coordenadas = primera.coordenadas ?? primera
    const lng = Number(coordenadas.x)
    const lat = Number(coordenadas.y)

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      throw new DireccionNoEncontradaError(direccion)
    }

    return new Ubicacion({
      lat,
      lng,
      direccionNormalizada: primera.direccion ?? direccion,
    })
  }

  return { obtenerCoordenadas }
}
