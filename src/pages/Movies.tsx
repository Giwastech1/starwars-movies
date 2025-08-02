import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { fetchMovies } from '../features/movies/moviesSlice'
import MovieCard from '../components/MovieCard'
import '../styles/movies.css'

export default function Movies() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, status, error } = useSelector((state: RootState) => state.movies)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies())
    }
  }, [dispatch, status])

  return (
    <main style={{ padding: 16 }}>
      <h1>Star Wars Movies</h1>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}

      {status === 'succeeded' && (
        <section className="movies-grid" aria-label="Movies grid">
          {items.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              opening_crawl={movie.opening_crawl}
            />
          ))}
        </section>
      )}
    </main>
  )
}
