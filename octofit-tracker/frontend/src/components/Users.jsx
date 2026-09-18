import { useEffect, useState } from 'react'
import { fetchResource, getResourceItems } from '../api.js'
import { ResourcePage } from './Activities.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchResource(usersEndpoint, controller.signal).then((payload) => setUsers(getResourceItems(payload))).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <ResourcePage eyebrow="Your people" title="Users" error={error}><div className="table-wrap"><table><thead><tr><th>Athlete</th><th>Email</th><th>Joined</th></tr></thead><tbody>{users.map((user) => <tr key={user._id || user.id}><td><strong>{user.username || 'Unnamed athlete'}</strong></td><td>{user.email || '—'}</td><td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td></tr>)}</tbody></table>{!users.length && !error && <p className="empty-state">No users found.</p>}</div></ResourcePage>
}