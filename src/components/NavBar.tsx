import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'  // ← add

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
          {user && <>Logged in as <b>{user.username}</b></>}
          <button className="nav-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}
