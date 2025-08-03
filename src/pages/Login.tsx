import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../app/store'
import { loginSucceeded } from '../features/auth/authSlice'
import '../styles/login.css'

export default function Login() {
  const isAuthed = useSelector((s: RootState) => s.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')

  if (isAuthed) return <Navigate to="/movies" replace />

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = username.trim()
    if (name) dispatch(loginSucceeded({ username: name }))
  }

  return (
    <main className="auth-wrap">
      <section className="auth-card" aria-label="Sign in">
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-help">Enter a username to continue.</p>

        <form onSubmit={onSubmit} noValidate>
          <label className="auth-label" htmlFor="username">Username</label>
          <input
            id="username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            aria-label="username"
          />

          <button className="auth-submit" type="submit">Continue</button>
        </form>
      </section>
    </main>
  )
}
