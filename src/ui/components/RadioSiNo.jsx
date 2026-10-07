export function RadioSiNo({ name, legend, value, onChange }) {
  return (
    <div className="pregunta" role="radiogroup" aria-labelledby={`${name}-label`}>
      <span className="pregunta__texto" id={`${name}-label`}>
        {legend}
      </span>
      <div className="pregunta__opciones">
        <label className="radio">
          <input
            type="radio"
            name={name}
            checked={value === true}
            onChange={() => onChange(true)}
          />
          Sí
        </label>
        <label className="radio">
          <input
            type="radio"
            name={name}
            checked={value === false}
            onChange={() => onChange(false)}
          />
          No
        </label>
      </div>
    </div>
  )
}
