import React from 'react';
import { obtenerOpcionesUsuario } from '../../domain/model/menuPersona';

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
            style={{
              padding: '12px',
              backgroundColor: opcion.color,
              color: opcion.textColor,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {opcion.label}
          </button>
        ))}
      </div>

      {onVolver && (
        <button
          onClick={onVolver}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Volver al inicio
        </button>
      )}
    </div>
  );
}