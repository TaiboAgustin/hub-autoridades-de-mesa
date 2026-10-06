import { useState } from 'react'

const CLAVE = 'tema'

export function temaInicial() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado === 'claro' || guardado === 'oscuro') {
    return guardado
  }
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefiereOscuro ? 'oscuro' : 'claro'
}

export function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema
}

export function useTema() {
  const [tema, setTema] = useState(() => document.documentElement.dataset.tema ?? 'claro')

  function alternarTema() {
    const siguiente = tema === 'oscuro' ? 'claro' : 'oscuro'
    setTema(siguiente)
    aplicarTema(siguiente)
    localStorage.setItem(CLAVE, siguiente)
  }

  return { tema, alternarTema }
}
