import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type Movie = {
  id: string
  title: string
  release_date: string
  opening_crawl: string
}

type MoviesState = {
  items: Movie[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState: MoviesState = {
  items: [],
  status: 'idle',
}

export const fetchMovies = createAsyncThunk('movies/fetch', async () => {
  const res = await fetch('https://swapi.info/api/films')
  if (!res.ok) throw new Error('Failed to fetch films')
  const data = await res.json()

  // Expect data.results (SWAPI-like)
  const list = (data.results || []).map((m: any) => ({
    id: String(m.episode_id ?? m.url ?? m.title),
    title: m.title,
    release_date: m.release_date,
    opening_crawl: m.opening_crawl,
  }))

  return list as Movie[]
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default moviesSlice.reducer
