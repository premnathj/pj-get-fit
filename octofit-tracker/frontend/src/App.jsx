import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/leaderboard">
          <img src="/octofitapp-small.png" alt="Octofit Tracker" />
          <span>Octofit <b>Tracker</b></span>
        </NavLink>
        <nav aria-label="Primary navigation">
          {[
            ['leaderboard', 'Leaderboard'],
            ['activities', 'Activities'],
            ['workouts', 'Workouts'],
            ['teams', 'Teams'],
            ['users', 'Users'],
          ].map(([path, label]) => (
            <NavLink key={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={`/${path}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/leaderboard" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
