/**
 * Puerto de geocodificación: contrato que la capa de aplicación necesita del
 * exterior para transformar una dirección en coordenadas. Cada adaptador que lo
 * implemente debe exponer `obtenerCoordenadas` y, ante un fallo, lanzar los
 * errores de dominio DireccionNoEncontradaError o ServicioDeMapasNoDisponibleError.
 *
 * @typedef {Object} GeocodingPort
 * @property {(direccion: string) => Promise<import('../../domain/model/Ubicacion.js').Ubicacion>} obtenerCoordenadas
 */

export {}
