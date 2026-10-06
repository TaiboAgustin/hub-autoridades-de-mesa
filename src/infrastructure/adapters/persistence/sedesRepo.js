import { Sede } from '../../../domain/model/Sede.js'

const RUTA = '/data/sedes.json'

export function crearSedesRepo({ fetchImpl = fetch } = {}) {
  async function listar() {
    const respuesta = await fetchImpl(RUTA)
    if (!respuesta.ok) {
      throw new Error('No se pudieron cargar las sedes')
    }
    const datos = await respuesta.json()
    return datos.map((d) => new Sede(d))
  }

  return { listar }
}
