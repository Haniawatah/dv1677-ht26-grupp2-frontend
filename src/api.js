const BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!res.ok) {
    throw new Error(`API svarade ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export function getDocuments() {
  return request('/api/documents')
}

export function getDocument(id) {
  return request(`/api/documents/${id}`)
}

// Backend replies with the token either as { data: { token } } or { data: token }.
export async function loginUser(email, password) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  return data.data.token ?? data.data
}

export async function registerUser(email, password) {
  const data = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  return data.data.token ?? data.data
}