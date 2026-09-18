import { useEffect, useState } from 'react'
import { fetchResource, getResourceItems } from '../api.js'
import { ResourcePage } from './Activities.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchResource(teamsEndpoint, controller.signal).then((payload) => setTeams(getResourceItems(payload))).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <ResourcePage eyebrow="Together is stronger" title="Teams" error={error}><div className="card-grid">{teams.map((team) => <article className="resource-card" key={team._id || team.id}><span className="card-index">TEAM</span><h2>{team.name}</h2><p>{team.description || 'Ready for a new shared goal.'}</p><span className="muted">{team.members?.length || 0} members</span></article>)}{!teams.length && !error && <p className="empty-state">No teams have been created yet.</p>}</div></ResourcePage>
}