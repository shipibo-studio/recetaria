# RecetarIA

Aplicación web de sugerencias de recetas con IA.

Versión actual: `v0.2.0`

## Stack técnico

- Framework: Next.js 16 (App Router) + React 19 + TypeScript
- Estilos: Tailwind CSS v4
- UI base: shadcn/ui
- Pruebas: Vitest + jsdom
- Tooling adicional: Vite (soporte para tooling de test)

## Rutas actuales

- `/` Landing
- `/login` Inicio de sesión
- `/app` Vista principal de recetas
- `/app/ajustes` Configuración (OpenRouter API Key y modelo)

## Estructura relevante

- `src/app/layout.tsx`: layout global
- `src/app/app/layout.tsx`: layout compartido del área `/app`
- `src/app/app/components/app-header.tsx`: header compartido en `/app/*`
- `src/app/app/components/app-footer.tsx`: footer/nav móvil compartido en `/app/*`
- `src/app/app/app.data.ts`: navegación y datos de ejemplo

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:watch
```

## Configuración de IA

La vista de ajustes (`/app/ajustes`) incluye:

- API KEY de OpenRouter (string)
- Modelo de OpenRouter (string)
- Botón Guardar

Actualmente los valores se capturan en UI y no se persisten en backend.

## Versionado

Este proyecto usa SemVer (`MAJOR.MINOR.PATCH`).

- Versión en `package.json`: `0.2.0`
- Versión documentada en este `README.md`: `v0.2.0`
- Versión visible en footer de `/app`: `v0.2.0`
