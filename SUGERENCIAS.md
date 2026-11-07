# Sugerencias de mejora para UniMental

## Funcionalidad
- Recuperación de contraseña por correo y verificación de email.
- Roles (administrador) para gestionar artículos, empresas y moderar foros.
- Paginación y búsqueda full-text en artículos, foros y directorio.
- Notificaciones en tiempo real (WebSocket) para nuevos mensajes en foros.
- Edición/eliminación de mensajes y foros por su autor.
- Carga de imágenes para artículos (almacenamiento en S3 o volumen).

## Experiencia de usuario
- Modo oscuro (el icono del header aún no está conectado).
- Internacionalización (es/en).
- Skeletons de carga y estados vacíos más ricos.
- PWA con soporte offline para contenidos informativos.
- Accesibilidad avanzada: skip links, trampas de foco en modales, anuncios ARIA.

## Seguridad
- Sanitización de contenido generado por usuarios (DOMPurify) para evitar XSS en foros.
- Moderación y reporte de contenido inapropiado.
- MFA para cuentas.
- Rate limiting por usuario autenticado además de por IP.
- Auditoría de eventos de autenticación.

## Calidad y operación
- Tests E2E con Playwright.
- Monitoreo (healthchecks externos, métricas).
- Backups automatizados de PostgreSQL (cron + S3).
- CDN para estáticos.
- Optimización de imágenes (WebP, lazy loading).
- Escaneo de vulnerabilidades en CI (npm audit, Trivy).

## Infraestructura
- Dominio propio y HTTPS (Let's Encrypt).
- Autoescalado o instancia mayor si el tráfico crece.
- Separar entornos (staging/producción).