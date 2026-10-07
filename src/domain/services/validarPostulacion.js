const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FORMATO_DNI = /^\d{7,8}$/
const FORMATO_TELEFONO = /^\d{10}$/

function vacio(valor) {
  return !valor || valor.trim() === ''
}

export function validarPostulacion(datos) {
  const errores = {}

  if (vacio(datos.distrito)) errores.distrito = 'Elegí un distrito electoral.'
  if (vacio(datos.nombre)) errores.nombre = 'Ingresá tu nombre.'
  if (vacio(datos.apellido)) errores.apellido = 'Ingresá tu apellido.'
  if (!FORMATO_DNI.test((datos.dni ?? '').trim())) {
    errores.dni = 'El DNI debe tener 7 u 8 dígitos.'
  }
  if (vacio(datos.fechaNacimiento)) {
    errores.fechaNacimiento = 'Ingresá tu fecha de nacimiento.'
  }
  if (vacio(datos.direccion)) errores.direccion = 'Ingresá tu dirección.'
  if (!FORMATO_TELEFONO.test((datos.telefono ?? '').trim())) {
    errores.telefono = 'El teléfono debe tener 10 dígitos (ej.: 11-2233-4455).'
  }
  if (!FORMATO_CORREO.test((datos.correo ?? '').trim())) {
    errores.correo = 'Ingresá un correo válido.'
  }
  if (datos.afiliado && vacio(datos.partido)) {
    errores.partido = 'Indicá el partido o agrupación.'
  }

  return errores
}
