import { useEffect, useState } from 'react'
import { fetchResource, getResourceItems } from '../api.js'
import { ResourcePage } from './Activities.jsx'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchResource('leaderboard', controller.signal).then((payload) => setEntries(getResourceItems(payload))).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <ResourcePage eyebrow="Team pulse" title="Leaderboard" error={error}><div className="leaderboard-list">{entries.map((entry, index) => <article className="leaderboard-row" key={entry._id || entry.id}><span className="rank">{entry.rank || index + 1}</span><div><strong>{entry.userId?.username || entry.username || 'Athlete'}</strong><span className="muted">Consistency compounds.</span></div><b>{entry.points ?? 0}<small> pts</small></b></article>)}{!entries.length && !error && <p className="empty-state">The leaderboard is waiting for its first results.</p>}</div></ResourcePage>
}