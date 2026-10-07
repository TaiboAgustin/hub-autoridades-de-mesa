import React from 'react';
import { obtenerOpcionesAdministrador } from '../../domain/model/menuAdministrador';
import { botonPrimario, botonFantasma } from '../estilos';

const etiquetas = {
  gestionar_charlas: 'Gestionar Charlas',
  gestionar_convocatorias: 'Gestionar Convocatorias',
  ver_solicitudes: 'Ver Solicitudes',
};

export default function MenuAdministradorForm({ onSelectOption, onVolver }) {
  const opciones = obtenerOpcionesAdministrador();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Panel de Administrador</h2>
      <p>Seleccioná una opción de gestión:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '350px', margin: '20px auto' }}>
        {opciones.map((id) => (
          <button
            key={id}
            onClick={() => onSelectOption(id)}
            style={{ ...botonPrimario, padding: '12px', fontSize: '16px' }}
          >
            {etiquetas[id] || id}
          </button>
        ))}
      </div>

      {onVolver && (
        <button
          onClick={onVolver}
          style={{ ...botonFantasma, marginTop: '20px', padding: '8px 16px' }}
        >
          Volver
        </button>
      )}
    </div>
  );
}
