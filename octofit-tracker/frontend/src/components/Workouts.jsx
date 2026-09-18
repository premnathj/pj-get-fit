import { useEffect, useState } from 'react'
import { fetchResource, getResourceItems } from '../api.js'
import { ResourcePage } from './Activities.jsx'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchResource('workouts', controller.signal).then((payload) => setWorkouts(getResourceItems(payload))).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <ResourcePage eyebrow="Train with intent" title="Workouts" error={error}><div className="card-grid">{workouts.map((workout) => <article className="resource-card" key={workout._id || workout.id}><span className="card-index">{workout.difficulty || 'WORKOUT'}</span><h2>{workout.title || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for your next milestone.'}</p><span className="muted">{workout.activityType || 'Mixed movement'} · {workout.durationMinutes ?? 0} min</span></article>)}{!workouts.length && !error && <p className="empty-state">No workouts are available yet.</p>}</div></ResourcePage>
}