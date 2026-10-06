export const obtenerOpcionesRol = () => ({
  USUARIO: 'usuario',
  ADMIN: 'admin'
});

export const obtenerOpcionesUsuario = () => [
  { id: 'inscripcion', label: 'Inscripción', color: '#28a745', textColor: 'white' },
  { id: 'charlas', label: 'Ver charlas', color: '#17a2b8', textColor: 'white' }
];