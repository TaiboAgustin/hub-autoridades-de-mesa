export function soloLetras(valor) {
  return valor.replace(/[^\p{L}\s'’-]/gu, '')
}

export function soloDigitos(valor, max = Infinity) {
  return valor.replace(/\D/g, '').slice(0, max)
}

export function formatearDni(digitos) {
  return digitos.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function formatearTelefono(digitos) {
  const d = digitos.slice(0, 10)
  const partes = [d.slice(0, 2)]
  if (d.length > 2) partes.push(d.slice(2, 6))
  if (d.length > 6) partes.push(d.slice(6, 10))
  return partes.filter(Boolean).join('-')
}

const DOMINIOS_CORREO = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'yahoo.com.ar',
  'live.com.ar',
  'icloud.com',
]

export function sugerenciasCorreo(valor) {
  if (!valor || valor.includes(' ')) return []
  const [local, dominio = ''] = valor.split('@')
  if (!local) return []
  const coincidentes = valor.includes('@')
    ? DOMINIOS_CORREO.filter((d) => d.startsWith(dominio))
    : DOMINIOS_CORREO
  return coincidentes.map((d) => `${local}@${d}`)
}
