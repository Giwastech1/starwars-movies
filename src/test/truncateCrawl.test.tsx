import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MovieCard from '../components/MovieCard'

describe('MovieCard opening crawl truncation', () => {
  it('truncates long opening crawl to ~120 chars and adds an ellipsis', () => {
    const longCrawl = 'A'.repeat(150) // 150 chars -> should truncate to 120 + …
    const expected = 'A'.repeat(120) + '…'

    render(
      <MovieCard
        title="Test Film"
        release_date="1977-05-25"
        opening_crawl={longCrawl}
      />
    )
    expect(screen.getByText(expected)).toBeInTheDocument()

    expect(screen.queryByText(longCrawl)).toBeNull()
  })

  it('does not truncate when text length is <= 120', () => {
    const shortCrawl = 'It is a period of civil war.'
    render(
      <MovieCard
        title="Test Film"
        release_date="1977-05-25"
        opening_crawl={shortCrawl}
      />
    )
    expect(screen.getByText(shortCrawl)).toBeInTheDocument()
  })
})
