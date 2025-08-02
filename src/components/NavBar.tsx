import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const user = useSelector((s: RootState) => s.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <nav style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }} aria-label="Main">
      <strong>Star Wars Movies</strong>
      <span style={{ float: 'right', display: 'flex', gap: 12, alignItems: 'center' }}>
        {user ? (
          <>
            <span aria-live="polite" aria-atomic="true">
              Logged in as <b>{user.username}</b>
            </span>
            <button onClick={onLogout} style={{ padding: '6px 10px' }}>
              Logout
            </button>
          </>
        ) : (
          'Not logged in'
        )}
      </span>
    </nav>
  )
}
