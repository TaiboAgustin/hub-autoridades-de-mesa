import React from 'react';
import { obtenerOpcionesUsuario } from '../../domain/model/menuPersona';
import { botonPrimario, botonFantasma } from '../estilos';

export default function MenuPersona({ onSelectOption, onVolver }) {
  const opciones = obtenerOpcionesUsuario();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Menú de Postulante</h2>
      <p>Seleccioná una opción para continuar:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '20px auto' }}>
        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            onClick={() => onSelectOption(opcion.id)}
            style={{ ...botonPrimario, padding: '12px', fontSize: '16px' }}
          >
            {opcion.label}
          </button>
        ))}
      </div>

      {onVolver && (
        <button
          onClick={onVolver}
          style={{ ...botonFantasma, marginTop: '20px', padding: '8px 16px' }}
        >
          Volver al inicio
        </button>
      )}
    </div>
  );
}
