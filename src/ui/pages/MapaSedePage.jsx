import { useEffect, useState } from 'react'
import { MapaSede } from '../components/MapaSede.jsx'
import '../styles/mapa-sede.css'

function normalizarTexto(texto = "") {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export function MapaSedePage({ obtenerUbicacion, listarSedes, sedeSolicitada, }) {
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

    useEffect(() => {
    if (!sedeSolicitada || sedes.length === 0) return

    const nombreSolicitado = normalizarTexto(sedeSolicitada)

    const sedeEncontrada = sedes.find((sede) => {
      const nombreSede = normalizarTexto(sede.nombre)

      return (
        nombreSede === nombreSolicitado ||
        nombreSede.includes(nombreSolicitado) ||
        nombreSolicitado.includes(nombreSede)
      )
    })

    setSedeSeleccionada(sedeEncontrada ?? null)
  }, [sedeSolicitada, sedes])

  function alElegirSede(evento) {
    const id = Number(evento.target.value)
    setSedeSeleccionada(sedes.find((s) => s.id === id) ?? null)
  }

  return (
    <main id="seccion-mapa" className="pagina pagina--ancha">
      <header className="pagina__encabezado">
        <span className="rotulo">Prueba de concepto</span>
        <h1>Ubicación de sedes</h1>
        <p>
          Consultá la ubicación de cada sede de capacitación.
        </p>
      </header>

      <div className="selector">
        <label className="rotulo" htmlFor="selector-sede">
          Sede
        </label>
        <select
          id="selector-sede"
          className="selector__control"
          onChange={alElegirSede}
          value={sedeSeleccionada?.id ?? ""}
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
