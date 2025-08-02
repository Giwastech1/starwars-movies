import { useState } from 'react'
import type { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../app/store'
import { loginSucceeded } from '../features/auth/authSlice'

export default function Login() {
  const isAuthed = useSelector((s: RootState) => s.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')

  // If already logged in, do not allow seeing login page
  if (isAuthed) return <Navigate to="/movies" replace />

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const name = username.trim()
    if (name) {
      // Frontend-only auth per spec
      dispatch(loginSucceeded({ username: name }))
    }
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit} aria-label="Login form" style={{ maxWidth: 380 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Username
          <input
            aria-label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>
        <button type="submit" style={{ padding: '8px 12px' }}>Sign in</button>
      </form>
    </main>
  )
}
