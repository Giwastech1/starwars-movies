import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import authReducer from '../features/auth/authSlice'
import moviesReducer from '../features/movies/moviesSlice'
import Movies from '../pages/Movies'

const mockResults = [
  {
    episode_id: 4,
    title: 'A New Hope',
    release_date: '1977-05-25',
    opening_crawl: 'It is a period of civil war...'
  },
  {
    episode_id: 5,
    title: 'The Empire Strikes Back',
    release_date: '1980-05-21',
    opening_crawl: 'It is a dark time for the Rebellion...'
  }
]

describe('Movies page renders fetched films', () => {
    beforeEach(() => {
      
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ results: mockResults })
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('shows movie titles after successful fetch', async () => {
    const store = configureStore({
      reducer: { auth: authReducer, movies: moviesReducer } as any,
      preloadedState: { auth: { isAuthenticated: true, user: { username: 'Luke' } } } as any
    })

    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    )

    expect(await screen.findByText(/A New Hope/i)).toBeInTheDocument()
    expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument()
  })
})
