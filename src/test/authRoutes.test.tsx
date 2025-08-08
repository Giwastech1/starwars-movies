import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import moviesReducer from '../features/movies/moviesSlice'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'

// Dummy component so we don’t depend on Movies fetching during this test
function DummyMovies() {
  return <h1>Star Wars Movies</h1>
}

const makeStore = (preloaded?: any) =>
  configureStore({
    reducer: { auth: authReducer, movies: moviesReducer } as any,
    preloadedState: preloaded as any,
  })

describe('Route protection', () => {
  it('redirects unauthenticated user from /movies to /login', () => {
    const store = makeStore({
      auth: { isAuthenticated: false, user: null },
      movies: { items: [], status: 'idle' },
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movies']}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/movies" element={<DummyMovies />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Our login page heading is "Sign in" now
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
  })

  it('redirects authenticated user away from /login to /movies', async () => {
    const store = makeStore({
      auth: { isAuthenticated: true, user: { username: 'Leia' } },
      movies: { items: [], status: 'idle' },
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/movies" element={<DummyMovies />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    const moviesHeading = await screen.findByRole('heading', { name: /star wars movies/i })
    expect(moviesHeading).toBeInTheDocument()
  })
})
