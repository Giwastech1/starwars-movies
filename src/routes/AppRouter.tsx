import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/NavBar'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Movies from '../pages/Movies'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/movies" replace />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/movies" element={<Movies />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/movies" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
