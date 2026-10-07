import { Postulacion } from '../../domain/model/Postulacion.js'
import { validarPostulacion } from '../../domain/services/validarPostulacion.js'

export function crearRegistrarPostulacion(postulacionesRepo) {
  return function registrarPostulacion(datos) {
    const errores = validarPostulacion(datos)
    if (Object.keys(errores).length > 0) {
      return { ok: false, errores }
    }

    const postulacion = new Postulacion(datos)
    postulacionesRepo.guardar(postulacion)
    return { ok: true, postulacion }
  }
}
