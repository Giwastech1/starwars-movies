import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const isAuthed = useSelector((s: RootState) => s.auth.isAuthenticated)
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />
}
