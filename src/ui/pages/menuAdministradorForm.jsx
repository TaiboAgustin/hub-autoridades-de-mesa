import React from 'react';
import { obtenerOpcionesAdministrador } from '../../domain/model/menuAdministrador';

export default function MenuAdministradorForm({ onSelectOption, onVolver }) {
  const opcionesDominio = obtenerOpcionesAdministrador();
  const configVista = {
    gestionar_charlas: { 
      label: 'Gestionar Charlas', 
      color: '#007bff', 
      textColor: 'white' 
    },
    gestionar_convocatorias: { 
      label: 'Gestionar Convocatorias', 
      color: '#28a745', 
      textColor: 'white' 
    },
    ver_solicitudes: { 
      label: 'Ver Solicitudes', 
      color: '#17a2b8', 
      textColor: 'white' 
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Panel de Administrador</h2>
      <p>Seleccioná una opción de gestión:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '350px', margin: '20px auto' }}>
        {opcionesDominio.map((id) => {
          const ui = configVista[id] || { label: id, color: '#6c757d', textColor: 'white' };
          
          return (
            <button
              key={id}
              onClick={() => onSelectOption(id)}
              style={{
                padding: '12px',
                backgroundColor: ui.color,
                color: ui.textColor,
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {ui.label}
            </button>
          );
        })}
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
          Volver
        </button>
      )}
    </div>
  );
}