#!/bin/sh
set -e

echo "Aplicando migraciones..."
node src/db/migrate.js

if [ "${RUN_SEED:-true}" = "true" ]; then
  echo "Ejecutando seed (solo si las tablas están vacías)..."
  node src/db/seed.js
fi

echo "Iniciando servidor..."
exec node src/server.js