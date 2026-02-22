// frontend/src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_URL; // <-- must be defined in Vercel env

if (!BASE_URL) {
  console.error('VITE_API_URL is not defined. Set it in Vercel → Project → Settings → Environment Variables.');
}

export async function getProfile() {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}