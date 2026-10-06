import React, { useState, useEffect } from 'react';
import { obtenerInscripciones } from '../../domain/model/solicitud';

export default function SolicitudesLista({ onVolver }) {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    setSolicitudes(obtenerInscripciones());
  }, []);

  // Función auxiliar para transformar booleano a texto legible
  const renderSiNo = (valor) => {
    if (valor === true) return 'Sí';
    if (valor === false) return 'No';
    return valor || '-';
  };

  return (
    <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '10px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginTop: '-10px', marginBottom: '20px', textAlign: 'center' }}>Listado de Solicitudes de Inscripción</h2>

      {solicitudes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '30px' }}>No hay solicitudes registradas en el sistema.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#007BFF', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Nombre y Apellido</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>DNI</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Distrito</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Autoridad Previa</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Capacitación</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Afiliado</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Interés Charla</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s, index) => (
                <tr key={s.id || index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{s.persona?.nombre} {s.persona?.apellido}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{s.persona?.dni}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{s.persona?.mail}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{s.distrito}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{renderSiNo(s.autoridadMesaPrevia)}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{renderSiNo(s.capacitacionCumplida)}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {renderSiNo(s.afiliacion)} {s.partidoAgrupacion ? `(${s.partidoAgrupacion})` : ''}
                  </td>
                  {/* Nueva celda para mostrar si le interesan las charlas */}
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{renderSiNo(s.interesCharla)}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{s.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {onVolver && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={onVolver}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '160px'
            }}
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
}