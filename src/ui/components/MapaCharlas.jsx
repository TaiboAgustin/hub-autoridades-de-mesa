import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl })

export function MapaCharlas({ charlas }) {
  if (!charlas || charlas.length === 0) return null

  const bounds = charlas.map((c) => [c.latitud, c.longitud])

  return (
    <section style={{ margin: '24px 16px' }}>
      <h2 style={{ marginBottom: '12px', fontSize: '1rem', fontWeight: '600' }}>
        Ubicación de las sedes
      </h2>
      <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-rule)' }}>
        <MapContainer
          bounds={L.latLngBounds(bounds)}
          boundsOptions={{ padding: [40, 40] }}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {charlas.map((charla) => (
            <Marker key={charla.id} position={[charla.latitud, charla.longitud]}>
              <Popup>
                <strong>{charla.nombre}</strong><br />
                {charla.tema}<br />
                {charla.fecha} · {charla.hora}<br />
                {charla.sede}<br />
                {charla.direccion}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  )
}
