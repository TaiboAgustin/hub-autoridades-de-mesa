import { consultarCharlas } from "../../application/Usecases/consultarCharlas";

function ConsultaCharlas({ alVerUbicacion })  {
  const charlas = consultarCharlas();

  return (
    <main className="consulta-charlas">
      <h1>Charlas disponibles</h1>

      {charlas.length === 0 ? (
        <p>No hay charlas disponibles.</p>
      ) : (
        <section className="lista-charlas">
          {charlas.map((charla) => (
            <article className="tarjeta-charla" key={charla.id}>
              <h2>{charla.nombre}</h2>

              <p>
                <strong>Tema:</strong> {charla.tema}
              </p>

              <p>
                <strong>Fecha:</strong> {charla.fecha}
              </p>

              <p>
                <strong>Horario:</strong> {charla.hora}
              </p>

              <p>
                <strong>Sede:</strong> {charla.sede}
              </p>

              <p>
                <strong>Dirección:</strong> {charla.direccion}
              </p>

              <button type="button" onClick={() => alVerUbicacion(charla.sede)}> Ver ubicación </button>

            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default ConsultaCharlas;