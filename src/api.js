const BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`)

  if (!res.ok) {
    throw new Error(`API svarade ${res.status} ${res.statusText}`)
  }

  return res.json();
}

export function getDocuments() {
  return request('/api/documents');
}

export function getDocument(id) {
  return request(`/api/documents/${id}`);
}

// export async function updateDocument(id, title, content) {
//   console.log(id)
//   console.log("2")
//   console.log(`/api/documents/${id}/`)
//   const res = await request(`/api/documents/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, content })
//     },
//   )
//   console.log(res)
//   console.log("7")
//   console.log(id)
//   return res;
// }

export async function updateDocument(id, content) {
// export async function updateDocument(id, title, content) {
  const res = await fetch(BASE_URL + `/api/documents/${id}/`, 
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
      // body: JSON.stringify({ title, content })
    }
  )
  console.log(res)
  return res;
}