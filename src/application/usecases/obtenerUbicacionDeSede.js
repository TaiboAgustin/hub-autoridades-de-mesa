import { DireccionNoEncontradaError } from '../../domain/model/errors.js'

export function crearObtenerUbicacionDeSede(geocoder) {
  return function obtenerUbicacionDeSede(sede) {
    if (!sede || !sede.direccion || sede.direccion.trim() === '') {
      return Promise.reject(new DireccionNoEncontradaError(sede?.direccion ?? ''))
    }
    return geocoder.obtenerCoordenadas(sede.direccion)
  }
}
