export const obtenerOpcionesAdministrador = () => [
  'gestionar_charlas',
  'gestionar_convocatorias',
  'ver_solicitudes'
];

export const validarPermisosAdministrador = (usuario) => {
  return usuario && usuario.rol === 'admin';
};