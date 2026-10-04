# hub-autoridades-de-mesa

Trabajo Práctico — Ingeniería de Software (UNGS) — **Grupo 03**
Sistema: **Portal para Autoridades de Mesa**

## Objetivo del TP

El proyecto busca facilitar la **convocatoria y registro de ciudadanos que se postulan para ser autoridades de mesa** en una elección, reemplazando un proceso manual por un portal web que centraliza la postulación, la evaluación de las solicitudes y la difusión de las charlas de capacitación.

**Objetivo de negocio:** agilizar la conformación del padrón de autoridades de mesa, ampliando el alcance de la convocatoria y reduciendo el trabajo administrativo de recepción y evaluación de postulaciones.

**Objetivo del sistema:** ofrecer un portal web donde:

- el **ciudadano** consulta las charlas de capacitación disponibles (con su sede y ubicación en el mapa) y registra su postulación como autoridad de mesa;
- el **administrador** gestiona las convocatorias y las charlas, y evalúa las solicitudes (aprobación/rechazo), con la correspondiente notificación al postulante;
- el sistema se integra con un **servicio externo de normalización de direcciones (USIG)** para ubicar las sedes en un mapa de forma dinámica a partir de su dirección.

## Este repositorio

Contiene la **Prueba de Concepto (prototipo funcional)** de la segunda entrega, que demuestra de punta a punta la consulta de charlas, la visualización de la sede en el mapa mediante el consumo de la API de USIG, y el registro de una postulación.

## Stack tecnológico

- **React** (v19) como librería de UI, con componentes para las distintas vistas del portal.
- **Vite** como entorno de desarrollo y empaquetado (servidor de desarrollo y build de producción).
- **Leaflet** + **react-leaflet** para renderizar el mapa interactivo sobre mosaicos de **OpenStreetMap** (gratuito y sin credenciales).
- **API de USIG** (servicio externo de normalización de direcciones) para obtener dinámicamente las coordenadas de una sede a partir de su dirección.
- **JavaScript (ES Modules)** como lenguaje.
- **Persistencia**: almacenamiento del navegador (`localStorage`) para las postulaciones, con las charlas y sedes precargadas; no requiere servidor ni claves para ejecutarse.

## Arquitectura

El proyecto sigue una **arquitectura hexagonal (puertos y adaptadores)**: el dominio queda aislado del exterior y la regla de dependencias apunta hacia adentro (la UI y los adaptadores dependen del núcleo, nunca al revés). Los puertos se usan únicamente en las dos costuras con variación real esperada (el servicio externo (USIG) y la persistencia), evitando abstracciones innecesarias en el resto.

```
src/
├── domain/                        → NÚCLEO: dominio puro, sin dependencias externas
│   ├── model/                     → entidades (Charla, Sede, Solicitud, Postulación)
│   └── services/                  → reglas de negocio
├── application/                   → orquestación
│   ├── usecases/                  → casos de uso
│   └── ports/                     → PUERTOS (contratos que el núcleo pide al exterior)
├── infrastructure/
│   └── adapters/                  → ADAPTADORES "driven" (implementan los puertos)
│       ├── usig/                  → adaptador del servicio externo USIG
│       └── persistence/           → adaptador localStorage/JSON
└── ui/                            → ADAPTADOR "driving" (React)
    ├── components/
    ├── pages/
    └── styles/
```

El punto de entrada (`src/main.jsx`) actúa como *composition root*: instancia los adaptadores concretos y los inyecta en los casos de uso.
