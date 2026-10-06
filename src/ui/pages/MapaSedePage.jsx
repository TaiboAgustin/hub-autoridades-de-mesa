import { useEffect, useState } from 'react'
import { MapaSede } from '../components/MapaSede.jsx'
import '../styles/mapa-sede.css'

export function MapaSedePage({ obtenerUbicacion, listarSedes }) {
  const [sedes, setSedes] = useState([])
  const [sedeSeleccionada, setSedeSeleccionada] = useState(null)
  const [cargandoSedes, setCargandoSedes] = useState(true)

  useEffect(() => {
    let cancelado = false

    listarSedes()
      .then((resultado) => {
        if (cancelado) return
        setSedes(resultado)
        setCargandoSedes(false)
      })
      .catch(() => {
        if (cancelado) return
        setCargandoSedes(false)
      })

    return () => {
      cancelado = true
    }
  }, [listarSedes])

  function alElegirSede(evento) {
    const id = Number(evento.target.value)
    setSedeSeleccionada(sedes.find((s) => s.id === id) ?? null)
  }

  return (
    <main className="pagina">
      <header className="pagina__encabezado">
        <h1>Ubicación de sedes</h1>
        <p>Consultá en qué punto del mapa se encuentra cada sede de capacitación.</p>
      </header>

      <div className="selector">
        <label className="selector__label" htmlFor="selector-sede">
          Sede
        </label>
        <select
          id="selector-sede"
          className="selector__control"
          onChange={alElegirSede}
          defaultValue=""
          disabled={cargandoSedes}
        >
          <option value="" disabled>
            {cargandoSedes ? 'Cargando sedes…' : 'Elegí una sede'}
          </option>
          {sedes.map((sede) => (
            <option key={sede.id} value={sede.id}>
              {sede.nombre}
            </option>
          ))}
        </select>
      </div>

      <MapaSede sede={sedeSeleccionada} obtenerUbicacion={obtenerUbicacion} />
    </main>
  )
}
