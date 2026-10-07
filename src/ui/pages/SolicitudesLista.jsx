import React, { useState, useEffect } from 'react';
import { crearPostulacionesRepo } from '../../infrastructure/adapters/persistence/postulacionesRepo';
import { formatearDni } from '../utils/formato';
import { botonFantasma } from '../estilos';

const postulacionesRepo = crearPostulacionesRepo();

export default function SolicitudesLista({ onVolver }) {
  const [postulaciones, setPostulaciones] = useState([]);

  useEffect(() => {
    setPostulaciones(postulacionesRepo.listar());
  }, []);

  const renderSiNo = (valor) => {
    if (valor === true) return 'Sí';
    if (valor === false) return 'No';
    return valor || '-';
  };

  const estiloCelda = { padding: '8px', border: '1px solid var(--color-rule)' };

  return (
    <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '10px 20px', fontFamily: 'var(--font-body)' }}>
      <h2 style={{ marginTop: '-10px', marginBottom: '20px', textAlign: 'center' }}>Listado de Solicitudes de Inscripción</h2>

      {postulaciones.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginTop: '30px' }}>No hay solicitudes registradas en el sistema.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)', textAlign: 'left' }}>
                <th style={estiloCelda}>Nombre y Apellido</th>
                <th style={estiloCelda}>DNI</th>
                <th style={estiloCelda}>Email</th>
                <th style={estiloCelda}>Distrito</th>
                <th style={estiloCelda}>Autoridad Previa</th>
                <th style={estiloCelda}>Capacitación</th>
                <th style={estiloCelda}>Afiliado</th>
                <th style={estiloCelda}>Interés Charla</th>
              </tr>
            </thead>
            <tbody>
              {postulaciones.map((p, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'var(--color-surface)' : 'transparent' }}>
                  <td style={estiloCelda}>{p.nombre} {p.apellido}</td>
                  <td style={estiloCelda}>{formatearDni(p.dni || '')}</td>
                  <td style={estiloCelda}>{p.correo}</td>
                  <td style={estiloCelda}>{p.distrito}</td>
                  <td style={estiloCelda}>{renderSiNo(p.fueAutoridad)}</td>
                  <td style={estiloCelda}>{renderSiNo(p.cumplioCapacitacion)}</td>
                  <td style={estiloCelda}>
                    {renderSiNo(p.afiliado)} {p.partido ? `(${p.partido})` : ''}
                  </td>
                  <td style={estiloCelda}>{renderSiNo(p.interesaCharlas)}</td>
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
            style={{ ...botonFantasma, padding: '10px 20px', width: '160px' }}
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
}
