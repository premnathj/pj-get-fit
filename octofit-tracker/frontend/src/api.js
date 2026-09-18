const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function resourceUrl(resource) {
  return `${API_BASE_URL}/${resource}/`
}

export function getResourceItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  return []
}

export async function fetchResource(resource, signal) {
  const endpoint = resource.startsWith('/') || resource.startsWith('http')
    ? resource
    : resourceUrl(resource)
  const response = await fetch(endpoint, { signal })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response.json()
}