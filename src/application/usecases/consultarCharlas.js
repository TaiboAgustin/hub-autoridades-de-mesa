export function crearConsultarCharlas(charlasRepo) {
  return function consultarCharlas() {
    return charlasRepo.listar()
  }
}
