import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type Movie = {
  id: string
  title: string
  release_date: string
  opening_crawl: string
  episode_id?: number
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
  const API_URL = 'https://swapi.info/api/films'
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error(`Failed to fetch films: ${res.status}`)

    const data = await res.json();

  let arr: any[] = []

  if (Array.isArray(data)) {
    arr = data
  } else if (data && typeof data === 'object') {
    const d: any = data
    if (Array.isArray(d.results)) arr = d.results
    else if (Array.isArray(d.films)) arr = d.films
    else if (Array.isArray(d.data)) arr = d.data
    else {
      const vals = Object.values(d as Record<string, unknown>)
      arr = vals.filter(
        (v: any) =>
          v &&
          typeof v === 'object' &&
          ('title' in v || 'opening_crawl' in v || 'release_date' in v || 'episode_id' in v)
      ) as any[]
    }
  }

  const list: Movie[] = arr.map((m: any) => ({
    id: String(m.episode_id ?? m.id ?? m.url ?? m.title),
    title: m.title ?? m.name ?? 'Untitled',
    release_date: m.release_date ?? m.releaseDate ?? '',
    opening_crawl: m.opening_crawl ?? m.openingCrawl ?? '',
    episode_id: m.episode_id ?? (typeof m.id === 'number' ? m.id : undefined),
  }))
  return list
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
