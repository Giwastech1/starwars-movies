import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from '../components/NavBar'
import ProtectedRoute from '../components/ProtectedRoute'

const Movies = lazy(() => import('../pages/Movies'))
const Login = lazy(() => import('../pages/Login'))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<p style={{ padding: 16 }}>Loading…</p>}>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/movies" element={<Movies />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
  }
  
