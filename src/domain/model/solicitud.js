import { validarDatosPersonales, Persona } from './persona';
import { DistritoElectoral } from './distritoElectoral';

export class Solicitud {
  constructor(id, distrito, autoridadMesaPrevia, capacitacionCumplida, afiliacion, partidoAgrupacion,interesCharla, persona) {
    this.id = id;
    this.distrito = distrito;
    this.autoridadMesaPrevia = autoridadMesaPrevia;
    this.capacitacionCumplida = capacitacionCumplida;
    this.afiliacion = afiliacion;
    this.partidoAgrupacion = partidoAgrupacion;
    this.interesCharla = interesCharla;
    this.estado = 'Pendiente'; 
    this.persona = persona;
  }
}

export function validarInscripcion(formData) {
  const errorDistrito = DistritoElectoral.esValido(formData.distrito);
  if (errorDistrito) {
    return errorDistrito;
  }

  const errorPersona = validarDatosPersonales(formData);
  if (errorPersona) {
    return errorPersona;
  }

  if (!formData.autoridadPrevia) {
    return 'Debe indicar si fue autoridad de mesa previamente.';
  }

  if (!formData.capacitacion) {
    return 'Debe indicar si cumplió la capacitación.';
  }

  if (!formData.afiliacion) {
    return 'Debe indicar si es afiliado a alguna agrupación política.';
  }

  if (formData.afiliacion === 'Sí' && (!formData.partidoAgrupacion || formData.partidoAgrupacion.trim() === '')) {
    return 'Debe detallar el partido político al que está afiliado.';
  }

  if (!formData.interesCharla) {
    return 'Debe indicar su interés en participar en charlas de orientación.';
  }

  return null;
}

export function guardarInscripcion(formData) {
  try {
    const solicitudesGuardadas = JSON.parse(localStorage.getItem('solicitudes')) || [];
    
    const personaInstancia = new Persona(
      Date.now(),
      formData.nombre,
      formData.apellido,
      formData.dni,
      formData.fechaNacimiento,
      formData.mail
    );

    const nuevaSolicitud = new Solicitud(
      Date.now(),
      formData.distrito,
      formData.autoridadPrevia === 'Sí',
      formData.capacitacion === 'Sí',
      formData.afiliacion === 'Sí',
      formData.partidoAgrupacion || '',
      formData.interesCharla === 'Sí',
      personaInstancia
    );

    solicitudesGuardadas.push(nuevaSolicitud);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudesGuardadas));
    
    return true;
  } catch (error) {
    console.error('Error al guardar la inscripción:', error);
    return false;
  }
}

export function obtenerInscripciones() {
  try {
    const data = localStorage.getItem('solicitudes');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al obtener las inscripciones:', error);
    return [];
  }
}