import { useEffect, useState } from 'react'
import { fetchResource, getResourceItems } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchResource(activitiesEndpoint, controller.signal).then((payload) => setActivities(getResourceItems(payload))).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="Movement log" title="Activities" error={error}>
    <div className="table-wrap"><table><thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead><tbody>
      {activities.map((activity) => <tr key={activity._id || activity.id}><td>{activity.type || 'Activity'}</td><td>{activity.durationMinutes ?? 0} min</td><td>{activity.points ?? 0}</td><td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td></tr>)}
    </tbody></table>{!activities.length && !error && <EmptyState text="No activities recorded yet." />}</div>
  </ResourcePage>
}

function ResourcePage({ eyebrow, title, error, children }) {
  return <section className="resource-page"><p className="eyebrow">{eyebrow}</p><div className="page-heading"><div><h1>{title}</h1><p className="muted">Stay close to the work that moves your team forward.</p></div></div>{error ? <p className="error">{error}</p> : children}</section>
}

function EmptyState({ text }) { return <p className="empty-state">{text}</p> }

export { EmptyState, ResourcePage }