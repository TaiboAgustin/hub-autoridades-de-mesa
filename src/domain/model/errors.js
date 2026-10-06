export class DireccionNoEncontradaError extends Error {
  constructor(direccion) {
    super(`No se encontró la dirección: ${direccion}`)
    this.name = 'DireccionNoEncontradaError'
    this.direccion = direccion
  }
}

export class ServicioDeMapasNoDisponibleError extends Error {
  constructor() {
    super('El servicio de mapas no está disponible')
    this.name = 'ServicioDeMapasNoDisponibleError'
  }
}
