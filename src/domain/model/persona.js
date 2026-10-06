export class Persona {
  constructor(id, nombre, apellido, dni, fechaNacimiento, mail) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fechaNacimiento = fechaNacimiento;
    this.mail = mail; 
  }
}

function validarMail(mail) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(mail);
}

function esMayorDeEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad >= 18;
}

export function validarDatosPersonales(datos) {
  if (!datos.nombre || datos.nombre.trim() === '') {
    return 'El campo nombre es obligatorio.';
  }

  if (!datos.apellido || datos.apellido.trim() === '') {
    return 'El campo apellido es obligatorio.';
  }

  if (!datos.dni || isNaN(datos.dni) || Number(datos.dni) <= 0) {
    return 'Debe ingresar un DNI válido.';
  }

  if (!datos.fechaNacimiento) {
    return 'La fecha de nacimiento es obligatoria.';
  }

  if (!esMayorDeEdad(datos.fechaNacimiento)) {
    return 'Debe ser mayor de 18 años para realizar la inscripción.';
  }

  if (!datos.mail || !validarMail(datos.mail)) {
    return 'El correo electrónico (mail) ingresado no tiene un formato válido.';
  }

  return null;
}