import { truncate } from '../utils/format'

type Props = {
  title: string
  release_date: string
  opening_crawl: string
}

export default function MovieCard({ title, release_date, opening_crawl }: Props) {
  return (
    <article
      className="movie-card"
      tabIndex={0}
      aria-label={title}
    >
      <h2 className="movie-title">{title}</h2>
      <p className="movie-date">Released: {new Date(release_date).toDateString()}</p>
      <p className="movie-crawl">{truncate(opening_crawl, 120)}</p>
      <button
        type="button"
        className="movie-more"
        aria-label={`More info about ${title}`}
        onClick={(e) => e.preventDefault()}
      >
        More info
      </button>
    </article>
  )
}
