import { memo, useMemo } from 'react'
import { truncate, formatDate } from '../utils/format'

type Props = {
  title: string
  release_date: string
  opening_crawl: string
  background?: string // NEW
}

function MovieCardBase({ title, release_date, opening_crawl}: Props) {
  const readableDate = useMemo(() => formatDate(release_date), [release_date])
  const snippet = useMemo(() => truncate(opening_crawl, 120), [opening_crawl])

  return (
    <article
      className="movie-card"
      tabIndex={0}
      aria-label={title}
      
    >
      <h2 className="movie-title">{title}</h2>
      <p className="movie-date">Released: {readableDate}</p>
      <p className="movie-crawl">{snippet}</p>
      <a
        href="#"
        role="button"
        className="movie-more"
        aria-label={`More info about ${title}`}
        onClick={(e) => e.preventDefault()}
      >
        More info
      </a>

    </article>
  )
}

const MovieCard = memo(MovieCardBase)
export default MovieCard
