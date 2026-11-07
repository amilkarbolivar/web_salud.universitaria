# UniMental — Plataforma universitaria de salud mental

Aplicación web full stack para acompañamiento, información y comunidad en salud mental universitaria.
Incluye frontend en React/Vite, API REST en Node.js/Express, base de datos PostgreSQL y despliegue con Docker Compose.

> Aviso: los cuestionarios y contenidos son informativos y de autoevaluación. No constituyen diagnóstico ni sustituyen la atención profesional.

## Arquitectura

```
.
├── proyecto_salud/          # Frontend React + Vite
├── backend/                 # API REST Node.js/Express
├── docker/                  # Configuración de nginx
├── .github/workflows/       # CI/CD
├── compose.yaml             # Orquestación de producción
└── README.md
```

Servicios en producción:
- `frontend`: nginx sirviendo la SPA y haciendo proxy de `/api` al backend.
- `backend`: API REST Node.js/Express.
- `db`: PostgreSQL 16 con volumen persistente.

## Tecnologías

- Frontend: React 18, Vite 5, Tailwind CSS 3, Material UI, React Router 6, Axios.
- Backend: Node.js 20, Express 4, PostgreSQL (`pg`), bcryptjs, JWT (cookie httpOnly), Helmet, CORS, rate limiting.
- Base de datos: PostgreSQL 16.
- Contenedores: Docker + Docker Compose.
- CI/CD: GitHub Actions.

## Requisitos

- Node.js 20+
- Docker 24+ y Docker Compose v2
- (Opcional) PostgreSQL 16 si se ejecuta sin Docker

## Instalación local (sin Docker)

### Backend

```bash
cd backend
cp .env.example .env   # o crear .env con DATABASE_URL apuntando a tu Postgres
npm install
npm run migrate
npm run seed
npm run dev
```

Variables mínimas del backend (`.env`):
- `DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGIN=http://localhost:5173`
- `COOKIE_SECURE=false`

### Frontend

```bash
cd proyecto_salud
npm install
npm run dev
```

El frontend queda en `http://localhost:5173` y hace proxy de `/api` a `http://localhost:4000`.

## Variables de entorno

Ver `.env.example` en la raíz para Docker y `backend/.env.example`/`backend/.env` para ejecución local.

Variables principales:
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `JWT_SECRET` (obligatoria en producción)
- `CORS_ORIGIN`
- `COOKIE_SECURE` (`true` con HTTPS)
- `APP_PORT` (puerto público, por defecto 8080)

## Base de datos

Tablas: `users`, `articulos`, `foros`, `mensajes`, `empresas`.

Migraciones idempotentes en `backend/src/db/migrations/`. Seed inicial de artículos y empresas en `backend/src/db/seed.js` (solo si las tablas están vacías).

Backups (PostgreSQL en Docker):

```bash
docker compose exec db pg_dump -U unimental unimental > backup.sql
```

Restauración:

```bash
cat backup.sql | docker compose exec -T db psql -U unimental unimental
```

## Docker

```bash
cp .env.example .env
# Edita .env y define JWT_SECRET
docker compose up -d --build
```

La aplicación queda en `http://localhost:8080` (o el puerto definido en `APP_PORT`).

Ver estado:

```bash
docker compose ps
```

Logs:

```bash
docker compose logs -f
```

Persistencia: volumen `db_data`. No eliminar volúmenes para no perder datos.

## Comandos útiles

Frontend (`proyecto_salud/`):
- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run lint` — lint
- `npm test` — pruebas

Backend (`backend/`):
- `npm run dev` — desarrollo
- `npm run migrate` — migraciones
- `npm run seed` — seed inicial
- `npm run lint` — lint
- `npm test` — pruebas

## Pruebas

- Backend: `node --test` (health y validaciones).
- Frontend: Vitest + Testing Library.
- Contenedores: healthchecks en `compose.yaml`.

## Despliegue en AWS EC2 (Ubuntu 24.04)

1. Instalar Docker y Docker Compose.
2. Clonar el repositorio en `/opt/unimental`.
3. Crear `.env` a partir de `.env.example` con valores de producción (`COOKIE_SECURE=true`, `CORS_ORIGIN=https://tu-dominio`).
4. Ejecutar `docker compose up -d --build`.
5. (Opcional) Configurar proxy inverso (nginx/Caddy) y HTTPS con un dominio real.

No se incluyen credenciales en el repositorio. El despliegue automático con GitHub Actions requiere los secretos `EC2_HOST`, `EC2_USER` y `EC2_SSH_KEY`.

## Seguridad

- Contraseñas con bcrypt (factor 12).
- JWT en cookie httpOnly, `Secure` en producción, `SameSite=Lax`.
- Helmet, CORS restringido, rate limiting en `/api`.
- Validación en servidor con express-validator.
- Consultas parametrizadas (sin inyección SQL).
- Minimización de datos: no se almacenan resultados de cuestionarios ni diagnósticos.

## Mantenimiento

- Actualizar dependencias periódicamente.
- Revisar logs: `docker compose logs`.
- Hacer backups regulares de la base de datos.
- No exponer PostgreSQL públicamente (solo red interna de Docker).