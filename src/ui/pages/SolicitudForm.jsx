import { useState } from 'react';
import { validarInscripcion, guardarInscripcion } from '../../domain/model/solicitud';
import { DistritoElectoral } from '../../domain/model/distritoElectoral';

function InscripcionForm({ onVolver, onVolverInicio }) {
  const [formData, setFormData] = useState({
    distrito: '',
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    direccion: '',
    telefono: '',
    mail: '',
    autoridadMesaPrevia: '',
    capacitacionCumplida: '',
    afiliacion: '',
    partidoAgrupacion: '',
    interesCharla: ''
  });

  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensajeError = validarInscripcion(formData);
    
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    setError('');
    guardarInscripcion(formData);
    
    alert('¡Inscripción guardada con éxito!');
    
    setFormData({
      distrito: '',
      nombre: '',
      apellido: '',
      dni: '',
      fechaNacimiento: '',
      direccion: '',
      telefono: '',
      mail: '',
      autoridadPrevia: '',
      capacitacion: '',
      afiliacion: '',
      partidoAgrupacion: '',
      interesCharla: ''
    });
  };

  return (
    <div style={{ maxWidth: '650px', width: '100%', margin: '0 auto', padding: '10px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginTop: '-10px', marginBottom: '20px', textAlign: 'center' }}>Inscripción de Postulante</h2>
      {error && (
        <div style={{ backgroundColor: '#ffe6e6', color: '#d9534f', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ebccd1' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: '12px 15px', alignItems: 'center' }}>    
          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Distrito Electoral:</label>
          <select
            name="distrito"
            value={formData.distrito}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Seleccione un distrito...</option>
            {DistritoElectoral.obtenerTodos().map((distrito) => (
              <option key={distrito.id} value={distrito.nombre}>
                {distrito.nombre}
              </option>
            ))}
          </select>

          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>DNI:</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Dirección Actual:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <label style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Correo Electrónico:</label>
          <input
            type="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
            style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px 15px', alignItems: 'center', marginTop: '5px' }}>
          <label style={{ textAlign: 'left' }}>¿Fue autoridad de mesa previamente?</label>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="autoridadPrevia"
                value="Sí"
                checked={formData.autoridadPrevia === 'Sí'}
                onChange={handleChange}
                required
              /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="autoridadPrevia"
                value="No"
                checked={formData.autoridadPrevia === 'No'}
                onChange={handleChange}
                required
              /> No
            </label>
          </div>

          <label style={{ textAlign: 'left' }}>¿Cumplió la capacitación?</label>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="capacitacion"
                value="Sí"
                checked={formData.capacitacion === 'Sí'}
                onChange={handleChange}
                required
              /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="capacitacion"
                value="No"
                checked={formData.capacitacion === 'No'}
                onChange={handleChange}
                required
              /> No
            </label>
          </div>

          <label style={{ textAlign: 'left' }}>¿Es afiliado a alguna agrupación política?</label>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="afiliacion"
                value="Sí"
                checked={formData.afiliacion === 'Sí'}
                onChange={handleChange}
                required
              /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="afiliacion"
                value="No"
                checked={formData.afiliacion === 'No'}
                onChange={handleChange}
                required
              /> No
            </label>
          </div>

          {formData.afiliacion === 'Sí' && (
            <>
              <label style={{ textAlign: 'left', paddingLeft: '15px' }}>Detallar Partido:</label>
              <input
                type="text"
                name="partidoAgrupacion"
                value={formData.partidoAgrupacion}
                onChange={handleChange}
                placeholder="Indique el partido"
                required
                style={{ padding: '7px', boxSizing: 'border-box', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </>
          )}

          <label style={{ textAlign: 'left' }}>¿Tiene interés en participar en charlas de orientación?</label>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="interesCharla"
                value="Sí"
                checked={formData.interesCharla === 'Sí'}
                onChange={handleChange}
                required
              /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="interesCharla"
                value="No"
                checked={formData.interesCharla === 'No'}
                onChange={handleChange}
                required
              /> No
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px', flexWrap: 'wrap' }}>
          <button 
            type="submit" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007BFF', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer', 
              fontWeight: 'bold', 
              width: '160px'
            }}
          >
            Inscribirse
          </button>

          {onVolver && (
            <button 
              type="button"
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
              Menú anterior
            </button>
          )}

          {onVolverInicio && (
            <button 
              type="button"
              onClick={onVolverInicio}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#343a40', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: 'pointer', 
                fontWeight: 'bold', 
                width: '160px'
              }}
            >
              Volver al inicio
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default InscripcionForm;