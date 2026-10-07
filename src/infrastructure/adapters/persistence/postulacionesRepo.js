const CLAVE = 'postulaciones'

export function crearPostulacionesRepo({ storage = localStorage } = {}) {
  function listar() {
    const crudo = storage.getItem(CLAVE)
    return crudo ? JSON.parse(crudo) : []
  }

  function guardar(postulacion) {
    const todas = listar()
    todas.push(postulacion)
    storage.setItem(CLAVE, JSON.stringify(todas))
  }

  function vaciar() {
    storage.removeItem(CLAVE)
  }

  return { listar, guardar, vaciar }
}
