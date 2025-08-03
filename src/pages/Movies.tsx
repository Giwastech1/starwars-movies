import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { fetchMovies } from '../features/movies/moviesSlice'
import MovieCard from '../components/MovieCard'


import '../styles/movies.css'

export default function Movies() {
  const dispatch = useDispatch<AppDispatch>()
const { items, status, error } = useSelector((state: RootState) => state.movies)
console.log('[Movies]', { status, itemsCount: items.length, error })
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies())
    }
  }, [dispatch, status])

    return (
        <main style={{ padding: 16 }}>
            <h1 style={{paddingLeft:"30px"}}>Star Wars Movies</h1>
            {status === 'loading' && <p role="status" aria-live="polite">Loading…</p>}
            {status === 'failed' && <p role="alert">Error: {error}</p>}

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
    );
}
