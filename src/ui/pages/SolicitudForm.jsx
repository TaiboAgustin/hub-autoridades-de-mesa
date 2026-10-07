import { useState } from 'react';
import { Campo } from '../components/Campo.jsx';
import { RadioSiNo } from '../components/RadioSiNo.jsx';
import {
  soloLetras,
  soloDigitos,
  formatearDni,
  formatearTelefono,
  sugerenciasCorreo,
} from '../utils/formato.js';
import { consultarCharlas } from '../../application/usecases/consultarCharlas';
import { DistritoElectoral } from '../../domain/model/distritoElectoral';
import { crearPostulacionesRepo } from '../../infrastructure/adapters/persistence/postulacionesRepo';
import { crearRegistrarPostulacion } from '../../application/usecases/registrarPostulacion';
import { botonFantasma } from '../estilos';
import '../styles/postulacion.css';

const registrarPostulacion = crearRegistrarPostulacion(crearPostulacionesRepo());

const DATOS_INICIALES = {
  distrito: '',
  nombre: '',
  apellido: '',
  dni: '',
  fechaNacimiento: '',
  direccion: '',
  telefono: '',
  correo: '',
  fueAutoridad: false,
  cumplioCapacitacion: false,
  afiliado: false,
  partido: '',
  interesaCharlas: false,
  charlasInteres: [],
};

const ORDEN_CAMPOS = [
  'distrito',
  'nombre',
  'apellido',
  'dni',
  'fechaNacimiento',
  'direccion',
  'telefono',
  'correo',
  'partido',
];

