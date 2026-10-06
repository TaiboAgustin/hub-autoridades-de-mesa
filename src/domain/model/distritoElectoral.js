export class DistritoElectoral {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  static DISTRITOS_REGISTRADOS = [
    new DistritoElectoral(1, 'CABA'),
    new DistritoElectoral(2, 'Buenos Aires'),
    new DistritoElectoral(3, 'Córdoba'),
    new DistritoElectoral(4, 'Santa Fe'),
    new DistritoElectoral(5, 'Mendoza')
  ];

  static esValido(idDistrito) {
    if (!idDistrito) {
      return 'Debe seleccionar un distrito electoral.';
    }
    const existe = this.DISTRITOS_REGISTRADOS.some(
      (d) => d.id.toString() === idDistrito.toString() || d.nombre === idDistrito
    );
    if (!existe) {
      return 'El distrito electoral seleccionado no es válido.';
    }
    return null; // Todo OK
  }

  static obtenerTodos() {
    return this.DISTRITOS_REGISTRADOS;
  }
}