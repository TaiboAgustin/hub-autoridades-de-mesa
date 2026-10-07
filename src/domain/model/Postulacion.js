export class Postulacion {
  constructor({
    distrito,
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    direccion,
    telefono,
    correo,
    fueAutoridad,
    cumplioCapacitacion,
    afiliado,
    partido,
    interesaCharlas,
    charlasInteres,
  }) {
    this.distrito = distrito
    this.nombre = nombre
    this.apellido = apellido
    this.dni = dni
    this.fechaNacimiento = fechaNacimiento
    this.direccion = direccion
    this.telefono = telefono
    this.correo = correo
    this.fueAutoridad = fueAutoridad
    this.cumplioCapacitacion = cumplioCapacitacion
    this.afiliado = afiliado
    this.partido = afiliado ? partido : ''
    this.interesaCharlas = interesaCharlas
    this.charlasInteres = interesaCharlas ? (charlasInteres ?? []) : []
  }
}
