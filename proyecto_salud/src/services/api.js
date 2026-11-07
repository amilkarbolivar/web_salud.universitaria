// Cliente HTTP minimalista para la API de UniMental.
// Usa rutas relativas para que Vite (dev) y nginx (prod) hagan proxy a /api.

export async function apiFetch(path, options = {}) {
  const { method = "GET", body, headers = {}, ...rest } = options;
  const response = await fetch(path, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });
  return response;
}

export async function apiJson(path, options = {}) {
  const response = await apiFetch(path, options);
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error || `Error ${response.status}`;
    throw new Error(message);
  }
  return data;
}