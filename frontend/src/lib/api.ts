const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function apiFetch(path: string, init?: RequestInit) {
  return fetch(`${BASE}${path}`, init);
}
