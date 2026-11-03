import { charlasPrueba } from './charlasPrueba.js'

export function crearCharlasRepo() {
  return { listar: () => charlasPrueba }
}
