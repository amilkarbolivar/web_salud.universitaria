-- Esquema inicial de UniMental
-- Migración idempotente: usa IF NOT EXISTS / DO NOTHING

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  apodo VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  cargo VARCHAR(40) NOT NULL DEFAULT 'usuario',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_apodo ON users (apodo);

CREATE TABLE IF NOT EXISTS articulos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT NOT NULL,
  multimedia_url TEXT,
  fecha_publicacion DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articulos_fecha ON articulos (fecha_publicacion DESC);

CREATE TABLE IF NOT EXISTS foros (
  id SERIAL PRIMARY KEY,
  nombre_foro VARCHAR(160) NOT NULL,
  descripcion TEXT NOT NULL,
  id_usuario INTEGER REFERENCES users (id) ON DELETE SET NULL,
  fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_foros_fecha ON foros (fecha_creacion DESC);

CREATE TABLE IF NOT EXISTS mensajes (
  id SERIAL PRIMARY KEY,
  id_foro INTEGER NOT NULL REFERENCES foros (id) ON DELETE CASCADE,
  id_usuario INTEGER REFERENCES users (id) ON DELETE SET NULL,
  autor VARCHAR(120),
  contenido TEXT NOT NULL,
  fecha TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mensajes_foro ON mensajes (id_foro, fecha);

CREATE TABLE IF NOT EXISTS empresas (
  id SERIAL PRIMARY KEY,
  nombre_empresa VARCHAR(160) NOT NULL,
  descrip_empresa TEXT NOT NULL,
  correo_empresa VARCHAR(255),
  telefono_empresa VARCHAR(40),
  url_empresa TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_empresas_nombre ON empresas (nombre_empresa);