function InscripcionForm({ onVolver, onVolverInicio }) {
  const distritos = DistritoElectoral.obtenerTodos();
  const charlas = consultarCharlas();
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviada, setEnviada] = useState(false);

  function actualizar(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }

  function alternarCharla(id) {
    setDatos((prev) => ({
      ...prev,
      charlasInteres: prev.charlasInteres.includes(id)
        ? prev.charlasInteres.filter((x) => x !== id)
        : [...prev.charlasInteres, id],
    }));
  }

  function cambiarInteres(valor) {
    setDatos((prev) => ({
      ...prev,
      interesaCharlas: valor,
      charlasInteres: valor ? prev.charlasInteres : [],
    }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const resultado = registrarPostulacion(datos);
    if (resultado.ok) {
      setErrores({});
      setEnviada(true);
      return;
    }
    setErrores(resultado.errores);
    const primerError = ORDEN_CAMPOS.find((campo) => resultado.errores[campo]);
    if (primerError) {
      requestAnimationFrame(() => document.getElementById(primerError)?.focus());
    }
  }

  function cargarOtra() {
    setDatos(DATOS_INICIALES);
    setErrores({});
    setEnviada(false);
  }

  if (enviada) {
    return (
      <main className="pagina">
        <div className="confirmacion" role="status">
          <span className="confirmacion__icono" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 13 4 4L19 7" />
            </svg>
          </span>
          <h1>Inscripción registrada</h1>
          <p>
            Tu postulación como autoridad de mesa quedó registrada. Vas a recibir
            la confirmación en el correo que indicaste.
          </p>
          <button type="button" className="boton" onClick={cargarOtra}>
            Cargar otra inscripción
          </button>
        </div>
        <div className="acciones acciones--volver" style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          {onVolver && (
            <button type="button" style={{ ...botonFantasma, padding: '11px 20px' }} onClick={onVolver}>
              ← Volver al menú
            </button>
          )}
          {onVolverInicio && (
            <button type="button" style={{ ...botonFantasma, padding: '11px 20px' }} onClick={onVolverInicio}>
              Volver al inicio
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="pagina">
      <header className="pagina__encabezado">
        <span className="rotulo">Prueba de concepto</span>
        <h1>Inscripción de postulante</h1>
        <p>Completá tus datos para registrarte como autoridad de mesa.</p>
      </header>

      <form className="formulario" onSubmit={enviar} noValidate>
        <fieldset className="formulario__grupo">
          <legend className="rotulo formulario__leyenda">Datos personales</legend>
          <div className="formulario__grilla">
            <Campo id="distrito" etiqueta="Distrito electoral" error={errores.distrito} ancho>
              <select
                id="distrito"
                className="control"
                value={datos.distrito}
                onChange={(e) => actualizar('distrito', e.target.value)}
                aria-invalid={errores.distrito ? true : undefined}
                aria-describedby={errores.distrito ? 'distrito-error' : undefined}
              >
                <option value="">Elegí un distrito</option>
                {distritos.map((distrito) => (
                  <option key={distrito.id} value={distrito.nombre}>
                    {distrito.nombre}
                  </option>
                ))}
              </select>
            </Campo>

            <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
              <input
                id="nombre"
                className="control"
                type="text"
                value={datos.nombre}
                onChange={(e) => actualizar('nombre', soloLetras(e.target.value))}
                aria-invalid={errores.nombre ? true : undefined}
                aria-describedby={errores.nombre ? 'nombre-error' : undefined}
              />
            </Campo>

            <Campo id="apellido" etiqueta="Apellido" error={errores.apellido}>
              <input
                id="apellido"
                className="control"
                type="text"
                value={datos.apellido}
                onChange={(e) => actualizar('apellido', soloLetras(e.target.value))}
                aria-invalid={errores.apellido ? true : undefined}
                aria-describedby={errores.apellido ? 'apellido-error' : undefined}
              />
            </Campo>

            <Campo id="dni" etiqueta="DNI" error={errores.dni}>
              <input
                id="dni"
                className="control"
                type="text"
                inputMode="numeric"
                value={formatearDni(datos.dni)}
                onChange={(e) => actualizar('dni', soloDigitos(e.target.value, 8))}
                aria-invalid={errores.dni ? true : undefined}
                aria-describedby={errores.dni ? 'dni-error' : undefined}
              />
            </Campo>

            <Campo
              id="fechaNacimiento"
              etiqueta="Fecha de nacimiento"
              error={errores.fechaNacimiento}
            >
              <input
                id="fechaNacimiento"
                className="control"
                type="date"
                value={datos.fechaNacimiento}
                onChange={(e) => actualizar('fechaNacimiento', e.target.value)}
                aria-invalid={errores.fechaNacimiento ? true : undefined}
                aria-describedby={
                  errores.fechaNacimiento ? 'fechaNacimiento-error' : undefined
                }
              />
            </Campo>

            <Campo id="direccion" etiqueta="Dirección actual" error={errores.direccion} ancho>
              <input
                id="direccion"
                className="control"
                type="text"
                value={datos.direccion}
                onChange={(e) => actualizar('direccion', e.target.value)}
                aria-invalid={errores.direccion ? true : undefined}
                aria-describedby={errores.direccion ? 'direccion-error' : undefined}
              />
            </Campo>

            <Campo id="telefono" etiqueta="Teléfono" error={errores.telefono}>
              <input
                id="telefono"
                className="control"
                type="tel"
                value={formatearTelefono(datos.telefono)}
                onChange={(e) => actualizar('telefono', soloDigitos(e.target.value, 10))}
                aria-invalid={errores.telefono ? true : undefined}
                aria-describedby={errores.telefono ? 'telefono-error' : undefined}
              />
            </Campo>

            <Campo id="correo" etiqueta="Correo de contacto" error={errores.correo}>
              <input
                id="correo"
                className="control"
                type="email"
                list="dominios-correo"
                value={datos.correo}
                onChange={(e) => actualizar('correo', e.target.value)}
                aria-invalid={errores.correo ? true : undefined}
                aria-describedby={errores.correo ? 'correo-error' : undefined}
              />
              <datalist id="dominios-correo">
                {sugerenciasCorreo(datos.correo).map((sugerencia) => (
                  <option key={sugerencia} value={sugerencia} />
                ))}
              </datalist>
            </Campo>
          </div>
        </fieldset>

        <fieldset className="formulario__grupo">
          <legend className="rotulo formulario__leyenda">Antecedentes</legend>
          <div className="preguntas">
            <RadioSiNo
              name="fueAutoridad"
              legend="¿Fue autoridad de mesa previamente?"
              value={datos.fueAutoridad}
              onChange={(valor) => actualizar('fueAutoridad', valor)}
            />
            <RadioSiNo
              name="cumplioCapacitacion"
              legend="¿Cumplió la capacitación?"
              value={datos.cumplioCapacitacion}
              onChange={(valor) => actualizar('cumplioCapacitacion', valor)}
            />
            <RadioSiNo
              name="afiliado"
              legend="¿Es afiliado a alguna agrupación política?"
              value={datos.afiliado}
              onChange={(valor) => actualizar('afiliado', valor)}
            />
            {datos.afiliado && (
              <Campo id="partido" etiqueta="Detallar partido" error={errores.partido}>
                <input
                  id="partido"
                  className="control"
                  type="text"
                  value={datos.partido}
                  onChange={(e) => actualizar('partido', e.target.value)}
                  aria-invalid={errores.partido ? true : undefined}
                  aria-describedby={errores.partido ? 'partido-error' : undefined}
                />
              </Campo>
            )}
          </div>
        </fieldset>

        <fieldset className="formulario__grupo">
          <legend className="rotulo formulario__leyenda">Charlas de orientación</legend>
          <div className="preguntas">
            <RadioSiNo
              name="interesaCharlas"
              legend="¿Tiene interés en participar en charlas de orientación?"
              value={datos.interesaCharlas}
              onChange={cambiarInteres}
            />
          </div>

          {datos.interesaCharlas && charlas.length > 0 && (
            <div className="formulario__checks formulario__checks--sangria">
              {charlas.map((charla) => (
                <label className="check" key={charla.id}>
                  <input
                    type="checkbox"
                    checked={datos.charlasInteres.includes(charla.id)}
                    onChange={() => alternarCharla(charla.id)}
                  />
                  {charla.tema} — {charla.sede}
                </label>
              ))}
            </div>
          )}
        </fieldset>

        <div className="formulario__acciones" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button type="submit" className="boton">
            Registrar inscripción
          </button>
          {onVolver && (
            <button type="button" style={{ ...botonFantasma, padding: '11px 20px' }} onClick={onVolver}>
              ← Volver al menú
            </button>
          )}
          {onVolverInicio && (
            <button type="button" style={{ ...botonFantasma, padding: '11px 20px' }} onClick={onVolverInicio}>
              Volver al inicio
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

export default InscripcionForm;
