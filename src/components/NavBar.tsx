import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  const user = useSelector((s: RootState) => s.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main">
      <div className="navbar-inner">
        <div className="nav-title">Star Wars Movies</div>

        <div className="nav-right">
          {user ? (
            <>
              <span aria-live="polite">Logged in as <b>{user.username}</b></span>
              <button className="nav-logout" onClick={onLogout}>Logout</button>
            </>
          ) : (
            // Show nothing or a subtle "Guest" label (your call)
            <span aria-label="guest" style={{ opacity: 0.8 }}>Guest</span>
          )}
        </div>
      </div>
    </nav>
  )
}
