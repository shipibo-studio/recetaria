# RecetarIA

Aplicación web de sugerencias de recetas con IA.

Versión actual: `v0.3.0`

## Stack técnico

- Framework: Next.js 16 (App Router) + React 19 + TypeScript
- Estilos: Tailwind CSS v4
- UI base: shadcn/ui
- Autenticación: Neon Auth (`@neondatabase/auth`)
- Base de datos: Neon Postgres (`@neondatabase/serverless`)
- Pruebas: Vitest + jsdom
- Tooling adicional: Vite (soporte para tooling de test)

## Rutas actuales

- `/` Landing
- `/login` Inicio de sesión con Neon Auth
- `/app` Vista principal de recetas (protegida)
- `/app/ajustes` Configuración (OpenRouter API Key y modelo por usuario)
- `/api/auth/[...path]` Handler de Neon Auth
- `/api/user/openrouter` API autenticada para leer/guardar ajustes de OpenRouter

## Estructura relevante

- `src/app/layout.tsx`: layout global
- `src/app/app/layout.tsx`: layout compartido del área `/app`
- `src/app/app/components/app-header.tsx`: header compartido en `/app/*`
- `src/app/app/components/app-footer.tsx`: footer/nav móvil compartido en `/app/*`
- `src/app/app/app.data.ts`: navegación y datos de ejemplo
- `src/components/auth-provider.tsx`: provider de Neon Auth UI
- `src/lib/auth-client.ts`: cliente auth para componentes cliente
- `src/lib/db.ts`: cliente Neon y helpers SQL
- `middleware.ts`: protección de rutas `/app/*` y `/api/user/*`

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

Los valores se guardan por usuario autenticado en Neon Postgres (tabla `user_openrouter_settings`).

## Variables de entorno

Define estas variables antes de ejecutar el proyecto:

```bash
DATABASE_URL="postgres://..."
NEON_AUTH_BASE_URL="https://<tu-auth-url>/neondb/auth"
NEON_AUTH_COOKIE_SECRET="<secreto-de-al-menos-32-caracteres>"
NEXT_PUBLIC_STATICFORMS_API_KEY="<tu-api-key-de-staticforms>"
```

## Migraciones de base de datos

Ejecuta opcionalmente el script SQL en Neon Console para crear la tabla `user_openrouter_settings`:

```bash
psql $DATABASE_URL < migrations/001_create_user_openrouter_settings.sql
```

O copia y pega el contenido desde [migrations/001_create_user_openrouter_settings.sql](migrations/001_create_user_openrouter_settings.sql) en el SQL Editor de Neon Console.

**Nota:** La tabla se crea automáticamente en el primer uso si no existe, pero ejecutar la migración te permite controlar indices y documentación.

## Versionado

Este proyecto usa SemVer (`MAJOR.MINOR.PATCH`).

- Versión en `package.json`: `0.3.0`
- Versión documentada en este `README.md`: `v0.3.0`
- Versión visible en footer de `/app`: `v0.3.0`
