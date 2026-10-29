import { logout } from './context/AuthContext.jsx'

const BASE_URL = import.meta.env.VITE_API_URL || ''

// authenticated: false means the auth endpoints, where a 401 is a normal
// "wrong credentials" error and no token should be sent.
async function request(path, options = {}, authenticated = true) {
  const headers = { 'Content-Type': 'application/json' }

  if (authenticated) {
    const token = localStorage.getItem('token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  })

  if (res.status === 401 && authenticated) {
    // Expired or invalid token: clear it so ProtectedRoute sends the user
    // to /login instead of leaving them stuck on a failing page.
    logout()
    throw new Error('Din session har gått ut. Logga in igen.')
  }

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

// owner is not sent from the frontend, the backend sets it from the JWT token.
export function createDocument(title, content, type, createdAt, updatedAt) {
  return request('/api/documents', {
    method: 'POST',
    body: JSON.stringify({ title, content, type, createdAt, updatedAt }),
  })
}

export function updateDocument(id, title, content) {
  return request(`/api/documents/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
  })
}

export function deleteDocument(id) {
  return request(`/api/documents/${id}`, {
    method: 'DELETE',
  })
}

// Backend replies with the token either as { data: { token } } or { data: token }.
export async function loginUser(email, password) {
  const data = await request(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    false,
  )
  return data.data.token ?? data.data
}

export async function registerUser(email, password) {
  const data = await request(
    '/api/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    false,
  )
  return data.data.token ?? data.data
}