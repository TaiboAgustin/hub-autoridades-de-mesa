export function Campo({ id, etiqueta, error, ancho, children }) {
  return (
    <div className={ancho ? 'campo-form campo-form--ancho' : 'campo-form'}>
      <label className="rotulo campo-form__label" htmlFor={id}>
        {etiqueta}
      </label>
      {children}
      {error && (
        <p className="campo-form__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
