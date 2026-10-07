export const obtenerOpcionesAdministrador = () => [
  'ver_solicitudes'
];

export const validarPermisosAdministrador = (usuario) => {
  return usuario && usuario.rol === 'admin';
};